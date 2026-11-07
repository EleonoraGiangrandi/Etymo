const fs = require('fs');
const path = require('path');
const { WORDS } = require('../constants/words.ts');

// Importa le categorie rigorose in italiano
const CATEGORY_ASSIGNMENTS = {
  ciao: 'societa',
  palazzo: 'societa',
  scuola: 'societa',
  libro: 'societa',
  fiasco: 'societa',
  atleta: 'societa',
  stadio: 'societa',
  municipio: 'societa',
  senato: 'societa',
  repubblica: 'societa',
  democrazia: 'societa',
  legge: 'societa',
  paparazzo: 'societa',
  corteo: 'societa',
  crisi: 'societa',
  candidato: 'societa',
  rivale: 'societa',
  compagno: 'societa',
  sincero: 'societa',
  persona: 'societa',
  ospite: 'societa',
  idiota: 'societa',
  diploma: 'societa',
  pace: 'societa',
  politica: 'societa',
  libertà: 'societa',

  // CUCINA
  pizza: 'cucina',
  pasta: 'cucina',
  zucchero: 'cucina',
  caffe: 'cucina',
  cioccolato: 'cucina',
  pomodoro: 'cucina',
  patata: 'cucina',
  arancio: 'cucina',
  limone: 'cucina',
  carciofo: 'cucina',
  ricetta: 'cucina',
  ristorante: 'cucina',
  simposio: 'cucina',
  salame: 'cucina',
  pane: 'cucina',
  vino: 'cucina',
  carne: 'cucina',

  // NATURA
  tarantola: 'natura',
  zanzara: 'natura',
  monsone: 'natura',
  canicola: 'natura',
  orizzonte: 'natura',
  clima: 'natura',
  aurora: 'natura',
  tramontana: 'natura',
  vulcano: 'natura',
  mondo: 'natura',
  isola: 'natura',

  // SCIENZA
  algoritmo: 'scienza',
  calcolo: 'scienza',
  algebra: 'scienza',
  cifra: 'scienza',
  energia: 'scienza',
  robot: 'scienza',
  virus: 'scienza',
  atomo: 'scienza',
  laboratorio: 'scienza',
  elettricità: 'scienza',
  tecnica: 'scienza',
  telescopio: 'scienza',
  microscopio: 'scienza',
  spazio: 'scienza',
  universo: 'scienza',
  pianeta: 'scienza',
  galassia: 'scienza',
  epidemia: 'scienza',
  chirurgo: 'scienza',
  farmaco: 'scienza',
  sintomo: 'scienza',
  ospedale: 'scienza',

  // STORIA
  etimologia: 'storia',
  archivio: 'storia',
  monumento: 'storia',
  tempo: 'storia',
  lunedi: 'storia',
  martedi: 'storia',
  mercoledi: 'storia',
  giovedi: 'storia',
  venerdi: 'storia',
  sabato: 'storia',
  domenica: 'storia',
  gennaio: 'storia',
  febbraio: 'storia',
  marzo: 'storia',
  agosto: 'storia',
  olimpiadi: 'storia',
  maratona: 'storia',

  // ARTE
  museo: 'arte',
  teatro: 'arte',
  musica: 'arte',
  poesia: 'arte',
  stile: 'arte',
  bozzetto: 'arte',
  caricatura: 'arte',
  affresco: 'arte',
  pittura: 'arte',
  scultura: 'arte',
  architettura: 'arte',
  commedia: 'arte',
  tragedia: 'arte',
  serenata: 'arte',
  catastrofe: 'arte',

  // RELIGIONE
  carnevale: 'religione',
  paradiso: 'religione',
  inferno: 'religione',
  angelo: 'religione',
  diavolo: 'religione',
  miracolo: 'religione',
  voto: 'religione',
  panico: 'religione',
  abracadabra: 'religione',
  fantasma: 'religione',

  // COMMERCIO
  salario: 'commercio',
  pecunia: 'commercio',
  soldo: 'commercio',
  moneta: 'commercio',
  capitale: 'commercio',
  finanza: 'commercio',
  miseria: 'commercio',
  ipoteca: 'commercio',
  usura: 'commercio',
  tassa: 'commercio',
  dogana: 'commercio',
  magazzino: 'commercio',

  // VIAGGIO
  viaggio: 'viaggio',
  bussola: 'viaggio',
  pellegrino: 'viaggio',
  molo: 'viaggio',
  porto: 'viaggio',
  nave: 'viaggio',
  valigia: 'viaggio',
  albergo: 'viaggio',
  mappa: 'viaggio',

  // OGGETTI
  camera: 'oggetti',
  cappello: 'oggetti',
  finestra: 'oggetti',
  corridoio: 'oggetti',
  balcone: 'oggetti',
  terrazza: 'oggetti',
  scala: 'oggetti',
  candela: 'oggetti',
  fiammifero: 'oggetti',
  orologio: 'oggetti',
  carta: 'oggetti',
  penna: 'oggetti',
  quaderno: 'oggetti',
  gomma: 'oggetti',
  tavolo: 'oggetti',
  sedia: 'oggetti',
  porta: 'oggetti',
  chiave: 'oggetti',
  sapone: 'oggetti',
  specchio: 'oggetti',
  pettine: 'oggetti',
  vestito: 'oggetti',
  scarpa: 'oggetti',
  ombrello: 'oggetti',
  palla: 'oggetti',
  bugia: 'oggetti',

  // CORPO
  malinconia: 'corpo',
  dieta: 'corpo',
  capriccio: 'corpo',
  mentire: 'corpo',
  record: 'corpo',
  coraggio: 'corpo',
  pazienza: 'corpo',
  entusiasmo: 'corpo',
  follia: 'corpo',
  genio: 'corpo',
  talento: 'corpo',
  sogno: 'corpo',
  estasi: 'corpo',
  fantasia: 'corpo',
  desiderio: 'corpo',

  // GUERRA
  guerra: 'guerra',
  prigione: 'guerra',
  vendetta: 'guerra',
  disastro: 'guerra',
  labirinto: 'guerra',
};

