import { execFileSync } from 'node:child_process';
if (execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()) throw new Error('CLEAN_CANDIDATE_REQUIRED');
execFileSync(process.execPath, ['--test', 'tests/routing.test.mjs'], { stdio: 'inherit' });
console.log('release:check: PASS (domain regression; official thin certification is a separate mandatory gate)');
