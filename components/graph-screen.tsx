import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WORDS, WordEntry } from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  wordsDiscovered: WordEntry[];
  onSelectWord?: (word: WordEntry) => void;
  wordsList?: WordEntry[];
};

// ── Build graph data ──────────────────────────────────────────────────────────
function buildGraphData(wordsDiscovered: WordEntry[], activeWords: WordEntry[]) {
  const discoveredIds = new Set(wordsDiscovered.map((w) => w.id));
  const wordById = new Map(activeWords.map((w) => [w.id, w]));

  const nodeSet = new Map<
    string,
    {
      id: string;
      word: string;
      isLearned: boolean;
      isMainWord: boolean;
      shortEtymology: string;
    }
  >();

  // Deduplicate links
  const linkSet = new Set<string>();
  const links: { source: string; target: string; isLearned: boolean }[] = [];

  // Add all main words
  activeWords.forEach((w) => {
    nodeSet.set(w.id, {
      id: w.id,
      word: w.word,
      isLearned: discoveredIds.has(w.id),
      isMainWord: true,
      shortEtymology: w.shortEtymology,
    });
  });

  // Add related-word nodes + edges
  activeWords.forEach((w) => {
    w.relatedWords.forEach((relId) => {
      if (!nodeSet.has(relId)) {
        const rel = wordById.get(relId);
        nodeSet.set(relId, {
          id: relId,
          word: rel?.word ?? relId.charAt(0).toUpperCase() + relId.slice(1),
          isLearned: discoveredIds.has(relId),
          isMainWord: !!rel,
          shortEtymology: rel?.shortEtymology ?? "",
        });
      }
      const key = [w.id, relId].sort().join("|");
      if (!linkSet.has(key)) {
        linkSet.add(key);
        links.push({
          source: w.id,
          target: relId,
          isLearned: discoveredIds.has(w.id) && discoveredIds.has(relId),
        });
      }
    });
  });

  return { nodes: Array.from(nodeSet.values()), links };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function GraphScreen({
  wordsDiscovered,
  onSelectWord,
  wordsList,
}: Props) {
  const { colors, isDark } = useTheme();
  const webViewRef = useRef<any>(null);
  const { width, height } = Dimensions.get("window");

  const activeWords = useMemo(() => wordsList || WORDS, [wordsList]);
  const totalWords = activeWords.length;

  // Stable key: only recompute graph when discovered set changes
  const discoveredKey = wordsDiscovered.map((w) => w.id).join(",");

  const graphData = useMemo(
    () => buildGraphData(wordsDiscovered, activeWords),
    [discoveredKey, activeWords]
  );

  // ── Handle messages from WebView ──────────────────────────────────────────
  const handleWebViewMessage = useCallback(
    (event: any) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.type === "selectWord" && data.wordId && onSelectWord) {
          const word = activeWords.find((w) => w.id === data.wordId);
          if (word) onSelectWord(word);
        }
      } catch {
        /* ignore */
      }
    },
    [onSelectWord, activeWords]
  );

  // ── HTML / canvas / physics ───────────────────────────────────────────────
  const htmlContent = useMemo(() => {
    // ── Theme tokens injected into the WebView ────────────────────────────
    const bg = isDark ? "#1A1A1A" : "#FDFBF7";
    const learnedFill = isDark
      ? "rgba(212,175,55,0.82)"
      : "rgba(184,148,31,0.76)";
    const learnedGlow = isDark
      ? "rgba(212,175,55,0.15)"
      : "rgba(184,148,31,0.12)";
    const learnedStroke = isDark
      ? "rgba(255,255,255,0.26)"
      : "rgba(50,34,20,0.16)";
    const unlearnedMain = isDark
      ? "rgba(240,234,216,0.20)"
      : "rgba(50,34,20,0.24)";
    const unlearnedRel = isDark
      ? "rgba(240,234,216,0.10)"
      : "rgba(50,34,20,0.12)";
    const unlearnedStroke = isDark
      ? "rgba(240,234,216,0.16)"
      : "rgba(50,34,20,0.12)";
    const edgeDefault = isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.055)";
    const edgeLearned = isDark
      ? "rgba(212,175,55,0.42)"
      : "rgba(184,148,31,0.32)";
    const labelLearned = isDark ? "#F7EFD8" : "#2A1A0E";
    const labelDim = isDark ? "#9C9A90" : "#6B6258";
    const labelHalo = isDark
      ? "rgba(26,26,26,0.88)"
      : "rgba(253,251,247,0.88)";
    const particleColor = isDark ? "#D4AF37" : "#B8941F";

    // Popup CSS vars
    const sheetBg = isDark ? "#232323" : "#FFFFFF";
    const sheetBorder = isDark ? "#D4AF37" : "#B8941F";
    const sheetText = isDark ? "#F0EAD8" : "#322214";
    const sheetSub = isDark ? "#999999" : "#6B5B4E";
    const badgeBg = isDark ? "rgba(212,175,55,0.13)" : "rgba(184,148,31,0.1)";
    const ctaText = isDark ? "#1A1A1A" : "#322214";

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:${bg};overflow:hidden;touch-action:none;width:100vw;height:100vh;}
#c{position:absolute;top:0;left:0;width:100%;height:100%;}

