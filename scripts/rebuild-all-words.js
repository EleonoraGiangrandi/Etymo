const fs = require('fs');
const path = require('path');
const { NEW_WORDS, UPDATES } = require('./new-words-data.js');

// 1. Carica le parole attuali da words.json
const currentWords = require('../constants/words.json');
console.log(`Parole attuali lette da words.json: ${currentWords.length}`);

// 2. Mappa esistente per ID normalizzato
const wordsMap = new Map();

for (const w of currentWords) {
  const normId = w.id.toLowerCase().trim();
  // Se già presente, non duplicare
  if (!wordsMap.has(normId)) {
    wordsMap.set(normId, { ...w });
  }
}

// 3. Applica aggiornamenti alle parole esistenti richieste
for (const [upId, upData] of Object.entries(UPDATES)) {
  if (wordsMap.has(upId)) {
    const existing = wordsMap.get(upId);
    wordsMap.set(upId, { ...existing, ...upData });
    console.log(`[AGGIORNATA] Parola esistente perfezionata: ${upId}`);
  }
}

// 4. Inserisci le nuove parole
let addedCount = 0;
for (const nw of NEW_WORDS) {
  const normId = nw.id.toLowerCase().trim();
  if (wordsMap.has(normId)) {
    // Scegli la migliore versione aggiornata
    const existing = wordsMap.get(normId);
    wordsMap.set(normId, { ...existing, ...nw });
    console.log(`[SOVRASCRITTA CON VERSIONE MIGLIORE]: ${normId}`);
  } else {
    wordsMap.set(normId, {
      ...nw,
      relatedWords: []
    });
    addedCount++;
  }
}

console.log(`Nuove parole aggiunte: ${addedCount}`);
console.log(`Totale parole uniche nel dataset: ${wordsMap.size}`);

const allWords = Array.from(wordsMap.values());

