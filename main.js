// Esoo Kim 포트폴리오 — 메인 스크립트
// 프로젝트를 바꾸려면 아래 `projects` 배열만 수정하면 됩니다.
// 실제 이미지는 img: "./images/파일명.jpg" 처럼 넣으세요 (7:5 비율 권장).
import * as THREE from 'three';

/* ───────── 프로젝트 데이터 ─────────
   실제 작업 이미지를 쓰려면 각 항목에 img: "data:image/jpeg;base64,..." 를 추가하세요.
   img가 있으면 생성 그래픽 대신 그 이미지가 유리판에 들어갑니다. */
const projects = [
  // 맨 앞(첫 번째) 항목이 스택 맨 앞 유리판입니다. 이미지는 현재 임시 썸네일입니다 (7:5 권장).
  {id:"cryptids", title:"CRYPTIDS", year:"Fall 2025", client:"", cat:"", img:"./images/cryptids.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#2b2b2b", "#d8d8d4"], motif:"n"},
  {id:"nuflaat", title:"NUFLAAT CRACKER CAMPAIGN", year:"Winter 2025", client:"", cat:"", img:"./images/nuflaat.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#e9dfcc", "#3b2b22"], motif:"rows"},
  {id:"hatching-tomorrow", title:"HATCHING TOMORROW", year:"Winter 2025", client:"", cat:"", img:"./images/hatching-tomorrow.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#0d0d0d", "#5f8079"], motif:"cover"},
  {id:"oclyn", title:"OCLYN", year:"Winter 2026", client:"", cat:"", img:"./images/oclyn.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#f2f2f2", "#1a1a1a"], motif:"wave"},
  {id:"interwoven-time", title:"INTERWOVEN TIME", year:"Winter 2025", client:"", cat:"", img:"./images/interwoven-time.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#eef1e6", "#4a4a55"], motif:"disc"},
  {id:"coilisim", title:"COILISIM 蝸殼敎", year:"Winter 2025", client:"", cat:"", img:"./images/coilisim.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#d9cdb0", "#2f3f86"], motif:"stamp"},
  {id:"narrative-of-layer", title:"NARRATIVE OF LAYER", year:"2025", client:"", cat:"", img:"./images/narrative-of-layer.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#c9cfdb", "#2e3442"], motif:"stack"}
];
const N = projects.length;

/* ───────── 생성 그래픽 (실제 이미지로 교체 전 자리표시용) ───────── */
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const hx=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
const rgba=(h,a)=>{const[r,g,b]=hx(h);return`rgba(${r},${g},${b},${a})`};
const lum=h=>{const[r,g,b]=hx(h);return(.299*r+.587*g+.114*b)/255};
const F=(w,s)=>`${w} ${s}px "Schibsted Grotesk","Noto Sans KR",sans-serif`;

