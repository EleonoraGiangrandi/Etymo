// Questo file è generato automaticamente da scripts/rebuild-all-words.js
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

export const WORDS: WordEntry[] = [
  {
    "id": "ciao",
    "word": "Ciao",
    "correctAnswer": 2,
    "options": [
      "Saluto tra marinai del porto di Venezia",
      "Grido di gioia nelle feste popolari veneziane",
      "Abbreviazione di 's-ciào vostro' (sono il vostro schiavo)"
    ],
    "story": "A Venezia, i servi salutavano i loro padroni con 's-ciào vostro' — sono il vostro schiavo. Nel tempo la formula si abbreviò in 's-ciao', poi 'ciao'. Oggi diciamo ciao senza sapere di stare offrendo la nostra schiavitù a ogni incontro.",
    "shortEtymology": "dal veneziano s-ciào vostro → sono il vostro schiavo",
    "category": "societa",
    "relatedWords": [
      "gazzetta",
      "fiasco",
      "serenata",
      "magazzino",
      "paparazzo",
      "rivale",
      "persona",
      "ospite"
    ],
    "difficulty": 1
  },
  {
    "id": "palazzo",
    "word": "Palazzo",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'palatium' (grande edificio monumentale)",
      "Dal celtico 'palas' (dimora dei capi tribù)",
      "Dal latino 'Palatium', il colle di Roma dove vivevano gli imperatori"
    ],
    "story": "Il colle Palatino era il quartiere più esclusivo di Roma: lì vivevano Augusto, Nerone, Caligola. 'Palatium' era la loro residenza. In tutta Europa — palace, palais, palast — ogni parola per 'grande edificio' deriva da quel colle. Quando dici palazzo, citi involontariamente gli imperatori romani.",
    "shortEtymology": "dal latino Palatium → il colle dei palazzi imperiali di Roma",
    "category": "societa",
    "relatedWords": [
      "municipio",
      "senato",
      "repubblica",
      "legge",
      "candidato"
    ],
    "difficulty": 1
  },
  {
    "id": "camera",
    "word": "Camera",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'camera' (stanza con soffitto a volta, a arco)",
      "Dal greco 'kamara' (stanza chiusa con finestre)",
      "Dal persiano 'kamar' (ambiente costruito a cupola)"
    ],
    "story": "I Romani chiamavano 'camera' una stanza con il soffitto a volta curva. Le camere più belle erano quelle con volte affrescate. Il soffitto curvo divenne il nome dell'intera stanza. Oggi anche le macchine fotografiche si chiamano 'camera' perché le prime erano piccole stanze buie — camera obscura.",
    "shortEtymology": "dal latino camera → stanza con volta a arco",
    "category": "oggetti",
    "relatedWords": [
      "finestra",
      "corridoio",
      "balcone",
      "terrazza",
      "scala"
    ],
    "difficulty": 1
  },
  {
    "id": "scuola",
    "word": "Scuola",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'schola' (edificio pubblico per l'insegnamento)",
      "Dal greco 'skholé' (tempo libero, ozio del ricco)",
      "Dal greco 'skholos' (maestro, guida spirituale)"
    ],
    "story": "In Grecia, 'skholé' significava tempo libero — il lusso di non lavorare. Solo i cittadini ricchi potevano permettersi ore a discutere di filosofia e geometria. La scuola era un privilegio dell'ozio. Oggi è obbligatoria per tutti: Aristotele sarebbe stupito.",
    "shortEtymology": "dal greco skholé → tempo libero, ozio del ricco",
    "category": "societa",
    "relatedWords": [
      "diploma",
      "atleta",
      "stadio",
      "democrazia",
      "politica"
    ],
    "difficulty": 1
  },
  {
    "id": "libro",
    "word": "Libro",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'liber' (la corteccia interna degli alberi su cui si scriveva)",
      "Dal greco 'libros' (foglio di papiro egiziano)",
      "Dal fenicio 'lebbur' (tavoletta di argilla incisa)"
    ],
    "story": "Prima della carta, i Romani scrivevano sulla parte interna e morbida della corteccia — il 'liber'. Quella striscia sottile tra la corteccia esterna e il legno era la loro carta. Poi chiamarono 'liber' anche i rotoli di papiro. Ogni libro che tieni in mano era una volta un albero — letteralmente.",
    "shortEtymology": "dal latino liber → corteccia interna degli alberi",
    "category": "societa",
    "relatedWords": [
      "libertà",
      "scuola",
      "diploma",
      "archivio",
      "paparazzo"
    ],
    "difficulty": 1
  },
  {
    "id": "cappello",
    "word": "Cappello",
    "correctAnswer": 2,
    "options": [
      "Dal francese 'chapel' (ornamento floreale portato in testa)",
      "Dal germanico 'kap' (copricapo dei soldati vichinghi)",
      "Dal latino 'caput' (testa) tramite la 'cappa' con cappuccio"
    ],
    "story": "Il latino 'caput' (testa) diede 'cappa' — il mantello con cappuccio — e poi 'cappello'. La stessa radice ci ha dato 'capitano' (chi sta in testa), 'capitale' (testa di bestiame, poi ricchezza) e 'capolavoro'. La testa è ovunque nel vocabolario: conta, comanda e si copre.",
    "shortEtymology": "dal latino caput → testa, tramite la cappa",
    "category": "oggetti",
    "relatedWords": [
      "cappella",
      "capitale",
      "capriccio",
      "vestito",
      "cappuccino",
      "jeans",
      "bugia",
      "tavolo",
      "sedia",
      "specchio",
      "pettine"
    ],
    "difficulty": 1
  },
  {
    "id": "finestra",
    "word": "Finestra",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'fendens' (che fende e taglia il muro)",
      "Dal latino 'fenestra' (apertura nel muro, prob. dall'etrusco)",
      "Dal germanico 'windauge' (occhio del vento)"
    ],
    "story": "Il latino 'fenestra' probabilmente viene dall'etrusco, la lingua misteriosa dell'Italia antica che ancora non capiamo del tutto. Indicava il buco nel muro per far entrare luce e aria. Curioso: 'window' in inglese viene dal nordico 'vindauga' — occhio del vento. Due metafore opposte per la stessa apertura.",
    "shortEtymology": "dal latino fenestra → apertura nel muro (prob. dall'etrusco)",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "corridoio",
      "balcone",
      "terrazza",
      "scala"
    ],
    "difficulty": 1
  },
  {
    "id": "corridoio",
    "word": "Corridoio",
    "correctAnswer": 2,
    "options": [
      "Dal francese 'couloir' (stretto passaggio tra stanze)",
      "Dal latino 'corridor' (luogo di transito veloce)",
      "Dal latino 'currere' (correre) → corridore → corridoio"
    ],
    "story": "Il latino 'currere' (correre) diede 'corridore' — chi corre, ma anche il messaggero veloce nei castelli. Il passaggio stretto prese il nome di chi lo usava: il corridoio era il posto dove corrono i corridori. Oggi ci camminiamo lentamente col caffè in mano.",
    "shortEtymology": "dal latino currere → correre, tramite corridore",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "balcone",
      "terrazza",
      "scala",
      "porta",
      "chiave",
      "stanza"
    ],
    "difficulty": 1
  },
  {
    "id": "balcone",
    "word": "Balcone",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'balcus' (cornicione sporgente degli edifici romani)",
      "Dal germanico 'balko' (trave di legno portante)",
      "Dal persiano 'balakhane' (stanza alta, terrazza rialzata)"
    ],
    "story": "Le prime strutture sporgenti dalle case erano sorrette da grosse travi di legno — 'balken' in germanico, portato in Italia dai Longobardi. 'Balcone' è letteralmente una struttura di travi. Giulietta e Romeo si parlano su una trave longobarda — il romanticismo italiano ha radici germaniche.",
    "shortEtymology": "dal germanico balko → trave di legno portante",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "corridoio",
      "terrazza",
      "scala"
    ],
    "difficulty": 1
  },
  {
    "id": "terrazza",
    "word": "Terrazza",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'terra' (suolo livellato e sopraelevato artificialmente)",
      "Dal francese 'terrasse' (costruzione sopraelevata in pietra)",
      "Dal provenzale 'terrasa' (superficie coltivabile ricavata in pendio)"
    ],
    "story": "Il latino 'terra' — la terra, il suolo — diede 'terrazza': superficie di terra livellata e rialzata. Le prime terrazze erano terreni agricoli in pendio tagliati e livellati per coltivare i vigneti. Da 'terra' vengono anche 'territorio', 'terreno', 'interrare': siamo figli della terra — letteralmente.",
    "shortEtymology": "dal latino terra → suolo livellato e rialzato",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "corridoio",
      "balcone"
    ],
    "difficulty": 1
  },
  {
    "id": "scala",
    "word": "Scala",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'scala' (gradini, da scandere = salire)",
      "Dal germanico 'skel' (tavola di legno inclinata per salire)",
      "Dal greco 'skala' (struttura per scalare le mura nemiche)"
    ],
    "story": "Il latino 'scala' veniva da 'scandere' — salire, scalare. Da 'scandere' vengono anche 'scansione', 'scandalo' (inciampo morale) e 'ascendere'. La scala musicale è una salita di note. La scalata sociale è salire i gradini del potere. Un semplice oggetto per salire ha metaforizzato tutta la vita.",
    "shortEtymology": "dal latino scala → gradini, da scandere (salire)",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "corridoio",
      "balcone"
    ],
    "difficulty": 1
  },
  {
    "id": "fiasco",
    "word": "Fiasco",
    "correctAnswer": 1,
    "options": [
      "Dal tedesco 'flasche' (bottiglia difettosa gettata via)",
      "Dal teatro veneziano dove le bottiglie vuote indicavano insuccesso",
      "Dal latino 'vasculum' (piccolo vaso mal riuscito)"
    ],
    "story": "A Venezia, i vetrai producevano fiaschi elaborati. Quando un pezzo era difettoso, lo mettevano da parte come fiasco ordinario. I teatri veneziani fischiavano gli attori scarsi lanciando fiaschi vuoti sul palco. 'Far fiasco' è ancora oggi sinonimo di fallimento totale — una bottiglia rotta per testimone.",
    "shortEtymology": "dall'italiano fiasco → bottiglia difettosa, poi fallimento teatrale",
    "category": "societa",
    "relatedWords": [
      "ciao",
      "gazzetta",
      "serenata",
      "magazzino",
      "quarantena"
    ],
    "difficulty": 1
  },
  {
    "id": "serenata",
    "word": "Serenata",
    "correctAnswer": 1,
    "options": [
      "Dal nome del compositore Serena che inventò il genere musicale",
      "Dal latino 'serenus' (cielo limpido, notte stellata)",
      "Dal greco 'seiren' (sirena che canta nelle notti di mare)"
    ],
    "story": "La 'serenata' era una musica eseguita di sera sotto un cielo 'sereno' — limpido e stellato. Il giovane innamorato sceglieva le notti più chiare per cantare sotto la finestra dell'amata. 'Serenus' in latino descriveva sia il cielo pulito che l'animo tranquillo. Cantare sotto le stelle era fare la serenata al sereno.",
    "shortEtymology": "dal latino serenus → cielo limpido, notte serena",
    "category": "arte",
    "relatedWords": [
      "pantaloni",
      "ciao",
      "fiasco",
      "magazzino",
      "quarantena"
    ],
    "difficulty": 1
  },
  {
    "id": "catastrofe",
    "word": "Catastrofe",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'katastrophé' (capovolgimento finale della tragedia)",
      "Dal greco 'kata-astro' (caduta degli astri sul mondo)",
      "Dal latino 'cata-strophes' (rottura totale dell'ordine)"
    ],
    "story": "Nel teatro greco, la 'katastrophé' era il momento finale della tragedia in cui tutto si ribaltava: Edipo scopre la verità, Medea uccide i figli. Era la svolta drammatica conclusiva. Solo nel Settecento il termine passò ai disastri naturali. Ogni terremoto è dunque una tragedia in forma geologica.",
    "shortEtymology": "dal greco kata + strophé → rivolgimento finale della tragedia",
    "category": "arte",
    "relatedWords": [
      "teatro",
      "commedia",
      "tragedia",
      "museo",
      "musica"
    ],
    "difficulty": 1
  },
  {
    "id": "labirinto",
    "word": "Labirinto",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'labra' (molte entrate e corridoi intrecciati)",
      "Dal cretese 'labyris' (il grande palazzo del re Minosse)",
      "Dal greco 'labyrinthos' (casa della doppia ascia, labrys)"
    ],
    "story": "Il 'labyrinthos' cretese era la casa della 'labrys' — la doppia ascia, simbolo sacro della civiltà minoica. Era l'edificio dove viveva il Minotauro. Quando Teseo uccise il mostro con l'aiuto del filo di Arianna, 'labirinto' divenne per sempre sinonimo di luogo da cui è impossibile uscire.",
    "shortEtymology": "dal greco labyrinthos → casa della doppia ascia (labrys)",
    "category": "guerra",
    "relatedWords": [
      "barbaro",
      "disastro",
      "scuola",
      "atleta",
      "prigione"
    ],
    "difficulty": 1
  },
  {
    "id": "atleta",
    "word": "Atleta",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'atlos' (forte, robusto, capace di sopportare)",
      "Dal greco 'athlon' (stadio, la pista dove si gareggiava)",
      "Dal greco 'athlos' (gara, fatica, premio della competizione)"
    ],
    "story": "In greco 'athlos' significava la gara, la fatica e il premio insieme. L'atleta era chi si sottoponeva alla fatica della competizione per conquistare un premio. Eracle era l''athlios' per eccellenza — condannato alle sue dodici fatiche. Ogni sportivo moderno eredita quella parola di sudore e gloria.",
    "shortEtymology": "dal greco athlos → gara, fatica e premio insieme",
    "category": "societa",
    "relatedWords": [
      "scuola",
      "stadio",
      "democrazia",
      "crisi",
      "labirinto"
    ],
    "difficulty": 1
  },
  {
    "id": "stadio",
    "word": "Stadio",
    "correctAnswer": 1,
    "options": [
      "Dal nome dello scultore Stadios che progettò il primo impianto olimpico",
      "Dal greco 'stadion' (unità di misura di circa 180 metri)",
      "Dal latino 'stadium' (arena per le competizioni atletiche)"
    ],
    "story": "Il 'stadion' greco era un'unità di misura — circa 180 metri, la distanza di un solco di aratura. Olimpia aveva esattamente uno stadion di pista. Il luogo prese il nome dalla misura. Il famoso stadio di Olimpia era letteralmente 'lungo uno stadio'. Ogni impianto moderno porta con sé quella misura di terra greca.",
    "shortEtymology": "dal greco stadion → unità di misura di circa 180 metri",
    "category": "societa",
    "relatedWords": [
      "scuola",
      "atleta",
      "democrazia",
      "crisi",
      "idiota"
    ],
    "difficulty": 1
  },
  {
    "id": "algoritmo",
    "word": "Algoritmo",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'arithmos' (numero) + 'algor' (procedura di calcolo)",
      "Dal califfo arabo Al-Gorithm che patrocinò le scienze esatte",
      "Dal nome del matematico persiano Al-Khwarizmi (IX secolo)"
    ],
    "story": "Muhammad ibn Musa al-Khwarizmi era un matematico persiano del IX secolo che scrisse il primo trattato sistematico di algebra. In latino il suo nome divenne 'Algorithmus'. Ogni volta che TikTok decide cosa guardi o Spotify cosa ascolti, stai usando l'eredità di quel matematico di Baghdad morto 1200 anni fa.",
    "shortEtymology": "dal nome di Al-Khwarizmi → matematico persiano del IX sec.",
    "category": "scienza",
    "relatedWords": [
      "cifra",
      "algebra",
      "almanacco",
      "tariffa",
      "calcolo"
    ],
    "difficulty": 1
  },
  {
    "id": "fantasia",
    "word": "Fantasia",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'phainein' (brillare, illuminare dall'interno la mente)",
      "Dal greco 'phantasia' (capacità di produrre immagini mentali in assenza dell'oggetto)",
      "Dal latino 'phantasia' (sogno ad occhi aperti, visione notturna)"
    ],
    "story": "Il greco 'phantasia' veniva da 'phainein' — far apparire, mostrare. Era la facoltà mentale di produrre immagini in assenza dell'oggetto reale. Aristotele la considerava essenziale per il pensiero: senza phantasia, nessun concetto. Nel Medioevo divenne il potere pericoloso dell'immaginazione. Oggi la fantasia è un dono: Aristotele aveva ragione.",
    "shortEtymology": "dal greco phantasia → facoltà di produrre immagini mentali",
    "category": "corpo",
    "relatedWords": [
      "fantasma",
      "entusiasmo",
      "estasi",
      "magari",
      "capriccio",
      "desiderio",
      "genio",
      "talento",
      "sogno"
    ],
    "difficulty": 1
  },
  {
    "id": "fantasma",
    "word": "Fantasma",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'phantasma' (apparizione, visione della mente)",
      "Dal latino 'phantoma' (ombra pallida dei morti)",
      "Dal greco 'phanos' (figura luminosa e traslucida)"
    ],
    "story": "Il greco 'phantasma' derivava da 'phainein' — apparire. I Greci distinguevano tra 'eidolon' (l'ombra del morto) e 'phantasma' (una visione della mente). Nella filosofia di Platone, tutto ciò che vediamo è un 'phantasma' — un'illusione della realtà vera. Il fantasma di tuo nonno è innanzitutto una questione filosofica.",
    "shortEtymology": "dal greco phantasma → apparizione, visione",
    "category": "religione",
    "relatedWords": [
      "fantasia",
      "angelo",
      "diavolo",
      "panico"
    ],
    "difficulty": 1
  },
  {
    "id": "calcolo",
    "word": "Calcolo",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'calculus' (sassolino usato per contare)",
      "Dal greco 'kalkulon' (tavola rigata per le operazioni)",
      "Dal latino 'calx' (calce, gesso con cui si scrivevano i numeri)"
    ],
    "story": "I Romani contavano spostando piccoli sassi — 'calculi' — su tavole scanalate. Ogni sassolino valeva un'unità. Calcolare significava letteralmente muovere i sassi. Oggi i nostri computer fanno miliardi di operazioni al secondo, ma il nome ricorda ancora quei modesti ciottoli sul bordo di una strada romana.",
    "shortEtymology": "dal latino calculus → sassolino usato per contare",
    "category": "scienza",
    "relatedWords": [
      "algoritmo",
      "robot",
      "laser",
      "pixel",
      "laboratorio"
    ],
    "difficulty": 1
  },
  {
    "id": "prigione",
    "word": "Prigione",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'prensio' (prendere, catturare il nemico in battaglia)",
      "Dal franco 'prisun' (luogo di detenzione del castello medievale)",
      "Dal latino 'prehensio' (atto del catturare, dell'arrestare)"
    ],
    "story": "Il latino 'prehendere' significava afferrare, catturare — lo stesso verbo di 'comprendere' (prendere insieme) e 'sorprendere' (prendere all'improvviso). 'Prehensio' era l'atto dell'arresto. Chi 'comprende' qualcosa e chi viene arrestato usano la stessa radice: entrambi vengono 'presi'.",
    "shortEtymology": "dal latino prehensio → atto del catturare, dell'arrestare",
    "category": "guerra",
    "relatedWords": [
      "labirinto",
      "disastro",
      "vendetta",
      "guerra",
      "pace"
    ],
    "difficulty": 1
  },
  {
    "id": "municipio",
    "word": "Municipio",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'murus' (muro) + 'cipio' (custodire le mura della città)",
      "Dal latino 'munus' (onere fiscale) + 'civis' (cittadino che paga)",
      "Dal latino 'municipium' (città che prende su di sé gli oneri: munus + capere)"
    ],
    "story": "Il 'municipium' romano era una città alleata che conservava le proprie leggi ma 'prendeva gli oneri' — i doveri militari e fiscali di Roma. 'Munus' era l'onere pubblico, ma anche il dono: i gladiatori combattevano nei 'munera'. Il municipio era letteralmente una città gravata di doveri — e di spettacoli.",
    "shortEtymology": "dal latino municipium → città che prende gli oneri (munus + capere)",
    "category": "societa",
    "relatedWords": [
      "palazzo",
      "senato",
      "repubblica",
      "legge",
      "corteo"
    ],
    "difficulty": 1
  },
  {
    "id": "senato",
    "word": "Senato",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'senatus' (consiglio dei più sapienti della città)",
      "Dal latino 'senatus' (consiglio degli anziani, da senex = vecchio)",
      "Dal latino 'senex natus' (nato per governare grazie all'età)"
    ],
    "story": "Il 'senatus' romano era letteralmente il consiglio dei vecchi — da 'senex' (anziano). I senatori erano i 'patres' — i padri delle famiglie nobili. L'idea era che l'esperienza dell'età portasse saggezza politica. Oggi i senatori possono essere giovani: Romolo si stupirebbe.",
    "shortEtymology": "dal latino senatus → consiglio degli anziani (senex = vecchio)",
    "category": "societa",
    "relatedWords": [
      "palazzo",
      "municipio",
      "repubblica",
      "legge",
      "corteo"
    ],
    "difficulty": 1
  },
  {
    "id": "repubblica",
    "word": "Repubblica",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'res publica' (la cosa comune, l'affare di tutti)",
      "Dal latino 'republica' (il governo che risponde al popolo)",
      "Dal latino 'res' (cosa) + 'publicus' (del funzionario pubblico)"
    ],
    "story": "'Res publica' in latino significava la cosa di tutti — gli affari comuni della comunità, contrapposti alla 'res privata'. Cicerone la definì la cosa del popolo. Quando Bruto e Cassio uccisero Cesare, credevano di salvare la res publica dalla tirannide. Ogni repubblica porta in sé quella lotta tra potere personale e bene comune.",
    "shortEtymology": "dal latino res publica → la cosa comune, l'affare di tutti",
    "category": "societa",
    "relatedWords": [
      "palazzo",
      "municipio",
      "senato",
      "legge"
    ],
    "difficulty": 1
  },
  {
    "id": "democrazia",
    "word": "Democrazia",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'demos' (territorio) + 'kratos' (legge del territorio)",
      "Dal greco 'demiurgos' (popolo che costruisce) → governo costruttivo",
      "Dal greco 'demos' (popolo) + 'kratos' (forza, potere)"
    ],
    "story": "Cleistene inventò la parola 'demokratia' ad Atene nel 508 a.C. 'Demos' era il popolo (ma non tutti: no donne, schiavi, stranieri) e 'kratos' era il potere. La prima democrazia era diretta: i cittadini votavano in persona nell'agorà. Platone la odiava. Oggi il demos include quasi tutti — ci abbiamo messo 2500 anni.",
    "shortEtymology": "dal greco demos + kratos → potere del popolo",
    "category": "societa",
    "relatedWords": [
      "scuola",
      "atleta",
      "stadio",
      "crisi",
      "idiota"
    ],
    "difficulty": 1
  },
  {
    "id": "legge",
    "word": "Legge",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'lex/legis' (ciò che viene letto e proposto al voto)",
      "Dal latino 'ligare' (legare, vincolare i cittadini alla norma)",
      "Dal greco 'logos' (parola, ragione che ordina il mondo)"
    ],
    "story": "Il latino 'lex' veniva probabilmente da 'legere' — leggere, raccogliere. La legge era ciò che veniva letto dai magistrati e proposto al voto del popolo. Le Dodici Tavole, incise su bronzo nel 450 a.C., erano le prime leggi scritte di Roma. Prima le leggi non erano scritte: le conoscevano solo i sacerdoti.",
    "shortEtymology": "dal latino lex/legis → ciò che è letto e proposto al popolo",
    "category": "societa",
    "relatedWords": [
      "palazzo",
      "municipio",
      "senato",
      "repubblica"
    ],
    "difficulty": 1
  },
  {
    "id": "paparazzo",
    "word": "Paparazzo",
    "correctAnswer": 2,
    "options": [
      "Dal nome di un noto fotografo romano degli anni Cinquanta",
      "Dal dialetto romano 'papar' (prendere veloce, scattare di sorpresa)",
      "Dal personaggio Paparazzo nel film La Dolce Vita di Fellini (1960)"
    ],
    "story": "Federico Fellini creò il personaggio del fotografo invadente 'Paparazzo' nel suo capolavoro del 1960. Il nome probabilmente viene dal dialetto calabrese 'paparazzo' — zanzara, moscone molesto. Il film uscì, il personaggio rimase, e da allora tutti i fotografi invadenti del mondo si chiamano con quel nome calabrese-felliniano.",
    "shortEtymology": "dal personaggio Paparazzo in La Dolce Vita (Fellini, 1960)",
    "category": "societa",
    "relatedWords": [
      "ciao",
      "palazzo",
      "scuola",
      "libro"
    ],
    "difficulty": 1
  },
  {
    "id": "corteo",
    "word": "Corteo",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'cohors/cohortis' (unità militare, poi seguito del potente)",
      "Dal francese 'cortège' (sfilata cerimoniale della nobiltà)",
      "Dal latino 'cortem' (corte reale, insieme dei servitori del re)"
    ],
    "story": "La 'cohors' romana era un'unità militare di circa 480 soldati. Poi divenne il gruppo che seguiva un generale o un politico. 'Coorte', 'corte', 'corteo', 'cortesia' vengono tutte dallo stesso gruppo di soldati al seguito del potente. Anche essere cortesi significava originariamente comportarsi come chi sta a corte.",
    "shortEtymology": "dal latino cohors/cohortis → unità militare, poi seguito del potente",
    "category": "societa",
    "relatedWords": [
      "palazzo",
      "corridoio",
      "municipio",
      "senato"
    ],
    "difficulty": 1
  },
  {
    "id": "crisi",
    "word": "Crisi",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'krisis' (momento di scelta decisiva, punto di svolta)",
      "Dal greco 'krinein' (separare il bene dal male in un giudizio)",
      "Dal latino 'crisis' (momento acuto di una malattia)"
    ],
    "story": "In medicina greca, la 'krisis' era il momento decisivo della malattia: il paziente o moriva o guariva. Il medico non poteva fare nulla — aspettava la decisione del corpo. Da lì il significato di punto di svolta pericoloso. Ogni crisi economica, politica, personale conserva quella tensione originale: il momento in cui si decide tutto.",
    "shortEtymology": "dal greco krisis → momento di scelta, punto di svolta medico",
    "category": "societa",
    "relatedWords": [
      "atleta",
      "stadio",
      "democrazia",
      "scuola"
    ],
    "difficulty": 1
  },
  {
    "id": "pizza",
    "word": "Pizza",
    "correctAnswer": 0,
    "options": [
      "Dal longobardo 'bizzo' (morso, boccone)",
      "Dal latino 'pinsa' (schiacciata cotta sotto la brace)",
      "Dall'arabo 'pitta' (pane piatto dei popoli del Mediterraneo)"
    ],
    "story": "La parola 'pizza' compare per la prima volta in un documento latino di Gaeta nel 997 d.C. L'origine più probabile è il longobardo 'bizzo' — morso, boccone — portato dai conquistatori germanici. Un morso che ha conquistato il mondo, portandosi dietro il nome di quei guerrieri del nord.",
    "shortEtymology": "dal longobardo bizzo → morso, boccone",
    "category": "cucina",
    "relatedWords": [
      "pasta",
      "ricetta",
      "ristorante",
      "simposio",
      "cioccolato"
    ],
    "difficulty": 1
  },
  {
    "id": "pasta",
    "word": "Pasta",
    "correctAnswer": 1,
    "options": [
      "Dal persiano 'pashta' (impasto di cereali fermentati)",
      "Dal greco 'pasté' (farina mescolata con acqua e sale)",
      "Dal latino 'pastum' (cibo per animali, poi per gli uomini)"
    ],
    "story": "Il greco 'pasté' indicava una salsa densa di farina, acqua e sale. I Romani la trasformarono in 'pasta' ma la mangiavano cotta al forno, non bollita. Bollire la pasta nell'acqua fu un'innovazione medievale araba portata in Sicilia. La cucina italiana più celebre al mondo ha radici arabe.",
    "shortEtymology": "dal greco pasté → farina mescolata con acqua e sale",
    "category": "cucina",
    "relatedWords": [
      "sciroppo",
      "zafferano",
      "albicocca",
      "melanzana",
      "pizza"
    ],
    "difficulty": 1
  },
  {
    "id": "zucchero",
    "word": "Zucchero",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'sukkar' ← dal sanscrito 'sharkara' (granelli)",
      "Dal persiano 'shakar' (dolcezza pura, miele di canna)",
      "Dal greco 'sakkharon' (nettare vegetale dolcissimo)"
    ],
    "story": "La canna da zucchero nasceva in India, dove si chiamava 'sharkara' (granelli). Passò in persiano come 'shakar', in arabo come 'sukkar', poi in italiano come 'zucchero'. Il viaggio della parola lungo la Via della Seta è esattamente la stessa strada percorsa dallo zucchero fisico per secoli.",
    "shortEtymology": "dall'arabo sukkar ← dal sanscrito sharkara → granelli",
    "category": "cucina",
    "relatedWords": [
      "caffe",
      "arancio",
      "limone",
      "carciofo",
      "divano"
    ],
    "difficulty": 1
  },
  {
    "id": "caffe",
    "word": "Caffè",
    "correctAnswer": 1,
    "options": [
      "Dal nome della città etiope Kaffa dove cresceva la pianta selvatica",
      "Dall'arabo 'qahwa' (vino, poi bevanda che eccita come il vino)",
      "Dal turco 'kahve' (bevanda nera amara servita calda)"
    ],
    "story": "In arabo, 'qahwa' era originariamente il vino. Quando il caffè arrivò dal Corno d'Africa, i musulmani — che non potevano bere alcol — lo chiamarono 'qahwa' perché creava un effetto euforizzante simile. Il 'vino di Arabia' conquistò l'Europa nel Seicento portandosi dietro il suo nome eufemistico.",
    "shortEtymology": "dall'arabo qahwa → vino, poi bevanda che eccita",
    "category": "cucina",
    "relatedWords": [
      "zucchero",
      "arancio",
      "limone",
      "carciofo",
      "scirocco"
    ],
    "difficulty": 1
  },
  {
    "id": "cioccolato",
    "word": "Cioccolato",
    "correctAnswer": 2,
    "options": [
      "Dall'azteco 'xoco' (amaro) + 'coatl' (serpente, totem sacro del cacao)",
      "Dallo spagnolo coloniale 'chocolatl' (bevanda riservata al re azteco)",
      "Dal nahuatl 'xocolatl' (acqua amara e schiumosa degli Aztechi)"
    ],
    "story": "Gli Aztechi preparavano 'xocolatl' — acqua amara — mescolando cacao tostato, peperoncino e acqua fredda. Era una bevanda riservata a guerrieri e nobili. Hernán Cortés la portò in Spagna nel 1528. I nobili europei ci aggiunsero zucchero e calore: nacque il cioccolato come lo conosciamo, ribaltando completamente la ricetta originale.",
    "shortEtymology": "dal nahuatl xocolatl → acqua amara e schiumosa",
    "category": "cucina",
    "relatedWords": [
      "patata",
      "pomodoro",
      "melanzana",
      "pizza"
    ],
    "difficulty": 1
  },
  {
    "id": "pomodoro",
    "word": "Pomodoro",
    "correctAnswer": 0,
    "options": [
      "Dall'italiano 'pomo d'oro' (mela dorata, per il colore giallo originale)",
      "Dallo spagnolo 'tomate' (frutto rosso importato dal Nuovo Mondo)",
      "Dal nahuatl 'tomatl' (frutto acquoso e rotondo)"
    ],
    "story": "Le prime varietà di pomodoro arrivate in Europa dall'America erano gialle, non rosse. Gli Italiani le chiamarono 'pomo d'oro' — mela dorata. Solo secoli dopo arrivarono le varietà rosse. La salsa di pomodoro, base della cucina italiana, è americana di origine e dorata di nome.",
    "shortEtymology": "dall'italiano pomo d'oro → mela dorata (colore giallo originale)",
    "category": "cucina",
    "relatedWords": [
      "cioccolato",
      "patata",
      "melanzana",
      "pizza"
    ],
    "difficulty": 1
  },
  {
    "id": "patata",
    "word": "Patata",
    "correctAnswer": 1,
    "options": [
      "Dal nahuatl 'potatl' (radice commestibile delle terre calde)",
      "Dallo spagnolo 'batata' (nome arawak della patata dolce, poi confuso)",
      "Dal quechua 'papa' (tubero andino coltivato dagli Inca)"
    ],
    "story": "Esistono due tuberi diversi: la 'batata' dolce delle Antille (arawak) e la 'papa' delle Ande (quechua). Gli Spagnoli confusero i due nomi, creando 'patata' ibrida. La confusione coloniale finì nei nostri piatti — e nel vocabolario. In spagnolo ancora oggi si dice 'papa' per la patata normale.",
    "shortEtymology": "dallo spagnolo batata ← dall'arawak, poi confuso con il quechua papa",
    "category": "cucina",
    "relatedWords": [
      "cioccolato",
      "pomodoro",
      "melanzana",
      "pizza"
    ],
    "difficulty": 1
  },
  {
    "id": "arancio",
    "word": "Arancio",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'naranj' (la 'n' scambiata per l'articolo, poi caduta)",
      "Dal persiano 'arang' (colore arancione del frutto maturo)",
      "Dal sanscrito 'naranga' (albero dalle radici profumate)"
    ],
    "story": "Gli Arabi portarono l'arancio amaro in Sicilia nell'827 d.C. In arabo si chiamava 'naranj'. La 'n' iniziale fu scambiata per l'articolo — 'un narancio' divenne 'un arancio'. Lo stesso errore in francese: 'une narange' → 'une orange'. Un frutto che ha perso la sua iniziale in tutta Europa.",
    "shortEtymology": "dall'arabo naranj → la 'n' confusa con l'articolo e caduta",
    "category": "cucina",
    "relatedWords": [
      "zucchero",
      "caffe",
      "limone",
      "carciofo"
    ],
    "difficulty": 1
  },
  {
    "id": "limone",
    "word": "Limone",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'laymun' ← dal persiano 'limu' ← dall'India",
      "Dal greco 'limon' (prato, per i giardini profumati di limoni)",
      "Dal latino medievale 'lemon' (frutto acido importato dall'Oriente)"
    ],
    "story": "Il limone arrivò in Europa dagli Arabi ('laymun'), che lo avevano preso dalla Persia ('limu'), che lo avevano preso dall'India. Il viaggio della parola è lungo quanto la Via della Seta. Gli Arabi in Sicilia piantarono i primi limoneti italiani nell'XI secolo. Ogni limoncello porta in sé millenni di commercio.",
    "shortEtymology": "dall'arabo laymun ← persiano limu ← originariamente dall'India",
    "category": "cucina",
    "relatedWords": [
      "zucchero",
      "caffe",
      "arancio",
      "carciofo"
    ],
    "difficulty": 1
  },
  {
    "id": "carciofo",
    "word": "Carciofo",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'kardon' (cardo selvatico commestibile dei Greci)",
      "Dal latino 'cardus' (spina, per le foglie appuntite e dure)",
      "Dall'arabo 'kharshuf' (cardo commestibile coltivato)"
    ],
    "story": "Il carciofo è una versione coltivata del cardo selvatico. Gli Arabi in Sicilia lo chiamavano 'kharshuf' e lo coltivarono sistematicamente. Da lì 'articiocco' in toscano e 'carciofo' nei dialetti meridionali. In inglese si chiama 'artichoke' — dallo stesso 'kharshuf' passato per lo spagnolo. Un cardo arabo ha conquistato le tavole europee.",
    "shortEtymology": "dall'arabo kharshuf → cardo commestibile coltivato",
    "category": "cucina",
    "relatedWords": [
      "zucchero",
      "caffe",
      "arancio",
      "limone"
    ],
    "difficulty": 1
  },
  {
    "id": "ricetta",
    "word": "Ricetta",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'recipe!' (prendi! — imperativo delle prescrizioni mediche)",
      "Dal latino 'receptum' (formula ricevuta e tramandata di generazione in generazione)",
      "Dal greco 'rhektos' (prescritto dal medico, da seguire rigorosamente)"
    ],
    "story": "Le antiche prescrizioni mediche iniziavano con 'Recipe!' — 'Prendi!' in latino. Il medico ordinava al farmacista di prendere certi ingredienti e mescolarli. Col tempo 'recipe' divenne 'ricetta' sia per i farmaci che per i cibi. Quando cucini seguendo una ricetta, stai eseguendo la prescrizione di qualcuno.",
    "shortEtymology": "dal latino recipe! → prendi! (imperativo delle prescrizioni)",
    "category": "cucina",
    "relatedWords": [
      "pizza",
      "pasta",
      "ristorante",
      "simposio",
      "salame"
    ],
    "difficulty": 1
  },
  {
    "id": "carnevale",
    "word": "Carnevale",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'carnem levare' (togliere la carne, rinunciare alla carne)",
      "Dal latino 'carrus navalis' (carro a forma di nave delle sfilate)",
      "Dal celtico 'carnoval' (grande festa del raccolto autunnale)"
    ],
    "story": "Prima della Quaresima, i cristiani dovevano rinunciare alla carne per quaranta giorni. L'ultima festa prima del digiuno era letteralmente il 'togliere la carne' — carnem levare. Maschere, follia e banchetti come ultimo saluto alla carne prima del lungo sacrificio. Il divertimento era programmato, non spontaneo.",
    "shortEtymology": "dal latino carnem levare → togliere la carne",
    "category": "religione",
    "relatedWords": [
      "paradiso",
      "inferno",
      "angelo",
      "diavolo",
      "miracolo"
    ],
    "difficulty": 1
  },
  {
    "id": "paradiso",
    "word": "Paradiso",
    "correctAnswer": 0,
    "options": [
      "Dal persiano 'pairidaeza' (giardino recintato del re)",
      "Dal greco 'paradisos' (giardino degli dei sull'Olimpo)",
      "Dall'ebraico 'pardes' (frutteto sacro, bosco del Signore)"
    ],
    "story": "I re persiani avevano splendidi giardini recintati — 'pairidaeza' — con piante esotiche, fontane e animali rari. I Greci li scoprirono durante le campagne di Alessandro Magno e li chiamarono 'parádeisos'. La Bibbia usò la parola per l'Eden. Un giardino reale di re persiani divenne il luogo eterno dell'anima.",
    "shortEtymology": "dal persiano pairidaeza → giardino recintato del re",
    "category": "religione",
    "relatedWords": [
      "carnevale",
      "inferno",
      "angelo",
      "diavolo",
      "miracolo"
    ],
    "difficulty": 1
  },
  {
    "id": "inferno",
    "word": "Inferno",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'infernum' (luogo di fuoco eterno sotto la terra)",
      "Dal greco 'infernis' (regno buio dei dannati eterni)",
      "Dal latino 'infernus' (ciò che sta in basso, il mondo sotterraneo)"
    ],
    "story": "Il latino 'infernus' significava semplicemente 'ciò che sta in basso' — l'aggettivo di 'infra'. Il mondo dei morti era 'il posto di sotto'. Non c'era fuoco: quello arrivò dalla tradizione cristiana. Dante costruì su quella parola topografica l'edificio letterario più complesso della storia. L'Inferno era prima di tutto una questione di direzione.",
    "shortEtymology": "dal latino infernus → ciò che sta in basso",
    "category": "religione",
    "relatedWords": [
      "carnevale",
      "paradiso",
      "angelo",
      "diavolo",
      "miracolo"
    ],
    "difficulty": 1
  },
  {
    "id": "angelo",
    "word": "Angelo",
    "correctAnswer": 1,
    "options": [
      "Dall'ebraico 'mal'ak' (servitore diretto di Dio)",
      "Dal greco 'angelos' (messaggero, il postino dell'antichità)",
      "Dal latino 'angelus' (essere di luce pura)"
    ],
    "story": "In greco, 'angelos' era semplicemente un messaggero — il fattorino dell'antichità. La Bibbia greca usò questa parola per i messaggeri divini. Ma 'angelos' era anche il termine per i corrieri umani: lo stesso Ermes era un 'angelos'. Quando pensi a un angelo, stai pensando a un postino greco con le ali.",
    "shortEtymology": "dal greco angelos → messaggero (umano o divino)",
    "category": "religione",
    "relatedWords": [
      "diavolo",
      "panico",
      "panacea",
      "eco",
      "carnevale"
    ],
    "difficulty": 1
  },
  {
    "id": "diavolo",
    "word": "Diavolo",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'diabolos' (calunniatore, chi separa gettando ostacoli)",
      "Dal latino 'diabulus' (spirito del male universale)",
      "Dall'aramaico 'dibola' (serpente tentatore del giardino)"
    ],
    "story": "Il greco 'diabolos' veniva da 'dia-ballein' — gettare attraverso, creare ostacoli, separare. Il Diavolo era il Calunniatore, chi semina discordia tra gli uomini e tra l'uomo e Dio. Il contrario è il 'sym-bolon' (simbolo) — ciò che unisce. Due parole opposte, una filosofia intera: separare o unire.",
    "shortEtymology": "dal greco diabolos → calunniatore, chi separa gettando ostacoli",
    "category": "religione",
    "relatedWords": [
      "angelo",
      "panico",
      "panacea",
      "eco",
      "carnevale"
    ],
    "difficulty": 1
  },
  {
    "id": "miracolo",
    "word": "Miracolo",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'mirus' (stupefacente) + 'saeculum' (avvenimento del tempo)",
      "Dal greco 'miraron' (evento prodigioso oltre la natura)",
      "Dal latino 'miraculum' (cosa degna di essere guardata con meraviglia)"
    ],
    "story": "Il latino 'mirari' significava guardare con stupore, ammirare. Un 'miraculum' era qualcosa di così straordinario da dover essere guardato con meraviglia. Da 'mirari' vengono anche 'ammirare', 'meraviglia' e 'mirror' (specchio) in inglese. Il miracolo era prima di tutto un evento visivo: qualcosa che si guarda.",
    "shortEtymology": "dal latino miraculum → cosa degna di stupore e ammirazione",
    "category": "religione",
    "relatedWords": [
      "carnevale",
      "paradiso",
      "inferno",
      "angelo"
    ],
    "difficulty": 1
  },
  {
    "id": "voto",
    "word": "Voto",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'votare' (esprimere pubblicamente la propria volontà)",
      "Dal latino 'vovere' (invocare gli dei con preghiera solenne)",
      "Dal latino 'votum' (promessa solenne agli dei in cambio di protezione)"
    ],
    "story": "Il 'votum' romano era un contratto con gli dei: 'Se mi salvi dalla battaglia, costruirò un tempio'. Era protezione divina in cambio di un'offerta futura. I politici romani facevano voti pubblici per ottenere favori celesti. Quando votiamo alle elezioni, usiamo la stessa parola di quei soldati che promettevano templi agli dei.",
    "shortEtymology": "dal latino votum → promessa solenne agli dei in cambio di protezione",
    "category": "religione",
    "relatedWords": [
      "carnevale",
      "paradiso",
      "inferno",
      "angelo",
      "cappella"
    ],
    "difficulty": 1
  },
  {
    "id": "sabato",
    "word": "Sabato",
    "correctAnswer": 0,
    "options": [
      "Dall'ebraico 'shabbat' (riposo, cessare dal lavoro)",
      "Dal greco 'sabbaton' (settimo giorno sacro della settimana)",
      "Dal babilonese 'shapattu' (giorno di luna piena mensile)"
    ],
    "story": "Lo 'Shabbat' ebraico viene dal verbo 'shavat' — cessare, smettere. Dio creò il mondo in sei giorni e il settimo si riposò: quel settimo divenne il sabato. I cristiani spostarono il riposo alla domenica, ma il nome ebraico rimase. Ogni settimana, il calendario porta con sé la Genesi.",
    "shortEtymology": "dall'ebraico shabbat → riposo, cessare dal lavoro",
    "category": "storia",
    "relatedWords": [
      "domenica",
      "gennaio",
      "febbraio",
      "giovedi",
      "lunedi",
      "marzo",
      "agosto",
      "martedi",
      "mercoledi",
      "venerdi",
      "tempo"
    ],
    "difficulty": 1
  },
  {
    "id": "domenica",
    "word": "Domenica",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'dies dominans' (giorno che domina e santifica gli altri)",
      "Dal greco 'kyriakè' (giorno del Kyrios, il Signore)",
      "Dal latino 'dies Dominica' (giorno del Signore, Dominus)"
    ],
    "story": "I cristiani primitivi chiamavano il giorno della Resurrezione 'dies Dominica' — giorno del Signore ('Dominus'). Sostituì il 'dies Solis' pagano. In greco si dice ancora 'Kyriakè'. In quasi tutte le lingue romanze, il giorno di riposo porta il nome di Dio — tranne in inglese, dove 'Sunday' omaggia ancora il sole pagano.",
    "shortEtymology": "dal latino dies Dominica → giorno del Signore (Dominus)",
    "category": "storia",
    "relatedWords": [
      "giovedi",
      "sabato",
      "gennaio",
      "febbraio",
      "lunedi"
    ],
    "difficulty": 1
  },
  {
    "id": "gennaio",
    "word": "Gennaio",
    "correctAnswer": 0,
    "options": [
      "Da Giano, dio romano bifronte delle porte e dei nuovi inizi",
      "Dal latino 'janua' (porta, soglia del nuovo cammino annuale)",
      "Dal celtico 'jan' (primo, iniziale, origine di tutto)"
    ],
    "story": "Giano era il dio romano con due facce: una guardava avanti, l'altra indietro. Era il dio delle porte, dei passaggi, degli inizi. Il primo mese fu dedicato a lui perché guarda insieme al passato e al futuro. Ogni gennaio sei Giano: guardi l'anno che finisce e quello che comincia.",
    "shortEtymology": "da Giano (Ianus) → dio romano bifronte delle porte e degli inizi",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "febbraio",
      "giovedi",
      "lunedi"
    ],
    "difficulty": 1
  },
  {
    "id": "febbraio",
    "word": "Febbraio",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'februus' (Plutone, dio degli inferi onorato in questo mese)",
      "Dal latino 'februum' (rito di purificazione delle feste Lupercalia)",
      "Dal sabino 'febru' (freddo, il mese più rigido dell'anno)"
    ],
    "story": "A febbraio i Romani celebravano le Lupercalia — una festa di purificazione e fertilità. 'Februum' era lo strumento rituale di purificazione. I sacerdoti Luperci correvano nudi per Roma frustando le donne con strisce di pelle di capra per renderle fertili. San Valentino ha sostituito una cerimonia decisamente più vivace.",
    "shortEtymology": "dal latino februum → strumento di purificazione rituale",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "giovedi",
      "lunedi"
    ],
    "difficulty": 1
  },
  {
    "id": "giovedi",
    "word": "Giovedì",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'dies Jovis' (giorno del re degli dei romani)",
      "Dal latino 'Jovis dies' (giorno del fulmine e del cielo)",
      "Dal latino 'dies Iovis' (giorno di Giove, padre degli dei)"
    ],
    "story": "Giove era il re degli dei romani — equivalente di Zeus greco. 'Dies Iovis' divenne giovedì. In inglese 'Thursday' viene dal dio nordico Thor, il dio del tuono come Giove. Stesso pianeta, stesso concetto: il giorno del dio supremo del cielo. Quando dici giovedì, invochi il padre di tutti gli dei.",
    "shortEtymology": "dal latino dies Iovis → giorno di Giove, padre degli dei",
    "category": "storia",
    "relatedWords": [
      "domenica",
      "sabato",
      "gennaio",
      "febbraio",
      "etimologia"
    ],
    "difficulty": 1
  },
  {
    "id": "olimpiadi",
    "word": "Olimpiadi",
    "correctAnswer": 1,
    "options": [
      "Dal monte Olimpo, residenza degli dei greci",
      "Da Olimpia, città del Peloponneso sede dei giochi sacri a Zeus",
      "Dal greco 'olympos' (splendente, luminoso come gli dei)"
    ],
    "story": "I giochi olimpici si svolgevano ogni quattro anni a Olimpia — una città del Peloponneso, non il monte Olimpo. Erano sacri a Zeus e duravano cinque giorni. Durante i giochi, tutte le guerre si fermavano: la tregua olimpica. Il barone De Coubertin li reintrodusse nel 1896 sperando di riportare quella pace. Con risultati alterni.",
    "shortEtymology": "da Olimpia → città sacra a Zeus nel Peloponneso",
    "category": "storia",
    "relatedWords": [
      "maratona",
      "barbaro",
      "scuola",
      "labirinto"
    ],
    "difficulty": 1
  },
  {
    "id": "panico",
    "word": "Panico",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'panikos' (terrore totale, assoluto e incontenibile)",
      "Dal latino 'panicus' (terrore notturno inspiegabile)",
      "Dal dio greco Pan che spaventava i viandanti nei boschi"
    ],
    "story": "Pan, il dio dei boschi con zampe di capra, si divertiva a spaventare i viandanti solitari con urla improvvise dal buio. La 'paura di Pan' — panikós déos — divenne il terrore improvviso e irrazionale. Ogni volta che ti spaventi senza motivo, Pan ride nascosto tra gli alberi.",
    "shortEtymology": "dal dio greco Pan → che spaventava i viandanti nei boschi",
    "category": "religione",
    "relatedWords": [
      "angelo",
      "diavolo",
      "panacea",
      "eco",
      "fantasma"
    ],
    "difficulty": 1
  },
  {
    "id": "disastro",
    "word": "Disastro",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'dis-aster' (lontano dalle stelle protettrici)",
      "Dal greco 'dis-astron' (stella sfavorevole sul destino)",
      "Dal latino 'desastrare' (devastare completamente i raccolti)"
    ],
    "story": "Gli antichi credevano che le stelle governassero il destino. Nascere sotto una 'cattiva stella' — dis-astron — significava una vita segnata dalla sfortuna. Quando tutto andava storto, la colpa era degli astri. Oggi diciamo 'è un disastro' senza più alzare gli occhi al cielo. Gli astri ci hanno abbandonato.",
    "shortEtymology": "dal greco dis + astron → sotto una stella sfavorevole",
    "category": "guerra",
    "relatedWords": [
      "considerare",
      "labirinto",
      "pianeta",
      "galassia",
      "prigione"
    ],
    "difficulty": 1
  },
  {
    "id": "tarantola",
    "word": "Tarantola",
    "correctAnswer": 0,
    "options": [
      "Dal nome della città di Taranto, dove il ragno era molto diffuso",
      "Dal greco 'tarantos' (ragno velenoso delle steppe orientali)",
      "Dal latino 'tarare' (girare vorticosamente, per i movimenti del ragno)"
    ],
    "story": "Nel Medioevo, a Taranto si credeva che il morso di questo ragno causasse una malattia — il 'tarantismo' — che si curava solo ballando freneticamente per ore fino a sudare il veleno. Nacque la 'tarantella', la danza terapeutica. Il ragno, la danza e la città portano tutti lo stesso nome da mille anni.",
    "shortEtymology": "da Taranto → città pugliese dove il ragno era comunissimo",
    "category": "natura",
    "relatedWords": [
      "zanzara",
      "monsone",
      "canicola",
      "orizzonte",
      "isola"
    ],
    "difficulty": 1
  },
  {
    "id": "zanzara",
    "word": "Zanzara",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'cimex' (insetto molesto, modificato nel tempo)",
      "Dall'arabo 'zanzar' (insetto ronzante, imitazione del suono)",
      "Dal greco 'zanzibar' (isola africana famosa per gli insetti)"
    ],
    "story": "La parola 'zanzara' è quasi certamente onomatopeica — imita il fastidioso ronzio dell'insetto. Versioni simili esistono in molte lingue del Mediterraneo, probabilmente dall'arabo 'zanzar'. È come se tutte le civiltà che hanno sofferto quelle notti insonni abbiano prodotto spontaneamente la stessa parola.",
    "shortEtymology": "dall'arabo zanzar → imitazione onomatopeica del ronzio",
    "category": "natura",
    "relatedWords": [
      "monsone",
      "scirocco",
      "algoritmo",
      "pasta",
      "tarantola"
    ],
    "difficulty": 1
  },
  {
    "id": "monsone",
    "word": "Monsone",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'mawsim' (stagione, il momento giusto per navigare)",
      "Dal portoghese 'monção' (vento stagionale scoperto in India)",
      "Dal tamil 'moosam' (pioggia violenta del sud dell'India)"
    ],
    "story": "I navigatori arabi dell'Oceano Indiano avevano scoperto che i venti soffiavano regolarmente in una direzione per sei mesi e poi si invertivano. Pianificavano i viaggi sfruttando questi 'mawsim' — stagioni dei venti. I portoghesi nel Cinquecento impararono questa scienza dai navigatori arabi, parola inclusa.",
    "shortEtymology": "dall'arabo mawsim → stagione, momento giusto per navigare",
    "category": "natura",
    "relatedWords": [
      "scirocco",
      "canicola",
      "orizzonte",
      "clima",
      "zanzara"
    ],
    "difficulty": 1
  },
  {
    "id": "epidemia",
    "word": "Epidemia",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'epi' (sopra) + 'demos' (popolo che soffre sotto il morbo)",
      "Dal greco 'epi' (su) + 'demos' (popolo) → ciò che si abbatte sul popolo",
      "Dal greco 'epidemios' (diffuso nel territorio, ormai radicato)"
    ],
    "story": "Il greco 'epi-demos' significava ciò che sta sul popolo — una malattia che si abbatte su un'intera comunità. Ippocrate usava il termine per descrivere le malattie stagionali. Al contrario: 'en-demos' (endemico, dentro il popolo) e 'pan-demos' (pandemia, su tutto il popolo). La geografia del male, scritta in greco.",
    "shortEtymology": "dal greco epi + demos → ciò che si abbatte sul popolo",
    "category": "scienza",
    "relatedWords": [
      "chirurgo",
      "farmaco",
      "sintomo",
      "malinconia",
      "dieta",
      "virus",
      "vaccino",
      "influenza",
      "malaria",
      "tecnica"
    ],
    "difficulty": 1
  },
  {
    "id": "lunedi",
    "word": "Lunedì",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'dies Lunae' (giorno della Luna)",
      "Dal latino 'luna dies' (il giorno in cui la Luna domina il cielo)",
      "Dal germanico 'Montag' adattato (giorno del Monte Olimpo)"
    ],
    "story": "I Romani dedicavano ogni giorno a un pianeta: Luna, Marte, Mercurio, Giove, Venere, Saturno, Sole. 'Dies Lunae' divenne lunedì. Questa settimana planetaria arrivò dai Babilonesi attraverso i Romani. Ogni settimana, senza saperlo, seguiamo un calendario astronomico babilonese.",
    "shortEtymology": "dal latino dies Lunae → giorno della Luna",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio"
    ],
    "difficulty": 1
  },
  {
    "id": "marzo",
    "word": "Marzo",
    "correctAnswer": 0,
    "options": [
      "Da Marte, dio della guerra (il mese in cui riprendevano le campagne militari)",
      "Dal latino 'marcio' (marciare, il mese degli eserciti in movimento)",
      "Dal pianeta Marte visibile nel cielo di marzo"
    ],
    "story": "Il calendario romano iniziava a marzo — il mese di Marte — perché il clima permetteva di riprendere le campagne militari. Per questo settembre, ottobre, novembre, dicembre significano '7°, 8°, 9°, 10° mese': quando l'anno iniziava a marzo erano davvero il settimo, ottavo, nono e decimo mese.",
    "shortEtymology": "da Marte (Mars) → dio della guerra, mese della ripresa militare",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio"
    ],
    "difficulty": 1
  },
  {
    "id": "agosto",
    "word": "Agosto",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'augere' (aumentare, mese dei raccolti più abbondanti)",
      "Dal latino 'augustus' (solenne, sacro) per la sua importanza agricola",
      "Dall'imperatore Augusto che rinominò il mese precedentemente chiamato Sextilis"
    ],
    "story": "Il mese si chiamava originariamente 'Sextilis' — il sesto mese. Quando Augusto completò la conquista dell'Egitto e vinse le sue maggiori battaglie in quel mese, il Senato lo ribattezzò in suo onore. Giulio Cesare aveva già fatto lo stesso con luglio. Due imperatori hanno colonizzato il calendario per sempre.",
    "shortEtymology": "dall'imperatore Augusto → il mese delle sue vittorie",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio"
    ],
    "difficulty": 1
  },
  {
    "id": "martedi",
    "word": "Martedì",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'dies Martialis' (giorno delle battaglie e delle guerre)",
      "Dal latino 'dies Martis' (giorno di Marte, dio della guerra)",
      "Dal germanico 'Tiw's day' adattato in italiano medievale"
    ],
    "story": "Marte era il dio romano della guerra. 'Dies Martis' divenne martedì. Marte dà il nome anche al mese di Marzo e al pianeta rosso. In inglese 'Tuesday' viene dal dio germanico Tiw — equivalente di Marte. Due culture diverse, stessa idea: il giorno della guerra.",
    "shortEtymology": "dal latino dies Martis → giorno di Marte, dio della guerra",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio"
    ],
    "difficulty": 1
  },
  {
    "id": "mercoledi",
    "word": "Mercoledì",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'dies Mercurii' (giorno di Mercurio, dio dei commerci)",
      "Dal germanico 'Wotan's day' adattato nel Medioevo italiano",
      "Dal latino 'medius dies' (giorno di mezzo, il più equilibrato)"
    ],
    "story": "Mercurio era il dio dei mercanti, dei viaggiatori e dei ladri — tutti mestieri che richiedono velocità e astuzia. 'Dies Mercurii' divenne mercoledì. Il suo simbolo, il caduceo con due serpenti, è ancora oggi il simbolo della medicina e del commercio. Il giorno di Mercurio è il giorno per fare affari.",
    "shortEtymology": "dal latino dies Mercurii → giorno di Mercurio, dio dei mercanti",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio"
    ],
    "difficulty": 1
  },
  {
    "id": "venerdi",
    "word": "Venerdì",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'dies Venerabilis' (giorno venerabile e di riposo)",
      "Dal latino 'dies Veneris' (giorno di Venere, dea dell'amore)",
      "Dal celtico 'Fridag' (giorno della dea Frigg, equivalente nordico)"
    ],
    "story": "Il 'gladius' era la spada corta dei legionari romani — efficace nel combattimento ravvicinato. I combattenti nell'arena prendevano il nome dall'arma. Curiosità: il 'gladiolo', il fiore con foglie a forma di spada, ha la stessa origine. Marte e i fiori condividono lo stesso nome.",
    "shortEtymology": "dal latino gladius → spada corta romana",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio"
    ],
    "difficulty": 1
  },
  {
    "id": "maratona",
    "word": "Maratona",
    "correctAnswer": 0,
    "options": [
      "Dalla città greca di Maratona, teatro della vittoria sui Persiani (490 a.C.)",
      "Dal greco 'marathos' (finocchio selvatico che cresceva nella piana)",
      "Dal soldato Marato che inventò la corsa a lunga distanza"
    ],
    "story": "Nel 490 a.C., i Greci sconfissero i Persiani nella piana di Maratona — piena di finocchio selvatico. Secondo la leggenda, il soldato Fidippide corse i 42 km fino ad Atene per annunciare la vittoria, morendo all'arrivo. Ai Giochi Olimpici del 1896 introdussero quella distanza in suo onore. La maratona è un monumento alla morte di un messaggero.",
    "shortEtymology": "dalla città di Maratona → teatro della vittoria greca sui Persiani",
    "category": "storia",
    "relatedWords": [
      "barbaro",
      "scuola",
      "labirinto",
      "atleta",
      "olimpiadi"
    ],
    "difficulty": 1
  },
  {
    "id": "vendetta",
    "word": "Vendetta",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'vindicatio' (rivendicazione legale del torto subito)",
      "Dal germanico 'wendan' (ritorcere, restituire il danno)",
      "Dal latino 'vindicare' (difendere, reclamare, poi punire)"
    ],
    "story": "Il latino 'diurnus' significava di ogni giorno, da 'dies' (giorno). Gli 'acta diurna' erano le notizie quotidiane affisse in piazza a Roma da Giulio Cesare — il primo giornale della storia. 'Giornale', 'diario', 'giornata', 'giornaliero': tutta la vita quotidiana porta nel nome il ciclo del sole romano.",
    "shortEtymology": "dal latino diurnalis → quotidiano, di ogni giorno",
    "category": "guerra",
    "relatedWords": [
      "prigione",
      "labirinto",
      "disastro",
      "guerra"
    ],
    "difficulty": 1
  },
  {
    "id": "cifra",
    "word": "Cifra",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'kyphos' (curvo, come la forma di alcuni numeri)",
      "Dall'arabo 'sifr' (zero, vuoto)",
      "Dal latino 'figura' (forma, simbolo grafico del numero)"
    ],
    "story": "Gli Arabi portarono in Europa il sistema numerico indiano, incluso il concetto rivoluzionario dello zero. In arabo, zero si diceva 'sifr' — vuoto. In latino divenne 'cifra'. La parola inizialmente indicava solo lo zero, poi si estese a tutti i numeri. Il nulla matematico è diventato il nome di tutti i numeri.",
    "shortEtymology": "dall'arabo sifr → zero, vuoto",
    "category": "scienza",
    "relatedWords": [
      "algoritmo",
      "algebra",
      "almanacco",
      "tariffa",
      "laboratorio"
    ],
    "difficulty": 1
  },
  {
    "id": "magazzino",
    "word": "Magazzino",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'makhazin' (depositi, plurale di makhzan)",
      "Dal francese 'magasin' (grande negozio urbano)",
      "Dal latino 'machina zina' (struttura per contenere le merci)"
    ],
    "story": "L'arabo 'makhzan' era il deposito dove si conservavano merci, armi e tesori del sovrano. Il plurale 'makhazin' passò in italiano come 'magazzino' attraverso i commerci con i porti nordafricani. In francese divenne 'magasin' — grande negozio. 'Magazine' in inglese (rivista) condivide la stessa origine: un deposito di storie.",
    "shortEtymology": "dall'arabo makhazin → depositi, plurale di makhzan",
    "category": "commercio",
    "relatedWords": [
      "dogana",
      "ammiraglio",
      "arsenale",
      "darsena",
      "ciao"
    ],
    "difficulty": 1
  },
  {
    "id": "dogana",
    "word": "Dogana",
    "correctAnswer": 1,
    "options": [
      "Dal veneziano 'doana' (ufficio del doge per i commerci marittimi)",
      "Dall'arabo 'diwan' (registro, ufficio governativo di stato)",
      "Dal greco 'dohane' (tassa sul passaggio delle merci)"
    ],
    "story": "'Diwan' in arabo era il registro ufficiale dei funzionari di stato. Attraverso i commerci con i porti arabi, 'diwan' divenne 'duana' poi 'dogana'. Lo stesso 'diwan' ci ha dato anche 'divano' — i funzionari sedevano su lunghi cuscini durante le udienze. Dogana e divano: lo stesso ufficio arabo.",
    "shortEtymology": "dall'arabo diwan → registro ufficiale di stato",
    "category": "commercio",
    "relatedWords": [
      "magazzino",
      "ammiraglio",
      "arsenale",
      "darsena"
    ],
    "difficulty": 1
  },
  {
    "id": "capitale",
    "word": "Capitale",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'caput' (testa di bestiame = unità di misura della ricchezza)",
      "Dal latino 'capitalis' (della testa, principale, il più importante)",
      "Dal latino 'caput' (testa dello Stato, città principale)"
    ],
    "story": "In latino 'caput' significava testa. Ma indicava anche la testa di bestiame — l'unità di ricchezza agricola: chi aveva più vacche era più ricco. 'Capitale' era il patrimonio principale, la testa della ricchezza. Da lì: capitale come ricchezza finanziaria e capitale come città principale. Tutto dal contare le vacche.",
    "shortEtymology": "dal latino caput → testa, poi testa di bestiame (= ricchezza)",
    "category": "commercio",
    "relatedWords": [
      "cappello",
      "soldo",
      "moneta",
      "tassa",
      "ipoteca",
      "dollaro",
      "credito",
      "fallimento"
    ],
    "difficulty": 1
  },
  {
    "id": "soldo",
    "word": "Soldo",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'solidus' (moneta di bronzo dell'impero repubblicano)",
      "Dal latino 'solidus' (moneta d'oro coniata da Costantino nel 309 d.C.)",
      "Dal germanico 'sold' (paga del mercenario straniero)"
    ],
    "story": "L'imperatore Costantino nel 309 d.C. coniò il 'solidus aureus' — moneta d'oro puro che divenne la valuta di riferimento per secoli. I soldati erano pagati in solidi: da lì 'soldo' come paga e 'soldato' come chi riceve il soldo. Quando dici 'non ho un soldo', citi la riforma monetaria di Costantino.",
    "shortEtymology": "dal latino solidus → moneta d'oro di Costantino",
    "category": "commercio",
    "relatedWords": [
      "capitale",
      "moneta",
      "tassa",
      "ipoteca",
      "usura"
    ],
    "difficulty": 1
  },
  {
    "id": "moneta",
    "word": "Moneta",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'mone' (avvisare il valore) perché le monete avvisano del loro peso",
      "Dal nome della dea Giunone 'la Moneratrice' (colei che ammonisce)",
      "Dal tempio di Giunone Moneta sul Colle Capitolino, dove si coniavano"
    ],
    "story": "Le monete romane erano coniate nel tempio di Giunone 'Moneta' — colei che ammonisce — sul Colle Capitolino. La zecca di Roma stava letteralmente in un tempio. Da 'Moneta' derivano 'moneta' in italiano, 'money' in inglese, 'monnaie' in francese. Ogni volta che paghi, onori involontariamente la dea Giunone.",
    "shortEtymology": "da Giunone Moneta → dea nel cui tempio si coniavano le monete",
    "category": "commercio",
    "relatedWords": [
      "salario",
      "pecunia",
      "finanza",
      "denaro",
      "bonus"
    ],
    "difficulty": 1
  },
  {
    "id": "porto",
    "word": "Porto",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'portus' (varco naturale, riparo nella costa)",
      "Dal greco 'portos' (luogo di scambio commerciale marittimo)",
      "Dal latino 'portare' (portare le merci via mare fino alla riva)"
    ],
    "story": "Il latino 'portus' indicava un varco naturale, un riparo — la stessa radice di 'porta'. Un porto era un buco nella costa dove le navi si riparavano. Da 'portus' vengono 'porto', 'portico', 'porta', 'portare', 'importante' (che vale la pena di portare). L'atto semplice del portare ha generato un'intera famiglia.",
    "shortEtymology": "dal latino portus → varco riparato nella costa",
    "category": "viaggio",
    "relatedWords": [
      "viaggio",
      "molo",
      "nave",
      "darsena",
      "bussola"
    ],
    "difficulty": 1
  },
  {
    "id": "tassa",
    "word": "Tassa",
    "correctAnswer": 1,
    "options": [
      "Dal franco 'tazza' (piccola moneta di rame medievale)",
      "Dal latino medievale 'taxa' (tariffa fissata, da taxare = toccare/valutare)",
      "Dal greco 'taxis' (ordine, classificazione del tributo dovuto)"
    ],
    "story": "Il colore marrone chiaro del cappuccino — latte più caffè — era identico al colore del saio dei frati Cappuccini, a loro volta chiamati così per il caratteristico cappuccio aguccio del loro abito. Una tazza di storia in ogni bar.",
    "shortEtymology": "dall'italiano cappuccio → cappuccio del saio francescano",
    "category": "commercio",
    "relatedWords": [
      "capitale",
      "soldo",
      "moneta",
      "ipoteca",
      "miseria"
    ],
    "difficulty": 1
  },
  {
    "id": "ipoteca",
    "word": "Ipoteca",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'hypotheke' (ciò che si mette sotto come garanzia)",
      "Dal greco 'hypo' (sotto) + 'theke' (casa, edificio da garantire)",
      "Dal latino 'hypoteca' (vincolo legale ufficiale sulla proprietà)"
    ],
    "story": "Il greco 'hypotheke' significava mettere qualcosa sotto come garanzia di un debito. In Grecia, si piantava un paletto nel terreno ipotecato con scritto il nome del creditore. La proprietà sembrava libera ma era gravata da quel palo invisibile. Oggi il mutuo è quel paletto digitale piantato nel tuo appartamento.",
    "shortEtymology": "dal greco hypotheke → ciò che si mette sotto come garanzia",
    "category": "commercio",
    "relatedWords": [
      "soldo",
      "tassa",
      "capitale",
      "moneta"
    ],
    "difficulty": 1
  },
  {
    "id": "usura",
    "word": "Usura",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'usurpare' (appropriarsi illegalmente del denaro altrui)",
      "Dal latino 'usus' (il semplice uso del denaro prestato)",
      "Dal latino 'usura' (prezzo dell'uso del denaro, da usus)"
    ],
    "story": "Il concetto di zero fu inventato in India, dove si chiamava 'shunya' (vuoto). Gli Arabi lo chiamarono 'sifr' (vuoto). Fibonacci lo portò in Europa nel 1202 con il suo 'Liber Abaci', latinizzandolo in 'zephirum' poi 'zero' in italiano. Senza lo zero non esisterebbe l'informatica. Il vuoto ha rivoluzionato la matematica.",
    "shortEtymology": "dall'arabo sifr → vuoto, tramite il latino zephirum",
    "category": "commercio",
    "relatedWords": [
      "tariffa",
      "capitale",
      "soldo",
      "moneta"
    ],
    "difficulty": 1
  },
  {
    "id": "algebra",
    "word": "Algebra",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'algebras' (calcolo delle quantità sconosciute)",
      "Dall'arabo 'al-jabr' (il ricongiungimento, rimettere insieme le parti)",
      "Dal nome del matematico Al-Jabir che codificò il sistema"
    ],
    "story": "Al-Khwarizmi nel IX secolo scrisse un trattato su come risolvere equazioni chiamandolo 'al-kitab al-mukhtasar fi hisab al-jabr' — il libro del completamento e del bilanciamento. 'Al-jabr' significava ricongiungimento. Curioso: 'algebrista' indicava anche il cerusico che aggiustava le ossa rotte — stesso concetto.",
    "shortEtymology": "dall'arabo al-jabr → ricongiungimento, rimettere insieme i pezzi",
    "category": "scienza",
    "relatedWords": [
      "algoritmo",
      "cifra",
      "almanacco",
      "tariffa"
    ],
    "difficulty": 1
  },
  {
    "id": "malinconia",
    "word": "Malinconia",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'melan kholé' (bile nera, umore della milza)",
      "Dal greco 'melan konos' (cono nero, immagine dell'oscurità mentale)",
      "Dal latino 'mala inconia' (cattivo inizio, stato d'animo avverso)"
    ],
    "story": "Gli antichi greci credevano che quattro umori corporei controllassero le emozioni. La bile nera — 'melan kholé' — prodotta dalla milza causava tristezza e depressione. Ippocrate prescriveva dieta ed esercizio. Duemila anni dopo abbiamo ancora lo stesso problema — e soluzioni simili.",
    "shortEtymology": "dal greco melan + kholé → bile nera",
    "category": "corpo",
    "relatedWords": [
      "dieta",
      "chirurgo",
      "epidemia",
      "atleta",
      "farmaco",
      "sinistro",
      "record"
    ],
    "difficulty": 1
  },
  {
    "id": "dieta",
    "word": "Dieta",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'diaita' (privazione, restrizione alimentare volontaria)",
      "Dal greco 'diaita' (modo di vivere, regime completo di vita)",
      "Dal latino 'dieta' (razione giornaliera fissa di cibo)"
    ],
    "story": "Il greco 'diaita' non significava privazione: era il modo completo di vivere — sonno, esercizio, alimentazione, abitudini mentali. Ippocrate prescriveva una 'diaita' come terapia olistica. Solo nel XX secolo 'dieta' si è ridotto a significare mangiare poco. Ippocrate stava parlando di una vita intera, non di saltare il dolce.",
    "shortEtymology": "dal greco diaita → modo di vivere, regime completo di vita",
    "category": "corpo",
    "relatedWords": [
      "malinconia",
      "chirurgo",
      "atleta",
      "epidemia",
      "mentire"
    ],
    "difficulty": 1
  },
  {
    "id": "chirurgo",
    "word": "Chirurgo",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'kheir' (mano) + 'ergon' (lavoro di precisione)",
      "Dal greco 'kheirourgos' (artigiano specializzato del corpo umano)",
      "Dal greco 'kheirourgos' (colui che opera con le mani)"
    ],
    "story": "Il greco 'kheirourgós' significava chi lavora con le mani — da 'kheir' (mano) e 'ergon' (lavoro). Nella medicina antica il chirurgo era considerato un artigiano, rango inferiore al medico teorico. Per secoli i chirurghi erano barbieri. Oggi un neurochirurgo guadagna più di un filosofo. Le mani si sono prese la loro rivincita.",
    "shortEtymology": "dal greco kheirourgos → chi opera con le mani",
    "category": "scienza",
    "relatedWords": [
      "malinconia",
      "dieta",
      "epidemia",
      "farmaco",
      "sintomo"
    ],
    "difficulty": 1
  },
  {
    "id": "farmaco",
    "word": "Farmaco",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'pharmakon' (veleno e rimedio — la stessa parola per entrambi)",
      "Dal greco 'pharmos' (pianta medicinale della foresta)",
      "Dal persiano 'farman' (prescrizione ufficiale del medico)"
    ],
    "story": "In greco 'pharmakon' indicava indifferentemente il veleno e il rimedio. Socrate fu ucciso con un 'pharmakon' di cicuta. Platone usava 'pharmakon' per descrivere la scrittura: un rimedio per la memoria, ma anche un veleno per il pensiero vivo. Ogni medicina è un veleno a dosi sbagliate: la parola lo sapeva già.",
    "shortEtymology": "dal greco pharmakon → veleno e rimedio (la stessa parola)",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "chirurgo",
      "sintomo",
      "malinconia",
      "ospedale"
    ],
    "difficulty": 1
  },
  {
    "id": "sintomo",
    "word": "Sintomo",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'syn' (insieme) + 'tomos' (taglio, separazione visibile)",
      "Dal greco 'symptoma' (coincidenza, caduta insieme di segni)",
      "Dal latino 'symptoma' (segnale esterno visibile della malattia)"
    ],
    "story": "Il greco 'symptoma' veniva da 'syn-pipto' — cadere insieme. Un sintomo era una coincidenza, qualcosa che capitava insieme a qualcos'altro. I medici greci osservavano che certi segni cadevano insieme e indicavano una malattia. Un sintomo è dunque una coincidenza diventata diagnosi.",
    "shortEtymology": "dal greco symptoma → coincidenza, caduta insieme di segni",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "farmaco",
      "chirurgo",
      "malinconia",
      "ospedale"
    ],
    "difficulty": 1
  },
  {
    "id": "ospedale",
    "word": "Ospedale",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'hospitium' (luogo di cura per i malati più poveri)",
      "Dal latino 'hospes' (il guaritore, chi accoglie i sofferenti)",
      "Dal latino 'hospitale' (luogo per ospiti, poi per malati e pellegrini)"
    ],
    "story": "Il latino 'hospitale' era semplicemente un luogo per accogliere gli ospiti — da 'hospes'. Nel Medioevo i monasteri accoglievano pellegrini, poveri e malati. I luoghi di cura erano case per ospiti. Da 'hospes' vengono anche 'hotel', 'ostello', 'ospitalità'. I malati erano ospiti — e noi li trattiamo ancora così.",
    "shortEtymology": "dal latino hospitale → luogo per ospiti (poi per malati)",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "chirurgo",
      "farmaco",
      "sintomo"
    ],
    "difficulty": 1
  },
  {
    "id": "candidato",
    "word": "Candidato",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'candidatus' (chi indossa la toga bianca)",
      "Dal latino 'candere' (chi brilla per onestà)",
      "Dal greco 'kandìd' (colui che è scelto dal popolo)"
    ],
    "story": "Nell'antica Roma, chi aspirava a una carica pubblica usava sbiancare la propria toga con il gesso per apparire 'candido'. Questo simboleggiava purezza e onestà. Se volevi il voto, dovevi letteralmente splendere di bianco.",
    "shortEtymology": "latino candidatus → vestito di bianco",
    "category": "societa",
    "relatedWords": [
      "sincero",
      "palazzo",
      "municipio",
      "senato",
      "candela"
    ],
    "difficulty": 1
  },
  {
    "id": "salario",
    "word": "Salario",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'salire' (il balzo della ricchezza)",
      "Dal nome della Via Salaria, dove si commerciava",
      "Dal latino 'salarium' (razione di sale per i soldati)"
    ],
    "story": "Il sale era l'oro bianco dell'antichità, fondamentale per conservare i cibi. Ai soldati romani veniva data una razione di sale o il denaro per comprarlo (salarium). Oggi il sale lo compri al supermercato, ma il nome della tua fatica è rimasto lo stesso.",
    "shortEtymology": "latino salarium → razione di sale",
    "category": "commercio",
    "relatedWords": [
      "pecunia",
      "denaro",
      "stipendio",
      "moneta",
      "salame"
    ],
    "difficulty": 1
  },
  {
    "id": "rivale",
    "word": "Rivale",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'rixa' (chi rissava per i confini)",
      "Dal latino 'rivalis' (chi condivide lo stesso ruscello)",
      "Dal greco 'erival' (colui che sfida l'onore)"
    ],
    "story": "In origine, i 'rivales' erano semplicemente i vicini di casa che usavano la stessa acqua del ruscello ('rivus'). Ma l'acqua è sempre stata poca, e da semplici vicini a feroci competitori il passo è stato brevissimo.",
    "shortEtymology": "latino rivalis → chi usa lo stesso ruscello (rivus)",
    "category": "societa",
    "relatedWords": [
      "ciao",
      "palazzo",
      "scuola",
      "libro"
    ],
    "difficulty": 2
  },
  {
    "id": "compagno",
    "word": "Compagno",
    "correctAnswer": 0,
    "options": [
      "Dal latino medievale 'cum panis' (chi mangia lo stesso pane)",
      "Dal latino 'cum panico' (chi affronta insieme la paura)",
      "Dal germanico 'kumpan' (guerriero della stessa tenda)"
    ],
    "story": "Nulla unisce più della tavola. Un compagno è, letteralmente, qualcuno con cui dividi la pagnotta. È un termine che nasce dalla vita militare e monastica, dove il pane era il simbolo della sopravvivenza comune.",
    "shortEtymology": "latino cum panis → chi condivide il pane",
    "category": "societa",
    "relatedWords": [
      "pane",
      "ciao",
      "palazzo",
      "scuola"
    ],
    "difficulty": 1
  },
  {
    "id": "sincero",
    "word": "Sincero",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'simul-cera' (finto come la cera)",
      "Dal greco 'syn-kèros' (dal cuore unito)",
      "Dal latino 'sine cera' (senza cera, senza trucco)"
    ],
    "story": "Si dice che gli scultori romani usassero la cera per nascondere le crepe nel marmo. Una statua 'sincera' era senza cera, quindi perfetta e senza difetti nascosti. Essere sinceri significa non avere crepe da tappare con il trucco.",
    "shortEtymology": "latino sine cera → senza cera (puro)",
    "category": "societa",
    "relatedWords": [
      "candidato",
      "candela",
      "ciao",
      "palazzo"
    ],
    "difficulty": 2
  },
  {
    "id": "pecunia",
    "word": "Pecunia",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'pecus' (bestiame, pecora)",
      "Dal greco 'pèkon' (misura di peso dell'oro)",
      "Dal latino 'pectus' (ciò che si tiene vicino al petto)"
    ],
    "story": "Prima delle monete, la ricchezza si misurava in pecore e mucche. 'Pecus' significa bestiame: più pecore avevi, più eri ricco. Se oggi dici che 'la pecunia non olet', ricorda che all'inizio profumava di stalla.",
    "shortEtymology": "latino pecus → bestiame",
    "category": "commercio",
    "relatedWords": [
      "salario",
      "denaro",
      "stipendio",
      "moneta",
      "finanza"
    ],
    "difficulty": 2
  },
  {
    "id": "capriccio",
    "word": "Capriccio",
    "correctAnswer": 1,
    "options": [
      "Dall'unione di 'capo' e 'riccio' (testa arruffata)",
      "Dal salto della 'capra' e dal 'riccio' che si chiude",
      "Dal latino 'capere' (afferrare un'idea improvvisa)"
    ],
    "story": "È una parola strana che mescola animali. Indica il balzo improvviso di una capra e il 'raggricciarsi' della pelle o dei capelli per la paura o l'emozione. Un desiderio che salta fuori dal nulla come una capra in montagna.",
    "shortEtymology": "incrocio tra capra e riccio → balzo improvviso",
    "category": "corpo",
    "relatedWords": [
      "testa",
      "cappello",
      "fantasia",
      "capitale",
      "mentire"
    ],
    "difficulty": 3
  },
  {
    "id": "persona",
    "word": "Persona",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'per se' (entità a sé stante)",
      "Dal greco 'pèrshon' (individuo libero)",
      "Dal latino 'per-sonare' (risuonare attraverso)"
    ],
    "story": "In origine, la 'persona' era la maschera di legno degli attori teatrali. Era fatta in modo da far 'risuonare' (per-sonare) la voce più forte. Tutti noi, etimologicamente, siamo maschere che fanno passare un suono.",
    "shortEtymology": "latino per-sonare → risuonare attraverso la maschera",
    "category": "societa",
    "relatedWords": [
      "ciao",
      "palazzo",
      "scuola",
      "libro"
    ],
    "difficulty": 2
  },
  {
    "id": "ospite",
    "word": "Ospite",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'ospitare' (dare rifugio)",
      "Dal latino 'hospes' (straniero, sia chi accoglie che chi è accolto)",
      "Dal greco 'ospìs' (colui che mangia alla tua tavola)"
    ],
    "story": "La parola 'hospes' è magica: indicava sia il padrone di casa che il forestiero. In antichità, lo straniero era sacro. Curiosamente, ha la stessa radice di 'hostis' (nemico). L'ospite è qualcuno che potrebbe essere un nemico, ma che scegli di accogliere.",
    "shortEtymology": "latino hospes → straniero/padrone di casa",
    "category": "societa",
    "relatedWords": [
      "ciao",
      "palazzo",
      "scuola",
      "libro"
    ],
    "difficulty": 2
  },
  {
    "id": "mentire",
    "word": "Mentire",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'mens' (usare la mente per inventare)",
      "Dal latino 'mancus' (parola monca o difettosa)",
      "Dal greco 'mèntis' (astuzia divina)"
    ],
    "story": "Mentire deriva da 'mens', la mente. È l'atto di 'inventare con la mente' qualcosa che non esiste. La bugia è un prodotto intellettuale: per mentire bene, serve un sacco di cervello (e memoria).",
    "shortEtymology": "latino mens → invenzione della mente",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "malinconia",
      "dieta",
      "capriccio"
    ],
    "difficulty": 1
  },
  {
    "id": "desiderio",
    "word": "Desiderio",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'de-sidere' (stare seduti ad aspettare)",
      "Dal greco 'desìderon' (legame dell'anima)",
      "Dal latino 'de-sidera' (mancanza di stelle)"
    ],
    "story": "Il 'desiderio' è la sensazione di chi osserva il cielo e sente la mancanza delle stelle ('sidera'). È la nostalgia di una guida lucente, l'attesa di qualcosa di superiore che non vediamo più. Siamo tutti orfani di stelle.",
    "shortEtymology": "latino de-sidera → mancanza di stelle",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "capriccio",
      "coraggio",
      "pazienza",
      "follia"
    ],
    "difficulty": 3
  },
  {
    "id": "canicola",
    "word": "Canicola",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'canicula' (piccola cagna, riferito alla stella Sirio)",
      "Dal greco 'kanikòs' (caldo che brucia la gola)",
      "Dal fatto che i cani soffrono molto il caldo estivo"
    ],
    "story": "La 'canicula' è la stella Sirio (nella costellazione del Cane Maggiore). In estate sorge insieme al sole, e gli antichi pensavano che il suo calore si sommasse a quello solare. Quindi no, non c'entrano i cani che ansimano, ma una stella lontana.",
    "shortEtymology": "latino canicula → piccola cagna (Sirio)",
    "category": "natura",
    "relatedWords": [
      "monsone",
      "orizzonte",
      "clima",
      "aurora",
      "tarantola"
    ],
    "difficulty": 2
  },
  {
    "id": "pianeta",
    "word": "Pianeta",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'planus' (perché sembra piatto nel cielo)",
      "Dal greco 'planètes' (errante, vagabondo)",
      "Dal greco 'piànet' (grande cerchio luminoso)"
    ],
    "story": "A differenza delle stelle 'fisse', i pianeti sembrano muoversi nel cielo in modo imprevedibile. Per i greci erano 'planètes asteres', stelle vagabonde. Se ti senti un po' perso, sei in buona compagnia: anche la Terra è una vagabonda.",
    "shortEtymology": "greco planètes → vagabondo",
    "category": "scienza",
    "relatedWords": [
      "galassia",
      "energia",
      "atomo",
      "elettricità",
      "disastro"
    ],
    "difficulty": 2
  },
  {
    "id": "galassia",
    "word": "Galassia",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'gal-ax' (spirale di luce)",
      "Dal latino 'galla' (per la forma a sfera)",
      "Dal greco 'gàla' (latte)"
    ],
    "story": "La nostra galassia appare come una striscia bianca. Per i greci era il 'kyklos galaxias', il cerchio di latte spruzzato dal seno della dea Era mentre allattava Eracle. L'universo, per noi, è iniziato con una colazione divina.",
    "shortEtymology": "greco gàla → latte",
    "category": "scienza",
    "relatedWords": [
      "pianeta",
      "energia",
      "atomo",
      "elettricità",
      "disastro"
    ],
    "difficulty": 1
  },
  {
    "id": "orizzonte",
    "word": "Orizzonte",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'horìzon' (che limita, che confina)",
      "Dal latino 'oris' (bocca del mondo)",
      "Dal greco 'horòs' (montagna che chiude la vista)"
    ],
    "story": "Deriva da 'hòros', che significa confine o limite. L'orizzonte è la linea che 'delimita' il nostro sguardo. È il confine tra ciò che sappiamo e l'ignoto. Più cammini, più il confine si sposta.",
    "shortEtymology": "greco horìzon → che delimita",
    "category": "natura",
    "relatedWords": [
      "clima",
      "eco",
      "monsone",
      "canicola",
      "tramontana",
      "vulcano"
    ],
    "difficulty": 2
  },
  {
    "id": "clima",
    "word": "Clima",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'clamare' (il richiamo dei venti)",
      "Dal greco 'klìma' (inclinazione della terra)",
      "Dal greco 'klìmax' (scala di temperature)"
    ],
    "story": "Per i greci, il clima dipendeva dall'inclinazione ('klíma') della Terra rispetto ai raggi del Sole: a diversa inclinazione corrispondevano diverse temperature e stagioni. Oggi sappiamo quanto le attività umane influenzino l'atmosfera, ma l'etimologia ci ricorda l'inclinazione astronomica del nostro pianeta.",
    "shortEtymology": "greco klíma → inclinazione della Terra",
    "category": "natura",
    "relatedWords": [
      "mondo",
      "orizzonte",
      "disastro",
      "pianeta",
      "monsone"
    ],
    "difficulty": 2
  },
  {
    "id": "aurora",
    "word": "Aurora",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'aurum' (per il colore dell'oro)",
      "Dal greco 'auròs' (soffio di luce)",
      "Dal latino 'aurora' (legato alla radice indoeuropea del brillare)"
    ],
    "story": "La radice antica è 'aus', che indica il brillare. L'aurora è il momento in cui la luce 'brucia' l'oscurità. È cugina di 'oro' e 'austro' (il vento del sud). È il risveglio luminoso del mondo.",
    "shortEtymology": "latino aurora → brillare",
    "category": "natura",
    "relatedWords": [
      "canicola",
      "monsone",
      "orizzonte",
      "clima"
    ],
    "difficulty": 2
  },
  {
    "id": "tramontana",
    "word": "Tramontana",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'trans-montes' (oltre i monti, le Alpi)",
      "Dal fatto che soffia quando il sole tramonta",
      "Dal latino 'intra-montes' (dentro le montagne)"
    ],
    "story": "È il vento che viene da 'oltre i monti', riferito alle Alpi per chi vive in Italia. Quando soffia, l'aria è limpida e gelida. Se 'perdi la tramontana', perdi la bussola, perché quel vento indica sempre il nord.",
    "shortEtymology": "latino trans-montes → oltre i monti",
    "category": "natura",
    "relatedWords": [
      "monsone",
      "canicola",
      "orizzonte",
      "clima"
    ],
    "difficulty": 1
  },
  {
    "id": "vulcano",
    "word": "Vulcano",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'bulkàn' (terra che bolle)",
      "Dal dio romano Vulcano, fabbro degli dei",
      "Dal latino 'vulgus' (fuoco del popolo)"
    ],
    "story": "Per i romani, le eruzioni erano le scintille della fucina del dio Vulcano, che lavorava il ferro sotto terra (spesso sotto l'Etna). Ogni volta che il vulcano brontola, è solo un dio che sta forgiando un'armatura.",
    "shortEtymology": "dal dio romano Vulcanus",
    "category": "natura",
    "relatedWords": [
      "monsone",
      "canicola",
      "orizzonte",
      "clima"
    ],
    "difficulty": 1
  },
  {
    "id": "record",
    "word": "Record",
    "correctAnswer": 2,
    "options": [
      "Dal latino 're-currere' (correre di nuovo)",
      "Dal francese 'record' (dimostrazione di forza)",
      "Dal latino 're-cordari' (riportare al cuore)"
    ],
    "story": "Anticamente si pensava che la memoria risiedesse nel cuore ('cor'). 'Ricordare' o fare un 'record' significa letteralmente riportare un fatto al cuore per non dimenticarlo. Il cuore è il primo hard disk dell'umanità.",
    "shortEtymology": "latino re-cordari → riportare al cuore",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "malinconia",
      "dieta",
      "capriccio"
    ],
    "difficulty": 2
  },
  {
    "id": "coraggio",
    "word": "Coraggio",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'cor-agere' (agire con il cuore)",
      "Dal francese 'corage' (forza della pelle)",
      "Dal greco 'kòros' (gioventù impetuosa)"
    ],
    "story": "Avere coraggio non significa non avere paura, ma 'agire con il cuore'. La radice 'cor' ci dice che la forza non sta nei muscoli, ma nel centro del nostro petto. È una questione di ritmo cardiaco.",
    "shortEtymology": "latino cor-agere → agire col cuore",
    "category": "corpo",
    "relatedWords": [
      "desiderio",
      "fantasia",
      "capriccio",
      "pazienza",
      "follia"
    ],
    "difficulty": 1
  },
  {
    "id": "pazienza",
    "word": "Pazienza",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'pàthos' (forte emozione)",
      "Dal latino 'pati' (soffrire, sopportare)",
      "Dal latino 'pax' (stato di pace interiore)"
    ],
    "story": "La pazienza non è solo aspettare. Deriva da 'pati', la stessa radice di 'patire' e 'passione'. È la capacità di sopportare una sofferenza o un peso senza spezzarsi. È una forza silenziosa, non una virtù passiva.",
    "shortEtymology": "latino pati → sopportare/patire",
    "category": "corpo",
    "relatedWords": [
      "desiderio",
      "coraggio",
      "fantasia",
      "capriccio"
    ],
    "difficulty": 2
  },
  {
    "id": "entusiasmo",
    "word": "Entusiasmo",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'en-thỳmos' (dentro l'animo)",
      "Dal latino 'in-tùs' (spinta interiore)",
      "Dal greco 'en-theos' (avere un dio dentro)"
    ],
    "story": "Quando sei entusiasta, per i greci eri letteralmente 'posseduto da un dio' ('en-theos'). È una forza sacra che ti fa fare cose incredibili. Se ti senti carichissimo, forse hai una divinità che ti sta prestando le batterie.",
    "shortEtymology": "greco en-theos → con dio dentro",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "estasi",
      "magari",
      "capriccio"
    ],
    "difficulty": 3
  },
  {
    "id": "follia",
    "word": "Follia",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'follis' (mantice, sacco vuoto)",
      "Dal greco 'phòllos' (chi vaga senza meta)",
      "Dal latino 'folium' (leggero come una foglia)"
    ],
    "story": "Il 'follis' era il mantice per soffiare sul fuoco o un pallone pieno d'aria. Il folle è letteralmente una 'testa vuota', un sacco pieno di vento che non ha peso né senno. Una metafora un po' cattiva, ma molto visiva.",
    "shortEtymology": "latino follis → mantice/vuoto",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "capriccio",
      "desiderio",
      "coraggio"
    ],
    "difficulty": 2
  },
  {
    "id": "genio",
    "word": "Genio",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'ghènos' (razza superiore)",
      "Dal latino 'genius' (spirito generatore che assiste l'uomo)",
      "Dal latino 'ingenium' (macchina da guerra)"
    ],
    "story": "Per i romani, il 'Genius' era uno spirito divino che ti veniva assegnato alla nascita e che 'generava' le tue capacità. Non eri tu bravo, era il tuo Genio che ti suggeriva le risposte. Un ottimo modo per restare umili.",
    "shortEtymology": "latino genius → spirito generatore",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "capriccio",
      "desiderio",
      "coraggio"
    ],
    "difficulty": 2
  },
  {
    "id": "talento",
    "word": "Talento",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'talantìs' (capacità di vedere lontano)",
      "Dal latino 'talem' (tale padre, tale figlio)",
      "Dal greco 'tàlanton' (piatto della bilancia, unità di peso)"
    ],
    "story": "In origine il talento era un peso di metallo prezioso (una moneta). È diventato una dote della mente grazie alla parabola del Vangelo: il padrone affida dei 'talenti' ai servi. Chi li usa bene, dimostra di avere... talento.",
    "shortEtymology": "greco tàlanton → peso/moneta",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "capriccio",
      "desiderio",
      "coraggio"
    ],
    "difficulty": 2
  },
  {
    "id": "sogno",
    "word": "Sogno",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'syn-gon' (conoscenza profonda)",
      "Dal latino 'somnium' (legato a somnus, il sonno)",
      "Dal latino 'sub-gnomon' (sotto la coscienza)"
    ],
    "story": "Il sogno è il figlio del sonno ('somnus'). Per gli antichi era una porta verso il futuro o il divino. Etimologicamente è un'attività 'mentre si dorme', ma per molti è l'unico modo per vedere la realtà chiaramente.",
    "shortEtymology": "latino somnium → legato al sonno",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "capriccio",
      "desiderio",
      "coraggio"
    ],
    "difficulty": 1
  },
  {
    "id": "idiota",
    "word": "Idiota",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'idem' (chi dice sempre la stessa cosa)",
      "Dal greco 'idios' (chi è strano)",
      "Dal greco 'ididotes' (chi si cura solo dei fatti propri)"
    ],
    "story": "Nell'antica Grecia, l'idiota era il cittadino privato che non si occupava di politica e della comunità, pensando solo ai suoi interessi ('idios'). Non era stupido, era solo egoista. Poi le due cose sono finite per coincidere.",
    "shortEtymology": "greco idiotes → persona privata/egoista",
    "category": "societa",
    "relatedWords": [
      "scuola",
      "atleta",
      "stadio",
      "democrazia"
    ],
    "difficulty": 3
  },
  {
    "id": "ristorante",
    "word": "Ristorante",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'restare' (luogo dove ci si ferma)",
      "Dal francese 'ristor' (luogo di lusso)",
      "Dal francese 'restaurant' (che ristora, che ridà forza)"
    ],
    "story": "Nel 1765, a Parigi, un certo Boulanger aprì un locale dove serviva brodi caldi capaci di 'ristorare' lo stomaco. Sull'insegna c'era scritto: 'Venite a me, voi che soffrite allo stomaco, e io vi ristorerò'. Funzionò.",
    "shortEtymology": "francese restaurant → che ristora",
    "category": "cucina",
    "relatedWords": [
      "pizza",
      "ricetta",
      "pasta",
      "simposio",
      "vino"
    ],
    "difficulty": 1
  },
  {
    "id": "simposio",
    "word": "Simposio",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'syn-pino' (bere insieme)",
      "Dal latino 'simul-positus' (messi insieme)",
      "Dal greco 'sym-pòsion' (discorso comune)"
    ],
    "story": "Oggi è un convegno serio tra professori. Ma per i greci era la parte della cena dedicata al bere collettivo. Si beveva, si cantava e si filosofava. L'idea era che la verità uscisse meglio se accompagnata da un buon vino.",
    "shortEtymology": "greco syn-pino → bere insieme",
    "category": "cucina",
    "relatedWords": [
      "marmellata",
      "scuola",
      "labirinto",
      "atleta",
      "pizza"
    ],
    "difficulty": 3
  },
  {
    "id": "salame",
    "word": "Salame",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'salumen' (carne messa sotto sale)",
      "Dal nome della città di Salamina",
      "Dal germanico 'salam' (pezzo tagliato)"
    ],
    "story": "Il nome dice tutto: è carne conservata grazie al sale ('sal'). Prima del frigorifero, il sale era l'unico modo per non far andare a male la carne. Il salame è, tecnicamente, un monumento alla conservazione chimica antica.",
    "shortEtymology": "latino salumen → carne salata",
    "category": "cucina",
    "relatedWords": [
      "pizza",
      "pasta",
      "ricetta",
      "salario",
      "pane"
    ],
    "difficulty": 1
  },
  {
    "id": "pane",
    "word": "Pane",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'pan' (tutto, perché è l'alimento base)",
      "Dal latino 'panis' (legato alla radice pas-, nutrire)",
      "Dal latino 'pandere' (perché l'impasto si stende)"
    ],
    "story": "La radice indoeuropea 'pa-' significa nutrire o proteggere (la stessa di 'pascolo' e 'pastore'). Il pane è il nutrimento per eccellenza, ciò che tiene in vita l'umanità da quando abbiamo smesso di cacciare e iniziato a seminare.",
    "shortEtymology": "latino panis → nutrimento",
    "category": "cucina",
    "relatedWords": [
      "compagno",
      "pizza",
      "pasta",
      "ricetta",
      "salame"
    ],
    "difficulty": 2
  },
  {
    "id": "vino",
    "word": "Vino",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'vinòs' (bevanda scura)",
      "Dal latino 'vincere' (perché vince la tristezza)",
      "Dal latino 'vinum' (legato alla radice vi-, intrecciare, come i tralci della vite)"
    ],
    "story": "La vite è una pianta rampicante che si intreccia e si piega ('vi-'). Il vino prende il nome dalla flessuosità della pianta che produce l'uva. Un nome che parla di flessibilità, anche se dopo tre bicchieri sei tutto meno che flessibile.",
    "shortEtymology": "latino vinum → legato alla vite intrecciata",
    "category": "cucina",
    "relatedWords": [
      "pizza",
      "pasta",
      "ricetta",
      "ristorante"
    ],
    "difficulty": 3
  },
  {
    "id": "carne",
    "word": "Carne",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'caro' (pezzo tagliato)",
      "Dal greco 'kàrnos' (corpo morto)",
      "Dal latino 'carnis' (parte molle del corpo)"
    ],
    "story": "In origine significava 'porzione' o 'taglio'. Deriva da una radice che significa tagliare o staccare. La carne è ciò che viene diviso e distribuito. Una visione molto pratica e poco sentimentale del nostro corpo.",
    "shortEtymology": "latino caro → pezzo tagliato",
    "category": "cucina",
    "relatedWords": [
      "pizza",
      "pasta",
      "ricetta",
      "ristorante",
      "salame",
      "cappuccino"
    ],
    "difficulty": 2
  },
  {
    "id": "bussola",
    "word": "Bussola",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'bucca' (per la forma a bocca)",
      "Dal nome del legno di bosso (buxus) con cui era fatta la scatola",
      "Dall'arabo 'buss-al' (indicatore del nord)"
    ],
    "story": "I primi navigatori custodivano l'ago magnetico in una scatolina di legno di bosso ('buxus'). Col tempo, il nome del contenitore è passato al contenuto. Senza quel legnetto, saremmo ancora tutti fermi in porto.",
    "shortEtymology": "latino buxus → legno di bosso",
    "category": "viaggio",
    "relatedWords": [
      "porto",
      "viaggio",
      "pellegrino",
      "molo",
      "valigia"
    ],
    "difficulty": 2
  },
  {
    "id": "viaggio",
    "word": "Viaggio",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'via-agere' (fare strada)",
      "Dal greco 'viàghion' (attraversamento)",
      "Dal latino 'viaticum' (provviste per la strada)"
    ],
    "story": "Il 'viaticum' era tutto ciò che serviva per mettersi in cammino: cibo, soldi e vestiti. Oggi il viaggio è l'esperienza, ma per i latini era prima di tutto l'organizzazione logistica per non morire di fame tra una città e l'altra.",
    "shortEtymology": "latino viaticum → provviste per la via",
    "category": "viaggio",
    "relatedWords": [
      "porto",
      "molo",
      "nave",
      "darsena",
      "bussola"
    ],
    "difficulty": 1
  },
  {
    "id": "pellegrino",
    "word": "Pellegrino",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'per-agrum' (colui che attraversa i campi)",
      "Dal latino 'pelagus' (colui che viene dal mare)",
      "Dal greco 'pellegrìn' (chi cerca il sacro)"
    ],
    "story": "In origine il 'peregrinus' era lo straniero, colui che camminava fuori dalle città, attraverso i campi ('ager'). Poi è diventato chi viaggia per fede. Il pellegrino è chiunque non stia fermo tra le mura di casa.",
    "shortEtymology": "latino per-agrum → attraverso i campi",
    "category": "viaggio",
    "relatedWords": [
      "bussola",
      "porto",
      "viaggio",
      "molo",
      "albergo",
      "propaganda"
    ],
    "difficulty": 2
  },
  {
    "id": "isola",
    "word": "Isola",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'isòs' (perché è uguale da tutti i lati)",
      "Dal latino 'insula' (legato a in-salo, stare nel mare)",
      "Dal latino 'isolatus' (staccato dalla terra)"
    ],
    "story": "Probabilmente deriva da 'in salo', ovvero 'ciò che sta nel mare' (il sale). L'isola è la terra che sfida l'acqua salata. Un concetto semplice: un pezzetto di mondo circondato dal blu.",
    "shortEtymology": "latino insula → in mare (sale)",
    "category": "natura",
    "relatedWords": [
      "tarantola",
      "zanzara",
      "monsone",
      "canicola"
    ],
    "difficulty": 1
  },
  {
    "id": "molo",
    "word": "Molo",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'mòlos' (limite del mare)",
      "Dal latino 'mollis' (perché l'acqua vi batte dolcemente)",
      "Dal latino 'moles' (massa, grande peso di pietre)"
    ],
    "story": "Un molo è una 'moles', una massa enorme di pietre ammucchiate per resistere alla forza delle onde. È la forza bruta dell'architettura contro l'instabilità dell'oceano.",
    "shortEtymology": "latino moles → massa/struttura pesante",
    "category": "viaggio",
    "relatedWords": [
      "porto",
      "viaggio",
      "nave",
      "darsena",
      "bussola"
    ],
    "difficulty": 2
  },
  {
    "id": "nave",
    "word": "Nave",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'naus' (riferito al nuotare)",
      "Dal latino 'navis' (legato alla forma del nido)",
      "Dal fenicio 'nav' (tronco scavato)"
    ],
    "story": "La radice indoeuropea 'nau-' è legata al concetto di scorrere o galleggiare. È una delle parole più antiche del mondo, perché l'uomo ha capito quasi subito che un tronco nell'acqua era meglio di una camminata nel fango.",
    "shortEtymology": "greco naus → galleggiante",
    "category": "viaggio",
    "relatedWords": [
      "porto",
      "viaggio",
      "molo",
      "darsena",
      "atlante"
    ],
    "difficulty": 1
  },
  {
    "id": "valigia",
    "word": "Valigia",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'vallis' (perché capiente come una valle)",
      "Dall'arabo 'waliha' (sacco di cuoio)",
      "Dal francese 'valise' (contenitore per il cavallo)"
    ],
    "story": "Arriva dall'arabo 'waliha', che indicava un grande sacco per il grano. Poi è diventata il contenitore di cuoio per i vestiti. Prima di avere le rotelle, la valigia era letteralmente un sacco pesante da trascinarsi dietro.",
    "shortEtymology": "arabo waliha → sacco di cuoio",
    "category": "viaggio",
    "relatedWords": [
      "darsena",
      "porto",
      "bussola",
      "viaggio"
    ],
    "difficulty": 3
  },
  {
    "id": "albergo",
    "word": "Albergo",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'albus' (bianco, per le lenzuola pulite)",
      "Dal greco 'albergh' (luogo di riposo)",
      "Dal germanico 'hariberg' (alloggio per l'esercito)"
    ],
    "story": "In origine era un termine militare: 'hari' (esercito) e 'berg' (protezione/rifugio). Era il luogo dove l'esercito si accampava al sicuro. Oggi ci dormi tu in vacanza, sperando che non ci sia un esercito nella stanza accanto.",
    "shortEtymology": "germanico hariberg → rifugio dell'esercito",
    "category": "viaggio",
    "relatedWords": [
      "porto",
      "bussola",
      "viaggio",
      "pellegrino"
    ],
    "difficulty": 2
  },
  {
    "id": "mappa",
    "word": "Mappa",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'mappa' (tovaglia, fazzoletto)",
      "Dal greco 'màppe' (disegno del mondo)",
      "Dal latino 'mappa' (pelle di animale)"
    ],
    "story": "Per i romani la 'mappa' era il fazzoletto o la tovaglia. Siccome le prime carte geografiche venivano disegnate su pezzi di stoffa o pergamene rettangolari, il nome della tovaglia è passato al mondo intero.",
    "shortEtymology": "latino mappa → tovaglia/stoffa",
    "category": "viaggio",
    "relatedWords": [
      "porto",
      "bussola",
      "viaggio",
      "pellegrino",
      "darsena"
    ],
    "difficulty": 2
  },
  {
    "id": "estasi",
    "word": "Estasi",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'ex-stasi' (mancanza di equilibrio)",
      "Dal greco 'ex-stasis' (uscire fuori da se stessi)",
      "Dal greco 'estos' (gioia suprema)"
    ],
    "story": "L'estasi è letteralmente lo stare ('stasis') fuori ('ex'). È quel momento in cui l'emozione è così forte che ti senti proiettato fuori dal tuo corpo. Utile per i santi e per chi mangia una pizza incredibile.",
    "shortEtymology": "greco ex-stasis → uscire fuori",
    "category": "corpo",
    "relatedWords": [
      "fantasia",
      "entusiasmo",
      "magari",
      "capriccio"
    ],
    "difficulty": 3
  },
  {
    "id": "museo",
    "word": "Museo",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'mouseion' (luogo sacro alle Muse)",
      "Dal latino 'musae' (ispirazione artistica)",
      "Dal greco 'musè' (raccolta di oggetti)"
    ],
    "story": "Il primo museo era un tempio dedicato alle Muse, le protettrici delle arti e delle scienze. Non era un posto dove si guardavano quadri in silenzio, ma un centro di ricerca e ispirazione divina. Oggi è più calmo, ma le Muse ci abitano ancora.",
    "shortEtymology": "greco mouseion → tempio delle Muse",
    "category": "arte",
    "relatedWords": [
      "musica",
      "catastrofe",
      "teatro",
      "poesia",
      "stile",
      "scultura",
      "silhouette"
    ],
    "difficulty": 1
  },
  {
    "id": "teatro",
    "word": "Teatro",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'theatrum' (luogo delle voci)",
      "Dal greco 'theatron' (luogo da cui si guarda)",
      "Dal greco 'theos' (perché sacro agli dei)"
    ],
    "story": "Deriva dal verbo 'theaomai', guardare. Il teatro è letteralmente il 'luogo della visione'. Prima ancora che per ascoltare le storie, ci si andava per vedere lo spettacolo. Lo sguardo è l'anima del teatro.",
    "shortEtymology": "greco theatron → luogo per guardare",
    "category": "arte",
    "relatedWords": [
      "catastrofe",
      "commedia",
      "tragedia",
      "museo",
      "musica"
    ],
    "difficulty": 2
  },
  {
    "id": "musica",
    "word": "Musica",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'mys-ikos' (suono del topo, per i suoni acuti)",
      "Dal latino 'musa' (canto armonioso)",
      "Dal greco 'mousikè' (l'arte delle Muse)"
    ],
    "story": "Come il museo, anche la musica appartiene alle Muse. In origine non indicava solo i suoni, ma tutto ciò che era ispirato dalle Muse: poesia, danza e canto. Se la canzone è bella, ringrazia le Muse (o l'algoritmo).",
    "shortEtymology": "greco mousikè → arte delle Muse",
    "category": "arte",
    "relatedWords": [
      "museo",
      "catastrofe",
      "teatro",
      "poesia"
    ],
    "difficulty": 1
  },
  {
    "id": "poesia",
    "word": "Poesia",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'poiesis' (fare, creare)",
      "Dal latino 'poena' (perché nasce dal dolore)",
      "Dal greco 'poie-sis' (parola ritmata)"
    ],
    "story": "Il poeta è un 'facitore' (dal verbo poièo). La poesia non è solo sentimento, è costruzione, artigianato della parola. Scrivere una poesia significa 'fare' qualcosa che prima non esisteva, pezzo dopo pezzo.",
    "shortEtymology": "greco poiesis → creazione/fare",
    "category": "arte",
    "relatedWords": [
      "museo",
      "musica",
      "catastrofe",
      "teatro"
    ],
    "difficulty": 3
  },
  {
    "id": "etimologia",
    "word": "Etimologia",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'etim' (passato) e 'logos' (studio)",
      "Dal greco 'etymon' (vero) e 'logos' (studio/parola)",
      "Dal latino 'et-imo' (origine del suono)"
    ],
    "story": "È lo studio del significato 'vero' delle parole. 'Etymon' significa verità. Cercare l'etimologia significa scavare nel fango della storia per trovare la gemma nascosta nel significato originale di ciò che diciamo.",
    "shortEtymology": "greco etymon → vero",
    "category": "storia",
    "relatedWords": [
      "domenica",
      "giovedi",
      "maratona",
      "archivio"
    ],
    "difficulty": 2
  },
  {
    "id": "diploma",
    "word": "Diploma",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'diploos' (doppio, foglio piegato in due)",
      "Dal latino 'di-ploma' (scritto ufficiale)",
      "Dal greco 'diplèo' (onore concesso)"
    ],
    "story": "In origine era un foglio di raccomandazione piegato in due, usato dai messaggeri imperiali per viaggiare gratis. Oggi lo prendi dopo anni di studio, ma la forma (ideale) del foglio piegato è rimasta nel nome.",
    "shortEtymology": "greco diploos → doppio/piegato",
    "category": "societa",
    "relatedWords": [
      "scuola",
      "archivio",
      "carta",
      "atlante",
      "libro"
    ],
    "difficulty": 2
  },
  {
    "id": "archivio",
    "word": "Archivio",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'arca' (cassa per oggetti)",
      "Dal greco 'archeion' (palazzo del magistrato)",
      "Dal greco 'archè' (origine del tempo)"
    ],
    "story": "L''archeion' era il palazzo dove risiedevano gli arconti (i capi) e dove si custodivano le leggi. È il luogo dove il potere conserva le prove della sua esistenza. Se cerchi un documento, stai entrando nel palazzo del capo.",
    "shortEtymology": "greco archeion → palazzo pubblico",
    "category": "storia",
    "relatedWords": [
      "fotografia",
      "diploma",
      "scuola",
      "carta",
      "etimologia"
    ],
    "difficulty": 3
  },
  {
    "id": "monumento",
    "word": "Monumento",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'mons' (grande come un monte)",
      "Dal greco 'monos' (unico al mondo)",
      "Dal latino 'monere' (ricordare, ammonire)"
    ],
    "story": "Un monumento serve per 'monere', cioè per far ricordare qualcosa o qualcuno. È un monito che ci avvisa: 'Ehi, non dimenticare cosa è successo qui'. È la memoria fatta di pietra.",
    "shortEtymology": "latino monere → far ricordare",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio",
      "quarantena"
    ],
    "difficulty": 2
  },
  {
    "id": "energia",
    "word": "Energia",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'en-ergon' (che è al lavoro, in azione)",
      "Dal latino 'in-argia' (spinta vitale)",
      "Dal greco 'en-erghòs' (calore interno)"
    ],
    "story": "Deriva da 'ergon', lavoro. L'energia è letteralmente la capacità di essere 'al lavoro'. Senza energia, tutto è fermo. È la scintilla che trasforma il potenziale in realtà.",
    "shortEtymology": "greco en-ergon → al lavoro/in azione",
    "category": "scienza",
    "relatedWords": [
      "pianeta",
      "galassia",
      "atomo",
      "elettricità",
      "microscopio"
    ],
    "difficulty": 2
  },
  {
    "id": "robot",
    "word": "Robot",
    "correctAnswer": 1,
    "options": [
      "Dal tedesco 'rot' (rosso, come le luci)",
      "Dal ceco 'robota' (lavoro forzato, schiavitù)",
      "Dal latino 'robustus' (resistente)"
    ],
    "story": "Nel 1920 lo scrittore ceco Karel Čapek utilizzò per la prima volta la parola 'robot' nella sua opera teatrale fantascientifica R.U.R., su suggerimento del fratello Josef. La parola derivava da 'robota', che in ceco indicava il lavoro servile e forzato dei contadini. I robot sono nati, almeno nel nome, come operai schiavi.",
    "shortEtymology": "ceco robota → lavoro forzato",
    "category": "scienza",
    "relatedWords": [
      "calcolo",
      "algoritmo",
      "laser",
      "pixel",
      "spam"
    ],
    "difficulty": 1
  },
  {
    "id": "virus",
    "word": "Virus",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'vir' (piccolo essere)",
      "Dal latino 'vires' (forza invisibile)",
      "Dal latino 'virus' (veleno, succo viscido)"
    ],
    "story": "Prima di finire nei computer o nei libri di biologia, il virus era semplicemente il veleno dei serpenti o una sostanza viscida e tossica. Un nome che evoca pericolo fin dai tempi degli antichi romani.",
    "shortEtymology": "latino virus → veleno",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "chirurgo",
      "farmaco",
      "sintomo"
    ],
    "difficulty": 1
  },
  {
    "id": "atomo",
    "word": "Atomo",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'a-tomos' (che non si può tagliare)",
      "Dal latino 'ad-homo' (parte dell'uomo)",
      "Dal greco 'at-omos' (soffio invisibile)"
    ],
    "story": "Democrito pensava che, tagliando la materia all'infinito, si arrivasse a un pezzetto così piccolo da essere 'indivisibile' ('a-tomos'). Sappiamo che si possono dividere (e sono guai), ma il nome di Democrito è rimasto.",
    "shortEtymology": "greco a-tomos → indivisibile",
    "category": "scienza",
    "relatedWords": [
      "pianeta",
      "galassia",
      "energia",
      "elettricità",
      "spazio"
    ],
    "difficulty": 2
  },
  {
    "id": "laboratorio",
    "word": "Laboratorio",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'labium' (dove si parla)",
      "Dal latino 'labor' (lavoro, fatica)",
      "Dal greco 'lab-or' (prendere l'oro)"
    ],
    "story": "È semplicemente il 'luogo dove si lavora'. Ma 'labor' in latino implica fatica e sforzo. Non è un posto per pigri, ma dove si suda sulle provette per strappare segreti alla natura.",
    "shortEtymology": "latino labor → lavoro/fatica",
    "category": "scienza",
    "relatedWords": [
      "algoritmo",
      "calcolo",
      "epidemia",
      "cifra"
    ],
    "difficulty": 1
  },
  {
    "id": "elettricità",
    "word": "Elettricità",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'electus' (scelta delle scintille)",
      "Dal greco 'el-ekt' (luogo del sole)",
      "Dal greco 'èlektron' (ambra)"
    ],
    "story": "Se sfreghi un pezzo d'ambra ('èlektron') con un panno di lana, attira piccoli oggetti. I greci lo avevano notato 2500 anni fa. Tutta la nostra civiltà digitale ha il nome di una resina fossile di pino.",
    "shortEtymology": "greco èlektron → ambra",
    "category": "scienza",
    "relatedWords": [
      "pianeta",
      "galassia",
      "energia",
      "atomo"
    ],
    "difficulty": 3
  },
  {
    "id": "tecnica",
    "word": "Tecnica",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'techne' (arte, abilità manuale)",
      "Dal latino 'tectum' (costruire un tetto)",
      "Dal greco 'tekh' (velocità di esecuzione)"
    ],
    "story": "Per i greci non c'era differenza tra un artista e un artigiano: entrambi usavano la 'techne'. È l'abilità di saper fare qualcosa secondo le regole dell'arte. Che tu sia un fabbro o un programmatore, stai usando la tua 'techne'.",
    "shortEtymology": "greco techne → arte/mestiere",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "chirurgo",
      "farmaco",
      "sintomo"
    ],
    "difficulty": 2
  },
  {
    "id": "telescopio",
    "word": "Telescopio",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'tele-scopare' (pulire il cielo)",
      "Dal greco 'telos' (fine) e 'skopein' (guardare)",
      "Dal greco 'tèle' (lontano) e 'skopein' (guardare)"
    ],
    "story": "È l'unione di 'tèle' (lontano) e 'skopein' (osservare). Uno strumento per 'guardare lontano'. Semplice, efficace, e ci ha fatto capire che non siamo al centro di nulla. Grazie, Galileo.",
    "shortEtymology": "greco tèle + skopein → guardare lontano",
    "category": "scienza",
    "relatedWords": [
      "microscopio",
      "telefono",
      "pianeta",
      "galassia",
      "semaforo"
    ],
    "difficulty": 1
  },
  {
    "id": "microscopio",
    "word": "Microscopio",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'mikròs' (piccolo) e 'skopein' (guardare)",
      "Dal latino 'mica' (briciola) e 'scopio' (vista)",
      "Dal greco 'mikr' (nascosto) e 'skopein' (guardare)"
    ],
    "story": "Cugino del telescopio, ma rivolto verso il basso. Serve per 'guardare il piccolo'. Ci ha rivelato che sotto la nostra pelle c'è un mondo affollato quanto quello sopra le nostre teste.",
    "shortEtymology": "greco mikròs + skopein → guardare il piccolo",
    "category": "scienza",
    "relatedWords": [
      "telescopio",
      "pianeta",
      "galassia",
      "energia",
      "semaforo"
    ],
    "difficulty": 1
  },
  {
    "id": "stile",
    "word": "Stile",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'stylos' (colonna portante)",
      "Dal latino 'stilla' (goccia di talento)",
      "Dal latino 'stilus' (asticciola per scrivere sulla cera)"
    ],
    "story": "Lo 'stilus' era la penna di metallo o osso usata per incidere la cera. Ognuno scriveva con una pressione e un'eleganza diversa. Dallo strumento di scrittura è passato a indicare il modo unico di esprimersi di un artista.",
    "shortEtymology": "latino stilus → strumento per scrivere",
    "category": "arte",
    "relatedWords": [
      "museo",
      "bozzetto",
      "caricatura",
      "affresco",
      "pittura"
    ],
    "difficulty": 2
  },
  {
    "id": "bozzetto",
    "word": "Bozzetto",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'bozza' (gonfio, sporgenza)",
      "Dal greco 'boz' (rapido)",
      "Dal francese 'boiset' (piccolo legno)"
    ],
    "story": "Deriva da 'bozza', una protuberanza irregolare. È un'opera non finita, ancora 'grossolana' e piena di bozze. È l'idea dell'artista che sta provando a uscire dal blocco di marmo o dal foglio.",
    "shortEtymology": "latino bozza → cosa non rifinita",
    "category": "arte",
    "relatedWords": [
      "stile",
      "museo",
      "caricatura",
      "affresco",
      "pittura"
    ],
    "difficulty": 3
  },
  {
    "id": "caricatura",
    "word": "Caricatura",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'caritas' (amore, ironia dolce)",
      "Dal verbo 'caricare' (esagerare, caricare i tratti)",
      "Dal greco 'karis' (grazia deformata)"
    ],
    "story": "Caricare significa aggiungere peso. In una caricatura, l'artista 'carica' i lineamenti (un naso più grosso, orecchie giganti) per far ridere. È un ritratto che pesa più dell'originale.",
    "shortEtymology": "italiano caricare → esagerare i tratti",
    "category": "arte",
    "relatedWords": [
      "stile",
      "bozzetto",
      "museo",
      "affresco",
      "pittura"
    ],
    "difficulty": 1
  },
  {
    "id": "affresco",
    "word": "Affresco",
    "correctAnswer": 2,
    "options": [
      "Dal fatto che si dipingeva all'aria aperta",
      "Dal latino 'ad-fresco' (per abbellire)",
      "Dal fatto che si dipinge sull'intonaco ancora fresco"
    ],
    "story": "La tecnica richiede velocità: devi stendere il colore mentre l'intonaco è ancora bagnato (fresco), così il colore entra dentro e diventa parte del muro. Se l'intonaco si asciuga, sei nei guai.",
    "shortEtymology": "italiano fresco → intonaco bagnato",
    "category": "arte",
    "relatedWords": [
      "stile",
      "bozzetto",
      "caricatura",
      "museo"
    ],
    "difficulty": 1
  },
  {
    "id": "pittura",
    "word": "Pittura",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'pingere' (ricamare, ornare)",
      "Dal greco 'pitt' (fissare con la pece)",
      "Dal latino 'pictus' (ciò che è colorato)"
    ],
    "story": "La radice 'pig-' è la stessa di 'pigmento'. Anticamente 'pingere' significava ricamare o decorare. Dipingere è, in fondo, l'arte di ricamare il mondo con i colori invece che con i fili.",
    "shortEtymology": "latino pingere → ornare/dipingere",
    "category": "arte",
    "relatedWords": [
      "museo",
      "stile",
      "bozzetto",
      "caricatura"
    ],
    "difficulty": 2
  },
  {
    "id": "scultura",
    "word": "Scultura",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'skulps' (roccia tagliata)",
      "Dal latino 'sculpere' (scavare, intagliare)",
      "Dal latino 'scultus' (ciò che resta)"
    ],
    "story": "Scolpire significa togliere il superfluo. Deriva da 'sculpere', che significa scavare. Come diceva Michelangelo, la statua è già dentro, bisogna solo scavare via il marmo che la copre.",
    "shortEtymology": "latino sculpere → scavare/tagliare",
    "category": "arte",
    "relatedWords": [
      "museo",
      "stile",
      "bozzetto",
      "caricatura"
    ],
    "difficulty": 1
  },
  {
    "id": "architettura",
    "word": "Architettura",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'arcus' (arco) e 'tectum' (tetto)",
      "Dal greco 'arkhòs' (antico) e 'tekhne' (arte)",
      "Dal greco 'arkhos' (capo) e 'tekton' (costruttore)"
    ],
    "story": "L'architetto è l''architéktōn', ovvero il 'capo dei costruttori'. Non è solo chi progetta, ma chi guida il cantiere. È l'arte suprema che mette ordine tra tutte le altre tecniche.",
    "shortEtymology": "greco arkhos + tekton → capo costruttore",
    "category": "arte",
    "relatedWords": [
      "museo",
      "fotografia",
      "matita",
      "inchiostro"
    ],
    "difficulty": 2
  },
  {
    "id": "commedia",
    "word": "Commedia",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'kòme' (villaggio) e 'oidè' (canto)",
      "Dal latino 'cum-media' (via di mezzo)",
      "Dal greco 'komos' (dormire)"
    ],
    "story": "È il 'canto del villaggio'. In origine erano feste rurali piene di scherzi e canti allegri. A differenza della tragedia (il canto della capra), la commedia nasce dal popolo che si diverte nei campi.",
    "shortEtymology": "greco kòme + oidè → canto del villaggio",
    "category": "arte",
    "relatedWords": [
      "catastrofe",
      "teatro",
      "tragedia",
      "museo"
    ],
    "difficulty": 3
  },
  {
    "id": "tragedia",
    "word": "Tragedia",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'tra-ghos' (passaggio doloroso)",
      "Dal greco 'tràgos' (capra) e 'oidè' (canto)",
      "Dal latino 'tragere' (trascinare agli inferi)"
    ],
    "story": "Letteralmente è il 'canto del capro'. Perché? Probabilmente perché gli attori indossavano pelli di capra o perché una capra era il premio della gara teatrale. Strano pensare che le opere più tristi del mondo abbiano il nome di una capra.",
    "shortEtymology": "greco tràgos + oidè → canto del capro",
    "category": "arte",
    "relatedWords": [
      "catastrofe",
      "teatro",
      "commedia",
      "museo"
    ],
    "difficulty": 3
  },
  {
    "id": "abracadabra",
    "word": "Abracadabra",
    "correctAnswer": 2,
    "options": [
      "Dall'ebraico 'ab' (padre) e 'ruah' (spirito)",
      "Dal greco 'abraxàs' (parola magica del sole)",
      "Dall'aramaico 'avrah ka-davra' (creerò come parlo)"
    ],
    "story": "È forse la formula magica più antica. Significa 'creerò con la parola'. Un tempo si scriveva su un amuleto a forma di triangolo rovesciato per curare la febbre. La parola stessa è un atto di creazione.",
    "shortEtymology": "aramaico avrah ka-davra → creerò con la parola",
    "category": "religione",
    "relatedWords": [
      "carnevale",
      "paradiso",
      "inferno",
      "angelo",
      "cappella"
    ],
    "difficulty": 3
  },
  {
    "id": "bugia",
    "word": "Bugia",
    "correctAnswer": 0,
    "options": [
      "Dal nome della città di Bugia in Algeria (dove si facevano le candele)",
      "Dal latino 'bugìa' (mormorio)",
      "Dal germanico 'bug' (errore)"
    ],
    "story": "Questa è divertente: un tempo la 'bugia' era una piccola candela prodotta nella città di Bougie. Perché oggi significa bugia? Forse perché la candela fa una luce fioca che non fa vedere bene la verità... o forse perché i mercanti di candele non erano molto onesti.",
    "shortEtymology": "dalla città algerina di Bugia",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "cappello",
      "finestra",
      "corridoio"
    ],
    "difficulty": 3
  },
  {
    "id": "candela",
    "word": "Candela",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'kand' (fuoco)",
      "Dal latino 'candere' (brillare, essere bianco)",
      "Dal latino 'canis' (perché attirava i cani)"
    ],
    "story": "Tutto ciò che è 'candido' brilla. La candela è l'oggetto che emette luce bianca e pulita. Se sei un candidato (vestito di bianco) che usa una candela per leggere, sei l'etimologia fatta persona.",
    "shortEtymology": "latino candere → brillare",
    "category": "oggetti",
    "relatedWords": [
      "sincero",
      "candidato",
      "camera",
      "cappello",
      "fiammifero"
    ],
    "difficulty": 1
  },
  {
    "id": "fiammifero",
    "word": "Fiammifero",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'flamma-fero' (portatore di fiamma)",
      "Dal greco 'phlamos' (bruciare)",
      "Dal latino 'flamma' e 'ferre' (portare fuoco)"
    ],
    "story": "È una parola composta: 'fiamma' + 'fero' (portare). È il portatore di fuoco tascabile. Prima dei fiammiferi, accendere un fuoco era un lavoro da professionisti o da dei greci puniti.",
    "shortEtymology": "latino flamma + ferre → portatore di fiamma",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "cappello",
      "finestra",
      "corridoio",
      "candela"
    ],
    "difficulty": 1
  },
  {
    "id": "orologio",
    "word": "Orologio",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'hōra' (ora) e 'lègō' (raccolgo/dico)",
      "Dal latino 'oris' (bocca) e 'logium' (discorso)",
      "Dal greco 'horos' (limite) e 'logòs' (ragione)"
    ],
    "story": "È lo strumento che 'dice l'ora'. Anticamente erano meridiane o clessidre. L'orologio non crea il tempo, lo legge e ce lo riferisce, di solito quando siamo già in ritardo.",
    "shortEtymology": "greco hōra + lègō → che dice l'ora",
    "category": "oggetti",
    "relatedWords": [
      "carta",
      "atlante",
      "semaforo",
      "scuola"
    ],
    "difficulty": 1
  },
  {
    "id": "carta",
    "word": "Carta",
    "correctAnswer": 1,
    "options": [
      "Dal cinese 'kart' (foglio)",
      "Dal greco 'chàrtes' (foglio di papiro)",
      "Dal latino 'caretta' (crosta)"
    ],
    "story": "I greci chiamavano 'chàrtes' il foglio di papiro. La parola è sopravvissuta alla sostituzione del papiro con la pergamena e poi con la carta moderna. Cambiano i materiali, ma il nome del foglio resta fedele.",
    "shortEtymology": "greco chàrtes → foglio",
    "category": "oggetti",
    "relatedWords": [
      "atlante",
      "diploma",
      "archivio",
      "scuola",
      "orologio",
      "penna"
    ],
    "difficulty": 2
  },
  {
    "id": "penna",
    "word": "Penna",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'pendere' (stare appesi alla mano)",
      "Dal greco 'pennè' (segno sottile)",
      "Dal latino 'penna' (piuma d'uccello)"
    ],
    "story": "Per secoli abbiamo scritto usando le piume degli uccelli (soprattutto oche). Oggi usiamo plastica e metallo, ma continuiamo a chiamarle 'penne'. È un omaggio involontario al volo ogni volta che firmiamo un assegno.",
    "shortEtymology": "latino penna → piuma",
    "category": "oggetti",
    "relatedWords": [
      "carta",
      "quaderno",
      "gomma",
      "atlante"
    ],
    "difficulty": 1
  },
  {
    "id": "quaderno",
    "word": "Quaderno",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'quaterni' (a quattro a quattro)",
      "Dal latino 'quadrum' (forma quadrata)",
      "Dal greco 'kad-ern' (pila di fogli)"
    ],
    "story": "In origine il quaderno era fatto da fogli di pergamena piegati in quattro (quaterni). Quattro fogli cuciti insieme. Anche se oggi il tuo quaderno ha 100 pagine, il suo nome ricorda ancora quel primo piccolo mazzetto di quattro.",
    "shortEtymology": "latino quaterni → a quattro a quattro",
    "category": "oggetti",
    "relatedWords": [
      "penna",
      "carta",
      "gomma",
      "atlante"
    ],
    "difficulty": 2
  },
  {
    "id": "gomma",
    "word": "Gomma",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'gom' (che cancella)",
      "Dal latino 'gummi' (dall'egizio 'kemai')",
      "Dal fatto che si mastica"
    ],
    "story": "Arriva dall'antico Egitto via Grecia e Roma. Indicava la resina delle piante. La gomma per cancellare è arrivata molto dopo, ma ha rubato il nome alla linfa degli alberi che appiccicava le dita.",
    "shortEtymology": "egizio kemai → resina",
    "category": "oggetti",
    "relatedWords": [
      "penna",
      "quaderno",
      "carta",
      "atlante"
    ],
    "difficulty": 3
  },
  {
    "id": "tavolo",
    "word": "Tavolo",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'ta-vlos' (base di legno)",
      "Dal latino 'tavul' (luogo del pasto)",
      "Dal latino 'tabula' (asse di legno, tavola)"
    ],
    "story": "La 'tabula' era semplicemente un'asse di legno piatta. Da lì sono nate le tabelle, i tavoli e le tavolozze. È il fondamento della vita sedentaria: un piano orizzontale su cui appoggiare la vita.",
    "shortEtymology": "latino tabula → asse di legno",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "cappello",
      "finestra",
      "corridoio",
      "candela"
    ],
    "difficulty": 1
  },
  {
    "id": "sedia",
    "word": "Sedia",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'sedere' (stare seduti)",
      "Dal greco 'sedìon' (piccola base)",
      "Dal latino 'sed-ia' (luogo di riposo)"
    ],
    "story": "Viene direttamente dal verbo 'sedere'. È l'oggetto progettato per una sola funzione: smettere di stare in piedi. Sembra banale, ma per secoli è stata un lusso: la gente comune usava panche, la sedia era per i nobili.",
    "shortEtymology": "latino sedere → stare seduti",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "cappello",
      "finestra",
      "corridoio",
      "candela"
    ],
    "difficulty": 1
  },
  {
    "id": "porta",
    "word": "Porta",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'pòros' (passaggio)",
      "Dal latino 'portus' (rifugio)",
      "Dal latino 'portare' (sollevare l'aratro)"
    ],
    "story": "Quando i romani fondavano una città, tracciavano il solco con l'aratro. Nel punto in cui doveva sorgere la porta, sollevavano ('portare') l'aratro per lasciare il passaggio. La porta è dove il confine si alza per lasciarti entrare.",
    "shortEtymology": "latino portare → sollevare (l'aratro)",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "corridoio",
      "balcone"
    ],
    "difficulty": 3
  },
  {
    "id": "chiave",
    "word": "Chiave",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'clavis' (legato a chiudere)",
      "Dal greco 'kleis' (strumento ricurvo)",
      "Dal latino 'clavus' (chiodo)"
    ],
    "story": "La 'clavis' latina è legata al concetto di chiusura. Chi ha la chiave ha il potere di chiudere o aprire un mondo. È lo strumento che dà sicurezza, ma anche quello che esclude chi sta fuori.",
    "shortEtymology": "latino clavis → chiusura",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "corridoio",
      "balcone"
    ],
    "difficulty": 2
  },
  {
    "id": "sapone",
    "word": "Sapone",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'sapon' (che pulisce)",
      "Dal gallico 'sapo' (grasso e cenere)",
      "Dal latino 'sapor' (gusto, perché profumato)"
    ],
    "story": "I romani lo impararono dai Galli e dai Germani. 'Sapo' era una mistura di sego (grasso animale) e cenere. All'inizio serviva per tingersi i capelli di rosso, poi hanno scoperto che puliva anche la pelle. Meglio tardi che mai.",
    "shortEtymology": "germanico/gallico sapo → grasso e cenere",
    "category": "oggetti",
    "relatedWords": [
      "balcone",
      "scarpa",
      "palla",
      "pizza"
    ],
    "difficulty": 2
  },
  {
    "id": "specchio",
    "word": "Specchio",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'spèkos' (vedere l'ombra)",
      "Dal latino 'speculum' (immagine riflessa)",
      "Dal latino 'specere' (guardare, osservare)"
    ],
    "story": "Viene da 'specere', guardare. Lo specchio è lo strumento fatto apposta per guardare. Anticamente erano lastre di bronzo lucido. È l'unico oggetto che ci permette di vedere noi stessi come ci vedono gli altri (più o meno).",
    "shortEtymology": "latino specere → guardare",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "cappello",
      "finestra",
      "corridoio",
      "candela"
    ],
    "difficulty": 1
  },
  {
    "id": "pettine",
    "word": "Pettine",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'pecten' (legato a pectere, cardare)",
      "Dal greco 'pèkt' (scuro, come il corno)",
      "Dal latino 'pectus' (perché si teneva vicino al petto)"
    ],
    "story": "Viene da 'pectere', che significa pettinare o cardare la lana. È uno degli oggetti più antichi trovati nelle tombe preistoriche. L'uomo ha imparato a ordinarsi i capelli prima ancora di imparare a scrivere.",
    "shortEtymology": "latino pecten → cardare/pettinare",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "cappello",
      "finestra",
      "corridoio",
      "candela"
    ],
    "difficulty": 2
  },
  {
    "id": "vestito",
    "word": "Vestito",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'esthès' (abbigliamento)",
      "Dal latino 'vestire' (coprire il corpo)",
      "Dal latino 'ves' (pelle di animale)"
    ],
    "story": "Deriva dalla radice indoeuropea 'wes-', che significa proprio vestire o coprire. È la nostra seconda pelle, ciò che scegliamo per presentarci al mondo. Senza vestiti saremmo solo primati infreddoliti.",
    "shortEtymology": "latino vestire → coprire",
    "category": "oggetti",
    "relatedWords": [
      "cappello",
      "scarpa",
      "ombrello",
      "pigiama",
      "bikini"
    ],
    "difficulty": 1
  },
  {
    "id": "scarpa",
    "word": "Scarpa",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'scarpus' (pelle conciata)",
      "Dal greco 'skarpè' (protezione del piede)",
      "Dal germanico 'skarp' (tasca, involucro tagliente)"
    ],
    "story": "L'origine è incerta, ma legata al germanico per indicare un involucro o una borsa di cuoio per il piede. È l'oggetto che ci ha permesso di conquistare il mondo senza tagliarci sui sassi.",
    "shortEtymology": "germanico skarp → involucro",
    "category": "oggetti",
    "relatedWords": [
      "vestito",
      "cappello",
      "ombrello",
      "pigiama",
      "sapone"
    ],
    "difficulty": 3
  },
  {
    "id": "ombrello",
    "word": "Ombrello",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'umbra' (ombra)",
      "Dal greco 'ombron' (pioggia)",
      "Dal latino 'ombr' (protezione)"
    ],
    "story": "L'ombrello nasceva per ripararsi dal sole cocente, non dalla pioggia. Il suo nome deriva infatti dal latino 'umbra' (ombra): era un accessorio elegante e ricercato per fare ombra sul capo delle nobildonne. Solo molto più tardi, nelle umide città del nord Europa, fu impermeabilizzato per difendersi dai temporali.",
    "shortEtymology": "latino umbra → ombra contro il sole",
    "category": "oggetti",
    "relatedWords": [
      "vestito",
      "scarpa",
      "cappello",
      "pigiama",
      "bikini"
    ],
    "difficulty": 1
  },
  {
    "id": "palla",
    "word": "Palla",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'pallidus' (perché bianca)",
      "Dal germanico 'balla' (oggetto rotondo)",
      "Dal greco 'pàllein' (scagliare)"
    ],
    "story": "Deriva dal germanico e indica qualcosa di gonfio o rotondo. È l'oggetto ludico universale. Dalle palle di stracci a quelle da calcio, l'umanità passa millenni a rincorrere cerchi che rimbalzano.",
    "shortEtymology": "germanico balla → oggetto rotondo",
    "category": "oggetti",
    "relatedWords": [
      "sapone",
      "balcone",
      "scarpa",
      "pizza"
    ],
    "difficulty": 2
  },
  {
    "id": "finanza",
    "word": "Finanza",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'finis' (fine, pagamento per chiudere un debito)",
      "Dal francese 'finance' (ricchezza del re)",
      "Dal greco 'fyn' (oro)"
    ],
    "story": "Viene da 'finire'. In origine era il pagamento che metteva 'fine' a una controversia o a un debito. Pagare significa chiudere i conti. La finanza è l'arte di mettere punti fermi ai debiti (o di crearne di nuovi).",
    "shortEtymology": "latino finis → conclusione/pagamento",
    "category": "commercio",
    "relatedWords": [
      "moneta",
      "salario",
      "pecunia",
      "denaro"
    ],
    "difficulty": 3
  },
  {
    "id": "miseria",
    "word": "Miseria",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'mys' (piccolo)",
      "Dal latino 'minus' (meno)",
      "Dal latino 'miser' (infelice, sfortunato)"
    ],
    "story": "In origine non indicava solo la povertà economica, ma uno stato di profonda infelicità e sfortuna. Il 'miser' è colui che soffre. La miseria è la condizione di chi ha perso tutto, non solo il portafoglio.",
    "shortEtymology": "latino miser → infelice",
    "category": "commercio",
    "relatedWords": [
      "capitale",
      "soldo",
      "moneta",
      "tassa"
    ],
    "difficulty": 1
  },
  {
    "id": "pace",
    "word": "Pace",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'pax' (legato a pangere, fissare un patto)",
      "Dal greco 'pàke' (silenzio)",
      "Dal latino 'pascere' (nutrire insieme)"
    ],
    "story": "La pace non è solo assenza di guerra. Viene da 'pangere', fissare, pattuire. La pace è un accordo 'fissato' tra due parti. È qualcosa che va costruito e stabilito con un patto solido, come un chiodo nel muro.",
    "shortEtymology": "latino pax → patto fissato",
    "category": "societa",
    "relatedWords": [
      "boicottaggio",
      "labirinto",
      "prigione",
      "disastro"
    ],
    "difficulty": 2
  },
  {
    "id": "guerra",
    "word": "Guerra",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'gerra' (conflitto)",
      "Dal germanico 'werra' (mischia, confusione)",
      "Dal greco 'ghèr' (distruzione)"
    ],
    "story": "I romani usavano 'bellum', ma noi abbiamo preferito il termine germanico 'werra'. Significa confusione, rissa, mischia disordinata. Una parola che descrive perfettamente il caos del campo di battaglia.",
    "shortEtymology": "germanico werra → mischia/caos",
    "category": "guerra",
    "relatedWords": [
      "prigione",
      "vendetta",
      "labirinto",
      "disastro"
    ],
    "difficulty": 1
  },
  {
    "id": "politica",
    "word": "Politica",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'polys' (molto, per le molte idee)",
      "Dal latino 'politus' (educato, raffinato)",
      "Dal greco 'polis' (città)"
    ],
    "story": "È semplicemente l'arte che riguarda la 'polis', la città-stato greca. Essere politici significa occuparsi di ciò che è pubblico, di ciò che appartiene a tutti i cittadini. Senza polis, non c'è politica, solo potere.",
    "shortEtymology": "greco polis → città",
    "category": "societa",
    "relatedWords": [
      "scuola",
      "atleta",
      "stadio",
      "democrazia"
    ],
    "difficulty": 1
  },
  {
    "id": "libertà",
    "word": "Libertà",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'libet' (ciò che piace)",
      "Dal greco 'liber' (senza catene)",
      "Dal latino 'liber' (uomo libero, non schiavo)"
    ],
    "story": "La radice indoeuropea significa 'appartenere al popolo (libero)'. Il libero era chi faceva parte della stirpe, a differenza dello schiavo che era uno straniero senza radici. Libertà significa avere un posto nel mondo.",
    "shortEtymology": "latino liber → chi appartiene al popolo",
    "category": "societa",
    "relatedWords": [
      "libro",
      "ciao",
      "palazzo",
      "scuola"
    ],
    "difficulty": 2
  },
  {
    "id": "tempo",
    "word": "Tempo",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'tempus' (legato a temere, tagliare)",
      "Dal greco 'tem' (flusso continuo)",
      "Dal latino 'tempus' (legato a temperare, mescolare)"
    ],
    "story": "La radice è 'tem-', tagliare (la stessa di atomo, che non si taglia). Il tempo è una 'sezione' tagliata dall'eternità. Lo dividiamo in ore e minuti proprio perché, per capirlo, dobbiamo tagliarlo a pezzetti.",
    "shortEtymology": "latino tempus → sezione tagliata",
    "category": "storia",
    "relatedWords": [
      "sabato",
      "domenica",
      "gennaio",
      "febbraio"
    ],
    "difficulty": 3
  },
  {
    "id": "spazio",
    "word": "Spazio",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'spas' (vuoto)",
      "Dal latino 'spatium' (lunghezza di un campo, stadio)",
      "Dal latino 'spandere' (stendere)"
    ],
    "story": "In origine indicava la distanza da percorrere, come lo stadio nelle corse. È l'estensione che separa due punti. Senza spazio saremmo tutti schiacciati, senza tempo saremmo tutti fermi. Fortunatamente abbiamo entrambi.",
    "shortEtymology": "latino spatium → estensione/stadio",
    "category": "scienza",
    "relatedWords": [
      "pianeta",
      "galassia",
      "energia",
      "atomo"
    ],
    "difficulty": 2
  },
  {
    "id": "mondo",
    "word": "Mondo",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'mòn' (uno solo)",
      "Dal latino 'mons' (grande come un monte)",
      "Dal latino 'mundus' (pulito, ordinato)"
    ],
    "story": "Per i romani l'universo era 'mundus', cioè pulito ed elegante (come una donna 'immacolata'). È l'opposto del caos. Il mondo è bello perché è ordinato e splende. Se ti sembra un caos, è perché non lo stai guardando in latino.",
    "shortEtymology": "latino mundus → pulito/ordinato",
    "category": "natura",
    "relatedWords": [
      "clima",
      "monsone",
      "canicola",
      "orizzonte"
    ],
    "difficulty": 2
  },
  {
    "id": "universo",
    "word": "Universo",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'uni-versus' (volto verso l'uno)",
      "Dal greco 'uni-vers' (tutto ciò che gira)",
      "Dal latino 'unitus' (unito insieme)"
    ],
    "story": "Tutto ciò che esiste gira ('versus') come un unico insieme ('unus'). È la totalità delle cose che convergono in un'unica direzione. Un concetto immenso racchiuso in una parola che ruota su se stessa.",
    "shortEtymology": "latino uni-versus → volto verso l'uno",
    "category": "scienza",
    "relatedWords": [
      "pianeta",
      "galassia",
      "energia",
      "atomo",
      "considerare"
    ],
    "difficulty": 3
  },
  {
    "id": "testa",
    "word": "Testa",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'testa' (vaso di terracotta, poi cranio)",
      "Dal greco 'thekē' (custodia dei pensieri)",
      "Dal latino 'testari' (ciò che testimonia la vista)"
    ],
    "story": "I Romani usavano la parola 'testa' per indicare un vaso o un recipiente di terracotta. Nel latino volgare, per somiglianza di forma e con tono scherzoso, passò a indicare il cranio e poi l'intera testa, soppiantando il classico 'caput'. Oggi portiamo sulle spalle un oggetto che, almeno nel nome, era un vaso da cucina.",
    "shortEtymology": "latino testa → vaso di terracotta",
    "category": "corpo",
    "relatedWords": [
      "capriccio",
      "cappello",
      "capitale",
      "malinconia",
      "muscolo"
    ],
    "difficulty": 1
  },
  {
    "id": "muscolo",
    "word": "Muscolo",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'muscus' (muschio, per la morbidezza)",
      "Dal latino 'musculus' (piccolo topo)",
      "Dal greco 'mys' (fibra elastica contrattile)"
    ],
    "story": "I Romani chiamavano i muscoli 'musculi', diminutivo di 'mus' (piccolo topo). Quando si contrae il bicipite, la forma che si muove e guizza sotto la pelle ricordava loro proprio un topolino che corre. Anche il nome della nostra forza fisica nasce da un minuscolo roditore.",
    "shortEtymology": "latino musculus → piccolo topo",
    "category": "corpo",
    "relatedWords": [
      "malinconia",
      "dieta",
      "testa",
      "pupilla",
      "clavicola"
    ],
    "difficulty": 1
  },
  {
    "id": "pupilla",
    "word": "Pupilla",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'pupula' (luce che pulsa)",
      "Dal greco 'popein' (scrutare nel buio)",
      "Dal latino 'pupilla' (bambolina riflessa)"
    ],
    "story": "I Romani notarono che, guardando qualcuno molto da vicino negli occhi, sulla cornea si riflette una minuscola immagine di se stessi in miniatura. La chiamarono perciò 'pupilla', vezzeggiativo di 'pupa', cioè bambolina. Quando guardi qualcuno negli occhi, c'è letteralmente una piccola bambola di te riflessa dentro i suoi.",
    "shortEtymology": "latino pupilla → bambolina",
    "category": "corpo",
    "relatedWords": [
      "muscolo",
      "malinconia",
      "dieta",
      "testa"
    ],
    "difficulty": 1
  },
  {
    "id": "clavicola",
    "word": "Clavicola",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'clavicula' (piccola chiave)",
      "Dal latino 'clavus' (chiodo che blocca la spalla)",
      "Dal greco 'kleiein' (chiudere il torace)"
    ],
    "story": "La clavicola prende il nome dalla sua caratteristica forma ricurva a 'S', che agli antichi anatomisti romani ricordava una piccola chiave antica ('clavicula', diminutivo di 'clavis'). La chiamavano così perché ruota sul suo asse proprio come una chiave nella toppa durante il movimento dell'articolazione della spalla.",
    "shortEtymology": "latino clavicula → piccola chiave",
    "category": "corpo",
    "relatedWords": [
      "malinconia",
      "dieta",
      "testa",
      "muscolo"
    ],
    "difficulty": 2
  },
  {
    "id": "sinistro",
    "word": "Sinistro",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'sine' (senza destrezza)",
      "Dal latino 'sinister' (sinistra, poi presagio infausto)",
      "Dall'etrusco 'sena' (direzione delle ombre)"
    ],
    "story": "Nell'antica Roma gli indovini interpretavano il volo degli uccelli: per i Greci e in molte credenze romane, i presagi che giungevano dal lato sinistro ('sinister') erano considerati sfavorevoli e inquietanti. Col tempo, da semplice indicazione spaziale, 'sinistro' è diventato sinonimo di torvo, minaccioso o sfortunato.",
    "shortEtymology": "latino sinister → lato sinistro / presagio sfavorevole",
    "category": "corpo",
    "relatedWords": [
      "destra",
      "malinconia",
      "dieta",
      "testa"
    ],
    "difficulty": 1
  },
  {
    "id": "destra",
    "word": "Destra",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'dextera' (mano destra, simbolo di abilità)",
      "Dal greco 'doxa' (opinione retta)",
      "Dal latino 'directus' (linea diritta)"
    ],
    "story": "Per i Romani la mano destra ('dextera') era la mano abile, sicura, favorevole negli auspici e usata per stringere i patti d'onore. Da 'dexter' derivano parole come 'destrezza', ossia l'agilità e la bravura nel compiere qualcosa. Non a caso, chi è goffo e impacciato viene ancora oggi definito 'maldestro'.",
    "shortEtymology": "latino dextera → mano destra / abile",
    "category": "corpo",
    "relatedWords": [
      "sinistro",
      "malinconia",
      "dieta",
      "testa"
    ],
    "difficulty": 1
  },
  {
    "id": "vaccino",
    "word": "Vaccino",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'vacuus' (vuoto di malattia)",
      "Dal medico francese Vacquin che lo perfezionò",
      "Dal latino 'vacca' (vaiolo bovino delle mucche)"
    ],
    "story": "Nel 1796 Edward Jenner osservò che le mungitrici che contraevano il vaiolo bovino (cowpox) sembravano completamente protette dal mortale vaiolo umano. Prelevò allora del materiale dalle pustole di una mucca per immunizzare un bambino. Da 'vacca' nacque il termine 'vaccino': una delle massime conquiste della medicina moderna porta il nome di una mucca.",
    "shortEtymology": "latino vacca → relativo alla mucca",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "chirurgo",
      "farmaco",
      "sintomo"
    ],
    "difficulty": 1
  },
  {
    "id": "quarantena",
    "word": "Quarantena",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'quadrantum' (quarto di miglio dalla costa)",
      "Dall'italiano 'quaranta' (giorni di isolamento navale a Venezia)",
      "Dal greco 'karanos' (blocco militare dei porti)"
    ],
    "story": "Nel Trecento, per contrastare la terribile peste nera, la Repubblica di Venezia impose a tutte le navi sospette provenienti da rotte d'oriente di attendere quaranta giorni all'ancora prima di poter sbarcare equipaggio e merci. Quel periodo cautelativo di quaranta giorni ha dato il nome a qualsiasi forma di isolamento sanitario nel mondo.",
    "shortEtymology": "italiano quaranta → quaranta giorni d'isolamento a Venezia",
    "category": "storia",
    "relatedWords": [
      "ciao",
      "fiasco",
      "serenata",
      "epidemia",
      "monumento"
    ],
    "difficulty": 1
  },
  {
    "id": "influenza",
    "word": "Influenza",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'influentia' (influsso astrologico delle stelle)",
      "Dal latino 'influere' (fluido che scorre nei polmoni)",
      "Dall'arabo 'in-falū' (febbre delle stagioni fredde)"
    ],
    "story": "Nel Medioevo e Rinascimento si credeva fermamente che le ondate epidemiche improvvise fossero scatenate dall'influsso malefico della congiunzione dei pianeti e delle stelle sulla vita umana. Si parlava perciò di 'influenza degli astri'. Oggi sappiamo che a farci ammalare sono i virus, ma continuiamo a usare una parola nata dall'astrologia.",
    "shortEtymology": "latino influentia → influsso degli astri",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "chirurgo",
      "farmaco",
      "sintomo"
    ],
    "difficulty": 2
  },
  {
    "id": "malaria",
    "word": "Malaria",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'melas' (fiele nero nel sangue)",
      "Dal sanscrito 'mal-ari' (febbre mortale)",
      "Dall'italiano 'mal'aria' (aria malsana delle paludi)"
    ],
    "story": "Per secoli si pensò che le febbri intermittenti fossero causate dai miasmi e dall'aria mefitica emanata dalle paludi e dagli stagni: da qui il nome italiano 'mal'aria', aria cattiva. Non erano le esalazioni dell'aria a infettare le persone, ma le zanzare Anopheles che proliferavano nelle acque stagnanti.",
    "shortEtymology": "italiano mala aria → aria malsana delle paludi",
    "category": "scienza",
    "relatedWords": [
      "epidemia",
      "chirurgo",
      "farmaco",
      "sintomo"
    ],
    "difficulty": 1
  },
  {
    "id": "panacea",
    "word": "Panacea",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'panis' (pane che dona nutrimento e vita)",
      "Dal greco 'panákeia' (rimedio capace di guarire tutto)",
      "Dall'arabo 'banaqs' (pozione universale alchemica)"
    ],
    "story": "Nella mitologia greca, Panacea era la figlia di Asclepio (dio della medicina) e personificava la cura per qualsiasi male: il suo nome univa 'pan' (tutto) e 'ákos' (rimedio). Oggi cerchiamo ancora una panacea per i nostri problemi: una soluzione miracolosa e risolutiva che, proprio come nel mito, raramente esiste.",
    "shortEtymology": "greco panákeia → rimedio per tutto",
    "category": "religione",
    "relatedWords": [
      "angelo",
      "diavolo",
      "panico",
      "eco"
    ],
    "difficulty": 2
  },
  {
    "id": "barbaro",
    "word": "Barbaro",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'bárbaros' (chi balbetta 'bar-bar' una lingua straniera)",
      "Dal latino 'barba' (chi porta la barba incolta)",
      "Dalla regione della Barberia nel Nord Africa"
    ],
    "story": "Gli antichi Greci chiamavano 'bárbaroi' tutti coloro che non parlavano la lingua greca. Ai loro orecchi, le lingue straniere suonavano come un incomprensibile e rozzo balbettio onomatopeico: 'bar-bar-bar'. Una parola nata per prendere in giro le cadenze straniere si trasformò nei secoli in sinonimo di ferocia e inciviltà.",
    "shortEtymology": "greco bárbaros → balbuziente / lingua incomprensibile",
    "category": "storia",
    "relatedWords": [
      "labirinto",
      "maratona",
      "scuola",
      "atleta",
      "olimpiadi"
    ],
    "difficulty": 1
  },
  {
    "id": "eco",
    "word": "Eco",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'equus' (suono che corre veloce come un cavallo)",
      "Dal greco 'echein' (trattenere il fiato tra le rocce)",
      "Dal nome della ninfa greca Eco (condannata a ripetere)"
    ],
    "story": "Nella mitologia greca, Eco era una bellissima ninfa dei boschi punita da Era per le sue chiacchiere: fu condannata a non poter mai parlare per prima e a ripetere solo le ultime parole altrui. Consumata dal dolore per l'amore non corrisposto di Narciso, di lei rimase solo la voce tra le rocce dei monti.",
    "shortEtymology": "greco echó → suono riflesso / ninfa Eco",
    "category": "religione",
    "relatedWords": [
      "angelo",
      "diavolo",
      "panico",
      "panacea",
      "orizzonte"
    ],
    "difficulty": 1
  },
  {
    "id": "atlante",
    "word": "Atlante",
    "correctAnswer": 1,
    "options": [
      "Dall'arabo 'atlas' (seta geografica orientale)",
      "Dal titano greco Atlante (condannato a reggere il cielo)",
      "Dall'oceano Atlantico su cui si tracciavano le rotte"
    ],
    "story": "Nella mitologia greca, il titano Atlante fu condannato da Zeus a sostenere sulle proprie spalle la volta celeste. Nel Cinquecento, il celebre cartografo Gerardo Mercatore raffigurò il titano che sostiene il globo sul frontespizio delle sue raccolte geografiche. Da allora, ogni raccolta di carte geografiche si chiama atlante.",
    "shortEtymology": "greco Átlas → titano che regge il cielo",
    "category": "oggetti",
    "relatedWords": [
      "carta",
      "semaforo",
      "diploma",
      "scuola",
      "nave",
      "garage"
    ],
    "difficulty": 1
  },
  {
    "id": "marmellata",
    "word": "Marmellata",
    "correctAnswer": 0,
    "options": [
      "Dal portoghese 'marmelada' (confettura di mela cotogna)",
      "Dal latino 'mel' (miele) e 'mar' (frutto di mare)",
      "Dalla città francese di Marmande celebre per i frutti"
    ],
    "story": "La parola deriva dal portoghese 'marmelada', che indicava originariamente una conserva dolce preparata unicamente con la mela cotogna, detta 'marmelo' in portoghese (dal greco 'melimelon', mela di miele). Anche se oggi chiamiamo marmellata le conserve di agrumi e altri frutti, il nome ricorda ancora la cotogna portoghese.",
    "shortEtymology": "portoghese marmelo → mela cotogna",
    "category": "cucina",
    "relatedWords": [
      "simposio",
      "pizza",
      "pasta",
      "ricetta"
    ],
    "difficulty": 2
  },
  {
    "id": "cappuccino",
    "word": "Cappuccino",
    "correctAnswer": 2,
    "options": [
      "Dalla forma a cupoletta di schiuma simile a un piccolo cappuccio",
      "Dal convento viennese di Kapuziner dove fu servito",
      "Dal colore marrone del saio dei frati cappuccini"
    ],
    "story": "Il cappuccino deve il suo nome ai frati dell'ordine dei Cappuccini, riconoscibili dal caratteristico saio di lana marrone chiaro con cappuccio. Quando nei caffè di Vienna si iniziò a mescolare caffè e latte fino a ottenere quella tipica tonalità bruna, la bevanda venne battezzata 'Kapuziner' in loro onore.",
    "shortEtymology": "italiano cappuccino → colore del saio dei frati cappuccini",
    "category": "cucina",
    "relatedWords": [
      "cappello",
      "pizza",
      "pasta",
      "ricetta",
      "sandwich",
      "carne"
    ],
    "difficulty": 1
  },
  {
    "id": "pigiama",
    "word": "Pigiama",
    "correctAnswer": 1,
    "options": [
      "Dal francese 'pieu' (letto) e 'jambe' (gamba)",
      "Dal persiano 'pāy-jāma' (indumento per le gambe)",
      "Dal tamil 'pijam' (tessuto leggero per la notte)"
    ],
    "story": "Arriva in Europa tramite gli inglesi durante il periodo coloniale in India, dove si indossavano comodi pantaloni leggeri allacciati in vita chiamati 'pāy-jāma', dal persiano 'pāy' (gamba/piede) e 'jāma' (vestito). Il nostro abito per dormire era originariamente un capo di pantaloni orientali da giorno.",
    "shortEtymology": "persiano pāy-jāma → vestito per le gambe",
    "category": "oggetti",
    "relatedWords": [
      "cotone",
      "giubba",
      "vestito",
      "scarpa",
      "ombrello"
    ],
    "difficulty": 2
  },
  {
    "id": "bikini",
    "word": "Bikini",
    "correctAnswer": 0,
    "options": [
      "Dall'atollo di Bikini nel Pacifico (teatro di test nucleari)",
      "Dal latino 'bi-kini' (costume in due pezzi minimi)",
      "Dall'isola polinesiana celebre per le immersioni"
    ],
    "story": "Nel luglio 1946 il sarto parigino Louis Réard presentò un costume da bagno a due pezzi minuscolo e rivoluzionario. Pochi giorni prima gli americani avevano fatto esplodere ordigni nucleari nell'atollo di Bikini nel Pacifico: Réard scelse quel nome perché convinto che il costume avrebbe provocato un'esplosione mediatica mondiale.",
    "shortEtymology": "toponimo Bikini → atollo degli esperimenti nucleari",
    "category": "oggetti",
    "relatedWords": [
      "cappello",
      "vestito",
      "scarpa",
      "ombrello"
    ],
    "difficulty": 1
  },
  {
    "id": "sandwich",
    "word": "Sandwich",
    "correctAnswer": 2,
    "options": [
      "Dalla sabbia ('sand') usata per essiccare il pane tostato",
      "Dall'antico porto mercantile inglese di Sandwich",
      "Dal conte di Sandwich che voleva mangiare giocando a carte"
    ],
    "story": "Nel Settecento l'aristocratico inglese John Montagu, IV conte di Sandwich, era un giocatore d'azzardo così accanito da non voler interrompere le partite per pranzare. Chiese ai camerieri di servirgli carne fredda tra due fette di pane tostato, per mangiare con una mano senza ungere le carte. Gli altri giocatori iniziarono a ordinare 'lo stesso di Sandwich'.",
    "shortEtymology": "antroponimo conte di Sandwich → panino da gioco",
    "category": "cucina",
    "relatedWords": [
      "pizza",
      "pasta",
      "ricetta",
      "ristorante",
      "cappuccino"
    ],
    "difficulty": 1
  },
  {
    "id": "jeans",
    "word": "Jeans",
    "correctAnswer": 1,
    "options": [
      "Dall'inglese 'join' (cuciture rinforzate con rivetti)",
      "Dalla città di Genova ('Gênes' in francese, porto del tessuto)",
      "Dall'inventore tedesco Jean Davis collaboratore di Levi Strauss"
    ],
    "story": "Il termine inglese 'jeans' deriva dalla pronuncia francese del nome di Genova: 'Gênes'. Fin dal Cinquecento, nel porto di Genova si produceva ed esportava un tessuto di fustagno e cotone blu estremamente resistente, adoperato per i pantaloni da lavoro dei marinai genovesi. La città italiana ha battezzato i pantaloni più famosi al mondo.",
    "shortEtymology": "francese Gênes → Genova (tessuto dei marinai)",
    "category": "oggetti",
    "relatedWords": [
      "cappello",
      "vestito",
      "scarpa",
      "ombrello"
    ],
    "difficulty": 1
  },
  {
    "id": "silhouette",
    "word": "Silhouette",
    "correctAnswer": 0,
    "options": [
      "Dal ministro francese Étienne de Silhouette noto per la parsimonia",
      "Dal latino 'silva' (ombra degli alberi nel bosco)",
      "Dalla tecnica ottica inventata dall'incisore parigino Silhouet"
    ],
    "story": "Nel 1759 Étienne de Silhouette fu ministro delle finanze francese celebre per i tagli spietati alla spesa pubblica. I parigini iniziarono a chiamare 'à la Silhouette' qualsiasi cosa fosse economica e ridotta all'essenziale, inclusi i ritratti veloci che riproducevano solo il profilo nero ritagliato su carta senza dipingere i dettagli.",
    "shortEtymology": "antroponimo Étienne de Silhouette → ministro parsimonioso",
    "category": "arte",
    "relatedWords": [
      "museo",
      "stile",
      "bozzetto",
      "caricatura"
    ],
    "difficulty": 2
  },
  {
    "id": "garage",
    "word": "Garage",
    "correctAnswer": 2,
    "options": [
      "Dal tedesco 'Garten' (giardino recintato di servizio)",
      "Dall'antico celtico 'gar' (luogo in cui sosta la ruota)",
      "Dal francese 'garer' (mettere al sicuro, proteggere)"
    ],
    "story": "In francese 'garer' significava originariamente ormeggiare o mettere al riparo le imbarcazioni lungo le banchine dei fiumi. Alla comparsa delle prime automobili a fine Ottocento, il termine diede vita al sostantivo 'garage' per indicare il locale coperto dove ricoverare e custodire il veicolo al riparo dalle intemperie.",
    "shortEtymology": "francese garer → mettere al riparo",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "corridoio",
      "balcone",
      "atlante"
    ],
    "difficulty": 2
  },
  {
    "id": "boicottaggio",
    "word": "Boicottaggio",
    "correctAnswer": 1,
    "options": [
      "Dal francese 'bois' (barricate di tronchi degli insorti)",
      "Dal capitano Charles Boycott isolato dai contadini irlandesi",
      "Dal quartiere londinese di Boycott centro di scioperi"
    ],
    "story": "Nel 1880 in Irlanda, il capitano Charles Boycott amministrava con estrema durezza le terre di un proprietario assenteista. In risposta ai suoi soprusi, la comunità contadina decise di isolarlo totalmente: nessuno lavorò più per lui, i commercianti rifiutarono di vendergli cibo e il postino non gli consegnò le lettere. Il suo cognome divenne il termine universale per indicare l'isolamento di protesta.",
    "shortEtymology": "antroponimo Charles Boycott → capitano terriero isolato",
    "category": "societa",
    "relatedWords": [
      "pace",
      "labirinto",
      "prigione",
      "disastro"
    ],
    "difficulty": 2
  },
  {
    "id": "assassino",
    "word": "Assassino",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'ḥashshāshīn' (fumatori di hashish, setta ismailita)",
      "Dal persiano 'as-sās' (ombra che colpisce di notte)",
      "Dal latino 'assaltare' (attaccare all'improvviso)"
    ],
    "story": "Nel Medioevo delle Crociate, i cavalieri europei conobbero con terrore i membri della setta ismailita dei Nizariti, guidati dal Vecchio della Montagna, specializzati in omicidi politici mirati. Gli arabi li chiamavano 'ḥashshāshīn', forse per l'uso rituale di sostanze stupefacenti o in senso spregiativo. Da quel gruppo mediorientale nasce la parola 'assassino'.",
    "shortEtymology": "arabo ḥashshāshīn → seguaci della setta degli Assassini",
    "category": "storia",
    "relatedWords": [
      "ammiraglio",
      "arsenale",
      "barbaro",
      "labirinto"
    ],
    "difficulty": 2
  },
  {
    "id": "propaganda",
    "word": "Propaganda",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'pro-pan' (davanti a tutto il popolo)",
      "Dal latino 'prope' (avvicinare le masse alle idee)",
      "Dal latino 'propagare' (dalla Congregazione de Propaganda Fide)"
    ],
    "story": "Nel 1622 papa Gregorio XV istituì la 'Congregatio de Propaganda Fide', un organismo incaricato di propagare e diffondere la fede cattolica nei territori di missione oltremare. Solo nei secoli successivi e con le guerre del Novecento la parola è passata a indicare la persuasione e diffusione organizzata di idee politiche e ideologiche.",
    "shortEtymology": "latino propagare → diffondere / propagare la fede",
    "category": "societa",
    "relatedWords": [
      "carnevale",
      "paradiso",
      "inferno",
      "angelo",
      "pellegrino"
    ],
    "difficulty": 2
  },
  {
    "id": "gazzetta",
    "word": "Gazzetta",
    "correctAnswer": 1,
    "options": [
      "Dalla gazza ladra (per la natura curiosa delle notizie)",
      "Dalla moneta veneziana 'gazeta' (il costo del foglio)",
      "Dall'arabo 'ghazat' (cronache delle spedizioni)"
    ],
    "story": "Nella Venezia del Cinquecento, i primi fogli governativi contenenti notizie politiche e commerciali venivano venduti al prezzo di una monetina da due soldi chiamata 'gazeta' (forse per via di una gazza raffigurata sul conio). Il nome del prezzo passò in breve tempo al foglio stesso, diventando sinonimo mondiale di giornale e rassegna d'informazione.",
    "shortEtymology": "veneziano gazeta → monetina da due soldi",
    "category": "societa",
    "relatedWords": [
      "ciao",
      "fiasco",
      "serenata",
      "magazzino"
    ],
    "difficulty": 1
  },
  {
    "id": "tariffa",
    "word": "Tariffa",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'ta'rīfa' (notificazione, avviso di prezzi e dazi)",
      "Dalla città spagnola di Tarifa celebre per i pedaggi marittimi",
      "Dal latino 'tarare' (stabilire il peso netto della merce)"
    ],
    "story": "Arriva in italiano attraverso i mercanti arabi mediterranei dal vocabolo 'ta'rīfa' (derivato da 'arafa', far conoscere o notificare). Nel commercio navale indicava l'avviso ufficiale recante il listino dei dazi doganali e dei prezzi obbligatori delle merci. Ogni volta che consultiamo una tariffa, usiamo una parola dei mercati arabi medievali.",
    "shortEtymology": "arabo ta'rīfa → avviso / listino di dazi",
    "category": "commercio",
    "relatedWords": [
      "algoritmo",
      "cifra",
      "algebra",
      "almanacco",
      "usura"
    ],
    "difficulty": 2
  },
  {
    "id": "ammiraglio",
    "word": "Ammiraglio",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'admirabilis' (comandante degno di ammirazione)",
      "Dal greco 'almirós' (signore delle acque salse)",
      "Dall'arabo 'amīr al-baḥr' (comandante del mare)"
    ],
    "story": "Il supremo grado della marina militare deriva dall'arabo 'amīr al-baḥr', che significa letteralmente 'comandante del mare' (da 'amīr', principe o signore, e 'baḥr', mare). I regnanti normanni di Sicilia e la Repubblica di Genova ne trassero il titolo navale latino di 'ammiratus', giunto poi fino a noi.",
    "shortEtymology": "arabo amīr al-baḥr → comandante del mare",
    "category": "guerra",
    "relatedWords": [
      "arsenale",
      "magazzino",
      "dogana",
      "darsena",
      "assassino"
    ],
    "difficulty": 2
  },
  {
    "id": "arsenale",
    "word": "Arsenale",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'ars' (arte militare della difesa)",
      "Dall'arabo 'dār al-ṣinā'a' (casa della fabbricazione/industria navale)",
      "Dal latino 'arma senatus' (armi custodite dal senato)"
    ],
    "story": "Deriva dall'arabo 'dār al-ṣinā'a', che significa letteralmente 'casa dell'industria' o officina navale. A Venezia l'Arsenale fu il cuore pulsante della potenza marittima dogale, un colossale cantiere protetto dove si costruivano e armavano le galee con una precisione seriale antesignana della catena di montaggio.",
    "shortEtymology": "arabo dār al-ṣinā'a → casa dell'industria navale",
    "category": "guerra",
    "relatedWords": [
      "ammiraglio",
      "magazzino",
      "dogana",
      "darsena",
      "assassino"
    ],
    "difficulty": 2
  },
  {
    "id": "darsena",
    "word": "Darsena",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'dār al-ṣinā'a' (bacino interno del cantiere navale)",
      "Dal latino 'dorsum' (banchina rialzata delle acque)",
      "Dal greco 'drásis' (luogo di manovra dei rematori)"
    ],
    "story": "Condivide la medesima origine araba di arsenale: 'dār al-ṣinā'a' (officina di fabbricazione navale). Mentre 'arsenale' a Venezia indicava l'immenso stabilimento militare, nei porti come Genova e Milano la variante 'darsena' passò a designare il bacino acqueo interno e tranquillo dove riparare e ancorare i navigli.",
    "shortEtymology": "arabo dār al-ṣinā'a → bacino interno del porto",
    "category": "viaggio",
    "relatedWords": [
      "magazzino",
      "dogana",
      "ammiraglio",
      "arsenale",
      "porto",
      "mappa"
    ],
    "difficulty": 2
  },
  {
    "id": "divano",
    "word": "Divano",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'diversus' (mobile per volgersi e rilassarsi)",
      "Dal persiano 'dīvān' (consiglio di stato con panche a cuscini)",
      "Dall'arabo 'daywan' (baldacchino da riposo nobiliare)"
    ],
    "story": "In Persia e nell'impero ottomano, il 'dīvān' era originariamente il consiglio supremo dei ministri e la sala delle udienze governative, arredata con lunghi cuscini e materassi bassi lungo le pareti dove i burocrati sedevano. Con il tempo la parola è passata a indicare il comodo mobile imbottito del nostro soggiorno.",
    "shortEtymology": "persiano dīvān → consiglio di stato con sedute a cuscini",
    "category": "oggetti",
    "relatedWords": [
      "cotone",
      "giubba",
      "algoritmo",
      "zucchero"
    ],
    "difficulty": 2
  },
  {
    "id": "cotone",
    "word": "Cotone",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'quṭun' (fibra vegetale introdotta in Sicilia)",
      "Dal greco 'kothon' (tessuto leggero per tuniche)",
      "Dal latino 'coctus' (fibra bollita e pettinata)"
    ],
    "story": "La parola giunse in Europa attraverso l'arabo medievale 'quṭun' o 'quṭn'. La pianta, originaria dell'Oriente e dell'India, fu coltivata e commercializzata nel bacino del Mediterraneo dagli Arabi a partire dal IX secolo, rivoluzionando l'industria tessile europea che fino ad allora conosceva quasi solo lana e lino.",
    "shortEtymology": "arabo quṭun → cotone",
    "category": "oggetti",
    "relatedWords": [
      "giubba",
      "sciroppo",
      "zafferano",
      "albicocca",
      "pigiama"
    ],
    "difficulty": 1
  },
  {
    "id": "sciroppo",
    "word": "Sciroppo",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'serum' (estratto denso medicinale)",
      "Dalla città siriana di Scirap celebre per gli zuccheri",
      "Dall'arabo 'šarāb' (bevanda dolce medicinale)"
    ],
    "story": "In arabo medievale 'šarāb' significava semplicemente 'bevanda' (dalla radice š-r-b, bere). I medici e speziali arabi svilupparono complesse pozioni liquide concentrate a base di zucchero e decotti d'erbe per preservare i principi curativi; la Scuola Medica Salernitana introdusse la preparazione e il nome in Europa.",
    "shortEtymology": "arabo šarāb → bevanda",
    "category": "cucina",
    "relatedWords": [
      "zafferano",
      "albicocca",
      "melanzana",
      "cotone",
      "pasta"
    ],
    "difficulty": 2
  },
  {
    "id": "zafferano",
    "word": "Zafferano",
    "correctAnswer": 1,
    "options": [
      "Dall'ebraico 'sappir' (spezia preziosa come lo zaffiro)",
      "Dall'arabo 'za'farān' (da 'asfar', di colore giallo)",
      "Dal monte Zafer in Persia dove fioriva il croco"
    ],
    "story": "Il nome deriva dall'arabo 'za'farān', strettamente connesso all'aggettivo 'asfar' (giallo). La costosissima spezia, ottenuta dagli stimmi del fiore Crocus sativus raccolti a mano all'alba, era considerata oro commestibile per il suo potere colorante e aromatico, trasportata con carovane sorvegliate lungo le rotte mercantili.",
    "shortEtymology": "arabo za'farān → giallo / spezia preziosa",
    "category": "cucina",
    "relatedWords": [
      "sciroppo",
      "albicocca",
      "melanzana",
      "cotone",
      "pasta"
    ],
    "difficulty": 1
  },
  {
    "id": "albicocca",
    "word": "Albicocca",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'al-barqūq' (frutto che matura presto, dal latino praecoquum)",
      "Dalla regione dell'Albi in Provenza dove fu coltivata",
      "Dall'arabo 'al-biqq' (gemma d'oro degli alberi)"
    ],
    "story": "La parola testimonia un affascinante viaggio linguistico mediterraneo: in latino classico il frutto era detto 'praecoquum' (precoce, perché matura prima della pesca). I Greci bizantini lo resero 'praikókion', gli Arabi lo acquisirono come 'al-barqūq' premettendovi l'articolo, e infine le lingue romanze lo riaccolsero come 'albicocca'.",
    "shortEtymology": "arabo al-barqūq (dal latino praecoquum) → frutto precoce",
    "category": "cucina",
    "relatedWords": [
      "sciroppo",
      "zafferano",
      "melanzana",
      "cotone",
      "pasta"
    ],
    "difficulty": 2
  },
  {
    "id": "laser",
    "word": "Laser",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'laedere' (raggio che incide la materia)",
      "Dall'acronimo inglese 'Light Amplification by Stimulated Emission of Radiation'",
      "Dall'inventore tedesco Ernst Laser che lo brevettò"
    ],
    "story": "La parola non nasce da una radice antica, ma è un acronimo scientifico coniato nel 1960 dal fisico Gordon Gould: 'Light Amplification by Stimulated Emission of Radiation' (amplificazione della luce mediante emissione stimolata di radiazione). Oggi è diventato un sostantivo d'uso comune presente nei lettori ottici, nelle telecomunicazioni e nella chirurgia.",
    "shortEtymology": "acronimo inglese L.A.S.E.R. → amplificazione di luce per emissione stimolata",
    "category": "scienza",
    "relatedWords": [
      "pixel",
      "calcolo",
      "robot",
      "algoritmo",
      "pianeta"
    ],
    "difficulty": 1
  },
  {
    "id": "pixel",
    "word": "Pixel",
    "correctAnswer": 0,
    "options": [
      "Dalla contrazione inglese di 'picture element' (elemento d'immagine)",
      "Dal latino 'pix' (punto minuscolo d'inchiostro)",
      "Dalla sigla dei laboratori PIX-EL di elaborazione grafica"
    ],
    "story": "Il termine fu introdotto negli anni Sessanta nei centri di ricerca della NASA per indicare il più piccolo tassello digitale che compone un'immagine scansionata dalle sonde spaziali. Nasce dalla fusione gergale di 'pix' (abbreviazione per 'pictures') ed 'el' (iniziali di 'element'): il pixel è letteralmente il mattone atomico delle immagini digitali.",
    "shortEtymology": "inglese picture element → elemento d'immagine",
    "category": "scienza",
    "relatedWords": [
      "laser",
      "fotografia",
      "calcolo",
      "robot",
      "algoritmo",
      "bluetooth"
    ],
    "difficulty": 1
  },
  {
    "id": "meme",
    "word": "Meme",
    "correctAnswer": 2,
    "options": [
      "Dal francese 'même' (identico, che si ripete)",
      "Dall'inglese 'memory image' (immagine mnemonica)",
      "Dal greco 'mímēma' (imitazione, coniato da Richard Dawkins)"
    ],
    "story": "Nel 1976 il biologo Richard Dawkins coniò la parola 'meme' nel saggio 'Il gene egoista'. Desiderava un vocabolo che richiamasse il greco 'mímēma' (imitazione) ma che fosse monosillabico come 'gene', per spiegare come un'idea o comportamento si replichi da una mente all'altra per imitazione culturale. La rete internet lo ha poi trasformato nel fenomeno virale che conosciamo.",
    "shortEtymology": "greco mímēma → cosa imitata / replicatore culturale",
    "category": "scienza",
    "relatedWords": [
      "telefono",
      "fotografia",
      "semaforo",
      "bicicletta"
    ],
    "difficulty": 2
  },
  {
    "id": "spam",
    "word": "Spam",
    "correctAnswer": 1,
    "options": [
      "Dall'acronimo militare 'Spontaneous Post And Mail'",
      "Dalla carne in scatola 'SPAM' resa celebre dai Monty Python",
      "Dall'antico verbo inglese 'spamm' (inondare di rifiuti)"
    ],
    "story": "Il termine deriva dal marchio americano SPAM (prosciutto speziato in scatola 'Spiced Ham'). Divenne sinonimo di comunicazioni fastidiose e ripetitive grazie a un celebre sketch dei Monty Python del 1970, in cui dei vichinghi cantavano incessantemente 'Spam, Spam, Spam' coprendo ogni altro dialogo. Da qui il passaggio alle email indesiderate che intasano la casella di posta.",
    "shortEtymology": "marchio SPAM → parodia ripetitiva dei Monty Python",
    "category": "scienza",
    "relatedWords": [
      "algoritmo",
      "calcolo",
      "robot",
      "laser"
    ],
    "difficulty": 1
  },
  {
    "id": "bluetooth",
    "word": "Bluetooth",
    "correctAnswer": 0,
    "options": [
      "Dal re vichingo danese Harald Dente Azzurro (Blåtand)",
      "Dalla luce LED azzurra che segnala l'accoppiamento dei dispositivi",
      "Dal colore della prima scocca prototipo sviluppata da Ericsson"
    ],
    "story": "La tecnologia wireless prende il nome dal re vichingo danese del X secolo Harald Gormsson, detto 'Blåtand' (Dente Azzurro, forse per un dente scuro o per la passione per i mirtilli). Come re Harald fu celebre per aver unificato le discordi tribù scandinave sotto un solo regno, così il Bluetooth fu concepito per connettere dispositivi eterogenei. Il logo unisce le due rune scandinave delle sue iniziali.",
    "shortEtymology": "scandinavo Blåtand → re Harald Dente Azzurro",
    "category": "scienza",
    "relatedWords": [
      "algoritmo",
      "calcolo",
      "robot",
      "laser",
      "pixel"
    ],
    "difficulty": 1
  },
  {
    "id": "telefono",
    "word": "Telefono",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'tellus' (terra) e 'fonus' (corda vibrante)",
      "Dal francese 'téléphoner' (parlare attraverso le onde)",
      "Dal greco 'tēle' (lontano) e 'phōnē' (voce)"
    ],
    "story": "Composto dai vocaboli del greco antico 'tēle' (da lontano) e 'phōnē' (suono, voce): il telefono è letteralmente la 'voce da lontano'. Il termine fu coniato nel XIX secolo prima per indicare sistemi di segnalazione acustica navale e poi consacrato dall'invenzione di Antonio Meucci ed Elisha Gray per la trasmissione elettrica della voce umana a grande distanza.",
    "shortEtymology": "greco tēle + phōnē → voce da lontano",
    "category": "scienza",
    "relatedWords": [
      "telescopio",
      "meme",
      "fotografia",
      "semaforo"
    ],
    "difficulty": 1
  },
  {
    "id": "fotografia",
    "word": "Fotografia",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'fovea' (camera oscura) e 'graphis' (stilo)",
      "Dal greco 'phōs' (luce) e 'graphía' (scrittura/disegno)",
      "Dal francese 'photo' (istantanea impressa)"
    ],
    "story": "Coniato nel 1839 dall'astronomo e scienziato britannico John Herschel unendo due radici del greco antico: 'phōs' (luce, genitivo 'phōtós') e 'graphía' (scrittura, disegno). La fotografia è nel senso più letterale e poetico la 'scrittura con la luce': l'arte di imprimere indelebilmente la luce su una superficie sensibile.",
    "shortEtymology": "greco phōs (luce) + graphía (scrittura)",
    "category": "arte",
    "relatedWords": [
      "archivio",
      "architettura",
      "museo",
      "matita",
      "pixel"
    ],
    "difficulty": 1
  },
  {
    "id": "semaforo",
    "word": "Semaforo",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'sēma' (segnale) e 'phóros' (portatore)",
      "Dal latino 'semita' (strada) e 'forare' (aprire il varco)",
      "Dal greco 'semas' (tre colori luminosi di sicurezza)"
    ],
    "story": "Il semaforo nasce ben prima delle automobili: la parola unisce il greco 'sēma' (segno, segnale) e 'phóros' (portatore, dal verbo 'phérein', portare), ossia letteralmente 'portatore di segnali'. In origine indicava i telegrafi ottici con bracci orientabili posti lungo le coste per comunicare con le navi, poi applicato alle lanterne stradali ferroviarie e cittadine.",
    "shortEtymology": "greco sēma + phóros → portatore di segnali",
    "category": "oggetti",
    "relatedWords": [
      "bicicletta",
      "automobile",
      "atlante",
      "telescopio",
      "microscopio"
    ],
    "difficulty": 2
  },
  {
    "id": "autobus",
    "word": "Autobus",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'autos' (da sé) e dal latino 'bucca' (grande bocca di carico)",
      "Dal nome della prima carrozzeria parigina 'Autobus Frères'",
      "Dal latino 'omnibus' (per tutti) unito a 'auto'"
    ],
    "story": "Nel 1826 a Nantes, le carrozze pubbliche a cavalli avevano il capolinea davanti al negozio di un cappellaio di nome Omnès, che esponeva l'insegna scherzosa 'Omnes Omnibus' (latino per 'Omnès per tutti'). Le carrozze vennero chiamate 'omnibus' (per tutti), poi contratto in 'bus' e abbinato al prefisso 'auto' quando furono introdotte le carrozze a motore.",
    "shortEtymology": "latino omnibus → per tutti",
    "category": "viaggio",
    "relatedWords": [
      "bicicletta",
      "automobile",
      "semaforo",
      "porto"
    ],
    "difficulty": 2
  },
  {
    "id": "bicicletta",
    "word": "Bicicletta",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'bis' (due) e 'cella' (due sellini gemelli)",
      "Dal latino 'bi-' (due) e dal greco 'kýklos' (ruota, cerchio)",
      "Dal francese 'biche' (veloce come una cerva su strada)"
    ],
    "story": "Adattamento del francese 'bicyclette', diminutivo di 'bicycle', formato dal prefisso latino 'bi-' (due volte) e dal greco 'kýklos' (cerchio, ruota): letteralmente 'piccolo veicolo a due ruote'. Le prime antenate non avevano pedali e avanzavano spingendo i piedi sul selciato, ma il nome ha sempre celebrato le sue due cerchie.",
    "shortEtymology": "latino bi- (due) + greco kýklos (ruota)",
    "category": "viaggio",
    "relatedWords": [
      "automobile",
      "semaforo",
      "autobus",
      "nave",
      "meme"
    ],
    "difficulty": 1
  },
  {
    "id": "automobile",
    "word": "Automobile",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'autós' (sé stesso) e dal latino 'mobilis' (che si muove)",
      "Dal latino 'automatus' (macchina semovente delle officine)",
      "Dal francese 'automobil' (carrozza con trazione a vapore)"
    ],
    "story": "La parola è un ibrido linguistico coniato alla fine dell'Ottocento unendo il greco 'autós' (da sé stesso) e l'aggettivo latino 'mobilis' (mobile, che si muove): letteralmente 'che si muove da sé'. Quando apparvero i primi modelli a combustione interna, l'idea di un carro capace di viaggiare senza cavalli pareva una meraviglia quasi fantascientifica.",
    "shortEtymology": "greco autós (da sé) + latino mobilis (mobile)",
    "category": "viaggio",
    "relatedWords": [
      "bicicletta",
      "semaforo",
      "autobus",
      "nave"
    ],
    "difficulty": 1
  },
  {
    "id": "dollaro",
    "word": "Dollaro",
    "correctAnswer": 1,
    "options": [
      "Dal latino 'dolus' (moneta senza inganno di peso)",
      "Dal tedesco 'Thaler' (dalla valle boema di Joachimsthal)",
      "Dall'olandese 'dolder' (piccola corona d'oro delle Indie)"
    ],
    "story": "Nel Cinquecento, nella città mineraria boema di Joachimsthal (valle di San Gioacchino), si estraeva argento con cui venivano coniate le celebri monete 'Joachimsthaler'. Il nome venne presto abbreviato in 'Thaler' in tutta l'Europa centrale, anglicizzato in 'dollar' e scelto infine nel 1792 come moneta sovrana degli Stati Uniti d'America.",
    "shortEtymology": "tedesco Thaler (da Joachimsthal) → moneta della valle d'argento",
    "category": "commercio",
    "relatedWords": [
      "capitale",
      "soldo",
      "moneta",
      "tassa"
    ],
    "difficulty": 2
  },
  {
    "id": "denaro",
    "word": "Denaro",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'denarius' (moneta romana che valeva dieci assi)",
      "Dal greco 'danaos' (tributo da pagare agli dei)",
      "Dal latino 'dare' (ciò che si dà in cambio di beni)"
    ],
    "story": "Il termine deriva dal latino 'denarius', prestigiosa moneta d'argento coniata nella Roma repubblicana a partire dalla seconda guerra punica. Il nome traeva origine da 'deni' (dieci per ciascuno), poiché all'inizio un denario valeva esattamente dieci assi di bronzo. Da quella moneta romana d'argento è nato il vocabolo comune per i soldi.",
    "shortEtymology": "latino denarius (da deni) → che vale dieci assi",
    "category": "commercio",
    "relatedWords": [
      "salario",
      "pecunia",
      "stipendio",
      "moneta",
      "finanza"
    ],
    "difficulty": 1
  },
  {
    "id": "stipendio",
    "word": "Stipendio",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'stips' (moneta) e 'pensum' (compito da svolgere)",
      "Dalla tribù romana degli Stipendii esente da tributi",
      "Dal latino 'stips' (moneta) e 'pendere' (pesare sulla bilancia)"
    ],
    "story": "Nell'antica Roma lo 'stipendium' era il soldo versato annualmente ai soldati delle legioni. L'etimologia unisce 'stips' (piccola moneta di rame) e il verbo 'pendere' (pesare): in epoca arcaica, prima della diffusione delle monete coniate dal valore garantito, il bronzo veniva letteralmente pesato sulla bilancia per retribuire i legionari.",
    "shortEtymology": "latino stips (moneta) + pendere (pesare) → paga pesata",
    "category": "commercio",
    "relatedWords": [
      "salario",
      "pecunia",
      "denaro",
      "moneta"
    ],
    "difficulty": 2
  },
  {
    "id": "bonus",
    "word": "Bonus",
    "correctAnswer": 1,
    "options": [
      "Dall'acronimo bancario 'Bond Of National Utility Service'",
      "Dal latino 'bonus' (buono, ricompensa per il merito)",
      "Dal francese antico 'bonis' (avanzo di cassa della bottega)"
    ],
    "story": "In latino 'bonus' è semplicemente l'aggettivo che significa 'buono'. Il suo impiego moderno come sostantivo per indicare un compenso straordinario, un incentivo o un premio speciale nacque nel linguaggio aziendale e assicurativo anglosassone dell'Ottocento, per poi diffondersi a livello internazionale come simbolo di gratifica positiva.",
    "shortEtymology": "latino bonus → buono / gratifica straordinaria",
    "category": "commercio",
    "relatedWords": [
      "moneta",
      "capitale",
      "soldo",
      "tassa"
    ],
    "difficulty": 1
  },
  {
    "id": "credito",
    "word": "Credito",
    "correctAnswer": 0,
    "options": [
      "Dal latino 'creditum' (da 'credere', riporre fiducia)",
      "Dal greco 'kredon' (garanzia scritta di debito)",
      "Dal latino 'crescere' (denaro che genera interessi)"
    ],
    "story": "La parola nasce dal participio del verbo latino 'credere' (avere fede, confidare). Nel mondo romano concedere un prestito non era solo una transazione contabile ma un atto fondato sulla parola: significava fidarsi della promessa del debitore che la somma sarebbe stata restituita. Ancora oggi, ogni credito bancario poggia sull'antica fiducia.",
    "shortEtymology": "latino creditum (da credere) → cosa fidata",
    "category": "commercio",
    "relatedWords": [
      "capitale",
      "soldo",
      "moneta",
      "tassa"
    ],
    "difficulty": 1
  },
  {
    "id": "fallimento",
    "word": "Fallimento",
    "correctAnswer": 2,
    "options": [
      "Dall'antico germanico 'fall' (caduta rovinosa a terra)",
      "Dal latino 'falsus' (inganno fraudolento dei registri)",
      "Dal latino 'fallere' (ingannare, deludere l'aspettativa)"
    ],
    "story": "Deriva dal verbo latino 'fallere', che significava 'ingannare, deludere o venire meno a un impegno preso'. Nel diritto mercantile medievale dei banchieri toscani, fallire significava venire meno alla fiducia dei creditori e all'aspettativa di pagamento, sancito spesso con la distruzione pubblica del banco dell'operatore insolvente.",
    "shortEtymology": "latino fallere → deludere l'aspettativa / venire meno",
    "category": "commercio",
    "relatedWords": [
      "capitale",
      "soldo",
      "moneta",
      "tassa"
    ],
    "difficulty": 2
  },
  {
    "id": "pagina",
    "word": "Pagina",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'pegma' (telaio su cui si tirava la pergamena)",
      "Dal latino 'pagina' (filare retto di viti nei campi)",
      "Dal latino 'pagus' (villaggio rurale dove si produceva la carta)"
    ],
    "story": "Nell'agricoltura dell'antica Roma la 'pagina' (dal verbo 'pangere', piantare saldamente in terra) indicava un filare dritto di viti piantate a regola d'arte. Gli antichi notarono la suggestiva somiglianza visiva tra i filari ordinati che attraversavano i vigneti e le righe diritte di inchiostro su una pergamena, estendendo il nome al foglio scritto.",
    "shortEtymology": "latino pagina (da pangere) → filare di viti ordinato",
    "category": "arte",
    "relatedWords": [
      "matita",
      "inchiostro",
      "museo",
      "stile"
    ],
    "difficulty": 3
  },
  {
    "id": "matita",
    "word": "Matita",
    "correctAnswer": 0,
    "options": [
      "Dal greco 'haimatítēs' (pietra sanguigna, da haîma sangue)",
      "Dall'arabo 'maṭiyya' (bastoncino di legno da intaglio)",
      "Dal latino 'materia' (legno grezzo che racchiude il carbone)"
    ],
    "story": "Prima dell'avvento della grafite, gli artisti rinascimentali usavano bastoncini ricavati da un minerale di ferro dal caratteristico colore rosso bruno: l'ematite, chiamata così dal greco 'haimatítēs' (pietra sanguigna, da 'haîma', sangue). In Toscana il nome 'matita' rimase legato allo strumento da disegno anche quando la pietra rossa venne sostituita dalla grafite nera.",
    "shortEtymology": "greco haimatítēs (da haîma, sangue) → pietra sanguigna",
    "category": "arte",
    "relatedWords": [
      "inchiostro",
      "pagina",
      "architettura",
      "fotografia",
      "museo"
    ],
    "difficulty": 2
  },
  {
    "id": "inchiostro",
    "word": "Inchiostro",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'in-color' (sostanza che penetra e tinge)",
      "Dal celtico 'ink' (succo scuro di bacche macerate)",
      "Dal greco 'énkauston' (bruciato dentro, cotto a fuoco)"
    ],
    "story": "Deriva dal greco 'énkauston' attraverso il latino 'encaustum' (dal verbo 'enkaíō', bruciare dentro o scaldare a fuoco). Originariamente indicava la pittura a encausto e l'inchiostro purpureo imperiale bizantino preparato a caldo; col tempo il nome passò all'inchiostro comune di noci di galla e vetriolo, che sembrava corrodere e bruciare la pergamena.",
    "shortEtymology": "greco énkauston (da enkaíō) → cotto a fuoco / bruciato",
    "category": "arte",
    "relatedWords": [
      "matita",
      "pagina",
      "architettura",
      "museo"
    ],
    "difficulty": 2
  },
  {
    "id": "stanza",
    "word": "Stanza",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'stathmós' (misura geometrica delle mura)",
      "Dal latino 'stare' (luogo dove ci si ferma a dimorare)",
      "Dal provenzale 'estansa' (tenda per la sosta dei cavalieri)"
    ],
    "story": "La parola deriva dal verbo latino 'stare' (fermarsi, rimanere saldo). Una stanza era originariamente il luogo di riparo in cui un viandante o una famiglia faceva sosta per dimorare. Con la stessa identica metafora, la poesia classica ha chiamato 'stanza' la strofa di una canzone, dove il discorso poetico si ferma prima di riprendere.",
    "shortEtymology": "latino stare → luogo in cui ci si sofferma",
    "category": "oggetti",
    "relatedWords": [
      "camera",
      "finestra",
      "corridoio",
      "balcone"
    ],
    "difficulty": 1
  },
  {
    "id": "nadir",
    "word": "Nadir",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'naẓīr' (opposto, punto sotto i nostri piedi)",
      "Dal sanscrito 'nadira' (profondità dell'abisso terrestre)",
      "Dal latino 'navis dira' (abisso temuto dai navigatori)"
    ],
    "story": "Gli astronomi arabi medievali usavano l'espressione 'naẓīr as-samt' per indicare il punto della sfera celeste opposto allo zenit, cioè la direzione verticale situata esattamente sotto i piedi dell'osservatore. Oggi il termine è utilizzato anche in senso figurato per designare il punto più basso, critico o oscuro di una situazione.",
    "shortEtymology": "arabo naẓīr → opposto / punto sotto i piedi",
    "category": "scienza",
    "relatedWords": [
      "zenit",
      "almanacco",
      "algoritmo",
      "cifra"
    ],
    "difficulty": 2
  },
  {
    "id": "zenit",
    "word": "Zenit",
    "correctAnswer": 2,
    "options": [
      "Dal greco 'Zeus' (la dimora del re degli dei nel cielo)",
      "Dal persiano 'zinat' (la stella più luminosa dell'arco)",
      "Dall'arabo 'samt' (direzione perpendicolare sopra la testa)"
    ],
    "story": "La parola deriva dall'espressione araba 'samt ar-ra's', ossia 'la direzione sopra la testa'. Gli astronomi e traduttori medievali latini la trascrissero prima come 'semt' e poi, per un errore di trascrizione ottica della lettera 'm', in 'zenit'. È il punto della sfera celeste perpendicolare sopra l'osservatore, divenuto sinonimo del culmine del successo.",
    "shortEtymology": "arabo samt → direzione sopra la testa",
    "category": "scienza",
    "relatedWords": [
      "nadir",
      "almanacco",
      "algoritmo",
      "cifra"
    ],
    "difficulty": 2
  },
  {
    "id": "scirocco",
    "word": "Scirocco",
    "correctAnswer": 1,
    "options": [
      "Dalla Siria (il vento caldo proveniente dalle coste siriane)",
      "Dall'arabo 'šurūq' (il levante, il sorgere del sole)",
      "Dal greco 'skiron' (vento torrido delle scogliere)"
    ],
    "story": "Il nome del vento caldo e umido che spira da sud-est verso l'Italia proviene dalla parola araba 'šurūq' (il sorgere del sole, l'oriente, dalla radice š-r-q, levante). Per i marinai che navigavano nel Mediterraneo, il vento che spirava dall'oriente arabo era per eccellenza il vento del levante caldo.",
    "shortEtymology": "arabo šurūq → levante / sorgere del sole",
    "category": "natura",
    "relatedWords": [
      "monsone",
      "algoritmo",
      "zucchero",
      "caffe",
      "zanzara"
    ],
    "difficulty": 1
  },
  {
    "id": "almanacco",
    "word": "Almanacco",
    "correctAnswer": 0,
    "options": [
      "Dall'arabo 'al-manākh' (calendario, clima e tavole stagionali)",
      "Dal greco 'alētheia' (verità celesti calcolate con la geometria)",
      "Dal latino 'albus' (tavoletta bianca esposta nel foro)"
    ],
    "story": "Nel Medioevo gli astronomi arabi redigevano tavole astronomiche e climatiche con le effemeridi per calcolare le stagioni, le maree e le posizioni dei corpi celesti. Tradotti in latino come 'almanach', questi registri si diffusero in tutta Europa diventando le celebri pubblicazioni annuali ricche di previsioni, festività, fasi lunari e proverbi.",
    "shortEtymology": "arabo al-manākh → calendario e tavole astronomiche",
    "category": "scienza",
    "relatedWords": [
      "algoritmo",
      "cifra",
      "algebra",
      "tariffa",
      "nadir"
    ],
    "difficulty": 2
  },
  {
    "id": "giubba",
    "word": "Giubba",
    "correctAnswer": 2,
    "options": [
      "Dal latino 'iuba' (criniera di leone o pelliccia)",
      "Dalla città normanna di Giubbia centro di sartoria militare",
      "Dall'arabo 'ǧubba' (tunica lunga con maniche larghe)"
    ],
    "story": "La parola deriva dall'arabo 'ǧubba', che indicava una lunga tunica o sopravveste di stoffa con maniche larghe indossata in Medio Oriente sopra gli altri abiti. Attraverso i commerci delle Repubbliche marinare e la corte normanna di Palermo, il termine entrò nell'uso europeo per indicare prima la cotta d'armi e poi la giacca o giubbetto moderno.",
    "shortEtymology": "arabo ǧubba → tunica / veste da indossare sopra",
    "category": "oggetti",
    "relatedWords": [
      "cotone",
      "pigiama",
      "divano",
      "algoritmo"
    ],
    "difficulty": 2
  },
  {
    "id": "melanzana",
    "word": "Melanzana",
    "correctAnswer": 1,
    "options": [
      "Dal greco 'mela' (nero) e 'zanon' (bacca commestibile)",
      "Dall'arabo 'al-bāḏinǧān', poi storpiato popolarmente in 'mela insana'",
      "Dalla città indiana di Melangore dove fu coltivata per prima"
    ],
    "story": "Originaria dell'India, fu diffusa nel bacino del Mediterraneo dagli Arabi col nome 'al-bāḏinǧān', da cui il latino medievale 'melangiana'. Il popolo italiano, diffidente verso un ortaggio scuro all'epoca ritenuto tossico da crudo per la presenza di solanina, lo storpiò per paraetimologia in 'mela insana', ossia mela che farebbe impazzire o ammalare!",
    "shortEtymology": "arabo al-bāḏinǧān → paraetimologia 'mela insana'",
    "category": "cucina",
    "relatedWords": [
      "sciroppo",
      "zafferano",
      "albicocca",
      "cotone",
      "pasta"
    ],
    "difficulty": 1
  },
  {
    "id": "magari",
    "word": "Magari",
    "correctAnswer": 1,
    "options": [
      "Da un'esclamazione dialettale veneziana che indicava impazienza",
      "Dal greco makários, che significava 'beato' o 'felice'",
      "Dal latino magis, con il significato originario di 'più spesso'"
    ],
    "story": "Arriva dal greco 'makários', che significava 'beato', 'felice'. In origine esprimeva quindi un augurio sincero: 'che tu possa essere felice!'. Nel tempo l'espressione è cambiata, trasformandosi nell'esclamazione che usiamo tutti i giorni per esprimere un desiderio ardente o un sospiro di speranza: 'sarebbe bello se succedesse'.",
    "shortEtymology": "greco makários → beato, felice",
    "category": "societa",
    "relatedWords": [
      "scuola",
      "atleta",
      "stadio",
      "democrazia",
      "fantasia"
    ],
    "difficulty": 1
  },
  {
    "id": "cappella",
    "word": "Cappella",
    "correctAnswer": 0,
    "options": [
      "Dalla cappa, il mantello di San Martino venerato come reliquia",
      "Dal latino capella, piccola capra sacrificata sui monti",
      "Da caput, in quanto luogo principale di raccoglimento della pieve"
    ],
    "story": "Il nome deriva dalla 'cappa', cioè il celebre mantello di San Martino di Tours, tagliato a metà per condividerlo con un povero infreddolito. Secondo la tradizione, quel sacro mantello fu custodito come reliquia in un piccolo oratorio speciale: da lì nacque il termine 'cappella', in seguito esteso per indicare qualsiasi raccolto luogo di preghiera.",
    "shortEtymology": "latino cappa → mantello di San Martino",
    "category": "religione",
    "relatedWords": [
      "cappello",
      "carnevale",
      "paradiso",
      "inferno",
      "voto",
      "abracadabra"
    ],
    "difficulty": 2
  },
  {
    "id": "considerare",
    "word": "Considerare",
    "correctAnswer": 2,
    "options": [
      "Dal latino con-sedere, sedersi insieme a discutere con calma",
      "Dal greco sìderos (ferro), soppesare la pesantezza di un argomento",
      "Dal latino cum sidera, osservare attentamente il disegno delle stelle"
    ],
    "story": "Nasconde un meraviglioso riferimento al cielo notturno! Deriva dal latino 'cum sidera', letteralmente 'con le stelle'. In origine indicava l'atto con cui sacerdoti e osservatori scrutavano con somma attenzione la volta celeste e la disposizione degli astri per trarne auspici e predizioni. Oggi abbiamo dimenticato le costellazioni, ma riflettere attentamente su qualcosa significa ancora 'guardare insieme alle stelle'.",
    "shortEtymology": "latino cum sidera → con le stelle / scrutare gli astri",
    "category": "scienza",
    "relatedWords": [
      "disastro",
      "pianeta",
      "galassia",
      "energia",
      "universo"
    ],
    "difficulty": 2
  },
  {
    "id": "mancia",
    "word": "Mancia",
    "correctAnswer": 1,
    "options": [
      "Dal latino manus, un piccolo compenso passato di mano in mano",
      "Dal francese antico manche (manica), dono della dama al cavaliere nei tornei",
      "Dall'arabo manxah, moneta spicciola usata nei mercati portuali"
    ],
    "story": "Deriva dal francese antico 'manche', che significa 'manica'. Nel Medioevo cavalleresco, le nobildonne usavano staccare e donare una manica del proprio vestito al cavaliere favorito durante le giostre e i tornei, come pegno d'onore e protezione. Quel gesto di grazia e ricompensa ha attraversato i secoli, trasformandosi nel piccolo compenso di riconoscenza che lasciamo oggi per un servizio ben fatto.",
    "shortEtymology": "francese antico manche → manica del vestito donata in torneo",
    "category": "societa",
    "relatedWords": [
      "cappello",
      "capitale",
      "soldo",
      "moneta",
      "pantaloni"
    ],
    "difficulty": 2
  },
  {
    "id": "pantaloni",
    "word": "Pantaloni",
    "correctAnswer": 0,
    "options": [
      "Dalla maschera veneziana di Pantalone, che indossava calghe lunghe",
      "Dal greco pan-talos, che copre completamente gli arti inferiori",
      "Dalla città greca di Pantaleon famosa per la tessitura del lino"
    ],
    "story": "Il nome viene direttamente da Pantalone, la leggendaria maschera della commedia dell'arte veneziana. Rappresentava un vecchio mercante avaro ma comico, caratterizzato da un costume con lunghi calzoni rossi aderenti fino alle caviglie, in un'epoca in cui tutti gli uomini indossavano ancora calze e braghette corte. Quel costume ottenne un successo tale in tutta Europa che l'indumento prese per sempre il suo nome: i pantaloni.",
    "shortEtymology": "dalla maschera teatrale veneziana di Pantalone",
    "category": "arte",
    "relatedWords": [
      "serenata",
      "catastrofe",
      "museo",
      "teatro",
      "mancia"
    ],
    "difficulty": 1
  }
];

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
