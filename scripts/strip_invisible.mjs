import fs from 'fs';
import path from 'path';

const root = path.resolve();
const exts = new Set(['.js','.jsx','.ts','.tsx','.html','.css','.json','.md','.env','.txt']);
let changedFiles = [];

function walk(dir){
  for(const name of fs.readdirSync(dir)){
    const fp = path.join(dir, name);
    let stat;
    try{ stat = fs.statSync(fp); } catch(e){ continue; }
    if(stat.isDirectory()){
      if(name==='node_modules' || name==='.git') continue;
      walk(fp);
    } else {
      const ext = path.extname(name).toLowerCase();
      if(!exts.has(ext)) continue;
      let content = fs.readFileSync(fp, 'utf8');
      const original = content;
      // Remove BOM and zero-width / NBSP and other invisible controls
      content = content.replace(/\uFEFF/g, ''); // BOM
      content = content.replace(/\u200B/g, ''); // zero-width space
      content = content.replace(/\u200C/g, '');
      content = content.replace(/\u200D/g, '');
      content = content.replace(/\u2060/g, '');
      // replace non-breaking space with normal space
      content = content.replace(/\u00A0/g, ' ');
      // also remove any ASCII control characters except \t\n\r
      content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
      if(content !== original){
        fs.writeFileSync(fp, content, 'utf8');
        changedFiles.push(fp);
      }
    }
  }
}

walk(root);

if(changedFiles.length===0){
  console.log('No changes needed - no invisible/control characters found in scanned extensions.');
  process.exit(0);
} else {
  console.log('Cleaned invisible/control characters from files:');
  changedFiles.forEach(f=> console.log(' -', f));
  process.exit(0);
}
