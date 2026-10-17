const express = require('express'); const cors = require('cors');
const app = express(); app.use(cors()); app.use(express.json());
// In-memory seed data keeps the demo runnable without external services.
let specs = [
 {id:1,code:'ELEC-014',title:'Electrical Safety Standard',version:'2.1',category:'Safety',content:'Isolate power before maintenance. Verify zero-energy state and document the lockout/tagout procedure.'},
 {id:2,code:'MECH-008',title:'Rotating Equipment Guarding',version:'1.4',category:'Mechanical',content:'Install fixed guards around exposed rotating shafts. Inspect guard fasteners during scheduled maintenance.'},
 {id:3,code:'NET-021',title:'Network Segmentation',version:'3.0',category:'IT Infrastructure',content:'Separate production and management networks. Review firewall rules quarterly and log approved exceptions.'},
 {id:4,code:'ELEC-014',title:'Electrical Safety Standard',version:'2.2',category:'Safety',content:'Isolate and lock power before maintenance. Verify zero-energy state, record lockout/tagout, and obtain supervisor sign-off.'}
]; let nextId=5;
app.get('/api/health',(req,res)=>res.json({status:'UP'}));
app.get('/api/specs',(req,res)=>{const q=String(req.query.q||'').toLowerCase();res.json(specs.filter(s=>Object.values(s).join(' ').toLowerCase().includes(q)));});
app.get('/api/specs/:id',(req,res)=>{const s=specs.find(x=>x.id===Number(req.params.id));if(!s)return res.status(404).json({error:'Specification not found'});res.json(s);});
app.post('/api/specs',(req,res)=>{const {code,title,version,category,content}=req.body;if(!code||!title||!version||!category||!content)return res.status(400).json({error:'All fields are required'});const s={id:nextId++,code,title,version,category,content};specs.push(s);res.status(201).json(s);});
app.put('/api/specs/:id',(req,res)=>{const i=specs.findIndex(s=>s.id===Number(req.params.id));if(i<0)return res.status(404).json({error:'Specification not found'});specs[i]={...specs[i],...req.body,id:specs[i].id};res.json(specs[i]);});
app.delete('/api/specs/:id',(req,res)=>{const n=specs.length;specs=specs.filter(s=>s.id!==Number(req.params.id));if(n===specs.length)return res.status(404).json({error:'Specification not found'});res.status(204).end();});
app.get('/api/meta',(req,res)=>res.json({service:'spec-comparison-api',version:'1.0.0'}));
const port=process.env.PORT||4000;app.listen(port,()=>console.log(`Spec API listening on ${port}`));