/* ── Bottom sheet ─────────────────────────────────────────────────── */
#sheet{
  position:fixed;bottom:0;left:0;right:0;
  background:${sheetBg};
  border-top:2px solid ${sheetBorder};
  border-radius:22px 22px 0 0;
  padding:10px 20px 36px;
  z-index:100;
  transform:translateY(110%);
  transition:transform 0.32s cubic-bezier(0.32,0.72,0,1);
  -webkit-tap-highlight-color:transparent;
  cursor:pointer;
  user-select:none;
}
#sheet.open{transform:translateY(0);}

.handle{
  width:38px;height:4px;border-radius:2px;
  background:${sheetBorder};opacity:0.35;
  margin:0 auto 14px;
}
.s-badge{
  display:inline-flex;align-items:center;gap:5px;
  padding:3px 10px;border-radius:999px;
  background:${badgeBg};
  font-size:10px;font-weight:700;letter-spacing:1.1px;
  text-transform:uppercase;color:${sheetBorder};
  margin-bottom:8px;font-family:sans-serif;
}
.s-word{
  font-size:27px;font-weight:800;color:${sheetText};
  margin-bottom:5px;font-family:Georgia,serif;line-height:1.15;
}
.s-etym{
  font-size:13px;color:${sheetSub};line-height:1.55;
  font-style:italic;margin-bottom:16px;font-family:sans-serif;
}
.s-cta{
  width:100%;padding:13px 0;border-radius:999px;
  background:${sheetBorder};text-align:center;
  font-size:14px;font-weight:800;color:${ctaText};
  font-family:sans-serif;letter-spacing:0.3px;
}
</style>
</head>
<body data-viewport="${Math.round(width)}x${Math.round(height)}">
<canvas id="c"></canvas>

<div id="sheet" role="button">
  <div class="handle"></div>
  <div class="s-badge" id="s-badge">Da scoprire</div>
  <div class="s-word" id="s-word"></div>
  <div class="s-etym" id="s-etym"></div>
  <div class="s-cta">Scopri la storia completa →</div>
</div>

