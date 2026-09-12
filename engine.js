/* BO2 multiplayer catalog and Pick 10 / private-match budget rules. */
(function(g){
const D=g.BO2_DATA,by=(xs,id)=>xs.find(x=>x.id===id),clone=x=>JSON.parse(JSON.stringify(x));
const optics=['reflex','eotech','hybrid','acog','target','mms','dualband','zoom','irons'];
const conflicts=[['fastmag','extended'],['suppressor','longbarrel'],['selectfire','gl'],['selectfire','hybrid'],['gl','hybrid'],['gl','grip'],['mms','fmj'],['cpu','acog'],['cpu','irons']];
const pair=(a,b)=>a!==b&&a!=='dualwield'&&b!=='dualwield'&&!(optics.includes(a)&&optics.includes(b))&&!conflicts.some(([x,y])=>a===x&&b===y||a===y&&b===x);
const weapon=id=>by(D.weapons,id),att=id=>by(D.attachments,id);
function allowed(w,ids){return !!w&&ids.length<=3&&ids.every((a,i)=>w.attachments.includes(a)&&ids.slice(0,i).every(b=>pair(a,b)));}
function wildcards(l){let w=[];if(weapon(l.secondary.id)?.primary)w.push('Overkill');if(l.primary.attachments.length>2)w.push('Primary Gunfighter');if(l.secondary.attachments.length>1)w.push('Secondary Gunfighter');l.perks.forEach((p,i)=>{if(p.length>1)w.push('Perk '+(i+1)+' Greed');});if(l.lethal?.count>1)w.push('Danger Close');return w;}
const cost=l=>2+l.primary.attachments.length+l.secondary.attachments.length+l.perks.flat().length+(l.lethal?.count||0)+(l.tactical?.count||0)+wildcards(l).length;
function modeAllows(l,mode){return mode!=='trickshot'||weapon(l.primary.id)?.category==='sniper'&&['assault_rifle','pistol'].includes(weapon(l.secondary.id)?.category);}
function valid(l,limit=17,mode='regular'){
try{return !!l&&modeAllows(l,mode)&&weapon(l.primary.id)?.primary&&l.primary.id!==l.secondary.id&&allowed(weapon(l.primary.id),l.primary.attachments)&&allowed(weapon(l.secondary.id),l.secondary.attachments)&&l.secondary.attachments.length<=2&&[l.primary,l.secondary].every(w=>by(D.camos,w.camo))&&l.perks.length===3&&l.perks.every((p,i)=>p.length>=1&&p.length<=2&&new Set(p).size===p.length&&p.every(id=>by(D.perks[i],id)))&&[l.lethal,l.tactical].every((e,i)=>e===null||e&&[1,2].includes(e.count)&&by(i?D.tacticals:D.lethals,e.id))&&wildcards(l).length<=3&&cost(l)<=limit;}catch{return false;}}
const pick=(xs,r)=>xs[Math.floor(r()*xs.length)];
function generate(previous,locks,{mode='trickshot',limit=10}={},r=Math.random){
const pPool=D.weapons.filter(w=>w.primary&&(mode!=='trickshot'||w.category==='sniper'));
const locked=key=>!!locks?.[key]&&!!previous;
if(previous&&!modeAllows(previous,mode)&&((locked('primary')&&weapon(previous.primary.id).category!=='sniper')||(locked('secondary')&&!['assault_rifle','pistol'].includes(weapon(previous.secondary.id).category))))return {error:'Unlock the weapon outside the Trickshot pool before changing mode.'};
for(let attempt=0;attempt<120;attempt++){
const p=locked('primary')?clone(previous.primary):{id:pick(pPool,r).id,attachments:[],camo:pick(D.camos,r).id};
const sPool=D.weapons.filter(w=>w.id!==p.id&&(mode==='trickshot'?['pistol','assault_rifle'].includes(w.category):true));
const s=locked('secondary')?clone(previous.secondary):{id:pick(sPool,r).id,attachments:[],camo:pick(D.camos,r).id};
const l={primary:p,secondary:s,perks:locked('perks')?clone(previous.perks):(mode==='trickshot'?[['lightweight'],[pick(['warrior','fast_hands'],r)],['dexterity']]:D.perks.map(ps=>[pick(ps,r).id])),lethal:locked('lethal')?clone(previous.lethal):null,tactical:locked('tactical')?clone(previous.tactical):null};
if(!valid(l,limit,mode))continue;
// Optional equipment is decided separately so either, both or neither can appear.
for(const [key,catalog] of [['lethal',D.lethals],['tactical',D.tacticals]])if(!locked(key)&&r()<.65){l[key]={id:pick(catalog,r).id,count:1};if(!valid(l,limit,mode))l[key]=null;}
// Pick an attachment budget before considering individual attachments.
// Spare private-match points should not automatically fill every weapon slot.
const attachmentTargets = limit===17
  ? {primary:pick([0,1,1,1,2,2,2,3],r),secondary:pick([0,1,1,2],r)}
  : {primary:3,secondary:2};
const operations=[];
for(const key of ['primary','secondary'])if(!locked(key))for(const a of weapon(l[key].id).attachments)operations.push({key,a});
if(!locked('perks')&&mode==='regular')D.perks.forEach((ps,tier)=>ps.forEach(p=>operations.push({key:'perks',tier,id:p.id})));
for(const key of ['lethal','tactical'])if(!locked(key)&&l[key])operations.push({key,quantity:true});
for(let i=operations.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[operations[i],operations[j]]=[operations[j],operations[i]];}
for(const op of operations){if(op.a && l[op.key].attachments.length>=attachmentTargets[op.key])continue;if(r()<(limit===17?.12:.28))continue;const next=clone(l);if(op.a)next[op.key].attachments.push(op.a);else if(op.key==='perks')next.perks[op.tier].push(op.id);else next[op.key].count=2;if(valid(next,limit,mode))Object.assign(l,next);}
return {loadout:l};
}return {error:'Locked selections do not fit this limit. Unlock a section or choose 17 slots.'};}
g.BO2_ENGINE={weapon,att,allowed,pair,cost,wildcards,valid,modeAllows,generate,clone};
})(globalThis);

