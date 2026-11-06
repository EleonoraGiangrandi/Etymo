# Informativa sulla Privacy per Etymo

**Ultimo aggiornamento:** 6 Novembre 2026

La presente informativa descrive le modalità di gestione dell'applicazione **Etymo** con riferimento al trattamento dei dati personali degli utenti che la utilizzano.

---

### 1. Filosofia "Offline-First" e Trattamento dei Dati
Etymo è progettata come un'applicazione ad uso principalmente **locale e offline**:
- **Dati personali identificativi:** L'applicazione **non** richiede registrazione obbligatoria, creazione di account su server centralizzati, né credenziali di terze parti per accedere alle funzionalità complete.
- **Salvataggio dei progressi:** Tutti i punteggi, la serie di giorni (streak), le parole scoperte, i segnalibri e il profilo (nome scelto dall'utente e immagine avatar) sono memorizzati **esclusivamente sul dispositivo dell'utente** tramite memoria locale protetta (`AsyncStorage`).
- **Nessuna profilazione o vendita di dati:** Etymo non monitora la tua attività personale e non vende né condivide i tuoi dati con inserzionisti o data broker terzi.

---

### 2. Permessi Richiesti dall'Applicazione

1. **Notifiche Locali (`POST_NOTIFICATIONS`)**:
   - **Scopo:** Inviare un promemoria quotidiano all'orario prescelto dall'utente con la "Parola del Giorno".
   - **Gestione:** Le notifiche sono generate internamente dal sistema operativo del tuo smartphone. Non viene inviato alcun token di notifica a server remoti. L'utente può abilitare, modificare l'orario o disabilitare le notifiche in ogni momento dalla schermata Profilo o dalle impostazioni del dispositivo.

2. **Libreria Foto (`READ_MEDIA_IMAGES` / `NSPhotoLibraryUsageDescription`)**:
   - **Scopo:** Consentire all'utente di selezionare un'immagine dalla galleria per impostare il proprio avatar locale.
   - **Gestione:** L'immagine selezionata rimane confinata nella memoria locale del dispositivo e non viene mai caricata su server esterni.

---

### 3. Sincronizzazione Opzionale del Vocabolario (Supabase)
Per mantenere il dizionario etimologico aggiornato con nuove parole e correzioni storiche, l'applicazione può effettuare chiamate in sola lettura al database cloud Supabase per scaricare le ultime voci lessicali. 
Tali chiamate:
- Sono anonime;
- Scaricano solo i testi pubblici delle etimologie;
- Non inviano informazioni sul profilo, sulle parole salvate o sui progressi dell'utente.

---

### 4. Esportazione, Importazione e Cancellazione dei Dati
L'utente ha il pieno controllo sui propri dati:
- **Esportazione:** Dalla sezione "Dati e Backup" nel Profilo, l'utente può esportare in ogni momento un file JSON contenente tutti i propri dati locali per conservarli o trasferirli su un altro dispositivo.
- **Importazione:** È possibile ripristinare i propri dati incollando un backup salvato in precedenza.
- **Cancellazione totale:** Tramite il pulsante "Azzera Dati Locali" nel Profilo, l'utente può cancellare definitivamente e in modo irreversibile tutti i dati e le statistiche archiviati sul dispositivo.

---

### 5. Termini di Servizio Sintetici
- L'applicazione viene fornita a fini didattici e culturali, nello stato di fatto in cui si trova ("as is").
- Tutti i contenuti culturali, testi etimologici e note storiche sono curati a scopo divulgativo.

---

### 6. Codice Open Source, Feedback e Contatti
- **Codice Open Source:** Il codice open source è disponibile qui: [https://github.com/EleonoraGiangrandi/Etymo.git](https://github.com/EleonoraGiangrandi/Etymo.git)
- **Feedback e Consigli:** Se vuoi dare un feedback, consigli ecc. questo è il contatto: [app.breasy@gmail.com](mailto:app.breasy@gmail.com)