// Funzioni del graph engine importate / inline per Node
const ROOT_FAMILIES = [
  { root: "caput", wordIds: ["cappello", "capitale", "capriccio"] },
  { root: "liber", wordIds: ["libro", "libertà"] },
  { root: "panis", wordIds: ["pane", "compagno"] },
  { root: "sal", wordIds: ["salario", "salame"] },
  { root: "candere", wordIds: ["candela", "candidato", "sincero"] },
  { root: "currere", wordIds: ["corridoio", "corteo"] },
  { root: "skopein", wordIds: ["telescopio", "microscopio"] },
  { root: "mousa", wordIds: ["museo", "musica"] },
  { root: "theatron", wordIds: ["teatro", "tragedia", "commedia", "catastrofe"] },
  { root: "phainein", wordIds: ["fantasia", "fantasma"] },
  { root: "skhole", wordIds: ["scuola", "diploma"] },
  { root: "arab_math", wordIds: ["algebra", "algoritmo", "cifra"] },
];

const THEMATIC_CLUSTERS = [
  { id: "roma_potere", wordIds: ["palazzo", "senato", "repubblica", "legge", "candidato", "salario", "moneta", "pecunia", "municipio", "corteo", "prigione", "finanza"] },
  { id: "grecia_polis", wordIds: ["democrazia", "politica", "scuola", "atleta", "stadio", "maratona", "olimpiadi", "simposio", "idiota", "crisi", "labirinto"] },
  { id: "grecia_teatro", wordIds: ["teatro", "tragedia", "commedia", "catastrofe", "poesia", "musica", "museo"] },
  { id: "venezia_mare", wordIds: ["ciao", "fiasco", "molo", "porto", "nave", "viaggio", "dogana", "magazzino", "serenata"] },
  { id: "mondo_arabo", wordIds: ["caffe", "zucchero", "arancio", "limone", "carciofo", "dogana", "magazzino", "algebra", "algoritmo", "cifra"] },
  { id: "nuovo_mondo", wordIds: ["cioccolato", "pomodoro", "patata"] },
  { id: "calendario_romano", wordIds: ["lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica", "gennaio", "febbraio", "marzo", "agosto", "tempo"] },
  { id: "sacro_mistero", wordIds: ["carnevale", "paradiso", "inferno", "angelo", "diavolo", "miracolo", "voto", "panico", "abracadabra", "pellegrino"] },
  { id: "arti_visive", wordIds: ["affresco", "pittura", "scultura", "architettura", "bozzetto", "stile", "caricatura", "museo"] },
  { id: "scienza_cosmo", wordIds: ["spazio", "universo", "mondo", "pianeta", "galassia", "telescopio", "microscopio", "atomo", "energia", "elettricità"] },
  { id: "medicina_cura", wordIds: ["chirurgo", "farmaco", "sintomo", "ospedale", "dieta", "virus", "epidemia", "malinconia"] },
  { id: "spazi_dimora", wordIds: ["camera", "finestra", "corridoio", "balcone", "terrazza", "scala", "porta", "chiave", "palazzo"] },
  { id: "studio_scrittura", wordIds: ["libro", "carta", "penna", "quaderno", "gomma", "diploma", "archivio", "scuola"] },
  { id: "cucina_tavola", wordIds: ["pizza", "pasta", "pane", "vino", "carne", "salame", "ricetta", "ristorante", "simposio"] },
  { id: "natura_elementi", wordIds: ["vulcano", "monsone", "aurora", "tramontana", "clima", "canicola", "orizzonte", "mondo"] },
  { id: "emozioni_mente", wordIds: ["coraggio", "pazienza", "entusiasmo", "follia", "genio", "talento", "sogno", "fantasia", "desiderio", "estasi", "capriccio"] },
  { id: "conflitto_difesa", wordIds: ["guerra", "prigione", "vendetta", "disastro", "labirinto", "pace"] },
  { id: "economia_scambi", wordIds: ["moneta", "soldo", "pecunia", "capitale", "finanza", "usura", "ipoteca", "tassa", "miseria"] },
];

