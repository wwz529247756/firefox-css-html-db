#!/usr/bin/env node
// check-env.cjs — verify skill prerequisites: Node, database, JSON, Firefox source repo
// Firefox repo resolution (NO default location): FIREFOX_SRC env var, else first argument.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { DatabaseSync } = require('node:sqlite');

const PINNED = '47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1';
const SKILL = path.resolve(__dirname, '..');
const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
const fails = [];
const ok = (name, detail) => console.log('  [OK]  ', name.padEnd(28), detail);
const bad = (name, detail) => { console.log('  [FAIL]', name.padEnd(28), detail); fails.push(name); };

console.log('firefox-css-html-db — environment check\n');

// 1. Node
const major = parseInt(process.versions.node.split('.')[0], 10);
if (major >= 22) ok('Node.js >= 22', 'v' + process.versions.node);
else bad('Node.js >= 22', 'found v' + process.versions.node + ' — install Node.js 22+');

// 2. Database
const dbPath = path.join(SKILL, 'db', 'css-html-callgraph.db');
try {
  const db = new DatabaseSync(dbPath, { readOnly: true });
  const quick = db.prepare('PRAGMA quick_check').get();
  const props = db.prepare('SELECT COUNT(*) AS n FROM css_properties').get().n;
  if (quick && Object.values(quick)[0] === 'ok' && props === 528) ok('database', props + ' properties, quick_check ok');
  else bad('database', 'quick_check: ' + JSON.stringify(quick) + ', properties: ' + props);
  db.close();
} catch (e) { bad('database', e.message.slice(0, 80)); }

// 3. JSON export
const jsonPath = path.join(SKILL, 'db', 'css-html-callgraph.json');
if (fs.existsSync(jsonPath)) {
  try { const j = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); ok('json export', Object.keys(j.properties || {}).length + ' properties'); }
  catch (e) { bad('json export', e.message.slice(0, 80)); }
} else {
  console.log('  [SKIP]  json export'.padEnd(37), '(not generated yet — run scripts/rebuild/build-db.cjs)');
}

// 4. Firefox source repo (REQUIRED for rebuild + source expansion — no default path)
const src = process.env.FIREFOX_SRC || args[0];
console.log('');
if (!src) {
  bad('Firefox source repo', 'not provided — set FIREFOX_SRC or pass the checkout path');
  console.log('\n  Querying the bundled database works WITHOUT the source repo.');
  console.log('  The source is required for the rebuild pipeline and for expanding');
  console.log('  source_ref citations into full code. To obtain the pinned revision:\n');
  console.log('    git clone https://github.com/mozilla/gecko-dev.git firefox');
  console.log('    cd firefox');
  console.log('    git checkout ' + PINNED);
  console.log('\n  (or the official tarball:');
  console.log('   https://ftp.mozilla.org/pub/firefox/releases/157.0.1/source/firefox-157.0.1.source.tar.xz)');
  console.log('\n  then: set FIREFOX_SRC to the checkout path and re-run this check.');
} else {
  const git = (a) => { try { return execSync(`git -C "${src}" ${a}`, { encoding: 'utf8' }).trim(); } catch (_) { return null; } };
  const head = git('rev-parse HEAD');
  if (!fs.existsSync(path.join(src, 'mach')) || !head) {
    bad('Firefox source repo', src + ' does not look like a Firefox checkout');
  } else if (head === PINNED) {
    ok('Firefox source repo', src + ' @ ' + head.slice(0, 12) + ' (pinned)');
    const branch = git('branch --show-current');
    if (branch) ok('branch', branch);
  } else {
    bad('Firefox source repo commit', 'found ' + head.slice(0, 12) + ', expected ' + PINNED.slice(0, 12) + ' — run: git -C "' + src + '" checkout ' + PINNED);
  }
}

console.log('');
if (fails.length) { console.log('PREREQUISITES MISSING:', fails.join(', ')); process.exit(1); }
console.log('All prerequisites satisfied.');
