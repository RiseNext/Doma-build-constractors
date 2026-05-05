// One-shot helper: renames every file inside public/projects/<category>/<slug>/
// to a stable, URL-safe sequence (01.jpg, 02.jpg, ...). Keeps the original
// extension (lowercased), preserves .gitkeep, and sorts deterministically so
// the order matches a natural listing.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'public/projects');

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

const renameFolder = async (folder) => {
  const entries = await fs.readdir(folder, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && e.name !== '.gitkeep')
    .map((e) => e.name)
    .sort(naturalCompare);

  if (files.length === 0) return { folder, renamed: [] };

  // Two-phase rename to avoid collisions if filenames already collide with
  // target sequence (e.g. "01.jpg" already exists for some other source file).
  const tmpNames = files.map((name, i) => {
    const ext = path.extname(name).toLowerCase();
    return { from: name, tmp: `__tmp_${i}${ext}`, finalIndex: i };
  });

  for (const { from, tmp } of tmpNames) {
    await fs.rename(path.join(folder, from), path.join(folder, tmp));
  }

  const renamed = [];
  for (const { tmp, finalIndex } of tmpNames) {
    const ext = path.extname(tmp);
    const final = String(finalIndex + 1).padStart(2, '0') + ext;
    await fs.rename(path.join(folder, tmp), path.join(folder, final));
    renamed.push(final);
  }
  return { folder, renamed };
};

const main = async () => {
  const result = {};
  const categories = await fs.readdir(ROOT, { withFileTypes: true });
  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const catDir = path.join(ROOT, cat.name);
    const projects = await fs.readdir(catDir, { withFileTypes: true });
    for (const proj of projects) {
      if (!proj.isDirectory()) continue;
      const folder = path.join(catDir, proj.name);
      const { renamed } = await renameFolder(folder);
      result[`${cat.name}/${proj.name}`] = renamed;
    }
  }
  console.log(JSON.stringify(result, null, 2));
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
