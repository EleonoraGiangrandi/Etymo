const fs = require('fs');
const path = require('path');

// 1. Dati delle 62 nuove parole + perfezionamento delle 3 esistenti
const NEW_WORDS = [
  // --- SEZIONE 1: CORPO E VITA QUOTIDIANA ---
  {
    id: "testa",
    word: "Testa",
    correctAnswer: 0,
    options: [
      "Dal latino 'testa' (vaso di terracotta, poi cranio)",
      "Dal greco 'thekē' (custodia dei pensieri)",
      "Dal latino 'testari' (ciò che testimonia la vista)"
    ],
    story: "I Romani usavano la parola 'testa' per indicare un vaso o un recipiente di terracotta. Nel latino volgare, per somiglianza di forma e con tono scherzoso, passò a indicare il cranio e poi l'intera testa, soppiantando il classico 'caput'. Oggi portiamo sulle spalle un oggetto che, almeno nel nome, era un vaso da cucina.",
    shortEtymology: "latino testa → vaso di terracotta",
    category: "corpo",
    difficulty: 1
  },
  {
    id: "muscolo",
    word: "Muscolo",
    correctAnswer: 1,
    options: [
      "Dal latino 'muscus' (muschio, per la morbidezza)",
      "Dal latino 'musculus' (piccolo topo)",
      "Dal greco 'mys' (fibra elastica contrattile)"
    ],
    story: "I Romani chiamavano i muscoli 'musculi', diminutivo di 'mus' (piccolo topo). Quando si contrae il bicipite, la forma che si muove e guizza sotto la pelle ricordava loro proprio un topolino che corre. Anche il nome della nostra forza fisica nasce da un minuscolo roditore.",
    shortEtymology: "latino musculus → piccolo topo",
    category: "corpo",
    difficulty: 1
  },
  {
    id: "pupilla",
    word: "Pupilla",
    correctAnswer: 2,
    options: [
      "Dal latino 'pupula' (luce che pulsa)",
      "Dal greco 'popein' (scrutare nel buio)",
      "Dal latino 'pupilla' (bambolina riflessa)"
    ],
    story: "I Romani notarono che, guardando qualcuno molto da vicino negli occhi, sulla cornea si riflette una minuscola immagine di se stessi in miniatura. La chiamarono perciò 'pupilla', vezzeggiativo di 'pupa', cioè bambolina. Quando guardi qualcuno negli occhi, c'è letteralmente una piccola bambola di te riflessa dentro i suoi.",
    shortEtymology: "latino pupilla → bambolina",
    category: "corpo",
    difficulty: 1
  },
  {
    id: "clavicola",
    word: "Clavicola",
    correctAnswer: 0,
    options: [
      "Dal latino 'clavicula' (piccola chiave)",
      "Dal latino 'clavus' (chiodo che blocca la spalla)",
      "Dal greco 'kleiein' (chiudere il torace)"
    ],
    story: "La clavicola prende il nome dalla sua caratteristica forma ricurva a 'S', che agli antichi anatomisti romani ricordava una piccola chiave antica ('clavicula', diminutivo di 'clavis'). La chiamavano così perché ruota sul suo asse proprio come una chiave nella toppa durante il movimento dell'articolazione della spalla.",
    shortEtymology: "latino clavicula → piccola chiave",
    category: "corpo",
    difficulty: 2
  },
  {
    id: "sinistro",
    word: "Sinistro",
    correctAnswer: 1,
    options: [
      "Dal latino 'sine' (senza destrezza)",
      "Dal latino 'sinister' (sinistra, poi presagio infausto)",
      "Dall'etrusco 'sena' (direzione delle ombre)"
    ],
    story: "Nell'antica Roma gli indovini interpretavano il volo degli uccelli: per i Greci e in molte credenze romane, i presagi che giungevano dal lato sinistro ('sinister') erano considerati sfavorevoli e inquietanti. Col tempo, da semplice indicazione spaziale, 'sinistro' è diventato sinonimo di torvo, minaccioso o sfortunato.",
    shortEtymology: "latino sinister → lato sinistro / presagio sfavorevole",
    category: "corpo",
    difficulty: 1
  },
  {
    id: "destra",
    word: "Destra",
    correctAnswer: 0,
    options: [
      "Dal latino 'dextera' (mano destra, simbolo di abilità)",
      "Dal greco 'doxa' (opinione retta)",
      "Dal latino 'directus' (linea diritta)"
    ],
    story: "Per i Romani la mano destra ('dextera') era la mano abile, sicura, favorevole negli auspici e usata per stringere i patti d'onore. Da 'dexter' derivano parole come 'destrezza', ossia l'agilità e la bravura nel compiere qualcosa. Non a caso, chi è goffo e impacciato viene ancora oggi definito 'maldestro'.",
    shortEtymology: "latino dextera → mano destra / abile",
    category: "corpo",
    difficulty: 1
  },
  {
    id: "vaccino",
    word: "Vaccino",
    correctAnswer: 2,
    options: [
      "Dal latino 'vacuus' (vuoto di malattia)",
      "Dal medico francese Vacquin che lo perfezionò",
      "Dal latino 'vacca' (vaiolo bovino delle mucche)"
    ],
    story: "Nel 1796 Edward Jenner osservò che le mungitrici che contraevano il vaiolo bovino (cowpox) sembravano completamente protette dal mortale vaiolo umano. Prelevò allora del materiale dalle pustole di una mucca per immunizzare un bambino. Da 'vacca' nacque il termine 'vaccino': una delle massime conquiste della medicina moderna porta il nome di una mucca.",
    shortEtymology: "latino vacca → relativo alla mucca",
    category: "scienza",
    difficulty: 1
  },
  {
    id: "quarantena",
    word: "Quarantena",
    correctAnswer: 1,
    options: [
      "Dal latino 'quadrantum' (quarto di miglio dalla costa)",
      "Dall'italiano 'quaranta' (giorni di isolamento navale a Venezia)",
      "Dal greco 'karanos' (blocco militare dei porti)"
    ],
    story: "Nel Trecento, per contrastare la terribile peste nera, la Repubblica di Venezia impose a tutte le navi sospette provenienti da rotte d'oriente di attendere quaranta giorni all'ancora prima di poter sbarcare equipaggio e merci. Quel periodo cautelativo di quaranta giorni ha dato il nome a qualsiasi forma di isolamento sanitario nel mondo.",
    shortEtymology: "italiano quaranta → quaranta giorni d'isolamento a Venezia",
    category: "storia",
    difficulty: 1
  },
  {
    id: "influenza",
    word: "Influenza",
    correctAnswer: 0,
    options: [
      "Dal latino 'influentia' (influsso astrologico delle stelle)",
      "Dal latino 'influere' (fluido che scorre nei polmoni)",
      "Dall'arabo 'in-falū' (febbre delle stagioni fredde)"
    ],
    story: "Nel Medioevo e Rinascimento si credeva fermamente che le ondate epidemiche improvvise fossero scatenate dall'influsso malefico della congiunzione dei pianeti e delle stelle sulla vita umana. Si parlava perciò di 'influenza degli astri'. Oggi sappiamo che a farci ammalare sono i virus, ma continuiamo a usare una parola nata dall'astrologia.",
    shortEtymology: "latino influentia → influsso degli astri",
    category: "scienza",
    difficulty: 2
  },
  {
    id: "malaria",
    word: "Malaria",
    correctAnswer: 2,
    options: [
      "Dal greco 'melas' (fiele nero nel sangue)",
      "Dal sanscrito 'mal-ari' (febbre mortale)",
      "Dall'italiano 'mal'aria' (aria malsana delle paludi)"
    ],
    story: "Per secoli si pensò che le febbri intermittenti fossero causate dai miasmi e dall'aria mefitica emanata dalle paludi e dagli stagni: da qui il nome italiano 'mal'aria', aria cattiva. Non erano le esalazioni dell'aria a infettare le persone, ma le zanzare Anopheles che proliferavano nelle acque stagnanti.",
    shortEtymology: "italiano mala aria → aria malsana delle paludi",
    category: "scienza",
    difficulty: 1
  },
  {
    id: "panacea",
    word: "Panacea",
    correctAnswer: 1,
    options: [
      "Dal latino 'panis' (pane che dona nutrimento e vita)",
      "Dal greco 'panákeia' (rimedio capace di guarire tutto)",
      "Dall'arabo 'banaqs' (pozione universale alchemica)"
    ],
    story: "Nella mitologia greca, Panacea era la figlia di Asclepio (dio della medicina) e personificava la cura per qualsiasi male: il suo nome univa 'pan' (tutto) e 'ákos' (rimedio). Oggi cerchiamo ancora una panacea per i nostri problemi: una soluzione miracolosa e risolutiva che, proprio come nel mito, raramente esiste.",
    shortEtymology: "greco panákeia → rimedio per tutto",
    category: "religione",
    difficulty: 2
  },
  {
    id: "barbaro",
    word: "Barbaro",
    correctAnswer: 0,
    options: [
      "Dal greco 'bárbaros' (chi balbetta 'bar-bar' una lingua straniera)",
      "Dal latino 'barba' (chi porta la barba incolta)",
      "Dalla regione della Barberia nel Nord Africa"
    ],
    story: "Gli antichi Greci chiamavano 'bárbaroi' tutti coloro che non parlavano la lingua greca. Ai loro orecchi, le lingue straniere suonavano come un incomprensibile e rozzo balbettio onomatopeico: 'bar-bar-bar'. Una parola nata per prendere in giro le cadenze straniere si trasformò nei secoli in sinonimo di ferocia e inciviltà.",
    shortEtymology: "greco bárbaros → balbuziente / lingua incomprensibile",
    category: "storia",
    difficulty: 1
  },
  {
    id: "eco",
    word: "Eco",
    correctAnswer: 2,
    options: [
      "Dal latino 'equus' (suono che corre veloce come un cavallo)",
      "Dal greco 'echein' (trattenere il fiato tra le rocce)",
      "Dal nome della ninfa greca Eco (condannata a ripetere)"
    ],
    story: "Nella mitologia greca, Eco era una bellissima ninfa dei boschi punita da Era per le sue chiacchiere: fu condannata a non poter mai parlare per prima e a ripetere solo le ultime parole altrui. Consumata dal dolore per l'amore non corrisposto di Narciso, di lei rimase solo la voce tra le rocce dei monti.",
    shortEtymology: "greco echó → suono riflesso / ninfa Eco",
    category: "religione",
    difficulty: 1
  },

  // --- SEZIONE 2: OGGETTI, ABBIGLIAMENTO E CIBO ---
  {
    id: "atlante",
    word: "Atlante",
    correctAnswer: 1,
    options: [
      "Dall'arabo 'atlas' (seta geografica orientale)",
      "Dal titano greco Atlante (condannato a reggere il cielo)",
      "Dall'oceano Atlantico su cui si tracciavano le rotte"
    ],
    story: "Nella mitologia greca, il titano Atlante fu condannato da Zeus a sostenere sulle proprie spalle la volta celeste. Nel Cinquecento, il celebre cartografo Gerardo Mercatore raffigurò il titano che sostiene il globo sul frontespizio delle sue raccolte geografiche. Da allora, ogni raccolta di carte geografiche si chiama atlante.",
    shortEtymology: "greco Átlas → titano che regge il cielo",
    category: "oggetti",
    difficulty: 1
  },
  {
    id: "marmellata",
    word: "Marmellata",
    correctAnswer: 0,
    options: [
      "Dal portoghese 'marmelada' (confettura di mela cotogna)",
      "Dal latino 'mel' (miele) e 'mar' (frutto di mare)",
      "Dalla città francese di Marmande celebre per i frutti"
    ],
    story: "La parola deriva dal portoghese 'marmelada', che indicava originariamente una conserva dolce preparata unicamente con la mela cotogna, detta 'marmelo' in portoghese (dal greco 'melimelon', mela di miele). Anche se oggi chiamiamo marmellata le conserve di agrumi e altri frutti, il nome ricorda ancora la cotogna portoghese.",
    shortEtymology: "portoghese marmelo → mela cotogna",
    category: "cucina",
    difficulty: 2
  },
  {
    id: "cappuccino",
    word: "Cappuccino",
    correctAnswer: 2,
    options: [
      "Dalla forma a cupoletta di schiuma simile a un piccolo cappuccio",
      "Dal convento viennese di Kapuziner dove fu servito",
      "Dal colore marrone del saio dei frati cappuccini"
    ],
    story: "Il cappuccino deve il suo nome ai frati dell'ordine dei Cappuccini, riconoscibili dal caratteristico saio di lana marrone chiaro con cappuccio. Quando nei caffè di Vienna si iniziò a mescolare caffè e latte fino a ottenere quella tipica tonalità bruna, la bevanda venne battezzata 'Kapuziner' in loro onore.",
    shortEtymology: "italiano cappuccino → colore del saio dei frati cappuccini",
    category: "cucina",
    difficulty: 1
  },
  {
    id: "pigiama",
    word: "Pigiama",
    correctAnswer: 1,
    options: [
      "Dal francese 'pieu' (letto) e 'jambe' (gamba)",
      "Dal persiano 'pāy-jāma' (indumento per le gambe)",
      "Dal tamil 'pijam' (tessuto leggero per la notte)"
    ],
    story: "Arriva in Europa tramite gli inglesi durante il periodo coloniale in India, dove si indossavano comodi pantaloni leggeri allacciati in vita chiamati 'pāy-jāma', dal persiano 'pāy' (gamba/piede) e 'jāma' (vestito). Il nostro abito per dormire era originariamente un capo di pantaloni orientali da giorno.",
    shortEtymology: "persiano pāy-jāma → vestito per le gambe",
    category: "oggetti",
    difficulty: 2
  },
  {
    id: "bikini",
    word: "Bikini",
    correctAnswer: 0,
    options: [
      "Dall'atollo di Bikini nel Pacifico (teatro di test nucleari)",
      "Dal latino 'bi-kini' (costume in due pezzi minimi)",
      "Dall'isola polinesiana celebre per le immersioni"
    ],
    story: "Nel luglio 1946 il sarto parigino Louis Réard presentò un costume da bagno a due pezzi minuscolo e rivoluzionario. Pochi giorni prima gli americani avevano fatto esplodere ordigni nucleari nell'atollo di Bikini nel Pacifico: Réard scelse quel nome perché convinto che il costume avrebbe provocato un'esplosione mediatica mondiale.",
    shortEtymology: "toponimo Bikini → atollo degli esperimenti nucleari",
    category: "oggetti",
    difficulty: 1
  },
  {
    id: "sandwich",
    word: "Sandwich",
    correctAnswer: 2,
    options: [
      "Dalla sabbia ('sand') usata per essiccare il pane tostato",
      "Dall'antico porto mercantile inglese di Sandwich",
      "Dal conte di Sandwich che voleva mangiare giocando a carte"
    ],
    story: "Nel Settecento l'aristocratico inglese John Montagu, IV conte di Sandwich, era un giocatore d'azzardo così accanito da non voler interrompere le partite per pranzare. Chiese ai camerieri di servirgli carne fredda tra due fette di pane tostato, per mangiare con una mano senza ungere le carte. Gli altri giocatori iniziarono a ordinare 'lo stesso di Sandwich'.",
    shortEtymology: "antroponimo conte di Sandwich → panino da gioco",
    category: "cucina",
    difficulty: 1
  },
  {
    id: "jeans",
    word: "Jeans",
    correctAnswer: 1,
    options: [
      "Dall'inglese 'join' (cuciture rinforzate con rivetti)",
      "Dalla città di Genova ('Gênes' in francese, porto del tessuto)",
      "Dall'inventore tedesco Jean Davis collaboratore di Levi Strauss"
    ],
    story: "Il termine inglese 'jeans' deriva dalla pronuncia francese del nome di Genova: 'Gênes'. Fin dal Cinquecento, nel porto di Genova si produceva ed esportava un tessuto di fustagno e cotone blu estremamente resistente, adoperato per i pantaloni da lavoro dei marinai genovesi. La città italiana ha battezzato i pantaloni più famosi al mondo.",
    shortEtymology: "francese Gênes → Genova (tessuto dei marinai)",
    category: "oggetti",
    difficulty: 1
  },
  {
    id: "silhouette",
    word: "Silhouette",
    correctAnswer: 0,
    options: [
      "Dal ministro francese Étienne de Silhouette noto per la parsimonia",
      "Dal latino 'silva' (ombra degli alberi nel bosco)",
      "Dalla tecnica ottica inventata dall'incisore parigino Silhouet"
    ],
    story: "Nel 1759 Étienne de Silhouette fu ministro delle finanze francese celebre per i tagli spietati alla spesa pubblica. I parigini iniziarono a chiamare 'à la Silhouette' qualsiasi cosa fosse economica e ridotta all'essenziale, inclusi i ritratti veloci che riproducevano solo il profilo nero ritagliato su carta senza dipingere i dettagli.",
    shortEtymology: "antroponimo Étienne de Silhouette → ministro parsimonioso",
    category: "arte",
    difficulty: 2
  },
  {
    id: "garage",
    word: "Garage",
    correctAnswer: 2,
    options: [
      "Dal tedesco 'Garten' (giardino recintato di servizio)",
      "Dall'antico celtico 'gar' (luogo in cui sosta la ruota)",
      "Dal francese 'garer' (mettere al sicuro, proteggere)"
    ],
    story: "In francese 'garer' significava originariamente ormeggiare o mettere al riparo le imbarcazioni lungo le banchine dei fiumi. Alla comparsa delle prime automobili a fine Ottocento, il termine diede vita al sostantivo 'garage' per indicare il locale coperto dove ricoverare e custodire il veicolo al riparo dalle intemperie.",
    shortEtymology: "francese garer → mettere al riparo",
    category: "oggetti",
    difficulty: 2
  },

  // --- SEZIONE 3: STORIA, SOCIETÀ E COMMERCIO ---
  {
    id: "boicottaggio",
    word: "Boicottaggio",
    correctAnswer: 1,
    options: [
      "Dal francese 'bois' (barricate di tronchi degli insorti)",
      "Dal capitano Charles Boycott isolato dai contadini irlandesi",
      "Dal quartiere londinese di Boycott centro di scioperi"
    ],
    story: "Nel 1880 in Irlanda, il capitano Charles Boycott amministrava con estrema durezza le terre di un proprietario assenteista. In risposta ai suoi soprusi, la comunità contadina decise di isolarlo totalmente: nessuno lavorò più per lui, i commercianti rifiutarono di vendergli cibo e il postino non gli consegnò le lettere. Il suo cognome divenne il termine universale per indicare l'isolamento di protesta.",
    shortEtymology: "antroponimo Charles Boycott → capitano terriero isolato",
    category: "societa",
    difficulty: 2
  },
  {
    id: "assassino",
    word: "Assassino",
    correctAnswer: 0,
    options: [
      "Dall'arabo 'ḥashshāshīn' (fumatori di hashish, setta ismailita)",
      "Dal persiano 'as-sās' (ombra che colpisce di notte)",
      "Dal latino 'assaltare' (attaccare all'improvviso)"
    ],
    story: "Nel Medioevo delle Crociate, i cavalieri europei conobbero con terrore i membri della setta ismailita dei Nizariti, guidati dal Vecchio della Montagna, specializzati in omicidi politici mirati. Gli arabi li chiamavano 'ḥashshāshīn', forse per l'uso rituale di sostanze stupefacenti o in senso spregiativo. Da quel gruppo mediorientale nasce la parola 'assassino'.",
    shortEtymology: "arabo ḥashshāshīn → seguaci della setta degli Assassini",
    category: "storia",
    difficulty: 2
  },
  {
    id: "propaganda",
    word: "Propaganda",
    correctAnswer: 2,
    options: [
      "Dal greco 'pro-pan' (davanti a tutto il popolo)",
      "Dal latino 'prope' (avvicinare le masse alle idee)",
      "Dal latino 'propagare' (dalla Congregazione de Propaganda Fide)"
    ],
    story: "Nel 1622 papa Gregorio XV istituì la 'Congregatio de Propaganda Fide', un organismo incaricato di propagare e diffondere la fede cattolica nei territori di missione oltremare. Solo nei secoli successivi e con le guerre del Novecento la parola è passata a indicare la persuasione e diffusione organizzata di idee politiche e ideologiche.",
    shortEtymology: "latino propagare → diffondere / propagare la fede",
    category: "societa",
    difficulty: 2
  },
  {
    id: "gazzetta",
    word: "Gazzetta",
    correctAnswer: 1,
    options: [
      "Dalla gazza ladra (per la natura curiosa delle notizie)",
      "Dalla moneta veneziana 'gazeta' (il costo del foglio)",
      "Dall'arabo 'ghazat' (cronache delle spedizioni)"
    ],
    story: "Nella Venezia del Cinquecento, i primi fogli governativi contenenti notizie politiche e commerciali venivano venduti al prezzo di una monetina da due soldi chiamata 'gazeta' (forse per via di una gazza raffigurata sul conio). Il nome del prezzo passò in breve tempo al foglio stesso, diventando sinonimo mondiale di giornale e rassegna d'informazione.",
    shortEtymology: "veneziano gazeta → monetina da due soldi",
    category: "societa",
    difficulty: 1
  },
  {
    id: "tariffa",
    word: "Tariffa",
    correctAnswer: 0,
    options: [
      "Dall'arabo 'ta'rīfa' (notificazione, avviso di prezzi e dazi)",
      "Dalla città spagnola di Tarifa celebre per i pedaggi marittimi",
      "Dal latino 'tarare' (stabilire il peso netto della merce)"
    ],
    story: "Arriva in italiano attraverso i mercanti arabi mediterranei dal vocabolo 'ta'rīfa' (derivato da 'arafa', far conoscere o notificare). Nel commercio navale indicava l'avviso ufficiale recante il listino dei dazi doganali e dei prezzi obbligatori delle merci. Ogni volta che consultiamo una tariffa, usiamo una parola dei mercati arabi medievali.",
    shortEtymology: "arabo ta'rīfa → avviso / listino di dazi",
    category: "commercio",
    difficulty: 2
  },
  {
    id: "ammiraglio",
    word: "Ammiraglio",
    correctAnswer: 2,
    options: [
      "Dal latino 'admirabilis' (comandante degno di ammirazione)",
      "Dal greco 'almirós' (signore delle acque salse)",
      "Dall'arabo 'amīr al-baḥr' (comandante del mare)"
    ],
    story: "Il supremo grado della marina militare deriva dall'arabo 'amīr al-baḥr', che significa letteralmente 'comandante del mare' (da 'amīr', principe o signore, e 'baḥr', mare). I regnanti normanni di Sicilia e la Repubblica di Genova ne trassero il titolo navale latino di 'ammiratus', giunto poi fino a noi.",
    shortEtymology: "arabo amīr al-baḥr → comandante del mare",
    category: "guerra",
    difficulty: 2
  },
  {
    id: "arsenale",
    word: "Arsenale",
    correctAnswer: 1,
    options: [
      "Dal greco 'ars' (arte militare della difesa)",
      "Dall'arabo 'dār al-ṣinā'a' (casa della fabbricazione/industria navale)",
      "Dal latino 'arma senatus' (armi custodite dal senato)"
    ],
    story: "Deriva dall'arabo 'dār al-ṣinā'a', che significa letteralmente 'casa dell'industria' o officina navale. A Venezia l'Arsenale fu il cuore pulsante della potenza marittima dogale, un colossale cantiere protetto dove si costruivano e armavano le galee con una precisione seriale antesignana della catena di montaggio.",
    shortEtymology: "arabo dār al-ṣinā'a → casa dell'industria navale",
    category: "guerra",
    difficulty: 2
  },
  {
    id: "darsena",
    word: "Darsena",
    correctAnswer: 0,
    options: [
      "Dall'arabo 'dār al-ṣinā'a' (bacino interno del cantiere navale)",
      "Dal latino 'dorsum' (banchina rialzata delle acque)",
      "Dal greco 'drásis' (luogo di manovra dei rematori)"
    ],
    story: "Condivide la medesima origine araba di arsenale: 'dār al-ṣinā'a' (officina di fabbricazione navale). Mentre 'arsenale' a Venezia indicava l'immenso stabilimento militare, nei porti come Genova e Milano la variante 'darsena' passò a designare il bacino acqueo interno e tranquillo dove riparare e ancorare i navigli.",
    shortEtymology: "arabo dār al-ṣinā'a → bacino interno del porto",
    category: "viaggio",
    difficulty: 2
  },
  {
    id: "divano",
    word: "Divano",
    correctAnswer: 1,
    options: [
      "Dal latino 'diversus' (mobile per volgersi e rilassarsi)",
      "Dal persiano 'dīvān' (consiglio di stato con panche a cuscini)",
      "Dall'arabo 'daywan' (baldacchino da riposo nobiliare)"
    ],
    story: "In Persia e nell'impero ottomano, il 'dīvān' era originariamente il consiglio supremo dei ministri e la sala delle udienze governative, arredata con lunghi cuscini e materassi bassi lungo le pareti dove i burocrati sedevano. Con il tempo la parola è passata a indicare il comodo mobile imbottito del nostro soggiorno.",
    shortEtymology: "persiano dīvān → consiglio di stato con sedute a cuscini",
    category: "oggetti",
    difficulty: 2
  },
  {
    id: "cotone",
    word: "Cotone",
    correctAnswer: 0,
    options: [
      "Dall'arabo 'quṭun' (fibra vegetale introdotta in Sicilia)",
      "Dal greco 'kothon' (tessuto leggero per tuniche)",
      "Dal latino 'coctus' (fibra bollita e pettinata)"
    ],
    story: "La parola giunse in Europa attraverso l'arabo medievale 'quṭun' o 'quṭn'. La pianta, originaria dell'Oriente e dell'India, fu coltivata e commercializzata nel bacino del Mediterraneo dagli Arabi a partire dal IX secolo, rivoluzionando l'industria tessile europea che fino ad allora conosceva quasi solo lana e lino.",
    shortEtymology: "arabo quṭun → cotone",
    category: "oggetti",
    difficulty: 1
  },
  {
    id: "sciroppo",
    word: "Sciroppo",
    correctAnswer: 2,
    options: [
      "Dal latino 'serum' (estratto denso medicinale)",
      "Dalla città siriana di Scirap celebre per gli zuccheri",
      "Dall'arabo 'šarāb' (bevanda dolce medicinale)"
    ],
    story: "In arabo medievale 'šarāb' significava semplicemente 'bevanda' (dalla radice š-r-b, bere). I medici e speziali arabi svilupparono complesse pozioni liquide concentrate a base di zucchero e decotti d'erbe per preservare i principi curativi; la Scuola Medica Salernitana introdusse la preparazione e il nome in Europa.",
    shortEtymology: "arabo šarāb → bevanda",
    category: "cucina",
    difficulty: 2
  },
  {
    id: "zafferano",
    word: "Zafferano",
    correctAnswer: 1,
    options: [
      "Dall'ebraico 'sappir' (spezia preziosa come lo zaffiro)",
      "Dall'arabo 'za'farān' (da 'asfar', di colore giallo)",
      "Dal monte Zafer in Persia dove fioriva il croco"
    ],
    story: "Il nome deriva dall'arabo 'za'farān', strettamente connesso all'aggettivo 'asfar' (giallo). La costosissima spezia, ottenuta dagli stimmi del fiore Crocus sativus raccolti a mano all'alba, era considerata oro commestibile per il suo potere colorante e aromatico, trasportata con carovane sorvegliate lungo le rotte mercantili.",
    shortEtymology: "arabo za'farān → giallo / spezia preziosa",
    category: "cucina",
    difficulty: 1
  },
  {
    id: "albicocca",
    word: "Albicocca",
    correctAnswer: 0,
    options: [
      "Dall'arabo 'al-barqūq' (frutto che matura presto, dal latino praecoquum)",
      "Dalla regione dell'Albi in Provenza dove fu coltivata",
      "Dall'arabo 'al-biqq' (gemma d'oro degli alberi)"
    ],
    story: "La parola testimonia un affascinante viaggio linguistico mediterraneo: in latino classico il frutto era detto 'praecoquum' (precoce, perché matura prima della pesca). I Greci bizantini lo resero 'praikókion', gli Arabi lo acquisirono come 'al-barqūq' premettendovi l'articolo, e infine le lingue romanze lo riaccolsero come 'albicocca'.",
    shortEtymology: "arabo al-barqūq (dal latino praecoquum) → frutto precoce",
    category: "cucina",
    difficulty: 2
  },

  // --- SEZIONE 4: SCIENZA E TECNOLOGIA ---
  {
    id: "laser",
    word: "Laser",
    correctAnswer: 1,
    options: [
      "Dal latino 'laedere' (raggio che incide la materia)",
      "Dall'acronimo inglese 'Light Amplification by Stimulated Emission of Radiation'",
      "Dall'inventore tedesco Ernst Laser che lo brevettò"
    ],
    story: "La parola non nasce da una radice antica, ma è un acronimo scientifico coniato nel 1960 dal fisico Gordon Gould: 'Light Amplification by Stimulated Emission of Radiation' (amplificazione della luce mediante emissione stimolata di radiazione). Oggi è diventato un sostantivo d'uso comune presente nei lettori ottici, nelle telecomunicazioni e nella chirurgia.",
    shortEtymology: "acronimo inglese L.A.S.E.R. → amplificazione di luce per emissione stimolata",
    category: "scienza",
    difficulty: 1
  },
  {
    id: "pixel",
    word: "Pixel",
    correctAnswer: 0,
    options: [
      "Dalla contrazione inglese di 'picture element' (elemento d'immagine)",
      "Dal latino 'pix' (punto minuscolo d'inchiostro)",
      "Dalla sigla dei laboratori PIX-EL di elaborazione grafica"
    ],
    story: "Il termine fu introdotto negli anni Sessanta nei centri di ricerca della NASA per indicare il più piccolo tassello digitale che compone un'immagine scansionata dalle sonde spaziali. Nasce dalla fusione gergale di 'pix' (abbreviazione per 'pictures') ed 'el' (iniziali di 'element'): il pixel è letteralmente il mattone atomico delle immagini digitali.",
    shortEtymology: "inglese picture element → elemento d'immagine",
    category: "scienza",
    difficulty: 1
  },
  {
    id: "meme",
    word: "Meme",
    correctAnswer: 2,
    options: [
      "Dal francese 'même' (identico, che si ripete)",
      "Dall'inglese 'memory image' (immagine mnemonica)",
      "Dal greco 'mímēma' (imitazione, coniato da Richard Dawkins)"
    ],
    story: "Nel 1976 il biologo Richard Dawkins coniò la parola 'meme' nel saggio 'Il gene egoista'. Desiderava un vocabolo che richiamasse il greco 'mímēma' (imitazione) ma che fosse monosillabico come 'gene', per spiegare come un'idea o comportamento si replichi da una mente all'altra per imitazione culturale. La rete internet lo ha poi trasformato nel fenomeno virale che conosciamo.",
    shortEtymology: "greco mímēma → cosa imitata / replicatore culturale",
    category: "scienza",
    difficulty: 2
  },
  {
    id: "spam",
    word: "Spam",
    correctAnswer: 1,
    options: [
      "Dall'acronimo militare 'Spontaneous Post And Mail'",
      "Dalla carne in scatola 'SPAM' resa celebre dai Monty Python",
      "Dall'antico verbo inglese 'spamm' (inondare di rifiuti)"
    ],
    story: "Il termine deriva dal marchio americano SPAM (prosciutto speziato in scatola 'Spiced Ham'). Divenne sinonimo di comunicazioni fastidiose e ripetitive grazie a un celebre sketch dei Monty Python del 1970, in cui dei vichinghi cantavano incessantemente 'Spam, Spam, Spam' coprendo ogni altro dialogo. Da qui il passaggio alle email indesiderate che intasano la casella di posta.",
    shortEtymology: "marchio SPAM → parodia ripetitiva dei Monty Python",
    category: "scienza",
    difficulty: 1
  },
  {
    id: "bluetooth",
    word: "Bluetooth",
    correctAnswer: 0,
    options: [
      "Dal re vichingo danese Harald Dente Azzurro (Blåtand)",
      "Dalla luce LED azzurra che segnala l'accoppiamento dei dispositivi",
      "Dal colore della prima scocca prototipo sviluppata da Ericsson"
    ],
    story: "La tecnologia wireless prende il nome dal re vichingo danese del X secolo Harald Gormsson, detto 'Blåtand' (Dente Azzurro, forse per un dente scuro o per la passione per i mirtilli). Come re Harald fu celebre per aver unificato le discordi tribù scandinave sotto un solo regno, così il Bluetooth fu concepito per connettere dispositivi eterogenei. Il logo unisce le due rune scandinave delle sue iniziali.",
    shortEtymology: "scandinavo Blåtand → re Harald Dente Azzurro",
    category: "scienza",
    difficulty: 1
  },
  {
    id: "telefono",
    word: "Telefono",
    correctAnswer: 2,
    options: [
      "Dal latino 'tellus' (terra) e 'fonus' (corda vibrante)",
      "Dal francese 'téléphoner' (parlare attraverso le onde)",
      "Dal greco 'tēle' (lontano) e 'phōnē' (voce)"
    ],
    story: "Composto dai vocaboli del greco antico 'tēle' (da lontano) e 'phōnē' (suono, voce): il telefono è letteralmente la 'voce da lontano'. Il termine fu coniato nel XIX secolo prima per indicare sistemi di segnalazione acustica navale e poi consacrato dall'invenzione di Antonio Meucci ed Elisha Gray per la trasmissione elettrica della voce umana a grande distanza.",
    shortEtymology: "greco tēle + phōnē → voce da lontano",
    category: "scienza",
    difficulty: 1
  },
  {
    id: "fotografia",
    word: "Fotografia",
    correctAnswer: 1,
    options: [
      "Dal latino 'fovea' (camera oscura) e 'graphis' (stilo)",
      "Dal greco 'phōs' (luce) e 'graphía' (scrittura/disegno)",
      "Dal francese 'photo' (istantanea impressa)"
    ],
    story: "Coniato nel 1839 dall'astronomo e scienziato britannico John Herschel unendo due radici del greco antico: 'phōs' (luce, genitivo 'phōtós') e 'graphía' (scrittura, disegno). La fotografia è nel senso più letterale e poetico la 'scrittura con la luce': l'arte di imprimere indelebilmente la luce su una superficie sensibile.",
    shortEtymology: "greco phōs (luce) + graphía (scrittura)",
    category: "arte",
    difficulty: 1
  },
  {
    id: "semaforo",
    word: "Semaforo",
    correctAnswer: 0,
    options: [
      "Dal greco 'sēma' (segnale) e 'phóros' (portatore)",
      "Dal latino 'semita' (strada) e 'forare' (aprire il varco)",
      "Dal greco 'semas' (tre colori luminosi di sicurezza)"
    ],
    story: "Il semaforo nasce ben prima delle automobili: la parola unisce il greco 'sēma' (segno, segnale) e 'phóros' (portatore, dal verbo 'phérein', portare), ossia letteralmente 'portatore di segnali'. In origine indicava i telegrafi ottici con bracci orientabili posti lungo le coste per comunicare con le navi, poi applicato alle lanterne stradali ferroviarie e cittadine.",
    shortEtymology: "greco sēma + phóros → portatore di segnali",
    category: "oggetti",
    difficulty: 2
  },
  {
    id: "autobus",
    word: "Autobus",
    correctAnswer: 2,
    options: [
      "Dal greco 'autos' (da sé) e dal latino 'bucca' (grande bocca di carico)",
      "Dal nome della prima carrozzeria parigina 'Autobus Frères'",
      "Dal latino 'omnibus' (per tutti) unito a 'auto'"
    ],
    story: "Nel 1826 a Nantes, le carrozze pubbliche a cavalli avevano il capolinea davanti al negozio di un cappellaio di nome Omnès, che esponeva l'insegna scherzosa 'Omnes Omnibus' (latino per 'Omnès per tutti'). Le carrozze vennero chiamate 'omnibus' (per tutti), poi contratto in 'bus' e abbinato al prefisso 'auto' quando furono introdotte le carrozze a motore.",
    shortEtymology: "latino omnibus → per tutti",
    category: "viaggio",
    difficulty: 2
  },
  {
    id: "bicicletta",
    word: "Bicicletta",
    correctAnswer: 1,
    options: [
      "Dal latino 'bis' (due) e 'cella' (due sellini gemelli)",
      "Dal latino 'bi-' (due) e dal greco 'kýklos' (ruota, cerchio)",
      "Dal francese 'biche' (veloce come una cerva su strada)"
    ],
    story: "Adattamento del francese 'bicyclette', diminutivo di 'bicycle', formato dal prefisso latino 'bi-' (due volte) e dal greco 'kýklos' (cerchio, ruota): letteralmente 'piccolo veicolo a due ruote'. Le prime antenate non avevano pedali e avanzavano spingendo i piedi sul selciato, ma il nome ha sempre celebrato le sue due cerchie.",
    shortEtymology: "latino bi- (due) + greco kýklos (ruota)",
    category: "viaggio",
    difficulty: 1
  },
  {
    id: "automobile",
    word: "Automobile",
    correctAnswer: 0,
    options: [
      "Dal greco 'autós' (sé stesso) e dal latino 'mobilis' (che si muove)",
      "Dal latino 'automatus' (macchina semovente delle officine)",
      "Dal francese 'automobil' (carrozza con trazione a vapore)"
    ],
    story: "La parola è un ibrido linguistico coniato alla fine dell'Ottocento unendo il greco 'autós' (da sé stesso) e l'aggettivo latino 'mobilis' (mobile, che si muove): letteralmente 'che si muove da sé'. Quando apparvero i primi modelli a combustione interna, l'idea di un carro capace di viaggiare senza cavalli pareva una meraviglia quasi fantascientifica.",
    shortEtymology: "greco autós (da sé) + latino mobilis (mobile)",
    category: "viaggio",
    difficulty: 1
  },

  // --- SEZIONE 5: PAROLE CHE RACCONTANO STORIE SORPRENDENTI ---
  {
    id: "dollaro",
    word: "Dollaro",
    correctAnswer: 1,
    options: [
      "Dal latino 'dolus' (moneta senza inganno di peso)",
      "Dal tedesco 'Thaler' (dalla valle boema di Joachimsthal)",
      "Dall'olandese 'dolder' (piccola corona d'oro delle Indie)"
    ],
    story: "Nel Cinquecento, nella città mineraria boema di Joachimsthal (valle di San Gioacchino), si estraeva argento con cui venivano coniate le celebri monete 'Joachimsthaler'. Il nome venne presto abbreviato in 'Thaler' in tutta l'Europa centrale, anglicizzato in 'dollar' e scelto infine nel 1792 come moneta sovrana degli Stati Uniti d'America.",
    shortEtymology: "tedesco Thaler (da Joachimsthal) → moneta della valle d'argento",
    category: "commercio",
    difficulty: 2
  },
  {
    id: "denaro",
    word: "Denaro",
    correctAnswer: 0,
    options: [
      "Dal latino 'denarius' (moneta romana che valeva dieci assi)",
      "Dal greco 'danaos' (tributo da pagare agli dei)",
      "Dal latino 'dare' (ciò che si dà in cambio di beni)"
    ],
    story: "Il termine deriva dal latino 'denarius', prestigiosa moneta d'argento coniata nella Roma repubblicana a partire dalla seconda guerra punica. Il nome traeva origine da 'deni' (dieci per ciascuno), poiché all'inizio un denario valeva esattamente dieci assi di bronzo. Da quella moneta romana d'argento è nato il vocabolo comune per i soldi.",
    shortEtymology: "latino denarius (da deni) → che vale dieci assi",
    category: "commercio",
    difficulty: 1
  },
  {
    id: "stipendio",
    word: "Stipendio",
    correctAnswer: 2,
    options: [
      "Dal latino 'stips' (moneta) e 'pensum' (compito da svolgere)",
      "Dalla tribù romana degli Stipendii esente da tributi",
      "Dal latino 'stips' (moneta) e 'pendere' (pesare sulla bilancia)"
    ],
    story: "Nell'antica Roma lo 'stipendium' era il soldo versato annualmente ai soldati delle legioni. L'etimologia unisce 'stips' (piccola moneta di rame) e il verbo 'pendere' (pesare): in epoca arcaica, prima della diffusione delle monete coniate dal valore garantito, il bronzo veniva letteralmente pesato sulla bilancia per retribuire i legionari.",
    shortEtymology: "latino stips (moneta) + pendere (pesare) → paga pesata",
    category: "commercio",
    difficulty: 2
  },
  {
    id: "bonus",
    word: "Bonus",
    correctAnswer: 1,
    options: [
      "Dall'acronimo bancario 'Bond Of National Utility Service'",
      "Dal latino 'bonus' (buono, ricompensa per il merito)",
      "Dal francese antico 'bonis' (avanzo di cassa della bottega)"
    ],
    story: "In latino 'bonus' è semplicemente l'aggettivo che significa 'buono'. Il suo impiego moderno come sostantivo per indicare un compenso straordinario, un incentivo o un premio speciale nacque nel linguaggio aziendale e assicurativo anglosassone dell'Ottocento, per poi diffondersi a livello internazionale come simbolo di gratifica positiva.",
    shortEtymology: "latino bonus → buono / gratifica straordinaria",
    category: "commercio",
    difficulty: 1
  },
  {
    id: "credito",
    word: "Credito",
    correctAnswer: 0,
    options: [
      "Dal latino 'creditum' (da 'credere', riporre fiducia)",
      "Dal greco 'kredon' (garanzia scritta di debito)",
      "Dal latino 'crescere' (denaro che genera interessi)"
    ],
    story: "La parola nasce dal participio del verbo latino 'credere' (avere fede, confidare). Nel mondo romano concedere un prestito non era solo una transazione contabile ma un atto fondato sulla parola: significava fidarsi della promessa del debitore che la somma sarebbe stata restituita. Ancora oggi, ogni credito bancario poggia sull'antica fiducia.",
    shortEtymology: "latino creditum (da credere) → cosa fidata",
    category: "commercio",
    difficulty: 1
  },
  {
    id: "fallimento",
    word: "Fallimento",
    correctAnswer: 2,
    options: [
      "Dall'antico germanico 'fall' (caduta rovinosa a terra)",
      "Dal latino 'falsus' (inganno fraudolento dei registri)",
      "Dal latino 'fallere' (ingannare, deludere l'aspettativa)"
    ],
    story: "Deriva dal verbo latino 'fallere', che significava 'ingannare, deludere o venire meno a un impegno preso'. Nel diritto mercantile medievale dei banchieri toscani, fallire significava venire meno alla fiducia dei creditori e all'aspettativa di pagamento, sancito spesso con la distruzione pubblica del banco dell'operatore insolvente.",
    shortEtymology: "latino fallere → deludere l'aspettativa / venire meno",
    category: "commercio",
    difficulty: 2
  },
  {
    id: "pagina",
    word: "Pagina",
    correctAnswer: 1,
    options: [
      "Dal greco 'pegma' (telaio su cui si tirava la pergamena)",
      "Dal latino 'pagina' (filare retto di viti nei campi)",
      "Dal latino 'pagus' (villaggio rurale dove si produceva la carta)"
    ],
    story: "Nell'agricoltura dell'antica Roma la 'pagina' (dal verbo 'pangere', piantare saldamente in terra) indicava un filare dritto di viti piantate a regola d'arte. Gli antichi notarono la suggestiva somiglianza visiva tra i filari ordinati che attraversavano i vigneti e le righe diritte di inchiostro su una pergamena, estendendo il nome al foglio scritto.",
    shortEtymology: "latino pagina (da pangere) → filare di viti ordinato",
    category: "arte",
    difficulty: 3
  },
  {
    id: "matita",
    word: "Matita",
    correctAnswer: 0,
    options: [
      "Dal greco 'haimatítēs' (pietra sanguigna, da haîma sangue)",
      "Dall'arabo 'maṭiyya' (bastoncino di legno da intaglio)",
      "Dal latino 'materia' (legno grezzo che racchiude il carbone)"
    ],
    story: "Prima dell'avvento della grafite, gli artisti rinascimentali usavano bastoncini ricavati da un minerale di ferro dal caratteristico colore rosso bruno: l'ematite, chiamata così dal greco 'haimatítēs' (pietra sanguigna, da 'haîma', sangue). In Toscana il nome 'matita' rimase legato allo strumento da disegno anche quando la pietra rossa venne sostituita dalla grafite nera.",
    shortEtymology: "greco haimatítēs (da haîma, sangue) → pietra sanguigna",
    category: "arte",
    difficulty: 2
  },
  {
    id: "inchiostro",
    word: "Inchiostro",
    correctAnswer: 2,
    options: [
      "Dal latino 'in-color' (sostanza che penetra e tinge)",
      "Dal celtico 'ink' (succo scuro di bacche macerate)",
      "Dal greco 'énkauston' (bruciato dentro, cotto a fuoco)"
    ],
    story: "Deriva dal greco 'énkauston' attraverso il latino 'encaustum' (dal verbo 'enkaíō', bruciare dentro o scaldare a fuoco). Originariamente indicava la pittura a encausto e l'inchiostro purpureo imperiale bizantino preparato a caldo; col tempo il nome passò all'inchiostro comune di noci di galla e vetriolo, che sembrava corrodere e bruciare la pergamena.",
    shortEtymology: "greco énkauston (da enkaíō) → cotto a fuoco / bruciato",
    category: "arte",
    difficulty: 2
  },
  {
    id: "stanza",
    word: "Stanza",
    correctAnswer: 1,
    options: [
      "Dal greco 'stathmós' (misura geometrica delle mura)",
      "Dal latino 'stare' (luogo dove ci si ferma a dimorare)",
      "Dal provenzale 'estansa' (tenda per la sosta dei cavalieri)"
    ],
    story: "La parola deriva dal verbo latino 'stare' (fermarsi, rimanere saldo). Una stanza era originariamente il luogo di riparo in cui un viandante o una famiglia faceva sosta per dimorare. Con la stessa identica metafora, la poesia classica ha chiamato 'stanza' la strofa di una canzone, dove il discorso poetico si ferma prima di riprendere.",
    shortEtymology: "latino stare → luogo in cui ci si sofferma",
    category: "oggetti",
    difficulty: 1
  },
  {
    id: "nadir",
    word: "Nadir",
    correctAnswer: 0,
    options: [
      "Dall'arabo 'naẓīr' (opposto, punto sotto i nostri piedi)",
      "Dal sanscrito 'nadira' (profondità dell'abisso terrestre)",
      "Dal latino 'navis dira' (abisso temuto dai navigatori)"
    ],
    story: "Gli astronomi arabi medievali usavano l'espressione 'naẓīr as-samt' per indicare il punto della sfera celeste opposto allo zenit, cioè la direzione verticale situata esattamente sotto i piedi dell'osservatore. Oggi il termine è utilizzato anche in senso figurato per designare il punto più basso, critico o oscuro di una situazione.",
    shortEtymology: "arabo naẓīr → opposto / punto sotto i piedi",
    category: "scienza",
    difficulty: 2
  },
  {
    id: "zenit",
    word: "Zenit",
    correctAnswer: 2,
    options: [
      "Dal greco 'Zeus' (la dimora del re degli dei nel cielo)",
      "Dal persiano 'zinat' (la stella più luminosa dell'arco)",
      "Dall'arabo 'samt' (direzione perpendicolare sopra la testa)"
    ],
    story: "La parola deriva dall'espressione araba 'samt ar-ra's', ossia 'la direzione sopra la testa'. Gli astronomi e traduttori medievali latini la trascrissero prima come 'semt' e poi, per un errore di trascrizione ottica della lettera 'm', in 'zenit'. È il punto della sfera celeste perpendicolare sopra l'osservatore, divenuto sinonimo del culmine del successo.",
    shortEtymology: "arabo samt → direzione sopra la testa",
    category: "scienza",
    difficulty: 2
  },
  {
    id: "scirocco",
    word: "Scirocco",
    correctAnswer: 1,
    options: [
      "Dalla Siria (il vento caldo proveniente dalle coste siriane)",
      "Dall'arabo 'šurūq' (il levante, il sorgere del sole)",
      "Dal greco 'skiron' (vento torrido delle scogliere)"
    ],
    story: "Il nome del vento caldo e umido che spira da sud-est verso l'Italia proviene dalla parola araba 'šurūq' (il sorgere del sole, l'oriente, dalla radice š-r-q, levante). Per i marinai che navigavano nel Mediterraneo, il vento che spirava dall'oriente arabo era per eccellenza il vento del levante caldo.",
    shortEtymology: "arabo šurūq → levante / sorgere del sole",
    category: "natura",
    difficulty: 1
  },
  {
    id: "almanacco",
    word: "Almanacco",
    correctAnswer: 0,
    options: [
      "Dall'arabo 'al-manākh' (calendario, clima e tavole stagionali)",
      "Dal greco 'alētheia' (verità celesti calcolate con la geometria)",
      "Dal latino 'albus' (tavoletta bianca esposta nel foro)"
    ],
    story: "Nel Medioevo gli astronomi arabi redigevano tavole astronomiche e climatiche con le effemeridi per calcolare le stagioni, le maree e le posizioni dei corpi celesti. Tradotti in latino come 'almanach', questi registri si diffusero in tutta Europa diventando le celebri pubblicazioni annuali ricche di previsioni, festività, fasi lunari e proverbi.",
    shortEtymology: "arabo al-manākh → calendario e tavole astronomiche",
    category: "scienza",
    difficulty: 2
  },
  {
    id: "giubba",
    word: "Giubba",
    correctAnswer: 2,
    options: [
      "Dal latino 'iuba' (criniera di leone o pelliccia)",
      "Dalla città normanna di Giubbia centro di sartoria militare",
      "Dall'arabo 'ǧubba' (tunica lunga con maniche larghe)"
    ],
    story: "La parola deriva dall'arabo 'ǧubba', che indicava una lunga tunica o sopravveste di stoffa con maniche larghe indossata in Medio Oriente sopra gli altri abiti. Attraverso i commerci delle Repubbliche marinare e la corte normanna di Palermo, il termine entrò nell'uso europeo per indicare prima la cotta d'armi e poi la giacca o giubbetto moderno.",
    shortEtymology: "arabo ǧubba → tunica / veste da indossare sopra",
    category: "oggetti",
    difficulty: 2
  },
  {
    id: "melanzana",
    word: "Melanzana",
    correctAnswer: 1,
    options: [
      "Dal greco 'mela' (nero) e 'zanon' (bacca commestibile)",
      "Dall'arabo 'al-bāḏinǧān', poi storpiato popolarmente in 'mela insana'",
      "Dalla città indiana di Melangore dove fu coltivata per prima"
    ],
    story: "Originaria dell'India, fu diffusa nel bacino del Mediterraneo dagli Arabi col nome 'al-bāḏinǧān', da cui il latino medievale 'melangiana'. Il popolo italiano, diffidente verso un ortaggio scuro all'epoca ritenuto tossico da crudo per la presenza di solanina, lo storpiò per paraetimologia in 'mela insana', ossia mela che farebbe impazzire o ammalare!",
    shortEtymology: "arabo al-bāḏinǧān → paraetimologia 'mela insana'",
    category: "cucina",
    difficulty: 1
  },
  {
    id: "magari",
    word: "Magari",
    correctAnswer: 1,
    options: [
      "Da un'esclamazione dialettale veneziana che indicava impazienza",
      "Dal greco makários, che significava 'beato' o 'felice'",
      "Dal latino magis, con il significato originario di 'più spesso'"
    ],
    story: "Arriva dal greco 'makários', che significava 'beato', 'felice'. In origine esprimeva quindi un augurio sincero: 'che tu possa essere felice!'. Nel tempo l'espressione è cambiata, trasformandosi nell'esclamazione che usiamo tutti i giorni per esprimere un desiderio ardente o un sospiro di speranza: 'sarebbe bello se succedesse'.",
    shortEtymology: "greco makários → beato, felice",
    category: "societa",
    difficulty: 1
  },
  {
    id: "cappella",
    word: "Cappella",
    correctAnswer: 0,
    options: [
      "Dalla cappa, il mantello di San Martino venerato come reliquia",
      "Dal latino capella, piccola capra sacrificata sui monti",
      "Da caput, in quanto luogo principale di raccoglimento della pieve"
    ],
    story: "Il nome deriva dalla 'cappa', cioè il celebre mantello di San Martino di Tours, tagliato a metà per condividerlo con un povero infreddolito. Secondo la tradizione, quel sacro mantello fu custodito come reliquia in un piccolo oratorio speciale: da lì nacque il termine 'cappella', in seguito esteso per indicare qualsiasi raccolto luogo di preghiera.",
    shortEtymology: "latino cappa → mantello di San Martino",
    category: "religione",
    difficulty: 2
  },
  {
    id: "considerare",
    word: "Considerare",
    correctAnswer: 2,
    options: [
      "Dal latino con-sedere, sedersi insieme a discutere con calma",
      "Dal greco sìderos (ferro), soppesare la pesantezza di un argomento",
      "Dal latino cum sidera, osservare attentamente il disegno delle stelle"
    ],
    story: "Nasconde un meraviglioso riferimento al cielo notturno! Deriva dal latino 'cum sidera', letteralmente 'con le stelle'. In origine indicava l'atto con cui sacerdoti e osservatori scrutavano con somma attenzione la volta celeste e la disposizione degli astri per trarne auspici e predizioni. Oggi abbiamo dimenticato le costellazioni, ma riflettere attentamente su qualcosa significa ancora 'guardare insieme alle stelle'.",
    shortEtymology: "latino cum sidera → con le stelle / scrutare gli astri",
    category: "scienza",
    difficulty: 2
  },
  {
    id: "mancia",
    word: "Mancia",
    correctAnswer: 1,
    options: [
      "Dal latino manus, un piccolo compenso passato di mano in mano",
      "Dal francese antico manche (manica), dono della dama al cavaliere nei tornei",
      "Dall'arabo manxah, moneta spicciola usata nei mercati portuali"
    ],
    story: "Deriva dal francese antico 'manche', che significa 'manica'. Nel Medioevo cavalleresco, le nobildonne usavano staccare e donare una manica del proprio vestito al cavaliere favorito durante le giostre e i tornei, come pegno d'onore e protezione. Quel gesto di grazia e ricompensa ha attraversato i secoli, trasformandosi nel piccolo compenso di riconoscenza che lasciamo oggi per un servizio ben fatto.",
    shortEtymology: "francese antico manche → manica del vestito donata in torneo",
    category: "societa",
    difficulty: 2
  },
  {
    id: "pantaloni",
    word: "Pantaloni",
    correctAnswer: 0,
    options: [
      "Dalla maschera veneziana di Pantalone, che indossava calghe lunghe",
      "Dal greco pan-talos, che copre completamente gli arti inferiori",
      "Dalla città greca di Pantaleon famosa per la tessitura del lino"
    ],
    story: "Il nome viene direttamente da Pantalone, la leggendaria maschera della commedia dell'arte veneziana. Rappresentava un vecchio mercante avaro ma comico, caratterizzato da un costume con lunghi calzoni rossi aderenti fino alle caviglie, in un'epoca in cui tutti gli uomini indossavano ancora calze e braghette corte. Quel costume ottenne un successo tale in tutta Europa che l'indumento prese per sempre il suo nome: i pantaloni.",
    shortEtymology: "dalla maschera teatrale veneziana di Pantalone",
    category: "arte",
    difficulty: 1
  }
];