// 5. Categorie e Cluster Semantici arricchiti
const THEMATIC_CLUSTERS = [
  { id: "roma_potere", wordIds: ["palazzo", "senato", "repubblica", "legge", "candidato", "salario", "moneta", "pecunia", "municipio", "corteo", "prigione", "finanza", "stipendio", "denaro", "destra", "sinistro"] },
  { id: "grecia_polis", wordIds: ["democrazia", "politica", "scuola", "atleta", "stadio", "maratona", "olimpiadi", "simposio", "idiota", "crisi", "labirinto", "barbaro", "panacea", "magari"] },
  { id: "grecia_teatro", wordIds: ["teatro", "tragedia", "commedia", "catastrofe", "poesia", "musica", "museo", "eco", "pantaloni"] },
  { id: "venezia_mare", wordIds: ["ciao", "fiasco", "molo", "porto", "nave", "viaggio", "dogana", "magazzino", "serenata", "quarantena", "gazzetta", "arsenale", "darsena", "ammiraglio", "pantaloni"] },
  { id: "mondo_arabo", wordIds: ["caffe", "zucchero", "arancio", "limone", "carciofo", "dogana", "magazzino", "algebra", "algoritmo", "cifra", "tariffa", "ammiraglio", "arsenale", "darsena", "divano", "cotone", "sciroppo", "zafferano", "albicocca", "nadir", "zenit", "scirocco", "almanacco", "giubba", "melanzana"] },
  { id: "nuovo_mondo", wordIds: ["cioccolato", "pomodoro", "patata", "melanzana"] },
  { id: "calendario_romano", wordIds: ["lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica", "gennaio", "febbraio", "marzo", "agosto", "tempo", "almanacco"] },
  { id: "sacro_mistero", wordIds: ["carnevale", "paradiso", "inferno", "angelo", "diavolo", "miracolo", "voto", "panico", "abracadabra", "pellegrino", "panacea", "eco", "propaganda", "cappella"] },
  { id: "arti_visive", wordIds: ["affresco", "pittura", "scultura", "architettura", "bozzetto", "stile", "caricatura", "museo", "fotografia", "pixel", "silhouette", "matita", "inchiostro", "pagina"] },
  { id: "scienza_cosmo", wordIds: ["spazio", "universo", "mondo", "pianeta", "galassia", "telescopio", "microscopio", "atomo", "energia", "elettricità", "clima", "nadir", "zenit", "almanacco", "laser", "influenza", "considerare", "disastro"] },
  { id: "medicina_cura", wordIds: ["chirurgo", "farmaco", "sintomo", "ospedale", "dieta", "virus", "epidemia", "malinconia", "vaccino", "quarantena", "influenza", "malaria", "panacea", "sciroppo"] },
  { id: "corpo_anatomia", wordIds: ["testa", "muscolo", "pupilla", "clavicola", "destra", "sinistro", "chirurgo", "dieta", "malinconia", "atleta"] },
  { id: "spazi_dimora", wordIds: ["camera", "finestra", "corridoio", "balcone", "terrazza", "scala", "porta", "chiave", "palazzo", "stanza", "garage", "divano", "cappella"] },
  { id: "studio_scrittura", wordIds: ["libro", "carta", "penna", "quaderno", "gomma", "diploma", "archivio", "scuola", "pagina", "matita", "inchiostro", "atlante"] },
  { id: "cucina_tavola", wordIds: ["pizza", "pasta", "pane", "vino", "carne", "salame", "ricetta", "ristorante", "simposio", "marmellata", "cappuccino", "sandwich", "sciroppo", "zafferano", "albicocca", "melanzana", "cotone"] },
  { id: "abbigliamento_moda", wordIds: ["vestito", "scarpa", "cappello", "pigiama", "bikini", "jeans", "giubba", "cotone", "ombrello", "pantaloni", "mancia", "cappella"] },
  { id: "tecnologia_innovazione", wordIds: ["robot", "laser", "pixel", "meme", "spam", "bluetooth", "telefono", "fotografia", "semaforo", "autobus", "bicicletta", "automobile", "algoritmo", "calcolo"] },
  { id: "natura_elementi", wordIds: ["vulcano", "monsone", "aurora", "tramontana", "clima", "canicola", "orizzonte", "mondo", "scirocco", "eco", "malaria"] },
  { id: "emozioni_mente", wordIds: ["coraggio", "pazienza", "entusiasmo", "follia", "genio", "talento", "sogno", "fantasia", "desiderio", "estasi", "capriccio", "magari"] },
  { id: "conflitto_difesa", wordIds: ["guerra", "prigione", "vendetta", "disastro", "labirinto", "pace", "boicottaggio", "assassino", "ammiraglio", "arsenale", "barbaro"] },
  { id: "economia_scambi", wordIds: ["moneta", "soldo", "pecunia", "capitale", "finanza", "usura", "ipoteca", "tassa", "miseria", "dollaro", "denaro", "stipendio", "bonus", "credito", "fallimento", "tariffa", "salario", "mancia"] },
  { id: "viaggio_mezzi", wordIds: ["viaggio", "bussola", "pellegrino", "molo", "porto", "nave", "valigia", "albergo", "mappa", "autobus", "bicicletta", "automobile", "garage", "semaforo", "darsena", "atlante"] }
];

const ROOT_FAMILIES = [
  { root: "caput", wordIds: ["cappello", "capitale", "capriccio", "testa"] },
  { root: "cappa", wordIds: ["cappello", "cappella", "cappuccino"] },
  { root: "sidera", wordIds: ["considerare", "disastro"] },
  { root: "liber", wordIds: ["libro", "libertà"] },
  { root: "panis", wordIds: ["pane", "compagno"] },
  { root: "sal", wordIds: ["salario", "salame"] },
  { root: "candere", wordIds: ["candela", "candidato", "sincero"] },
  { root: "currere", wordIds: ["corridoio", "corteo"] },
  { root: "skopein", wordIds: ["telescopio", "microscopio", "semaforo"] },
  { root: "mousa", wordIds: ["museo", "musica"] },
  { root: "theatron", wordIds: ["teatro", "tragedia", "commedia", "catastrofe"] },
  { root: "phainein", wordIds: ["fantasia", "fantasma"] },
  { root: "skhole", wordIds: ["scuola", "diploma"] },
  { root: "arab_math", wordIds: ["algebra", "algoritmo", "cifra", "tariffa", "almanacco"] },
  { root: "stips_pecunia", wordIds: ["stipendio", "salario", "denaro", "pecunia"] },
  { root: "graphia", wordIds: ["fotografia", "archivio"] },
  { root: "tele_phone", wordIds: ["telefono", "telescopio"] }
];