function detectLang(w) {
  const text = `${w.shortEtymology} ${w.story}`.toLowerCase();
  if (text.includes("arabo") || text.includes("araba") || text.includes("persiano")) return "arabo";
  if (text.includes("greco") || text.includes("greca") || text.includes("ellenico")) return "greco";
  if (text.includes("germanico") || text.includes("longobardo") || text.includes("franco")) return "germanico";
  if (text.includes("nahuatl") || text.includes("arawak") || text.includes("nuovo mondo")) return "indigena";
  if (text.includes("ebraico") || text.includes("aramaico")) return "semitica";
  if (text.includes("francese") || text.includes("provenzale")) return "francese";
  if (text.includes("veneziano")) return "veneziano";
  if (text.includes("latino") || text.includes("latina") || text.includes("romano")) return "latino";
  return "italiano";
}

function calculateScore(a, b) {
  let score = 0;
  // Radice comune
  for (const root of ROOT_FAMILIES) {
    if (root.wordIds.includes(a.id) && root.wordIds.includes(b.id)) {
      score += 6.0;
    }
  }
  // Cluster tematico
  for (const cluster of THEMATIC_CLUSTERS) {
    if (cluster.wordIds.includes(a.id) && cluster.wordIds.includes(b.id)) {
      score += 4.5;
    }
  }
  // Lingua d'origine
  const langA = detectLang(a);
  const langB = detectLang(b);
  if (langA === langB && langA !== "latino" && langA !== "italiano") {
    score += 3.0;
  }
  // Categoria
  if (a.category === b.category) {
    score += 1.5;
  }
  return score;
}

// Aggiorna le categorie di tutte le parole
const updatedWords = WORDS.map(w => {
  const cat = CATEGORY_ASSIGNMENTS[w.id] || w.category;
  return { ...w, category: cat };
});

const wordMap = new Map(updatedWords.map(w => [w.id, w]));