// Parole da aggiornare/perfezionare se già presenti:
const UPDATES = {
  clima: {
    story: "Per i greci, il clima dipendeva dall'inclinazione ('klíma') della Terra rispetto ai raggi del Sole: a diversa inclinazione corrispondevano diverse temperature e stagioni. Oggi sappiamo quanto le attività umane influenzino l'atmosfera, ma l'etimologia ci ricorda l'inclinazione astronomica del nostro pianeta.",
    shortEtymology: "greco klíma → inclinazione della Terra",
    category: "natura",
    difficulty: 2
  },
  robot: {
    story: "Nel 1920 lo scrittore ceco Karel Čapek utilizzò per la prima volta la parola 'robot' nella sua opera teatrale fantascientifica R.U.R., su suggerimento del fratello Josef. La parola derivava da 'robota', che in ceco indicava il lavoro servile e forzato dei contadini. I robot sono nati, almeno nel nome, come operai schiavi.",
    shortEtymology: "ceco robota → lavoro forzato",
    category: "scienza",
    difficulty: 1
  },
  ombrello: {
    story: "L'ombrello nasceva per ripararsi dal sole cocente, non dalla pioggia. Il suo nome deriva infatti dal latino 'umbra' (ombra): era un accessorio elegante e ricercato per fare ombra sul capo delle nobildonne. Solo molto più tardi, nelle umide città del nord Europa, fu impermeabilizzato per difendersi dai temporali.",
    shortEtymology: "latino umbra → ombra contro il sole",
    category: "oggetti",
    difficulty: 1
  }
};

module.exports = { NEW_WORDS, UPDATES };