<script>
(function(){
/* ── Canvas setup ──────────────────────────────────────────────────── */
var canvas=document.getElementById('c'),ctx=canvas.getContext('2d');
var dpr=window.devicePixelRatio||1,W=innerWidth,H=innerHeight;
canvas.width=W*dpr;canvas.height=H*dpr;ctx.scale(dpr,dpr);

/* ── Data ──────────────────────────────────────────────────────────── */
var nodes=${JSON.stringify(graphData.nodes)};
var links=${JSON.stringify(graphData.links)};

if(!nodes.length){
  ctx.fillStyle='${labelDim}';ctx.textAlign='center';ctx.font='14px sans-serif';
  ctx.fillText('Scopri la tua prima parola per iniziare la mappa!',W/2,H/2);
  return;
}

/* ── Maps ──────────────────────────────────────────────────────────── */
var nodeMap={};
nodes.forEach(function(n){nodeMap[n.id]=n;});

var resolved=[];
links.forEach(function(l){
  if(nodeMap[l.source]&&nodeMap[l.target])
    resolved.push({s:nodeMap[l.source],t:nodeMap[l.target],learned:l.isLearned});
});

/* ── Degree for node sizing ────────────────────────────────────────── */
var deg={};
nodes.forEach(function(n){deg[n.id]=0;});
resolved.forEach(function(l){
  deg[l.s.id]=(deg[l.s.id]||0)+1;
  deg[l.t.id]=(deg[l.t.id]||0)+1;
});

function nr(n){
  /* Base radius + bonus for highly-connected nodes */
  var base=n.isLearned?5.2:n.isMainWord?3.6:2.2;
  return base+Math.min((deg[n.id]||0)*0.16,1.4);
}

function vr(n){
  var px=n.isLearned?4.6:n.isMainWord?3.1:2;
  px+=Math.min((deg[n.id]||0)*0.1,0.8);
  return px/cam.zoom;
}

/* ── Camera ────────────────────────────────────────────────────────── */
var cam={x:0,y:0,zoom:0.7};
/* canvas centre offset — must match draw() translate */
var CX=W/2, CY=H*0.40;

function screenToWorld(sx,sy){
  return{x:(sx-CX)/cam.zoom+cam.x, y:(sy-CY)/cam.zoom+cam.y};
}

/* ── Initial placement: golden-angle spiral for balanced radial spread ── */
var learnedNodes = nodes.filter(function(n){return n.isLearned;});
var mainNodes    = nodes.filter(function(n){return !n.isLearned&&n.isMainWord;});
var relNodes     = nodes.filter(function(n){return !n.isMainWord;});

function placeGolden(arr, rMin, rMax, jitter){
  var total = Math.max(arr.length, 1);
  arr.forEach(function(n, i){
    var goldenAngle = i * 2.3999632;
    var progress = Math.sqrt((i + 1) / total);
    var r = rMin + (rMax - rMin) * progress;
    n.x = r * Math.cos(goldenAngle) + (Math.random() - 0.5) * jitter;
    n.y = r * Math.sin(goldenAngle) + (Math.random() - 0.5) * jitter;
    n.vx = 0; n.vy = 0;
  });
}

var base = Math.min(W, H) * 0.22;
placeGolden(learnedNodes, 20,       base * 1.1, 20);
placeGolden(mainNodes,    base * 1.1, base * 2.4, 35);
placeGolden(relNodes,     base * 2.4, base * 3.8, 50);

/* ── Physics ────────────────────────────────────────────────────────── */
var alpha=1.0, ALPHA_DECAY=0.005, ALPHA_MIN=0.003;

function tick(){
  if(alpha<=ALPHA_MIN){alpha=ALPHA_MIN;return;}
  var a=alpha;

  /* Softened gravity toward origin to avoid central congestion */
  nodes.forEach(function(n){n.vx-=n.x*0.0032*a;n.vy-=n.y*0.0032*a;});

  /* Repulsion with wider clearance floor to distribute nodes cleanly */
  for(var i=0;i<nodes.length;i++){
    var ni=nodes[i],ri=nr(ni);
    for(var j=i+1;j<nodes.length;j++){
      var nj=nodes[j],rj=nr(nj);
      var dx=nj.x-ni.x,dy=nj.y-ni.y;
      var d2=dx*dx+dy*dy+0.01,d=Math.sqrt(d2);
      /* Desired minimum surface-to-surface gap */
      var minD=ri+rj+74;
      var strength=(minD*minD*1.45)/d2*a;
      var fx=(dx/d)*strength,fy=(dy/d)*strength;
      ni.vx-=fx;ni.vy-=fy;
      nj.vx+=fx;nj.vy+=fy;
    }
  }

  /* Spring attraction along edges with degree-proportional rest length */
  resolved.forEach(function(l){
    var dx=l.t.x-l.s.x,dy=l.t.y-l.s.y;
    var d=Math.sqrt(dx*dx+dy*dy)||0.01;
    /* Edge length adapts to local connectivity to let dense hubs expand */
    var degSum = (deg[l.s.id]||0) + (deg[l.t.id]||0);
    var rest = nr(l.s) + nr(l.t) + 120 + Math.min(degSum * 8, 110);
    var f=((d-rest)/d)*0.032*a;
    var fx=dx*f,fy=dy*f;
    l.s.vx+=fx;l.s.vy+=fy;
    l.t.vx-=fx;l.t.vy-=fy;
  });

  /* Integrate */
  nodes.forEach(function(n){n.vx*=0.72;n.vy*=0.72;n.x+=n.vx;n.y+=n.vy;});
  alpha-=ALPHA_DECAY;
}

/* Pre-settle: run 400 ticks synchronously for a balanced, untangled layout */
for(var _i=0;_i<400;_i++)tick();

/* Auto-fit camera to bounding box */
(function(){
  var mnX=1e9,mnY=1e9,mxX=-1e9,mxY=-1e9;
  nodes.forEach(function(n){var r=nr(n)+42;
    if(n.x-r<mnX)mnX=n.x-r;if(n.y-r<mnY)mnY=n.y-r;
    if(n.x+r>mxX)mxX=n.x+r;if(n.y+r>mxY)mxY=n.y+r;
  });
  cam.x=(mnX+mxX)/2;cam.y=(mnY+mxY)/2;
  var gw=mxX-mnX+110,gh=mxY-mnY+120;
  var z=Math.min(W/gw, H*0.72/gh, 1.15);
  cam.zoom=Math.max(0.05,z);
})();

/* ── Particles ──────────────────────────────────────────────────────── */
var parts=[];

/* ── Popup (DOM) ────────────────────────────────────────────────────── */
var sheet   =document.getElementById('sheet');
var sWord   =document.getElementById('s-word');
var sEtym   =document.getElementById('s-etym');
var sBadge  =document.getElementById('s-badge');
var selNode =null;

function openSheet(n){
  selNode=n;
  sWord.textContent=n.word||n.id;
  sEtym.textContent=n.shortEtymology||'Etimologia non ancora disponibile';
  sBadge.textContent=n.isLearned?'✓ Già esplorata':'✦ Da scoprire';
  sheet.style.transform='translateY(0)';
  sheet.classList.add('open');
}
function closeSheet(){
  selNode=null;
  sheet.style.transform='translateY(110%)';
  sheet.classList.remove('open');
}

/* Tap on sheet → navigate to full story in React Native */
sheet.addEventListener('click',function(e){
  /* Don't trigger if clicked on drag handle */
  if(e.target.classList.contains('handle')) return;
  if(selNode&&window.ReactNativeWebView){
    window.ReactNativeWebView.postMessage(
      JSON.stringify({type:'selectWord',wordId:selNode.id})
    );
  }
  closeSheet();
});

/* ── Drag down to dismiss sheet ─────────────────────────────────── */
var sStartY = 0, sCurY = 0, isDraggingSheet = false;
var handleEl = document.querySelector('.handle');

sheet.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) {
    sStartY = e.touches[0].clientY;
    sCurY = 0;
    isDraggingSheet = true;
    sheet.style.transition = 'none';
  }
}, { passive: true });