// Calcola per ciascuna parola i collegamenti
const adjacency = new Map();
updatedWords.forEach(w => adjacency.set(w.id, new Set()));

for (const w of updatedWords) {
  const scored = [];
  for (const other of updatedWords) {
    if (other.id === w.id) continue;
    const s = calculateScore(w, other);
    if (s > 0) scored.push({ id: other.id, score: s });
  }
  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 4);
  const adj = adjacency.get(w.id);
  top.forEach(t => {
    adj.add(t.id);
    const otherAdj = adjacency.get(t.id);
    if (otherAdj && otherAdj.size < 5) otherAdj.add(w.id);
  });
}

// Garantisce che ogni parola abbia almeno 3 e max 5 archi validi ed esistenti
for (const w of updatedWords) {
  const adj = adjacency.get(w.id);
  if (adj.size < 3) {
    // Aggiungi parole della stessa categoria
    for (const other of updatedWords) {
      if (other.id === w.id || adj.has(other.id)) continue;
      if (other.category === w.category) {
        adj.add(other.id);
        const otherAdj = adjacency.get(other.id);
        if (otherAdj && otherAdj.size < 5) otherAdj.add(w.id);
        if (adj.size >= 3) break;
      }
    }
  }
}

// ── Pass di Connettività Globale: Unifica tutti i cluster in un unico componente ──
function getConnectedComponents(map) {
  const visited = new Set();
  const components = [];
  for (const w of updatedWords) {
    if (visited.has(w.id)) continue;
    const comp = [];
    const q = [w.id];
    visited.add(w.id);
    while (q.length > 0) {
      const cur = q.shift();
      comp.push(cur);
      const neighbors = map.get(cur) || new Set();
      for (const n of neighbors) {
        if (!visited.has(n)) {
          visited.add(n);
          q.push(n);
        }
      }
    }
    components.push(comp);
  }
  return components;
}

// Converti prima in un map con max 5 elementi per nodo
const finalAdj = new Map();
for (const w of updatedWords) {
  const set = new Set(
    Array.from(adjacency.get(w.id) || [])
      .filter(id => wordMap.has(id) && id !== w.id)
      .slice(0, 5)
  );
  finalAdj.set(w.id, set);
}

// Ora connettiamo le componenti direttamente su finalAdj!
let comps = getConnectedComponents(finalAdj);
while (comps.length > 1) {
  comps.sort((a, b) => b.length - a.length);
  const mainComp = comps[0];
  const isolatedComp = comps[1];

  let bestPair = null;
  let maxScore = -1;

  for (const uId of mainComp) {
    const uWord = wordMap.get(uId);
    for (const vId of isolatedComp) {
      const vWord = wordMap.get(vId);
      let s = calculateScore(uWord, vWord);
      if (uWord.category === vWord.category) s += 3.0;
      if (s > maxScore) {
        maxScore = s;
        bestPair = [uId, vId];
      }
    }
  }

  if (bestPair) {
    finalAdj.get(bestPair[0]).add(bestPair[1]);
    finalAdj.get(bestPair[1]).add(bestPair[0]);
  } else {
    finalAdj.get(mainComp[0]).add(isolatedComp[0]);
    finalAdj.get(isolatedComp[0]).add(mainComp[0]);
  }

  comps = getConnectedComponents(finalAdj);
}

// Converti in array finale senza ulteriori troncamenti
const finalWords = updatedWords.map(w => {
  const rels = Array.from(finalAdj.get(w.id) || []);
  return {
    ...w,
    relatedWords: rels
  };
});

// Verifica integrità
const idSet = new Set(finalWords.map(w => w.id));
let totalLinks = 0;
let invalidLinks = 0;
for (const w of finalWords) {
  for (const r of w.relatedWords) {
    totalLinks++;
    if (!idSet.has(r)) invalidLinks++;
  }
}

console.log(`=== REPORT COSTRUZIONE GRAFO ===`);
console.log(`Parole totali: ${finalWords.length}`);
console.log(`Collegamenti totali: ${totalLinks}`);
console.log(`Media collegamenti: ${(totalLinks / finalWords.length).toFixed(2)}`);
console.log(`Collegamenti non validi (devono essere 0): ${invalidLinks}`);

