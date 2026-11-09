import type { WordCategory, WordEntry } from "../constants/words";

export type ConnectionReason = {
  targetId: string;
  reason: string;
  type: "root" | "theme" | "origin" | "category";
  score: number;
};

// --- Mappatura delle radici etimologiche note ---
export const ROOT_FAMILIES: { name: string; root: string; label: string; wordIds: string[] }[] = [
  {
    name: "caput",
    root: "caput (testa)",
    label: "Stessa radice latina: caput (testa)",
    wordIds: ["cappello", "capitale", "capriccio", "testa"],
  },
  {
    name: "cappa",
    root: "cappa (mantello con cappuccio)",
    label: "Stessa radice latina tardo-antica: cappa (il mantello e il copricapo)",
    wordIds: ["cappello", "cappella", "cappuccino"],
  },
  {
    name: "sidera",
    root: "sidus / sidera (le stelle e gli astri)",
    label: "Stessa radice latina: sidera (il presagio e l'osservazione delle stelle)",
    wordIds: ["considerare", "disastro"],
  },
  {
    name: "liber",
    root: "liber (corteccia/libero)",
    label: "Stessa radice latina: liber (corteccia o uomo libero)",
    wordIds: ["libro", "libertà"],
  },
  {
    name: "panis",
    root: "panis (pane)",
    label: "Stessa radice latina: panis (il nutrimento condiviso)",
    wordIds: ["pane", "compagno", "sandwich"],
  },
  {
    name: "sal",
    root: "sal (sale)",
    label: "Stessa radice latina: sal (il sale come moneta e conservazione)",
    wordIds: ["salario", "salame"],
  },
  {
    name: "candere",
    root: "candere (brillare di bianco)",
    label: "Stessa radice latina: candere (splendore e purezza del bianco)",
    wordIds: ["candela", "candidato", "sincero"],
  },
  {
    name: "currere",
    root: "currere (correre)",
    label: "Stessa radice latina: currere (il movimento continuo)",
    wordIds: ["corridoio", "corteo"],
  },
  {
    name: "skopein",
    root: "skopein (guardare/osservare)",
    label: "Stessa radice greca: skopein (lo strumento per osservare)",
    wordIds: ["telescopio", "microscopio", "semaforo"],
  },
  {
    name: "mousa",
    root: "mousa (le Muse)",
    label: "Stessa radice greca: le Muse, custodi delle arti e del sapere",
    wordIds: ["museo", "musica"],
  },
  {
    name: "theatron",
    root: "teatro e rappresentazione",
    label: "Stessa radice greca: il teatro, il coro e la messa in scena",
    wordIds: ["teatro", "tragedia", "commedia", "catastrofe"],
  },
  {
    name: "phainein",
    root: "phainein (apparire)",
    label: "Stessa radice greca: phainein (ciò che appare alla mente)",
    wordIds: ["fantasia", "fantasma"],
  },
  {
    name: "skhole",
    root: "skholé (tempo libero per lo studio)",
    label: "Stessa radice greca: skholé (l'ozio fecondo del sapere)",
    wordIds: ["scuola", "diploma"],
  },
  {
    name: "arab_math",
    root: "al- (prefisso arabo)",
    label: "Radice araba e matematica medievale",
    wordIds: ["algebra", "algoritmo", "cifra", "tariffa", "almanacco"],
  },
  {
    name: "stips_pecunia",
    root: "stips / moneta",
    label: "Stessa sfera monetaria e retributiva romana",
    wordIds: ["stipendio", "salario", "denaro", "pecunia"],
  },
  {
    name: "graphia",
    root: "graphia (scrittura/disegno)",
    label: "Stessa radice greca: graphia (la scrittura o impressione)",
    wordIds: ["fotografia", "archivio"],
  },
  {
    name: "tele_phone",
    root: "tēle (lontano)",
    label: "Stessa radice greca: tēle (distanza nello spazio)",
    wordIds: ["telefono", "telescopio"],
  },
];