function paintArt(p,i){
  const W=1400,H=1000,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const x=cv.getContext('2d'),R=rng(i*97+13),[a,b]=p.c;
  const g=x.createLinearGradient(0,0,W*.4,H);g.addColorStop(0,a);g.addColorStop(1,rgba(b,.25));
  x.fillStyle=a;x.fillRect(0,0,W,H);x.fillStyle=g;x.fillRect(0,0,W,H);
  for(let k=0;k<7;k++){const cx=R()*W,cy=R()*H,rr=220+R()*480,col=k%2?b:'#ffffff';
    const rg=x.createRadialGradient(cx,cy,0,cx,cy,rr);rg.addColorStop(0,rgba(col,k%2?.28:.4));rg.addColorStop(1,rgba(col,0));
    x.fillStyle=rg;x.fillRect(0,0,W,H)}
  x.fillStyle=b;x.strokeStyle=b;x.textAlign='center';x.textBaseline='middle';
  x.save();x.translate((W-1024)/2,(H-1024)/2);
  switch(p.motif){
    case'rows':for(let k=0;k<11;k++){x.globalAlpha=.22+k*.07;x.fillRect(0,160+k*82,W,34)}x.globalAlpha=1;x.beginPath();x.arc(730,360,92,0,7);x.fill();break;
    case'stamp':x.lineWidth=20;x.beginPath();x.arc(512,560,310,0,7);x.stroke();x.beginPath();x.arc(512,560,215,0,7);x.fill();x.fillStyle=a;x.font=F(900,150);x.fillText('한림',512,566);break;
    case'disc':x.fillStyle='#ffffff';x.fillRect(150,170,724,724);x.fillStyle=b;x.beginPath();x.arc(420+R()*180,520+R()*120,210,0,7);x.fill();x.fillRect(150,860,240,8);break;
    case'n':x.font=F(900,920);x.fillText('N',512,600);break;
    case'stack':for(let k=0;k<6;k++){x.fillStyle=k%2?b:a;x.strokeStyle=rgba('#000000',.15);x.lineWidth=2;x.fillRect(170+k*34,150+k*96,560,420);x.strokeRect(170+k*34,150+k*96,560,420)}break;
    case'type':x.font=F(900,760);x.fillText('결',512,600);break;
    case'wave':x.globalAlpha=.85;x.beginPath();x.moveTo(0,H);for(let X=0;X<=W;X+=8)x.lineTo(X,640+Math.sin(X/90)*60);x.lineTo(W,H);x.fill();x.globalAlpha=1;break;
    case'cover':x.fillStyle='#ffffff';x.fillRect(170,120,684,960);x.fillStyle=b;x.font=F(900,160);x.fillText('INDEX',512,240);x.fillStyle=a;x.fillRect(220,340,584,520);break;
  }
  x.restore();
  x.globalAlpha=1;x.textAlign='left';x.textBaseline='alphabetic';
  const ink=lum(a)>.55?'#111111':'#f6f6f2';x.fillStyle=ink;
  x.globalAlpha=.55;for(let k=0;k<5;k++)x.fillRect(64,74+k*20,120+R()*170,7);x.globalAlpha=1;
  x.font=F(500,30);x.textAlign='right';x.fillText(String(p.year),W-64,96);x.textAlign='left';
  x.font=F(500,32);x.fillText(p.client,64,H-150);
  x.font=F(900,94);x.fillText(p.title,58,H-68);
  return cv;
}
function coverDraw(cv,img){const x=cv.getContext('2d'),W=cv.width,H=cv.height,s=Math.max(W/img.width,H/img.height);
  x.drawImage(img,(W-img.width*s)/2,(H-img.height*s)/2,img.width*s,img.height*s)}

const arts=[],thumbs=[];

/* ───────── UI ───────── */
const $=s=>document.querySelector(s);
const sheet=$('#indexSheet'),panel=$('#panel'),info=$('#info'),tip=$('#tip');
function buildIndex(){
  sheet.innerHTML=`<div class="igrid">${projects.map(p=>`<button class="icard" data-id="${p.id}"><div class="iglass"><canvas></canvas><img alt=""></div><div class="icap"><span>${p.title}</span><span>(${p.year})</span></div></button>`).join('')}</div>
  <footer class="ifoot"><a href="#about">CV/RESUME</a><span>/</span><a href="https://www.instagram.com/" target="_blank" rel="noopener">INSTAGRAM</a><span>/</span><a href="https://www.linkedin.com/" target="_blank" rel="noopener">LINKEDIN</a></footer>`;
}
function fillImgs(){sheet.classList.add('noglass');sheet.querySelectorAll('.icard img').forEach((im,i)=>{im.src=arts[i].toDataURL('image/jpeg',.85)})}
let drawThumbs=null;
sheet.addEventListener('click',e=>{const r=e.target.closest('.icard');if(r)location.hash=r.dataset.id});
document.querySelector('.views').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(!b)return;location.hash=b.dataset.view==='index'?'index':'top'});
function setView(v){document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===v));sheet.hidden=v!=='index';document.body.classList.toggle('is-index',v==='index');if(v==='index'&&drawThumbs)requestAnimationFrame(drawThumbs)}

