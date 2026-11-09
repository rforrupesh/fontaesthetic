import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

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

// Time of the FIRST commit that added `filePath` (follows renames) = the day the
// post was first pushed to GitHub. Used as the automatic publish date when a post
// has no `date:` in its frontmatter. Falls back to the file's creation time when
// git history isn't available (e.g. a zip download without .git).
const firstCache = new Map<string, Date | undefined>();

export function firstCommitDate(filePath?: string): Date | undefined {
  if (!filePath) return undefined;
  if (firstCache.has(filePath)) return firstCache.get(filePath);
  let result: Date | undefined;
  try {
    const out = execFileSync('git', ['log', '--follow', '--diff-filter=A', '--format=%cI', '--', filePath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const last = out.split('\n').filter(Boolean).pop(); // oldest = last line
    if (last) {
      const d = new Date(last);
      if (!isNaN(d.valueOf())) result = d;
    }
  } catch {
    /* no git available */
  }
  if (!result) {
    try {
      const st = statSync(filePath);
      result = st.birthtime.valueOf() > 0 ? st.birthtime : st.mtime;
    } catch {
      /* ignore */
    }
  }
  firstCache.set(filePath, result);
  return result;
}
