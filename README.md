<div align="center">

# 🏛️ Etymo

**Viaggio alle radici della lingua italiana**

*Un'applicazione mobile open-source per riscoprire l'origine, l'evoluzione e le storie nascoste dietro le parole che usiamo ogni giorno.*

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Offline First](https://img.shields.io/badge/Architecture-Offline--First-2e7d32?style=for-the-badge)](https://github.com/EleonoraGiangrandi/Etymo)
[![Open Source](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

<br/>

[Descrizione](#-cosè-etymo) • [Funzionalità](#-funzionalità-principali) • [Grafo Semantico](#-il-grafo-etimologico) • [Architettura](#-architettura-e-stack-tecnologico) • [Installazione](#-guida-allinstallazione) • [Privacy](#-privacy-e-trasparenza) • [English Summary](#-english-summary)

---

</div>

## 📖 Cos'è Etymo?

Ogni parola italiana racchiude secoli di viaggi, trasformazioni e aneddoti: dal greco classico al latino imperiale, dalle corti medievali alle rotte commerciali veneziane e al mondo arabo.

**Etymo** è un'applicazione didattica ed educativa progettata per rendere l'etimologia un'esperienza visiva, coinvolgente e interattiva. Lontana dai dizionari aridi, Etymo unisce **gamification**, **visualizzazione a grafo su larga scala** e il collaudato sistema di ripasso spaziato (**Spaced Repetition System / SRS**) per aiutarti ad arricchire il tuo vocabolario giorno dopo giorno.

> 💡 **Nota sulla lingua**: Etymo è interamente incentrata sulla bellezza della lingua italiana e sulle sue radici storiche. La documentazione principale è redatta in italiano, con un [English Summary](#-english-summary) per la community internazionale di sviluppatori.

---

## ✨ Funzionalità Principali

### 🌅 1. La Parola del Giorno & Notifiche
- Ogni giorno una parola selezionata e curata con precisione filologica: radice, lingua d'origine, evoluzione fonetica, curiosità storiche e aneddoti culturali.
- Promemoria quotidiano configurabile e programmato **al 100% in locale** tramite notifiche del dispositivo (`expo-notifications`), senza profilazione né server esterni.

### 🕸️ 2. Grafo Etimologico Interattivo & "Rabbit Hole"
- **Oltre 250 parole** collegate da **più di 1100 archi semantici e storici**.
- Motore di rendering ad alte prestazioni basato su **HTML5 Canvas 2D + simulazione fisica force-directed**.
- Esplora collegamenti tra parole che condividono la stessa radice (es. *caput*, *panis*, *skopein*, prefissi arabi *al-*, ecc.) o lo stesso contesto storico (Medicina classica, Teatro greco, Marineria veneziana).
- **Modalità Rabbit Hole**: naviga all'infinito di parola in parola seguendo fili conduttori etimologici sorprendenti, con prevenzione dei rimbalzi e camera fluida auto-adattiva.

### 🗂️ 3. Archivio Lessicale & Spaced Repetition (SRS)
- **Catalogo categorizzato**: esplora parole per categorie canoniche (Società, Oggetti e Spazi, Arte e Spettacolo, Scienza, Corpo e Mente, Religione e Mito, Cucina, Storia, Natura, Commercio, Viaggio, Guerra).
- **Filtri e Ricerca Rapida**: trova istantaneamente parole per lemma, lingua d'origine o radice.
- **Accademia & Flashcard**: metti alla prova le tue conoscenze con schede di ripasso intelligenti. Il sistema SRS traccia il livello di padronanza (Mastery 1-3) per consolidare i termini nella memoria a lungo termine.

### 🎮 4. Minigiochi e Sfide
- **Modalità Blitz**: una corsa contro il tempo per indovinare l'etimologia o il significato corretto.
- **Quiz Classico**: domande a risposta multipla con feedback immediato e spiegazioni educative.
- **Parola Casuale**: lasciati sorprendere dalla fortuna per scoprire gemme lessicali inaspettate.

### 🏆 5. Gamification & 12 Traguardi (Badges)
- Sistema progressivo di sblocco con 12 traguardi dedicati: *Primi Passi*, *Curioso*, *Esploratore*, *Erudito*, *Filologo*, *Maestro della Lingua*, *Serie di Fuoco*, *Costanza*, *Campione Blitz*, *Memoria d'Acciaio*, *Collezionista* e *Poliglotta*.
- Conteggio della serie di studio quotidiana (streak) con moltiplicatori combo.

### 📱 6. Widget Mascotte per la Schermata Home
- Widget nativo per Android (`react-native-android-widget`) che mostra la parola del giorno, la sua definizione e la simpatica mascotte di Etymo direttamente sul desktop dello smartphone.

---

## 🔒 Filosofia Offline-First & Privacy

Etymo è costruita con una forte etica di rispetto per l'utente:
- 📱 **Zero Dati Personali Raccolti**: Nessun obbligo di registrazione o creazione account.
- 💾 **Memoria Locale Protetta**: Tutti i progressi, i punteggi, i badge, le note e le preferenze risiedono unicamente nello storage locale (`AsyncStorage`).
- 🔄 **Esportazione & Backup JSON**: Pieno controllo e sovranità sui tuoi dati. Puoi esportare o ripristinare il tuo intero profilo con un semplice copia-incolla JSON.
- ☁️ **Sincronizzazione Dinamica Trasparente**: L'integrazione con Supabase è opzionale e utilizzata unicamente in sola lettura per aggiornare il dizionario etimologico con nuovi termini.

---

## 🛠️ Architettura e Stack Tecnologico

```
Etymo/
├── app/                        # File-based routing (Expo Router)
│   ├── (tabs)/                 # Bottom tab navigation (Home, Grafo, Libreria, Profilo)
│   └── _layout.tsx             # Root layout e configurazione provider
├── components/                 # Componenti UI e Schermate applicative
│   ├── graph-screen.tsx        # Schermata grafo con Canvas Webview & fisica
│   ├── library-screen.tsx      # Archivio parole, ricerca, filtri e sezione Accademia
│   ├── story-screen.tsx        # Scheda dettaglio parola con collegamenti correlati
│   ├── profile-screen.tsx      # Gestione profilo, badge, streak e backup JSON
│   ├── flashcard-modal.tsx     # Modalità ripasso a intervalli (SRS)
│   ├── blitz-game.tsx          # Minigioco a tempo Blitz
│   └── quiz-screen.tsx         # Minigioco Quiz
├── constants/                  # Dataset statico, temi e badge
│   ├── words.json              # Dataset curato di 250+ parole con metadati completi
│   ├── words.ts                # Tipi TypeScript e dataset tipizzato compilato
│   └── badges.ts               # Definizione e requisiti dei 12 traguardi
├── context/                    # React Context (Auth, Theme)
├── hooks/                      # Custom React Hooks
│   └── use-game-state.ts       # Gestione stato globale di gioco, streak e badge
├── lib/                        # Librerie e motori di calcolo
│   ├── graph-engine.ts         # Algoritmo BFS, cluster semantici e ottimizzazione del grafo
│   ├── words-db.ts             # Sincronizzazione ibrida (Locale + Supabase)
│   └── notifications.ts        # Gestione notifiche locali pianificate
├── widget/                     # Widget nativo Android per la Parola del Giorno
└── scripts/                    # Script di verifica, generazione e validazione
    ├── verify-graph.js         # Suite di test di connettività e integrità del grafo
    ├── build-graph.js          # Calcolo automatico degli archi e affinità
    └── rebuild-all-words.js    # Script di ricostruzione del dataset
```

### Tecnologie Chiave
- **Frontend**: [React 19](https://react.dev/) & [React Native 0.81](https://reactnative.dev/)
- **Piattaforma**: [Expo SDK 54](https://expo.dev/) (con Expo Router v6)
- **Linguaggio**: [TypeScript 5.9](https://www.typescriptlang.org/) (Strict mode)
- **Animazioni & Grafica**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/), HTML5 Canvas 2D Force-Directed Graph via [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- **Widget**: [react-native-android-widget](https://github.com/sBugItem/react-native-android-widget)
- **Backend / Sync (Opzionale)**: [Supabase](https://supabase.com/)

---

## 🚀 Guida all'Installazione

### Prerequisiti
- [Node.js](https://nodejs.org/) (versione 18 o superiore consigliata)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Applicazione [Expo Go](https://expo.dev/go) su smartphone fisico oppure un emulatore Android / simulatore iOS configurato.

### 1. Clona il Repository
```bash
git clone https://github.com/EleonoraGiangrandi/Etymo.git
cd Etymo
```

### 2. Installa le Dipendenze
```bash
npm install
```

### 3. Configura le Variabili d'Ambiente (Opzionale)
Copia il file di esempio per abilitare la sincronizzazione remota con Supabase (se non configurato, l'app userà il dataset offline integrato):
```bash
cp .env.example .env
```

### 4. Verifica dell'Integrità del Grafo
Puoi verificare che tutte le oltre 250 parole siano connesse e non vi siano nodi fantasma:
```bash
node ./scripts/verify-graph.js
```

### 5. Avvia il Server di Sviluppo
```bash
npx expo start
```
- Inquadra il QR Code con l'app **Expo Go** (Android) o la Fotocamera (iOS).
- Premi `a` per avviare sull'emulatore Android.
- Premi `w` per la versione Web preview.

---

## 🧪 Qualità del Codice & Test

Il progetto include strumenti per verificare l'integrità dei dati e la correttezza del codice:

- **Typecheck TypeScript**:
  ```bash
  npx tsc --noEmit
  ```
- **Verifica del Grafo**:
  ```bash
  node ./scripts/verify-graph.js
  ```
  *Controlla categorie italiane canoniche, 0 nodi isolati, connettività totale (BFS) e assenza di rimbalzi immediati nel Rabbit Hole.*

---

## 📜 Privacy e Trasparenza

Etymo è trasparente per principio. Per consultare l'informativa completa sul trattamento dei dati e sui permessi locali, visualizza il file [`PRIVACY_POLICY.md`](file:///c:/Users/lenovo/Desktop/Ele/projects/Etymo-main/PRIVACY_POLICY.md).

---

## 🌐 English Summary

**Etymo** is an open-source mobile application built with React Native and Expo SDK 54 dedicated to exploring the origins, history, and etymology of the Italian language.

### Key Highlights:
- **Offline-First & Privacy Conscious**: No registration required. All game progress, streaks, notes, and badges remain strictly on the user's device (`AsyncStorage`).
- **Interactive Etymological Graph**: A high-performance 2D Canvas force-directed graph connecting 250+ curated words across 1,100+ semantic and historical edges (Latin, Greek, Arabic roots and thematic clusters) featuring an endless "Rabbit Hole" discovery mode.
- **Spaced Repetition System (SRS)**: Smart flashcards to train memory and master Italian vocabulary.
- **Mini-Games**: Fast-paced "Blitz" mode, classical multiple-choice quizzes, and casual exploration.
- **Android Home Widget**: Daily word and mascot displayed directly on the Android home screen via `react-native-android-widget`.
- **Modern Tech Stack**: React 19, React Native 0.81, Expo SDK 54, Expo Router, TypeScript 5.9, Supabase JS (optional read-only lexical sync).

To run locally:
```bash
git clone https://github.com/EleonoraGiangrandi/Etymo.git
cd Etymo
npm install
npx expo start
```

---

## 📬 Feedback & Contributi

Hai suggerimenti su nuove parole da aggiungere, radici etimologiche da approfondire o miglioramenti al codice?
- Apri una [Issue](https://github.com/EleonoraGiangrandi/Etymo/issues) o invia una Pull Request!
- Contatto per feedback diretto: **app.breasy@gmail.com**

---

<div align="center">
  <sub>Sviluppato con dedizione per gli appassionati della lingua italiana.</sub>
</div>