sheet.addEventListener('touchmove', function(e) {
  if (!isDraggingSheet) return;
  var dy = e.touches[0].clientY - sStartY;
  if (dy > 0) {
    sCurY = dy;
    sheet.style.transform = 'translateY(' + dy + 'px)';
  }
}, { passive: true });

sheet.addEventListener('touchend', function(e) {
  if (!isDraggingSheet) return;
  isDraggingSheet = false;
  sheet.style.transition = 'transform 0.28s cubic-bezier(0.32,0.72,0,1)';
  if (sCurY > 55) {
    closeSheet();
  } else {
    sheet.style.transform = 'translateY(0)';
  }
});

if(handleEl){
  handleEl.addEventListener('click', function(e){
    e.stopPropagation();
    closeSheet();
  });
}

/* ── Hit-test helper ────────────────────────────────────────────────── */
function hitNode(wx,wy){
  var best=null,bestD=Infinity;
  nodes.forEach(function(n){
    var dx=n.x-wx,dy=n.y-wy;
    var d=Math.sqrt(dx*dx+dy*dy);
    var threshold=Math.max(nr(n)+8/cam.zoom, 30/cam.zoom);
    if(d<threshold&&d<bestD){best=n;bestD=d;}
  });
  return best;
}

/* ── Draw loop ──────────────────────────────────────────────────────── */
function draw(){
  /* Continue settling (4 ticks/frame until converged) */
  if(alpha>ALPHA_MIN){for(var k=0;k<4;k++)tick();}

  ctx.clearRect(0,0,W,H);
  ctx.save();
  ctx.translate(CX,CY);
  ctx.scale(cam.zoom,cam.zoom);
  ctx.translate(-cam.x,-cam.y);

  var lw=1/cam.zoom;

  /* ── Edges: graceful curved arcs to avoid linear overlap ─────── */
  resolved.forEach(function(l){
    var dx = l.t.x - l.s.x, dy = l.t.y - l.s.y;
    var d = Math.sqrt(dx*dx + dy*dy) || 1;
    /* Subtle curvature based on node IDs for harmonic distribution */
    var bend = Math.sin((l.s.x * 0.05 + l.t.y * 0.05)) * Math.min(d * 0.10, 16);
    var mx = (l.s.x + l.t.x) / 2 - (dy / d) * bend;
    var my = (l.s.y + l.t.y) / 2 + (dx / d) * bend;
    l._mx = mx; l._my = my; // cache control point for particles

    ctx.beginPath();
    ctx.moveTo(l.s.x, l.s.y);
    ctx.quadraticCurveTo(mx, my, l.t.x, l.t.y);
    ctx.strokeStyle=l.learned?'${edgeLearned}':'${edgeDefault}';
    ctx.lineWidth=l.learned?1.5*lw:0.75*lw;
    ctx.stroke();
  });

  /* ── Floating particles along learned curved edges ─────────────── */
  resolved.forEach(function(l){
    if(l.learned&&Math.random()<0.007)
      parts.push({l:l,t:Math.random()*0.2,s:0.008+Math.random()*0.012});
  });
  for(var i=parts.length-1;i>=0;i--){
    var p=parts[i];p.t+=p.s;
    if(p.t>1){parts.splice(i,1);continue;}
    var it = 1 - p.t;
    var mx = p.l._mx || (p.l.s.x + p.l.t.x) / 2;
    var my = p.l._my || (p.l.s.y + p.l.t.y) / 2;
    var px = it * it * p.l.s.x + 2 * it * p.t * mx + p.t * p.t * p.l.t.x;
    var py = it * it * p.l.s.y + 2 * it * p.t * my + p.t * p.t * p.l.t.y;
    ctx.fillStyle='${particleColor}';
    ctx.beginPath();ctx.arc(px,py,1.2/cam.zoom,0,7);ctx.fill();
  }

  /* ── Nodes ──────────────────────────────────────────────────────── */
  var showLabel=cam.zoom>0.22;
  var fs=(cam.zoom>1.15?12.5:12)/cam.zoom;

  nodes.forEach(function(n){
    var r=vr(n);
    var isSel=selNode&&selNode.id===n.id;

    if(n.isLearned){
      var gr=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*3.1);
      gr.addColorStop(0,'${learnedGlow}');
      gr.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath();ctx.arc(n.x,n.y,r*3.1,0,7);
      ctx.fillStyle=gr;ctx.fill();

      ctx.beginPath();ctx.arc(n.x,n.y,r,0,7);
      ctx.fillStyle='${learnedFill}';ctx.fill();
      ctx.strokeStyle='${learnedStroke}';
      ctx.lineWidth=0.8/cam.zoom;
      ctx.stroke();
    } else {
      ctx.beginPath();ctx.arc(n.x,n.y,r,0,7);
      ctx.fillStyle=n.isMainWord?'${unlearnedMain}':'${unlearnedRel}';
      ctx.fill();
      ctx.strokeStyle='${unlearnedStroke}';
      ctx.lineWidth=0.7/cam.zoom;
      ctx.stroke();
    }

    /* Selection ring */
    if(isSel){
      ctx.beginPath();ctx.arc(n.x,n.y,r+4/cam.zoom,0,7);
      ctx.strokeStyle='${learnedFill}';
      ctx.lineWidth=1.2/cam.zoom;
      ctx.stroke();
    }
  });

  /* Labels are drawn after every node so words stay in the foreground. */
  nodes.forEach(function(n){
    if(showLabel&&(n.isLearned||(n.isMainWord&&cam.zoom>0.42))){
      var r=vr(n);
      var labelY=n.y-r-7/cam.zoom;
      ctx.font=(n.isLearned?'700 ':'600 ')+fs+'px sans-serif';
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.lineWidth=3.2/cam.zoom;
      ctx.strokeStyle='${labelHalo}';
      ctx.strokeText(n.word||n.id,n.x,labelY);
      ctx.fillStyle=n.isLearned?'${labelLearned}':'${labelDim}';
      ctx.fillText(n.word||n.id,n.x,labelY);
    }
  });

  ctx.restore();
  requestAnimationFrame(draw);
}
draw();