// --- Cluster tematici e contesti storico-culturali ---
export const THEMATIC_CLUSTERS: { id: string; label: string; wordIds: string[] }[] = [
  {
    id: "roma_potere",
    label: "Roma antica: politica, istituzioni e vita pubblica",
    wordIds: [
      "palazzo",
      "senato",
      "repubblica",
      "legge",
      "candidato",
      "salario",
      "moneta",
      "pecunia",
      "municipio",
      "corteo",
      "prigione",
      "finanza",
      "stipendio",
      "denaro",
      "destra",
      "sinistro",
    ],
  },
  {
    id: "grecia_polis",
    label: "Grecia classica: democrazia, filosofia e agorà",
    wordIds: [
      "democrazia",
      "politica",
      "scuola",
      "atleta",
      "stadio",
      "maratona",
      "olimpiadi",
      "simposio",
      "idiota",
      "crisi",
      "labirinto",
      "barbaro",
      "panacea",
      "magari",
    ],
  },
  {
    id: "grecia_teatro",
    label: "Grecia classica: teatro, poesia e arti sceniche",
    wordIds: ["teatro", "tragedia", "commedia", "catastrofe", "poesia", "musica", "museo", "eco", "pantaloni"],
  },
  {
    id: "venezia_mare",
    label: "Venezia marinara: rotte dogali e commercio marittimo",
    wordIds: [
      "ciao",
      "fiasco",
      "molo",
      "porto",
      "nave",
      "viaggio",
      "dogana",
      "magazzino",
      "serenata",
      "quarantena",
      "gazzetta",
      "arsenale",
      "darsena",
      "ammiraglio",
      "pantaloni",
    ],
  },
  {
    id: "mondo_arabo",
    label: "Mondo arabo medievale: spezie, scambi e scienze",
    wordIds: [
      "caffe",
      "zucchero",
      "arancio",
      "limone",
      "carciofo",
      "dogana",
      "magazzino",
      "algebra",
      "algoritmo",
      "cifra",
      "tariffa",
      "ammiraglio",
      "arsenale",
      "darsena",
      "divano",
      "cotone",
      "sciroppo",
      "zafferano",
      "albicocca",
      "nadir",
      "zenit",
      "scirocco",
      "almanacco",
      "giubba",
      "melanzana",
    ],
  },
  {
    id: "nuovo_mondo",
    label: "Nuovo Mondo: la rivoluzione botanica dopo il 1492",
    wordIds: ["cioccolato", "pomodoro", "patata", "melanzana"],
  },
  {
    id: "calendario_romano",
    label: "Calendario e tempo: gli dèi planetari e i mesi romani",
    wordIds: [
      "lunedi",
      "martedi",
      "mercoledi",
      "giovedi",
      "venerdi",
      "sabato",
      "domenica",
      "gennaio",
      "febbraio",
      "marzo",
      "agosto",
      "tempo",
      "almanacco",
    ],
  },
  {
    id: "sacro_mistero",
    label: "Mondo spirituale: sacro, inferi e credenze popolari",
    wordIds: [
      "carnevale",
      "paradiso",
      "inferno",
      "angelo",
      "diavolo",
      "miracolo",
      "voto",
      "panico",
      "abracadabra",
      "pellegrino",
      "panacea",
      "eco",
      "propaganda",
      "cappella",
    ],
  },
  {
    id: "arti_visive",
    label: "Botteghe d'arte e architettura rinascimentale",
    wordIds: [
      "affresco",
      "pittura",
      "scultura",
      "architettura",
      "bozzetto",
      "stile",
      "caricatura",
      "museo",
      "fotografia",
      "pixel",
      "silhouette",
      "matita",
      "inchiostro",
      "pagina",
    ],
  },
  {
    id: "scienza_cosmo",
    label: "Astronomia e fisica: la scoperta dell'universo",
    wordIds: [
      "spazio",
      "universo",
      "mondo",
      "pianeta",
      "galassia",
      "telescopio",
      "microscopio",
      "atomo",
      "energia",
      "elettricità",
      "clima",
      "nadir",
      "zenit",
      "almanacco",
      "laser",
      "influenza",
      "considerare",
      "disastro",
    ],
  },
  {
    id: "medicina_cura",
    label: "Medicina antica e cura del corpo",
    wordIds: [
      "chirurgo",
      "farmaco",
      "sintomo",
      "ospedale",
      "dieta",
      "virus",
      "epidemia",
      "malinconia",
      "vaccino",
      "quarantena",
      "influenza",
      "malaria",
      "panacea",
      "sciroppo",
    ],
  },
  {
    id: "corpo_anatomia",
    label: "Anatomia e moti del corpo umano",
    wordIds: [
      "testa",
      "muscolo",
      "pupilla",
      "clavicola",
      "destra",
      "sinistro",
      "chirurgo",
      "dieta",
      "malinconia",
      "atleta",
    ],
  },
  {
    id: "spazi_dimora",
    label: "La casa e l'abitare: spazi e architetture domestiche",
    wordIds: [
      "camera",
      "finestra",
      "corridoio",
      "balcone",
      "terrazza",
      "scala",
      "porta",
      "chiave",
      "palazzo",
      "stanza",
      "garage",
      "divano",
    ],
  },
  {
    id: "studio_scrittura",
    label: "Studio, carta e strumenti di scrittura",
    wordIds: [
      "libro",
      "carta",
      "penna",
      "quaderno",
      "gomma",
      "diploma",
      "archivio",
      "scuola",
      "pagina",
      "matita",
      "inchiostro",
      "atlante",
    ],
  },
  {
    id: "cucina_tavola",
    label: "Cucina tradizionale e convivialità a tavola",
    wordIds: [
      "pizza",
      "pasta",
      "pane",
      "vino",
      "carne",
      "salame",
      "ricetta",
      "ristorante",
      "simposio",
      "marmellata",
      "cappuccino",
      "sandwich",
      "sciroppo",
      "zafferano",
      "albicocca",
      "melanzana",
      "cotone",
    ],
  },
  {
    id: "abbigliamento_moda",
    label: "Abbigliamento, tessuti e accessori",
    wordIds: [
      "vestito",
      "scarpa",
      "cappello",
      "pigiama",
      "bikini",
      "jeans",
      "giubba",
      "cotone",
      "ombrello",
      "pantaloni",
      "mancia",
      "cappella",
    ],
  },
  {
    id: "tecnologia_innovazione",
    label: "Scienza moderna, telecomunicazioni e tecnologia",
    wordIds: [
      "robot",
      "laser",
      "pixel",
      "meme",
      "spam",
      "bluetooth",
      "telefono",
      "fotografia",
      "semaforo",
      "autobus",
      "bicicletta",
      "automobile",
      "algoritmo",
      "calcolo",
    ],
  },
  {
    id: "natura_elementi",
    label: "Fenomeni atmosferici e forze della natura",
    wordIds: [
      "vulcano",
      "monsone",
      "aurora",
      "tramontana",
      "clima",
      "canicola",
      "orizzonte",
      "mondo",
      "scirocco",
      "eco",
      "malaria",
    ],
  },
  {
    id: "emozioni_mente",
    label: "Psiche umana, passioni e moti dell'anima",
    wordIds: [
      "coraggio",
      "pazienza",
      "entusiasmo",
      "follia",
      "genio",
      "talento",
      "sogno",
      "fantasia",
      "desiderio",
      "estasi",
      "capriccio",
      "magari",
    ],
  },
  {
    id: "conflitto_difesa",
    label: "Conflitti, armi e dinamiche di guerra",
    wordIds: [
      "guerra",
      "prigione",
      "vendetta",
      "disastro",
      "labirinto",
      "pace",
      "boicottaggio",
      "assassino",
      "ammiraglio",
      "arsenale",
      "barbaro",
    ],
  },
  {
    id: "economia_scambi",
    label: "Economia monetaria, credito e mercati",
    wordIds: [
      "moneta",
      "soldo",
      "pecunia",
      "capitale",
      "finanza",
      "usura",
      "ipoteca",
      "tassa",
      "miseria",
      "dollaro",
      "denaro",
      "stipendio",
      "bonus",
      "credito",
      "fallimento",
      "tariffa",
      "salario",
      "mancia",
    ],
  },
  {
    id: "viaggio_mezzi",
    label: "Viaggi, mezzi di trasporto e scoperte",
    wordIds: [
      "viaggio",
      "bussola",
      "pellegrino",
      "molo",
      "porto",
      "nave",
      "valigia",
      "albergo",
      "mappa",
      "autobus",
      "bicicletta",
      "automobile",
      "garage",
      "semaforo",
      "darsena",
      "atlante",
    ],
  },
];

