import re
from collections import defaultdict

# Parse the words.ts file to extract all word entries
with open('C:/Users/Utente/Desktop/ELE/PROJECTS/Etymo/constants/words.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all word entries using regex
pattern = r'\{\s*id:\s*"([^"]+)",\s*word:\s*"([^"]+)",.*?story:\s*"([^"]*)",\s*shortEtymology:\s*"([^"]*)",\s*category:\s*"([^"]*)"'

entries = []
for match in re.finditer(pattern, content, re.DOTALL):
    entry_id = match.group(1)
    word = match.group(2)
    story = match.group(3).replace('\n', ' ').replace('\\n', ' ')
    etymology = match.group(4)
    category = match.group(5)

    entries.append({
        'id': entry_id,
        'word': word,
        'story': story,
        'etymology': etymology,
        'category': category
    })

print(f"Trovate {len(entries)} parole")
word_ids = set(e['id'] for e in entries)

# =====================================================================
# CRITERIO 1: ETIMOLOGIA CONDIVISA (stessa lingua d'origine)
# =====================================================================
arabic_words = []  # Prestiti arabi/persiani
latin_words = []   # Latino diretto
greek_words = []   # Greco
germanic_words = [] # Germanico/Longobardo
french_words = []   # Francese

for e in entries:
    etym_lower = e['etymology'].lower()
    story_lower = e['story'].lower()
    combined = etym_lower + ' ' + story_lower

    if any(k in combined for k in ['arabo', 'araba', 'persiano', 'baghdad', 'al-khwarizmi', 'musulmano']):
        arabic_words.append(e['id'])
    elif any(k in combined for k in ['latino', 'romano', 'roma antica', 'colle palatino']):
        latin_words.append(e['id'])
    elif any(k in combined for k in ['greco', 'grecia antica', 'ellenistico']):
        greek_words.append(e['id'])
    elif any(k in combined for k in ['germanico', 'longobardo', 'franco', 'vichingo', 'nordico']):
        germanic_words.append(e['id'])
    elif any(k in combined for k in ['francese', 'francia']):
        french_words.append(e['id'])

# =====================================================================
# CRITERIO 2: RADICE COMUNE (latina/greca specifica)
# =====================================================================
caput_root = []      # caput = testa
liber_root = []      # liber = corteccia/libro
currere_root = []    # currere = correre
phainein_root = []   # phainein = apparire
kata_root = []       # kata = giù/contro
terra_root = []      # terra = suolo
scala_root = []      # scala/scandere = salire
serenus_root = []    # serenus = sereno
agora_root = []      # aggregazioni sociali
bellum_root = []     # guerra

for e in entries:
    etym_lower = e['etymology'].lower()
    story_lower = e['story'].lower()
    combined = etym_lower + ' ' + story_lower

    if any(k in combined for k in ['caput', 'testa', 'capo', 'cappello']):
        caput_root.append(e['id'])
    if any(k in combined for k in ['liber', 'corteccia', 'libro']):
        liber_root.append(e['id'])
    if any(k in combined for k in ['currere', 'correre', 'corridore', 'corsa']):
        currere_root.append(e['id'])
    if any(k in combined for k in ['phainein', 'phantas', 'apparizione', 'immagine mentale']):
        phainein_root.append(e['id'])
    if any(k in combined for k in ['kata', 'catastrofe', 'rivolgimento']):
        kata_root.append(e['id'])
    if any(k in combined for k in ['terra', 'terrazza', 'suolo']):
        terra_root.append(e['id'])
    if any(k in combined for k in ['scala', 'scandere', 'salire', 'gradini']):
        scala_root.append(e['id'])
    if any(k in combined for k in ['serenus', 'sereno', 'cielo limpido']):
        serenus_root.append(e['id'])

# =====================================================================
# CRITERIO 3: TEMA STORICO/CULTURALE
# =====================================================================
venezia_theme = []
roma_antica_theme = []
grecia_antica_theme = []
teatro_greco_theme = []
commercio_arabo_theme = []
religione_cristiana_theme = []
olimpiadi_theme = []
giorni_pianeti_theme = []
cibo_nuovo_mondo = []

for e in entries:
    story_lower = e['story'].lower()
    etym_lower = e['etymology'].lower()
    combined = story_lower + ' ' + etym_lower

    if any(k in combined for k in ['venezia', 'veneziano', 'doge', 'vetrai veneziani']):
        venezia_theme.append(e['id'])
    if any(k in combined for k in ['roma', 'romano', 'imperatore', 'palatino', 'senato', 'repubblica romana']):
        roma_antica_theme.append(e['id'])
    if any(k in combined for k in ['grecia', 'greco', 'atene', 'olimpia', 'sparta', 'creta', 'minosse']):
        grecia_antica_theme.append(e['id'])
    if any(k in combined for k in ['teatro greco', 'tragedia', 'katastrophé', 'edipo', 'medea']):
        teatro_greco_theme.append(e['id'])
    if any(k in combined for k in ['commercio arabo', 'dogana', 'magazzino', 'moneta araba']):
        commercio_arabo_theme.append(e['id'])
    if any(k in combined for k in ['chiesa', 'angelo', 'diavolo', 'paradiso', 'inferno', 'cristiano', 'mitta']):
        religione_cristiana_theme.append(e['id'])
    if any(k in combined for k in ['olimpiadi', 'olimpico', 'stadion', 'atleta greco']):
        olimpiadi_theme.append(e['id'])
    if any(k in combined for k in ['giorno della settimana', 'pianeta', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica']):
        giorni_pianeti_theme.append(e['id'])
    if any(k in combined for k in ['nuovo mondo', 'americhe', 'pomodoro', 'patata', 'cioccolato', 'turchi']):
        cibo_nuovo_mondo.append(e['id'])

# =====================================================================
# CRITERIO 4: CATEGORIA
# =====================================================================
category_groups = defaultdict(list)
for e in entries:
    category_groups[e['category']].append(e['id'])

# =====================================================================
# GENERA COLLEGAMENTI PER OGNI PAROLA
# =====================================================================
new_related = {}

for e in entries:
    eid = e['id']
    connections = []

    # Funzione helper per aggiungere connessioni senza duplicati
    def add_connections(group, max_count=2):
        count = 0
        for other_id in group:
            if other_id != eid and other_id in word_ids and other_id not in connections:
                connections.append(other_id)
                count += 1
                if count >= max_count:
                    break

    # Priorità 1: Radice comune (più forte)
    if eid in caput_root:
        add_connections(caput_root, 2)
    if eid in liber_root:
        add_connections(liber_root, 2)
    if eid in currere_root:
        add_connections(currere_root, 2)
    if eid in phainein_root:
        add_connections(phainein_root, 2)
    if eid in kata_root:
        add_connections(kata_root, 2)
    if eid in terra_root:
        add_connections(terra_root, 2)
    if eid in scala_root:
        add_connections(scala_root, 2)
    if eid in serenus_root:
        add_connections(serenus_root, 2)

    # Priorità 2: Tema storico (forte)
    if eid in venezia_theme:
        add_connections(venezia_theme, 2)
    if eid in roma_antica_theme:
        add_connections(roma_antica_theme, 2)
    if eid in grecia_antica_theme:
        add_connections(grecia_antica_theme, 2)
    if eid in teatro_greco_theme:
        add_connections(teatro_greco_theme, 2)
    if eid in commercio_arabo_theme:
        add_connections(commercio_arabo_theme, 2)
    if eid in religione_cristiana_theme:
        add_connections(religione_cristiana_theme, 2)
    if eid in olimpiadi_theme:
        add_connections(olimpiadi_theme, 2)
    if eid in giorni_pianeti_theme:
        add_connections(giorni_pianeti_theme, 2)
    if eid in cibo_nuovo_mondo:
        add_connections(cibo_nuovo_mondo, 2)

    # Priorità 3: Etimologia condivisa
    if eid in arabic_words:
        add_connections(arabic_words, 2)
    if eid in latin_words:
        add_connections(latin_words, 1)
    if eid in greek_words:
        add_connections(greek_words, 1)
    if eid in germanic_words:
        add_connections(germanic_words, 1)

    # Priorità 4: Categoria (riempitivo se necessario)
    cat = e['category']
    if len(connections) < 4:
        add_connections(category_groups[cat], 4 - len(connections))

    # Limita a massimo 6 connessioni
    connections = connections[:6]

    new_related[eid] = connections

# Stampa risultati
total_connections = sum(len(v) for v in new_related.values())
print(f"\nTotale connessioni generate: {total_connections}")
print(f"Media connessioni per parola: {total_connections / len(new_related):.2f}")

# Mostra esempi significativi
print("\n=== ESEMPI DI COLLEGAMENTI ===")
examples = [
    ('ciao', 'Venezia'),
    ('palazzo', 'Roma'),
    ('caffe', 'Arabo'),
    ('zero', 'Arabo'),
    ('algebra', 'Arabo'),
    ('catastrofe', 'Teatro Greco'),
    ('fantasma', 'Greco'),
    ('gladiatore', 'Roma'),
    ('cappello', 'caput'),
    ('serenata', 'serenus'),
    ('pizza', 'Cibo'),
    ('cioccolato', 'Nuovo Mondo'),
]

for ex, label in examples:
    if ex in new_related:
        print(f"\n{ex} ({label}): {new_related[ex]}")

# Genera output TypeScript
print("\n\n=== OUTPUT COMPLETO PER SOSTITUZIONE ===")
print("Copia questi array per sostituire i relatedWords esistenti:")
print()

for eid in sorted(new_related.keys()):
    rels = new_related[eid]
    rels_str = ', '.join(f'"{r}"' for r in rels)
    print(f'  "{eid}": [{rels_str}],')