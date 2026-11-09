import { execFileSync } from 'node:child_process';

// Returns the time of the last git commit that touched `filePath`
// (e.g. "src/content/blog/en/my-post.md"), or undefined if git history
// isn't available. Runs at build time only. On GitHub Actions the checkout
// must use `fetch-depth: 0`, otherwise every file looks "committed now".
const cache = new Map<string, Date | undefined>();

export function lastCommitDate(filePath?: string): Date | undefined {
  if (!filePath) return undefined;
  if (cache.has(filePath)) return cache.get(filePath);
  let result: Date | undefined;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', filePath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) {
      const d = new Date(out);
      if (!isNaN(d.valueOf())) result = d;
    }
  } catch {
    /* no git available */
  }
  cache.set(filePath, result);
  return result;
}
