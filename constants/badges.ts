export type Badge = {
  id: string;
  name: string;
  desc: string;
  iconName: string;
  iconFamily: "Feather" | "Ionicons";
  category: "words" | "streak" | "combo" | "blitz" | "bookmarks" | "mastery";
  req: number;
};

export const ALL_BADGES: Badge[] = [
  {
    id: "primo_passo",
    name: "Primo Passo",
    desc: "Scopri la tua prima parola nel dizionario",
    iconName: "flag",
    iconFamily: "Feather",
    category: "words",
    req: 1,
  },
  {
    id: "novizio",
    name: "Novizio",
    desc: "Scopri 5 parole ed esplora le prime origini",
    iconName: "award",
    iconFamily: "Feather",
    category: "words",
    req: 5,
  },
  {
    id: "esploratore",
    name: "Esploratore",
    desc: "Scopri 20 parole nel viaggio etimologico",
    iconName: "compass",
    iconFamily: "Feather",
    category: "words",
    req: 20,
  },
  {
    id: "archeologo",
    name: "Archeologo",
    desc: "Riporta alla luce 50 parole segrete",
    iconName: "map-pin",
    iconFamily: "Feather",
    category: "words",
    req: 50,
  },
  {
    id: "filologo",
    name: "Filologo",
    desc: "Supera le 100 parole scoperte con successo",
    iconName: "book-open",
    iconFamily: "Feather",
    category: "words",
    req: 100,
  },
  {
    id: "maestro",
    name: "Maestro della Lingua",
    desc: "Scopri l'intero patrimonio di tutte le 185 parole",
    iconName: "shield",
    iconFamily: "Feather",
    category: "words",
    req: 185,
  },
  {
    id: "costanza",
    name: "Costanza",
    desc: "Mantieni una striscia di 3 giorni consecutivi",
    iconName: "zap",
    iconFamily: "Feather",
    category: "streak",
    req: 3,
  },
  {
    id: "fiamma_viva",
    name: "Fiamma Viva",
    desc: "Mantieni 7 giorni consecutivi di esplorazione",
    iconName: "flame",
    iconFamily: "Ionicons",
    category: "streak",
    req: 7,
  },
  {
    id: "infallibile",
    name: "Infallibile",
    desc: "Indovina 10 risposte consecutive senza errori",
    iconName: "target",
    iconFamily: "Feather",
    category: "combo",
    req: 10,
  },
  {
    id: "lampo",
    name: "Lampo Intellettuale",
    desc: "Raggiungi un punteggio record di almeno 10 nel Blitz Crono",
    iconName: "clock",
    iconFamily: "Feather",
    category: "blitz",
    req: 10,
  },
  {
    id: "custode",
    name: "Custode",
    desc: "Salva almeno 5 parole speciali nei tuoi preferiti",
    iconName: "bookmark",
    iconFamily: "Feather",
    category: "bookmarks",
    req: 5,
  },
  {
    id: "erudito",
    name: "Erudito",
    desc: "Porta al livello massimo di padronanza almeno 15 parole",
    iconName: "star",
    iconFamily: "Feather",
    category: "mastery",
    req: 15,
  },
];
