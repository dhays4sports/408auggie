const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('/snapshot is the canonical honest current-coverage entry', () => {
  const html = read('snapshot/index.html');
  assert.match(html, /canonical" href="https:\/\/408farmers\.com\/snapshot\//);
  assert.match(html, /Home Coverage Snapshot/);
  assert.match(html, /about two minutes/i);
  assert.doesNotMatch(html, /5 minutes|What’s your Home Protection Score/i);
  assert.match(read('_worker.js'), /path === '\/score\/'[\s\S]*redirect: '\/snapshot\/'/);
});

test('snapshot handoff preserves intent and offers Dylan alternatives', () => {
  const script = read('shared/snapshot.js');
  const launcher = read('shared/coveragefit-launch.js');
  const html = read('snapshot/index.html');
  assert.match(script, /entry:'snapshot'/);
  assert.match(launcher, /entry==='snapshot'\?'coverage_concern'/);
  assert.match(html, /Start My Coverage Snapshot/);
  assert.match(html, /Talk with Dylan instead/);
  assert.match(html, /snapshotCallbackOptions/);
  assert.match(html, /Text Dylan/);
  assert.match(html, /Call Dylan/);
});