function openProject(id){
  const i=projects.findIndex(p=>p.id===id);if(i<0)return;const p=projects[i];
  $('#pCat').textContent=p.year;$('#pTitle').textContent=p.title;
  $('#pMeta').innerHTML=[['Client',p.client],['Discipline',p.cat],['Season',p.year]].filter(x=>x[1]).map(x=>`<dt>${x[0]}</dt><dd>${x[1]}</dd>`).join('');
  $('#pDesc').textContent=p.desc;
  const src=arts[i].toDataURL('image/jpeg',.88);
  $('#pPlates').innerHTML=`<img class="full" alt="${p.title}" src="${src}" style="object-position:50% 40%"><img alt="" src="${src}" style="object-position:50% 0%"><img alt="" src="${src}" style="object-position:50% 100%">`;
  if(info.open)info.close();if(!panel.open)panel.showModal();panel.scrollTop=0;
}
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>{location.hash='top'});
[panel,info].forEach(d=>d.addEventListener('close',()=>{const h=location.hash.slice(1);if(h&&h!=='top'&&h!=='index')history.replaceState(null,'','#top')}));

function route(){
  const h=location.hash.slice(1);
  document.querySelectorAll('.nav a').forEach(a=>a.setAttribute('aria-current',a.getAttribute('href')==='#'+(h==='about'||h==='contact'?h:'top')));
  if(projects.some(p=>p.id===h)){openProject(h);return}
  if(panel.open)panel.close();
  if(h==='about'||h==='contact'){if(!info.open)info.showModal();document.getElementById(h).scrollIntoView({block:'start'});return}
  if(info.open)info.close();
  setView(h==='index'||document.documentElement.classList.contains('nogl')?'index':'stack');
}
window.addEventListener('hashchange',route);

/* ───────── 3D 매트 유리판 스택 ───────── */
const VS=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const FS=`precision highp float;
uniform sampler2D map;uniform float uHover,uFade,uDim,uEdge;uniform vec3 uEC;uniform vec3 uHaze;varying vec2 vUv;
vec3 blur(vec2 uv,float lod,float r){
 vec3 c=texture2D(map,uv,lod).rgb*.2;
 c+=texture2D(map,uv+vec2(r,0.),lod).rgb*.1;
 c+=texture2D(map,uv-vec2(r,0.),lod).rgb*.1;
 c+=texture2D(map,uv+vec2(0.,r),lod).rgb*.1;
 c+=texture2D(map,uv-vec2(0.,r),lod).rgb*.1;
 c+=texture2D(map,uv+vec2(r,r)*.7,lod).rgb*.1;
 c+=texture2D(map,uv-vec2(r,r)*.7,lod).rgb*.1;
 c+=texture2D(map,uv+vec2(r,-r)*.7,lod).rgb*.1;
 c+=texture2D(map,uv-vec2(r,-r)*.7,lod).rgb*.1;
 return c;
}
void main(){
 vec2 uv=vUv;
 vec2 d=(uv-vec2(.5,.4))*vec2(1.,1.3);
 float win=1.-smoothstep(.3,.95,length(d));
 win=max(win,uHover*(1.-smoothstep(.35,.95,length(d))));
 float top=smoothstep(.55,1.,uv.y)*(1.-uHover*.6);
 float fog=clamp((1.-win)*.6+top*.4+uDim*.15,0.,1.);
 vec3 col=blur(uv,fog*3.,fog*.008);
 col=mix(col,uHaze,fog*.35);
 col*=vec3(.962,.97,.972);
 col+=vec3(.03)*(1.-uv.y*.7)*(1.-uv.x*.5);
 vec2 e=min(uv,1.-uv);float edge=min(e.x,e.y);
 float tb=1.-uv.y,T=.0075,aa=.0007;
 float bevel=(1.-smoothstep(T-aa,T+aa,tb))*uEdge;
 float f=clamp(tb/T,0.,1.);
 float S=T*1.3*(1.-f);
 float cut=(1.-smoothstep(S-aa,S+aa,min(uv.x,1.-uv.x)*1.4))*bevel;
 vec3 ec=uEC;
 vec3 fc=mix(mix(ec,vec3(1.),.25),ec*.82,f);
 col=mix(col,fc,bevel);
 float a=mix(.88,1.,win*(1.-top))*uFade;
 a=mix(a,uFade,bevel)*(1.-cut);
 gl_FragColor=vec4(col,a);
}`;