// --- Estrazione della lingua d'origine dall'etimologia ---
export function detectLanguageOrigin(word: WordEntry): { lang: string; label: string } {
  const text = `${word.shortEtymology} ${word.story}`.toLowerCase();

  if (text.includes("arabo") || text.includes("araba") || text.includes("persiano")) {
    return { lang: "arabo", label: "Origine araba o mediorientale" };
  }
  if (text.includes("greco") || text.includes("greca") || text.includes("ellenico")) {
    return { lang: "greco", label: "Origine greca classica" };
  }
  if (text.includes("germanico") || text.includes("longobardo") || text.includes("franco") || text.includes("nordico")) {
    return { lang: "germanico", label: "Origine germanica o longobarda" };
  }
  if (text.includes("nahuatl") || text.includes("arawak") || text.includes("quechua") || text.includes("nuovo mondo")) {
    return { lang: "indigena", label: "Origine indigena americana (Nuovo Mondo)" };
  }
  if (text.includes("ebraico") || text.includes("aramaico")) {
    return { lang: "semitica", label: "Origine ebraica o aramaica" };
  }
  if (text.includes("francese") || text.includes("provenzale")) {
    return { lang: "francese", label: "Origine francese o d'oc" };
  }
  if (text.includes("veneziano")) {
    return { lang: "veneziano", label: "Origine veneziana" };
  }
  if (text.includes("latino") || text.includes("latina") || text.includes("romano")) {
    return { lang: "latino", label: "Origine latina classica" };
  }
  return { lang: "italiano", label: "Origine italiana o volgare" };
}