// Esempi di connessioni
console.log('\n=== ESEMPI DI CONNESSIONI VERIFICATE ===');
['ciao', 'palazzo', 'scuola', 'caffe', 'algebra', 'pomodoro', 'catastrofe', 'salario', 'candela', 'microscopio'].forEach(id => {
  const w = finalWords.find(x => x.id === id);
  if (w) {
    console.log(`${w.word} [${w.category}]: ${w.relatedWords.map(r => wordMap.get(r).word).join(', ')}`);
  }
});

// Scrittura su file TS
const tsContent = `export type WordCategory =
  | "societa"
  | "cucina"
  | "corpo"
  | "natura"
  | "religione"
  | "storia"
  | "scienza"
  | "arte"
  | "tecnologia"
  | "viaggio"
  | "oggetti"
  | "guerra"
  | "commercio";

export type WordEntry = {
  id: string;
  word: string;
  correctAnswer: number;
  options: [string, string, string];
  story: string;
  shortEtymology: string;
  category: WordCategory;
  relatedWords: string[];
  difficulty: 1 | 2 | 3;
};

export const WORDS: WordEntry[] = ${JSON.stringify(finalWords, null, 2)};

// ── Funzioni di utilità per le categorie in Italiano ──────────────────────

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    religione: "#7B4F2E",
    religion: "#7B4F2E",
    cucina: "#C17D3C",
    food: "#C17D3C",
    corpo: "#A05C5C",
    body: "#A05C5C",
    natura: "#4A7C59",
    nature: "#4A7C59",
    societa: "#3D5A80",
    society: "#3D5A80",
    guerra: "#8B3030",
    war: "#8B3030",
    commercio: "#6B5B2E",
    trade: "#6B5B2E",
    storia: "#4E627C",
    history: "#4E627C",
    scienza: "#5B8C5A",
    science: "#5B8C5A",
    arte: "#9D4EDD",
    art: "#9D4EDD",
    tecnologia: "#0077B6",
    tech: "#0077B6",
    viaggio: "#D68C45",
    travel: "#D68C45",
    oggetti: "#6C757D",
    objects: "#6C757D",
  };
  return colors[category] || "#6C757D";
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    societa: "Società",
    society: "Società",
    cucina: "Cucina",
    food: "Cucina",
    corpo: "Corpo e Mente",
    body: "Corpo e Mente",
    natura: "Natura",
    nature: "Natura",
    religione: "Religione e Mito",
    religion: "Religione e Mito",
    storia: "Storia",
    history: "Storia",
    scienza: "Scienza",
    science: "Scienza",
    arte: "Arte e Spettacolo",
    art: "Arte e Spettacolo",
    tecnologia: "Tecnologia",
    tech: "Tecnologia",
    viaggio: "Viaggio",
    travel: "Viaggio",
    oggetti: "Oggetti e Spazi",
    objects: "Oggetti e Spazi",
    guerra: "Guerra e Conflitto",
    war: "Guerra e Conflitto",
    commercio: "Commercio e Finanza",
    trade: "Commercio e Finanza",
  };
  return labels[category] || "Altro";
};

export const getWordOfTheDay = (list: WordEntry[] = WORDS): WordEntry => {
  const now = new Date();
  const dayEpoch = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const index = Math.abs(dayEpoch) % (list.length || 1);
  return list[index] || WORDS[0];
};
`;

fs.writeFileSync(path.join(__dirname, '../constants/words.ts'), tsContent, 'utf-8');
console.log('\n[SUCCESS] Aggiornato constants/words.ts con categorie e connessioni verificate!');

// Aggiorna anche words.json per coerenza
try {
  fs.writeFileSync(path.join(__dirname, '../constants/words.json'), JSON.stringify(finalWords, null, 2), 'utf-8');
  console.log('[SUCCESS] Aggiornato constants/words.json!');
} catch (e) {
  console.warn('Errore scrittura words.json:', e);
}
