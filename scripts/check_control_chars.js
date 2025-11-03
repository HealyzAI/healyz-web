import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
const root = path.resolve(__dirname);
const exts = new Set(['.js','.jsx','.ts','.tsx','.html','.css','.txt','.json','.md','.env']);
let problems = [];
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
      const content = fs.readFileSync(fp, 'utf8');
      // check for unicode control / invisible chars
      for(let i=0;i<content.length;i++){
        const ch = content.charCodeAt(i);
        // allow tab(9), lf(10), cr(13)
        if((ch>=0 && ch<32 && ch!==9 && ch!==10 && ch!==13) || ch===127 || ch===0x00A0 || ch===0x200B || ch===0x200C || ch===0x200D || ch===0xFEFF || ch===0x2060){
          problems.push({file:fp, offset:i, charCode:ch, char: content[i]});
          if(problems.filter(p=>p.file===fp).length>40) break;
        }
      }
    }
  }
}
walk(root);
if(problems.length===0){
  console.log('No control/non-printable bytes found in scanned extensions.');
  process.exit(0);
} else {
  console.log('Found control bytes in files:');
  const grouped = problems.reduce((acc,p)=>{(acc[p.file]||=(acc[p.file]=[])).push(p);return acc},{})
  for(const f of Object.keys(grouped)){
    console.log('-', f, 'count:', grouped[f].length);
    grouped[f].slice(0,10).forEach(p=> console.log('   offset', p.offset, 'byte', p.byte));
  }
  process.exit(1);
}