/* ── Touch handling ─────────────────────────────────────────────────── */
var dragNode=null,lastT=null,startPos=null,startTime=0,lastPinch=0,mode='none';

canvas.addEventListener('touchstart',function(e){
  e.preventDefault();
  var t=e.touches;
  if(t.length===1){
    startPos={x:t[0].clientX,y:t[0].clientY};
    startTime=Date.now();
    var pos=screenToWorld(t[0].clientX,t[0].clientY);
    var hit=hitNode(pos.x,pos.y);
    dragNode=hit;mode=hit?'drag':'pan';
    lastT={x:t[0].clientX,y:t[0].clientY};
  }
  if(t.length===2){
    mode='pinch';dragNode=null;
    var dx=t[0].clientX-t[1].clientX,dy=t[0].clientY-t[1].clientY;
    lastPinch=Math.sqrt(dx*dx+dy*dy);
    lastT={x:(t[0].clientX+t[1].clientX)/2,y:(t[0].clientY+t[1].clientY)/2};
  }
},{passive:false});

canvas.addEventListener('touchmove',function(e){
  e.preventDefault();
  var t=e.touches;
  if(mode==='drag'&&dragNode&&t.length===1){
    var pos=screenToWorld(t[0].clientX,t[0].clientY);
    dragNode.x=pos.x;dragNode.y=pos.y;dragNode.vx=0;dragNode.vy=0;
  }
  if(mode==='pan'&&t.length===1){
    cam.x-=(t[0].clientX-lastT.x)/cam.zoom;
    cam.y-=(t[0].clientY-lastT.y)/cam.zoom;
    lastT={x:t[0].clientX,y:t[0].clientY};
  }
  if(mode==='pinch'&&t.length===2){
    var dx=t[0].clientX-t[1].clientX,dy=t[0].clientY-t[1].clientY;
    var dist=Math.sqrt(dx*dx+dy*dy);
    cam.zoom=Math.max(0.05,Math.min(4,cam.zoom*(dist/lastPinch)));
    lastPinch=dist;
    var mx=(t[0].clientX+t[1].clientX)/2,my=(t[0].clientY+t[1].clientY)/2;
    cam.x-=(mx-lastT.x)/cam.zoom;cam.y-=(my-lastT.y)/cam.zoom;
    lastT={x:mx,y:my};
  }
},{passive:false});