/**
 * Calcola l'affinità e restituisce la motivazione in italiano tra due parole.
 */
export function calculateWordAffinity(
  wordA: WordEntry,
  wordB: WordEntry
): ConnectionReason | null {
  if (wordA.id === wordB.id) return null;

  let bestScore = 0;
  let bestReason = "";
  let bestType: ConnectionReason["type"] = "category";

  // 1. Radice comune (Massima priorità, +6 punti)
  for (const root of ROOT_FAMILIES) {
    if (root.wordIds.includes(wordA.id) && root.wordIds.includes(wordB.id)) {
      const score = 6.0;
      if (score > bestScore) {
        bestScore = score;
        bestReason = root.label;
        bestType = "root";
      }
    }
  }

  // 2. Cluster tematico / contesto storico (+4.5 punti)
  for (const cluster of THEMATIC_CLUSTERS) {
    if (cluster.wordIds.includes(wordA.id) && cluster.wordIds.includes(wordB.id)) {
      const score = 4.5;
      if (score > bestScore) {
        bestScore = score;
        bestReason = cluster.label;
        bestType = "theme";
      }
    }
  }

  // 3. Stessa origine linguistica (+2.5 punti se rilevante)
  const origA = detectLanguageOrigin(wordA);
  const origB = detectLanguageOrigin(wordB);
  if (origA.lang === origB.lang && origA.lang !== "latino" && origA.lang !== "italiano") {
    // Arabo, Greco, Germanico, Indigeno, Ebraico sono molto caratterizzanti
    const score = 3.0;
    if (score > bestScore) {
      bestScore = score;
      bestReason = `Entrambe di ${origA.label.toLowerCase()}`;
      bestType = "origin";
    }
  }

  // 4. Stessa categoria canonica (+1.5 punti)
  if (wordA.category === wordB.category) {
    const score = 1.5;
    if (score > bestScore) {
      bestScore = score;
      bestReason = `Stesso ambito semantico`;
      bestType = "category";
    }
  }

  if (bestScore === 0) return null;

  return {
    targetId: wordB.id,
    reason: bestReason,
    type: bestType,
    score: bestScore,
  };
}

/**
 * Trova i migliori collegamenti con criterio per una singola parola all'interno del dizionario.
 */