const canvas=$('#scene');
let renderer=null;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});}catch(e){renderer=null}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

async function boot(){
  try{await document.fonts.load(F(900,90));await document.fonts.ready}catch(e){}
  for(let i=0;i<N;i++){
    const cv=paintArt(projects[i],i);
    if(projects[i].img){try{const im=new Image();im.crossOrigin='anonymous';im.src=projects[i].img;await im.decode();coverDraw(cv,im)}catch(e){}}
    arts.push(cv);
    const t=document.createElement('canvas');t.width=144;t.height=108;t.getContext('2d').drawImage(cv,33,0,1333,1000,0,0,144,108);thumbs.push(t.toDataURL('image/jpeg',.8));
  }
  buildIndex();
  if(!renderer||typeof THREE==='undefined'){document.documentElement.classList.add('nogl');canvas.style.display='none';fillImgs();route();return}
  start3D();drawThumbs=glassThumbs();route();
}

function avgColor(cv){
  try{const t=document.createElement('canvas');t.width=t.height=1;const x=t.getContext('2d');x.drawImage(cv,0,0,1,1);const d=x.getImageData(0,0,1,1).data;return new THREE.Color(`rgb(${d[0]},${d[1]},${d[2]})`)}
  catch(e){return new THREE.Color(0xd6d8d5)}
}
function avgTop(cv){
  try{const t=document.createElement('canvas');t.width=t.height=1;const x=t.getContext('2d');x.drawImage(cv,0,0,cv.width,Math.max(2,Math.round(cv.height*.03)),0,0,1,1);const d=x.getImageData(0,0,1,1).data;return new THREE.Color(`rgb(${d[0]},${d[1]},${d[2]})`)}
  catch(e){return new THREE.Color(0xd6d8d5)}
}
function start3D(){
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(32,1,.1,100);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  const geo=new THREE.BoxGeometry(2.1,1.5,.028);
  const aniso=renderer.capabilities.getMaxAnisotropy();
  const ROT=0,NORMAL=new THREE.Vector3(0,0,1);
  const DIR=new THREE.Vector3(0,.3,-1.25),BASE=new THREE.Vector3(0,-.32,1.3);
  const haze=new THREE.Color();
  const meshes=projects.map((p,i)=>{
    const tex=new THREE.CanvasTexture(arts[i]);
    tex.generateMipmaps=true;tex.minFilter=THREE.LinearMipmapLinearFilter;tex.anisotropy=aniso;
    const glass=new THREE.ShaderMaterial({uniforms:{map:{value:tex},uHover:{value:0},uFade:{value:0},uDim:{value:0},uEdge:{value:0},uEC:{value:avgTop(arts[i])},uHaze:{value:haze}},vertexShader:VS,fragmentShader:FS,transparent:true,depthWrite:false});
    const side=new THREE.MeshBasicMaterial({color:avgColor(arts[i]),transparent:true,opacity:0,depthWrite:false});
    const mesh=new THREE.Mesh(geo,[side,side,side,side,glass,glass]);
    mesh.rotation.y=ROT;mesh.userData={i,h:0,d:0,glass,side};scene.add(mesh);return mesh;
  });
  const track=$('#track');
  let step=1,camZ=8,camY=0;
  function size(){
    const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;
    camera.fov=w<h?46:32;camera.updateProjectionMatrix();
    step=h*.5;track.style.height=(h+(N-1)*step)+'px';
    track.innerHTML=projects.map((_,i)=>`<div class="snap" style="top:${i*step}px"></div>`).join('');
    const bg=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#f6f6f5';
    renderer.setClearColor(bg);haze.set(bg).lerp(new THREE.Color('#e4e4e2'),.55);
  }
  size();addEventListener('resize',size);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',size);

  let cur=0,vel=0,front=-1,hovered=null,mx=0,my=0,cmx=0,cmy=0;
  const ray=new THREE.Raycaster(),ptr=new THREE.Vector2(-9,-9);
  addEventListener('pointermove',e=>{
    ptr.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);mx=ptr.x;my=ptr.y;
    tip.style.transform=`translate(${e.clientX+16}px,${e.clientY+14}px)`;
  },{passive:true});
  document.addEventListener('pointerleave',()=>ptr.set(-9,-9));
  canvas.addEventListener('click',()=>{if(hovered)location.hash=projects[hovered.userData.i].id});
  $('#nowOpen').onclick=()=>{location.hash=projects[front].id};
  addEventListener('keydown',e=>{
    if(panel.open||info.open||!sheet.hidden)return;
    if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();scrollTo({top:Math.min(front+1,N-1)*step,behavior:'smooth'})}
    if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();scrollTo({top:Math.max(front-1,0)*step,behavior:'smooth'})}
  });
  addEventListener('scroll',()=>document.body.classList.toggle('scrolled',scrollY>20),{passive:true});

  const ease=p=>p>=1?1:1-Math.pow(2,-10*p);
  const ss=THREE.MathUtils.smoothstep,cl=THREE.MathUtils.clamp;
  const tmp=new THREE.Vector3(),BL=new THREE.Vector3(),BR=new THREE.Vector3(),nowEl=$('#now'),t0=performance.now();let last=t0;
  function frame(now){
    const dt=Math.min((now-last)/1000,.05)||.016;last=now;
    const damp=r=>reduce?1:1-Math.exp(-dt*r);
    const target=cl(scrollY/step,0,N-1);
    const prev=cur;cur+=(target-cur)*damp(5);
    vel+=((cur-prev)/dt-vel)*damp(6);
    cmx+=(mx-cmx)*damp(2.5);cmy+=(my-cmy)*damp(2.5);
    camera.position.set(cmx*.22,.2+cmy*.12,camera.aspect<1?9.4:7.2);camera.lookAt(0,camera.aspect<1?-.12:-.22,1.3);

    const f=Math.round(cur);
    if(f!==front){front=f;const p=projects[f];$('#nowTitle').textContent=p.title;$('#nowMeta').textContent=p.year}

    const blocked=panel.open||info.open||!sheet.hidden;
    ray.setFromCamera(ptr,camera);
    const hits=blocked?[]:ray.intersectObjects(meshes.filter(m=>m.userData.glass.uniforms.uFade.value>.3));
    const hit=hits.length?hits[0].object:null;
    if(hit!==hovered){hovered=hit;canvas.style.cursor=hit?'pointer':'';
      if(hit){const p=projects[hit.userData.i];tip.innerHTML=`${p.title}<span>${p.year}</span>`;tip.classList.add('on')}else tip.classList.remove('on')}

    const intro=reduce?99:(now-t0)/1000;
    const spread=1+Math.min(Math.abs(vel),3)*.045;
    const tilt=cl(vel,-2.5,2.5);
    meshes.forEach(m=>{
      const u=m.userData,rel=u.i-cur;
      u.h+=((m===hovered?1:0)-u.h)*damp(6);
      u.d+=((hovered&&m!==hovered?1:0)-u.d)*damp(5);
      const e=ease(cl((intro-.2-u.i*.08)/1.5,0,1));
      tmp.copy(DIR).multiplyScalar(rel*spread).add(BASE).addScaledVector(NORMAL,u.h*.26);
      tmp.y-=(1-e)*1.4;
      m.position.copy(tmp);
      m.rotation.y=0;
      m.rotation.x=-(1-e)*.25+tilt*.025;
      const fade=ss(rel,-1.05,-.3)*(1-.65*ss(rel,4,8))*e;
      const gu=u.glass.uniforms;gu.uFade.value=fade;gu.uHover.value=u.h;gu.uDim.value=u.d;
      u.side.opacity=fade*.9;
      m.visible=fade>.01;
    });
    {const fm=meshes[front];fm.updateMatrixWorld();
     BL.set(-1.05,-.75,.008).applyMatrix4(fm.matrixWorld).project(camera);
     BR.set(1.05,-.75,.008).applyMatrix4(fm.matrixWorld).project(camera);
     const x1=(BL.x+1)/2*innerWidth,x2=(BR.x+1)/2*innerWidth,yb=(1-Math.min(BL.y,BR.y))/2*innerHeight;
     nowEl.style.transform=`translate(${x1}px,${yb}px)`;nowEl.style.width=Math.max(0,x2-x1)+'px';
     nowEl.style.opacity=String(Math.max(0,1-Math.abs(cur-front)*2.2)*fm.userData.glass.uniforms.uFade.value);}
    if(sheet.hidden)renderer.render(scene,camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ───────── Index: 플랫 그리드의 매트 유리 썸네일 (같은 셰이더 사용) ───────── */
function glassThumbs(){
  const cards=[...sheet.querySelectorAll('.icard')];
  let r;
  try{r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true})}catch(e){fillImgs();return null}
  r.setClearColor(0x000000,0);
  const cam=new THREE.OrthographicCamera(-.5,.5,.5,-.5,0,2);cam.position.z=1;
  const sc=new THREE.Scene(),haze=new THREE.Color();
  const mat=new THREE.ShaderMaterial({uniforms:{map:{value:null},uHover:{value:0},uFade:{value:1},uDim:{value:0},uEdge:{value:0},uHaze:{value:haze}},vertexShader:VS,fragmentShader:FS,transparent:true,depthWrite:false});
  sc.add(new THREE.Mesh(new THREE.PlaneGeometry(1,1),mat));
  const aniso=r.capabilities.getMaxAnisotropy();
  const texs=arts.map(cv=>{const t=new THREE.CanvasTexture(cv);t.generateMipmaps=true;t.minFilter=THREE.LinearMipmapLinearFilter;t.anisotropy=aniso;return t});
  const st=cards.map(()=>({h:0,t:0}));
  function draw(i){
    const cv=cards[i].querySelector('canvas'),w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;
    const dpr=Math.min(window.devicePixelRatio||1,2),W=Math.round(w*dpr),H=Math.round(h*dpr);
    if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H}
    r.setSize(W,H,false);
    mat.uniforms.map.value=texs[i];mat.uniforms.uHover.value=st[i].h;
    r.render(sc,cam);
    const x=cv.getContext('2d');x.clearRect(0,0,W,H);x.drawImage(r.domElement,0,0);
  }
  function all(){
    const bg=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#f6f6f5';
    haze.set(bg).lerp(new THREE.Color('#e4e4e2'),.55);
    cards.forEach((_,i)=>draw(i));
  }
  let raf=0,last=0;
  function tick(now){
    const dt=Math.min((now-last)/1000,.05)||.016;last=now;let busy=false;
    st.forEach((s,i)=>{const d=s.t-s.h;if(Math.abs(d)>.003){s.h+=d*(reduce?1:1-Math.exp(-dt*6));busy=true;draw(i)}else if(s.h!==s.t){s.h=s.t;draw(i)}});
    raf=busy?requestAnimationFrame(tick):0;
  }
  const go=()=>{if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}};
  cards.forEach((c,i)=>{
    c.addEventListener('pointerenter',()=>{st[i].t=1;go()});
    c.addEventListener('pointerleave',()=>{st[i].t=0;go()});
    c.addEventListener('focus',()=>{st[i].t=1;go()});
    c.addEventListener('blur',()=>{st[i].t=0;go()});
  });
  new ResizeObserver(()=>{if(!sheet.hidden)all()}).observe(sheet);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',all);
  return all;
}
boot();