canvas.addEventListener('touchend',function(e){
  if((mode==='drag'||mode==='pan')&&startPos){
    var dur=Date.now()-startTime;
    var dx=e.changedTouches[0].clientX-startPos.x;
    var dy=e.changedTouches[0].clientY-startPos.y;
    /* Tap: short duration + minimal movement */
    if(dur<280&&Math.sqrt(dx*dx+dy*dy)<10){
      var pos=screenToWorld(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
      var hit=hitNode(pos.x,pos.y);
      if(hit) openSheet(hit);
      else closeSheet();
    }
  }
  if(!e.touches.length){mode='none';dragNode=null;}
  else if(e.touches.length===1){
    mode='pan';
    lastT={x:e.touches[0].clientX,y:e.touches[0].clientY};
  }
},{passive:false});

})();
</script>
</body>
</html>`;
  }, [graphData, isDark, width, height]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Mappa Etimologica
        </Text>
        <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
          {wordsDiscovered.length}/{totalWords} scoperte · tocca un nodo per esplorare
        </Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: isDark ? "#D4AF37" : "#B8941F" },
            ]}
          />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>
            Scoperta
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: isDark ? "#484848" : "#C0BDB5" },
            ]}
          />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>
            Da scoprire
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendLine,
              {
                backgroundColor: isDark
                  ? "rgba(212,175,55,0.45)"
                  : "rgba(184,148,31,0.35)",
              },
            ]}
          />
          <Text style={[styles.legendText, { color: colors.textTertiary }]}>
            Collegata
          </Text>
        </View>
      </View>

      {/* Graph */}
      <View style={styles.graphContainer}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          style={{ flex: 1, backgroundColor: "transparent" }}
          scrollEnabled={false}
          javaScriptEnabled
          originWhitelist={["*"]}
          onMessage={handleWebViewMessage}
        />
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    alignItems: "center",
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xs,
    gap: 4,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: SPACING.lg,
  },

  legend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.lg,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 7, height: 7, borderRadius: 3.5 },
  legendLine: { width: 18, height: 2, borderRadius: 1 },
  legendText: { fontFamily: FONTS.sans, fontSize: 11 },

  graphContainer: { flex: 1, position: "relative" },

  /* Locked overlay (paywall) */
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  lockedBadge: {
    width: "100%",
    padding: SPACING.xl,
    borderRadius: RADIUS.xl,
    borderWidth: 2,
    alignItems: "center",
    gap: SPACING.md,
    ...SHADOWS.lg,
  },
  lockIcon: { fontSize: 32 },
  lockedTitle: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  lockedDesc: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  lockedBtn: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    ...SHADOWS.md,
  },
  lockedBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: "700",
    color: "#322214",
  },
});