export function findConnectionsForWord(
  targetWord: WordEntry,
  allWords: WordEntry[],
  minCount = 3,
  maxCount = 5
): ConnectionReason[] {
  const scoredList: ConnectionReason[] = [];

  for (const other of allWords) {
    if (other.id === targetWord.id) continue;
    const affinity = calculateWordAffinity(targetWord, other);
    if (affinity && affinity.score >= 1.5) {
      scoredList.push(affinity);
    }
  }

  // Ordina per punteggio decrescente
  scoredList.sort((a, b) => b.score - a.score);

  // Seleziona i migliori collegamenti
  let selected = scoredList.slice(0, maxCount);

  // Se sono meno di minCount, integra con parole della stessa categoria o lingua
  if (selected.length < minCount) {
    const selectedIds = new Set(selected.map((s) => s.targetId));
    for (const other of allWords) {
      if (other.id === targetWord.id || selectedIds.has(other.id)) continue;
      if (other.category === targetWord.category) {
        selected.push({
          targetId: other.id,
          reason: `Stesso ambito semantico`,
          type: "category",
          score: 1.0,
        });
        selectedIds.add(other.id);
        if (selected.length >= minCount) break;
      }
    }
  }

  return selected;
}

/**
 * Assicura che l'intera lista di parole formi un grafo coerente, senza nodi fantasma,
 * con collegamenti bidirezionali e pertinenti.
 */