function detectLang(w) {
  const text = `${w.shortEtymology || ""} ${w.story || ""}`.toLowerCase();
  if (text.includes("arabo") || text.includes("araba") || text.includes("persiano")) return "arabo";
  if (text.includes("greco") || text.includes("greca") || text.includes("ellenico")) return "greco";
  if (text.includes("germanico") || text.includes("longobardo") || text.includes("franco") || text.includes("tedesco")) return "germanico";
  if (text.includes("inglese") || text.includes("anglosassone")) return "inglese";
  if (text.includes("francese") || text.includes("provenzale")) return "francese";
  if (text.includes("nahuatl") || text.includes("arawak") || text.includes("nuovo mondo")) return "indigena";
  if (text.includes("ebraico") || text.includes("aramaico")) return "semitica";
  if (text.includes("veneziano")) return "veneziano";
  if (text.includes("latino") || text.includes("latina") || text.includes("romano")) return "latino";
  return "italiano";
}

function calculateScore(a, b) {
  let score = 0;
  // Radice comune
  for (const root of ROOT_FAMILIES) {
    if (root.wordIds.includes(a.id) && root.wordIds.includes(b.id)) {
      score += 6.5;
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
    score += 2.0;
  }
  return score;
}

// 6. Costruzione del grafo bidirezionale
const adjacency = new Map();
allWords.forEach(w => adjacency.set(w.id, new Set()));

for (const w of allWords) {
  const scored = [];
  for (const other of allWords) {
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

// Garantisce che ogni parola abbia almeno 3 archi
for (const w of allWords) {
  const adj = adjacency.get(w.id);
  if (adj.size < 3) {
    for (const other of allWords) {
      if (other.id === w.id || adj.has(other.id)) continue;
      if (other.category === w.category) {
        adj.add(other.id);
        const otherAdj = adjacency.get(other.id);
        if (otherAdj && otherAdj.size < 6) otherAdj.add(w.id);
        if (adj.size >= 3) break;
      }
    }
  }
}

// 7. Connettività Globale: Unifica tutti i componenti disconnessi
function getConnectedComponents(map) {
  const visited = new Set();
  const components = [];
  for (const w of allWords) {
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

let components = getConnectedComponents(adjacency);
console.log(`Componenti iniziali nel grafo: ${components.length}`);

let bridgeIterations = 0;
while (components.length > 1 && bridgeIterations < 50) {
  bridgeIterations++;
  components.sort((a, b) => b.length - a.length);
  const mainComp = components[0];
  const isolatedComp = components[1];

  let bestPair = null;
  let bestScore = -1;

  for (const u of isolatedComp) {
    const wordU = wordsMap.get(u);
    for (const v of mainComp) {
      const wordV = wordsMap.get(v);
      const s = calculateScore(wordU, wordV);
      if (s > bestScore) {
        bestScore = s;
        bestPair = [u, v];
      }
    }
  }

  if (!bestPair) {
    bestPair = [isolatedComp[0], mainComp[0]];
  }

  const [u, v] = bestPair;
  adjacency.get(u).add(v);
  adjacency.get(v).add(u);

  components = getConnectedComponents(adjacency);
}

console.log(`Componenti dopo il ponte globale: ${components.length} (atteso: 1)`);

// 8. Costruzione dell'oggetto finale delle parole
const finalWords = allWords.map(w => {
  const neighbors = Array.from(adjacency.get(w.id) || []);
  // Ordina per pertinenza rispetto a w
  neighbors.sort((a, b) => {
    const scoreA = calculateScore(w, wordsMap.get(a));
    const scoreB = calculateScore(w, wordsMap.get(b));
    return scoreB - scoreA;
  });

  return {
    id: w.id,
    word: w.word,
    correctAnswer: w.correctAnswer,
    options: w.options,
    story: w.story,
    shortEtymology: w.shortEtymology,
    category: w.category,
    relatedWords: neighbors.slice(0, 5),
    difficulty: w.difficulty
  };
});

// 8b. Connessione Garantita Diretta su finalWords (BFS reachability)
const finalWordsMap = new Map(finalWords.map(w => [w.id, w]));

function getBFSVisited(rootId) {
  const visited = new Set();
  const q = [rootId];
  visited.add(rootId);
  while (q.length > 0) {
    const cur = q.shift();
    const w = finalWordsMap.get(cur);
    if (!w) continue;
    for (const rel of w.relatedWords) {
      if (!visited.has(rel)) {
        visited.add(rel);
        q.push(rel);
      }
    }
  }
  return visited;
}

let visitedFromFirst = getBFSVisited(finalWords[0].id);
console.log(`Raggiungibilità iniziale su finalWords da "${finalWords[0].id}": ${visitedFromFirst.size} / ${finalWords.length}`);

let finalBridgeIters = 0;
while (visitedFromFirst.size < finalWords.length && finalBridgeIters < 100) {
  finalBridgeIters++;
  
  // Trova la migliore coppia (u in visited, v non in visited)
  let bestPair = null;
  let bestScore = -1;

  for (const uId of visitedFromFirst) {
    const uWord = finalWordsMap.get(uId);
    for (const vWord of finalWords) {
      if (visitedFromFirst.has(vWord.id)) continue;
      const s = calculateScore(uWord, vWord);
      if (s > bestScore) {
        bestScore = s;
        bestPair = [uWord, vWord];
      }
    }
  }

  if (!bestPair) {
    // Fallback: collega primo visitato con primo non visitato
    const unvisitedWord = finalWords.find(w => !visitedFromFirst.has(w.id));
    bestPair = [finalWords[0], unvisitedWord];
  }

  const [uWord, vWord] = bestPair;
  // Aggiungi bidirezionalmente
  if (!uWord.relatedWords.includes(vWord.id)) {
    uWord.relatedWords.push(vWord.id);
  }
  if (!vWord.relatedWords.includes(uWord.id)) {
    vWord.relatedWords.push(uWord.id);
  }

  visitedFromFirst = getBFSVisited(finalWords[0].id);
}

console.log(`Raggiungibilità finale su finalWords: ${visitedFromFirst.size} / ${finalWords.length} (iterazioni ponte: ${finalBridgeIters})`);

// 9. Validazione rigorosa: 0 nodi fantasma, 0 self-loops
const validIds = new Set(finalWords.map(w => w.id));
let ghostCount = 0;
let selfCount = 0;

for (const w of finalWords) {
  for (const rel of w.relatedWords) {
    if (rel === w.id) selfCount++;
    if (!validIds.has(rel)) {
      ghostCount++;
      console.error(`Errore: nodo fantasma ${rel} in parola ${w.id}`);
    }
  }
}

console.log(`Self-loops: ${selfCount}, Nodi fantasma: ${ghostCount}`);
if (ghostCount > 0 || selfCount > 0) {
  throw new Error("Grafo non valido: correggere prima di scrivere i file!");
}

// 10. Scrivi words.json
const wordsJsonPath = path.join(__dirname, '../constants/words.json');
fs.writeFileSync(wordsJsonPath, JSON.stringify(finalWords, null, 2), 'utf-8');
console.log(`[SUCCESS] Aggiornato ${wordsJsonPath} con ${finalWords.length} parole!`);

// 11. Scrivi words.ts
const tsContent = `// Questo file è generato automaticamente da scripts/rebuild-all-words.js
export type WordCategory =
  | "societa"
  | "cucina"
  | "corpo"
  | "natura"
  | "religione"
  | "storia"
  | "scienza"
  | "arte"
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

export const CATEGORIES: Record<WordCategory, { label: string; icon: string; color: string }> = {
  societa: { label: "Società", icon: "users", color: "#3D5A80" },
  cucina: { label: "Cucina", icon: "coffee", color: "#C17D3C" },
  corpo: { label: "Corpo e Mente", icon: "heart", color: "#A05C5C" },
  natura: { label: "Natura", icon: "sun", color: "#4A7C59" },
  religione: { label: "Religione e Mito", icon: "moon", color: "#7B4F2E" },
  storia: { label: "Storia", icon: "clock", color: "#4E627C" },
  scienza: { label: "Scienza", icon: "compass", color: "#5B8C5A" },
  arte: { label: "Arte e Spettacolo", icon: "feather", color: "#9D4EDD" },
  viaggio: { label: "Viaggio", icon: "map", color: "#D68C45" },
  oggetti: { label: "Oggetti e Spazi", icon: "box", color: "#6C757D" },
  guerra: { label: "Guerra e Conflitto", icon: "shield", color: "#8B3030" },
  commercio: { label: "Commercio e Finanza", icon: "dollar-sign", color: "#6B5B2E" },
};

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

const wordsTsPath = path.join(__dirname, '../constants/words.ts');
fs.writeFileSync(wordsTsPath, tsContent, 'utf-8');
console.log(`[SUCCESS] Aggiornato ${wordsTsPath}!`);
