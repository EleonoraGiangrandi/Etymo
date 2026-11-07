const { WORDS, getCategoryLabel, getCategoryColor } = require('../constants/words.ts');
const {
  calculateWordAffinity,
  findConnectionsForWord,
  getNextRabbitHoleWord,
  detectLanguageOrigin,
} = require('../lib/graph-engine.ts');

console.log('========================================');
console.log('   VERIFICA COMPLETA DEL GRAFO ETYMO   ');
console.log('========================================\n');

let failed = false;

// 1. Controllo Categorie in Italiano
const VALID_CATEGORIES = new Set([
  'societa',
  'cucina',
  'corpo',
  'natura',
  'religione',
  'storia',
  'scienza',
  'arte',
  'tecnologia',
  'viaggio',
  'oggetti',
  'guerra',
  'commercio',
]);

const catCounts = {};
for (const w of WORDS) {
  if (!VALID_CATEGORIES.has(w.category)) {
    console.error(`[ERRORE] Parola "${w.id}" ha una categoria non valida: ${w.category}`);
    failed = true;
  }
  catCounts[w.category] = (catCounts[w.category] || 0) + 1;
}

console.log('✓ Categorie 100% valide in Italiano:');
for (const [cat, count] of Object.entries(catCounts)) {
  console.log(`   - ${getCategoryLabel(cat)} (${cat}): ${count} parole`);
}

// 2. Controllo Connessioni e Nodi Fantasma
const idMap = new Map(WORDS.map((w) => [w.id, w]));
let totalEdges = 0;
let selfLoops = 0;
let ghostEdges = 0;
let wordsWithFewEdges = 0;

for (const w of WORDS) {
  if (!w.relatedWords || w.relatedWords.length < 3) {
    wordsWithFewEdges++;
    console.warn(`[ATTENZIONE] Parola "${w.id}" ha meno di 3 collegamenti (${w.relatedWords?.length})`);
  }
  for (const rel of w.relatedWords) {
    totalEdges++;
    if (rel === w.id) selfLoops++;
    if (!idMap.has(rel)) {
      ghostEdges++;
      console.error(`[ERRORE] Collegamento fantasma: "${w.id}" punta a "${rel}" (non esiste)`);
      failed = true;
    }
  }
}

console.log('\n✓ Integrità Archi e Connessioni:');
console.log(`   - Parole totali: ${WORDS.length}`);
console.log(`   - Archi totali: ${totalEdges}`);
console.log(`   - Media archi per nodo: ${(totalEdges / WORDS.length).toFixed(2)}`);
console.log(`   - Self-loops: ${selfLoops} (atteso: 0)`);
console.log(`   - Nodi fantasma / ID inesistenti: ${ghostEdges} (atteso: 0)`);
if (ghostEdges > 0 || selfLoops > 0) failed = true;

// 3. Connettività Globale (BFS per verificare che il grafo sia unico componente connesso)
const visited = new Set();
const queue = [WORDS[0].id];
visited.add(WORDS[0].id);

while (queue.length > 0) {
  const curId = queue.shift();
  const curWord = idMap.get(curId);
  for (const rel of curWord.relatedWords) {
    if (!visited.has(rel)) {
      visited.add(rel);
      queue.push(rel);
    }
  }
}

console.log('\n✓ Connettività del Grafo (Componente Connessa):');
console.log(`   - Nodi raggiungibili da "${WORDS[0].id}": ${visited.size} / ${WORDS.length}`);
if (visited.size === WORDS.length) {
  console.log('   - Il grafo è COMPLETAMENTE CONNESSO: nessuna parola è isolata!');
} else {
  console.error(`   - [ERRORE] Grafo frammentato! ${WORDS.length - visited.size} nodi non raggiungibili.`);
  failed = true;
}

// 4. Simulazione Rabbit Hole
console.log('\n✓ Simulazione Percorso Rabbit Hole (Partenza da "ciao"):');
let current = idMap.get('ciao');
const discovered = [current];
const mastery = {};
const trail = [current.id];

for (let step = 1; step <= 8; step++) {
  const next = getNextRabbitHoleWord(current, WORDS, discovered, mastery, trail);
  const affinity = calculateWordAffinity(current, next);
  console.log(
    `   Passo ${step}: ${current.word} ➔ ${next.word} [${getCategoryLabel(next.category)}] | Criterio: "${affinity?.reason || 'Affinità semantica'}"`
  );
  discovered.push(next);
  trail.push(next.id);
  current = next;
}

// Verifica che nel trail non ci siano rimbalzi immediati (A -> B -> A)
let hasImmediateBounce = false;
for (let i = 2; i < trail.length; i++) {
  if (trail[i] === trail[i - 2]) {
    hasImmediateBounce = true;
    console.warn(`[ATTENZIONE] Rimbalzo immediato: ${trail[i - 2]} -> ${trail[i - 1]} -> ${trail[i]}`);
  }
}
if (!hasImmediateBounce) {
  console.log('   ✓ Nessun rimbalzo immediato (A -> B -> A) nel rabbit hole!');
}

console.log('\n========================================');
if (failed) {
  console.error('❌ ALCUNI TEST SONO FALLITI!');
  process.exit(1);
} else {
  console.log('🎉 TUTTI I TEST SONO PASSATI CON SUCCESSO!');
  console.log('========================================');
}