export function buildOptimizedGraph(words: WordEntry[]): WordEntry[] {
  const wordMap = new Map<string, WordEntry>();
  words.forEach((w) => wordMap.set(w.id, { ...w }));

  const connectionMap = new Map<string, Set<string>>();
  words.forEach((w) => connectionMap.set(w.id, new Set<string>()));

  // 1. Calcola i collegamenti ottimali per ciascuna parola
  for (const word of words) {
    const connections = findConnectionsForWord(word, words, 3, 5);
    const set = connectionMap.get(word.id)!;
    for (const conn of connections) {
      set.add(conn.targetId);
      // Forza parziale simmetria
      const otherSet = connectionMap.get(conn.targetId);
      if (otherSet && otherSet.size < 6) {
        otherSet.add(word.id);
      }
    }
  }

  // 2. Assicura connettività globale (unifica componenti disconnesse)
  function getComponents() {
    const visited = new Set<string>();
    const components: string[][] = [];
    for (const w of words) {
      if (visited.has(w.id)) continue;
      const comp: string[] = [];
      const q = [w.id];
      visited.add(w.id);
      while (q.length > 0) {
        const cur = q.shift()!;
        comp.push(cur);
        const neighbors = connectionMap.get(cur) || new Set<string>();
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

  let comps = getComponents();
  while (comps.length > 1) {
    comps.sort((a, b) => b.length - a.length);
    const mainComp = comps[0];
    const isolatedComp = comps[1];

    let bestPair: [string, string] | null = null;
    let maxScore = -1;

    for (const uId of mainComp) {
      const uWord = wordMap.get(uId);
      if (!uWord) continue;
      for (const vId of isolatedComp) {
        const vWord = wordMap.get(vId);
        if (!vWord) continue;
        const affinity = calculateWordAffinity(uWord, vWord);
        let s = affinity ? affinity.score : 0;
        if (uWord.category === vWord.category) s += 2.0;
        if (s > maxScore) {
          maxScore = s;
          bestPair = [uId, vId];
        }
      }
    }

    if (bestPair) {
      connectionMap.get(bestPair[0])!.add(bestPair[1]);
      connectionMap.get(bestPair[1])!.add(bestPair[0]);
    } else {
      connectionMap.get(mainComp[0])!.add(isolatedComp[0]);
      connectionMap.get(isolatedComp[0])!.add(mainComp[0]);
    }

    comps = getComponents();
  }

  // 3. Ripulisci e assegna i relatedWords con ID rigorosamente esistenti
  const result: WordEntry[] = [];
  for (const word of words) {
    const validConnections = Array.from(connectionMap.get(word.id) || [])
      .filter((id) => wordMap.has(id) && id !== word.id)
      .slice(0, 6);

    result.push({
      ...word,
      relatedWords: validConnections,
    });
  }

  // 4. Garanzia finale di raggiungibilità BFS totale
  const resultMap = new Map(result.map((w) => [w.id, w]));
  function getBFSVisited(rootId: string) {
    const visited = new Set<string>();
    const q = [rootId];
    visited.add(rootId);
    while (q.length > 0) {
      const cur = q.shift()!;
      const w = resultMap.get(cur);
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

  if (result.length > 0) {
    let visited = getBFSVisited(result[0].id);
    let bridgeIters = 0;
    while (visited.size < result.length && bridgeIters < 100) {
      bridgeIters++;
      let bestPair: [WordEntry, WordEntry] | null = null;
      let bestScore = -1;

      for (const uId of visited) {
        const uWord = resultMap.get(uId)!;
        for (const vWord of result) {
          if (visited.has(vWord.id)) continue;
          const aff = calculateWordAffinity(uWord, vWord);
          let s = aff ? aff.score : 0;
          if (uWord.category === vWord.category) s += 2.0;
          if (s > bestScore) {
            bestScore = s;
            bestPair = [uWord, vWord];
          }
        }
      }

      if (!bestPair) {
        const unvisitedWord = result.find((w) => !visited.has(w.id))!;
        bestPair = [result[0], unvisitedWord];
      }

      const [uWord, vWord] = bestPair;
      if (!uWord.relatedWords.includes(vWord.id)) uWord.relatedWords.push(vWord.id);
      if (!vWord.relatedWords.includes(uWord.id)) vWord.relatedWords.push(uWord.id);

      visited = getBFSVisited(result[0].id);
    }
  }

  return result;
}

/**
 * Seleziona la parola successiva per il percorso continuo "Rabbit Hole".
 */
export function getNextRabbitHoleWord(
  currentWord: WordEntry,
  allWords: WordEntry[],
  wordsDiscovered: WordEntry[],
  wordMastery: Record<string, number> = {},
  recentTrailIds: string[] = []
): WordEntry {
  const wordById = new Map(allWords.map((w) => [w.id, w]));
  const discoveredSet = new Set(wordsDiscovered.map((w) => w.id));
  const recentSet = new Set(recentTrailIds.slice(-5)); // Ultime 5 parole per non fare ping-pong

  const candidates: { word: WordEntry; score: number }[] = [];

  for (const relId of currentWord.relatedWords || []) {
    const word = wordById.get(relId);
    if (!word) continue;

    // Se è stata vista di recente, penalizza fortemente
    if (recentSet.has(relId)) continue;

    let score = 10;
    // 1. Massima priorità: parole mai scoperte prima
    if (!discoveredSet.has(relId)) {
      score += 20;
    } else {
      // 2. Seconda priorità: parole con padronanza bassa
      const mastery = wordMastery[relId] ?? 0;
      score += (3 - mastery) * 3;
    }

    candidates.push({ word, score });
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.score - a.score);
    return candidates[0].word;
  }

  // Fallback 1: Se tutti i vicini diretti sono nel recent trail, cerca un vicino di 2° grado (connessioni delle connessioni)
  for (const relId of currentWord.relatedWords || []) {
    const parent = wordById.get(relId);
    if (!parent) continue;
    for (const secondHopId of parent.relatedWords || []) {
      if (secondHopId === currentWord.id || recentSet.has(secondHopId)) continue;
      const secondWord = wordById.get(secondHopId);
      if (secondWord) {
        return secondWord;
      }
    }
  }

  // Fallback 2: Parola non scoperta della stessa categoria
  const undiscoveredInSameCategory = allWords.find(
    (w) => w.category === currentWord.category && !discoveredSet.has(w.id) && !recentSet.has(w.id)
  );
  if (undiscoveredInSameCategory) return undiscoveredInSameCategory;

  // Fallback 3: Qualsiasi parola non scoperta o casuale non recente
  const undiscoveredAny = allWords.find((w) => !discoveredSet.has(w.id) && !recentSet.has(w.id));
  if (undiscoveredAny) return undiscoveredAny;

  return allWords[(allWords.indexOf(currentWord) + 1) % allWords.length] || allWords[0];
}
