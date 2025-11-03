import fs from 'fs';
import path from 'path';
const root = path.resolve();
const problems = [];
function walk(dir){
  for(const name of fs.readdirSync(dir)){
    const fp = path.join(dir, name);
    let stat;
    try{ stat = fs.statSync(fp); } catch(e){ continue; }
    if(stat.isDirectory()){
      if(name==='node_modules' || name==='.git') continue;
      walk(fp);
    } else {
      // skip large files > 5MB to save time
      if(stat.size>5*1024*1024) continue;
      const buf = fs.readFileSync(fp);
      for(let i=0;i<buf.length;i++){
        const b = buf[i];
        // allow tab(9), lf(10), cr(13)
        if((b>=0 && b<32 && b!==9 && b!==10 && b!==13) || b===127){
          problems.push({file:fp, offset:i, byte:b});
          if(problems.filter(p=>p.file===fp).length>40) break;
        }
      }
    }
  }
}
walk(root);
if(problems.length===0){
  console.log('No control bytes (binary) found.');
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
