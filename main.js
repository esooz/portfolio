// Esoo Kim 포트폴리오 — 메인 스크립트
// 프로젝트를 바꾸려면 아래 `projects` 배열만 수정하면 됩니다.
// 이미지: img (썸네일, 7:5 권장), slides: ["./images/a-1.jpg", ...] (상세 페이지 슬라이드, 비우면 썸네일 사용)
import * as THREE from 'three';

const INTRO_LOGO_SRC="./images/intro-logo-black.png",INTRO_LOGO_DARK_SRC="./images/intro-logo-white.png";
/* ───────── 도입부 ───────── */
let stackStart=null;
function revealStack(){if(stackStart===null)stackStart=performance.now()}
(function introLogo(){
  /* 도입부: 흰 화면에 로고 원본이 서서히 나타나고, 아무 곳이나 클릭하면 바로 입장 */
  const wrap=document.getElementById('intro'),cv=document.getElementById('introCanvas');
  const h0=location.hash.slice(1);
  if(h0&&h0!=='top'){wrap.remove();revealStack();return}
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const x=cv.getContext('2d');
  let W=0,H=0,box=null,state='idle',t0=0,raf=0;
  /* 다크 모드: 어두운 배경(#121212)용 로고로 교체 */
  const DARK=matchMedia('(prefers-color-scheme: dark)').matches&&document.documentElement.dataset.theme!=='light'||document.documentElement.dataset.theme==='dark';
  const img=new Image();img.src=DARK?INTRO_LOGO_DARK_SRC:INTRO_LOGO_SRC;
  const ss=(a,b,v)=>{const t=Math.min(1,Math.max(0,(v-a)/(b-a)));return t*t*(3-2*t)};
  function build(){
    const dpr=Math.min(window.devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
    cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';x.setTransform(dpr,0,0,dpr,0,0);
    const lw=Math.min(W*(W<700?.5:.26),340),lh=lw*img.height/img.width;box={x:(W-lw)/2,y:(H-lh)/2,w:lw,h:lh};
  }
  function draw(now){
    const t=RM?9:(now-t0)/1000;
    x.globalCompositeOperation='source-over';x.globalAlpha=1;x.clearRect(0,0,W,H);
    x.globalCompositeOperation='source-over';x.globalAlpha=ss(.15,2,t);x.drawImage(img,box.x,box.y,box.w,box.h);
    if(t<2.1)raf=requestAnimationFrame(draw);
  }
  function go(){
    if(state!=='ready')return;state='done';cancelAnimationFrame(raf);
    wrap.classList.add('out');revealStack();setTimeout(()=>wrap.remove(),460);
  }
  wrap.addEventListener('click',go);
  addEventListener('keydown',e=>{if(state==='ready'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();go()}});
  addEventListener('resize',()=>{if(state==='ready'){build();t0=performance.now()-9000;raf=requestAnimationFrame(draw)}});
  img.decode().then(()=>{build();state='ready';t0=performance.now();raf=requestAnimationFrame(draw)}).catch(()=>{wrap.remove();revealStack()});
})();

/* ───────── 프로젝트 데이터 ─────────
   실제 작업 이미지를 쓰려면 각 항목에 img: "data:image/jpeg;base64,..." 를 추가하세요.
   img가 있으면 생성 그래픽 대신 그 이미지가 유리판에 들어갑니다. */
const projects = [
  // 맨 앞(첫 번째) 항목이 스택 맨 앞 유리판입니다. 이미지는 현재 임시 썸네일입니다 (7:5 권장).
  {id:"eschaton", title:"ESCHATON", year:"Fall 2025", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:["./images/eschaton-1.mp4?v=2", "./images/eschaton-2.mp4?v=2", "./images/eschaton-3.mp4"], img:"./images/cryptids.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#2b2b2b", "#d8d8d4"], motif:"n"},
  {id:"nuflaat", title:"NUFLAAT CRACKER CAMPAIGN", year:"Fall 2026", client:"Self-initiated", credit:"@pieceswork", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Graphic Design",
   slides:["./images/nuflaat-1.jpg?v=5", "./images/nuflaat-2.jpg?v=5", "./images/nuflaat-3.jpg?v=5", "./images/nuflaat-4.jpg?v=5"], img:"./images/nuflaat-thumb.jpg?v=3", crack:"./images/nuflaat-crack.jpg?v=6",
   desc:"Made while working as an assistant at @pieceswork. Nuflaat is a butter &amp; bread cracker brand. The image sets a doll-like figure atop an oversized cupcake, crackers served on a giant spoon and fork — sweet, playful and a little surreal.", c:["#e9dfcc", "#3b2b22"], motif:"rows"},
  {id:"narrative-of-layer", title:"NARRATIVE OF LAYER", year:"Fall 2025", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:["./images/narrative-of-layer-1.jpg", "./images/narrative-of-layer-2.jpg", "./images/narrative-of-layer-3.jpg"], img:"./images/narrative-of-layer.jpg?v=4", crack:"./images/narrative-of-layer-crack.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#c9cfdb", "#2e3442"], motif:"stack"},
  {id:"oclyn", title:"OCLYN", year:"Winter 2026", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:["./images/oclyn-1.jpg?v=3","./images/oclyn-2.mp4?v=4","./images/oclyn-3.mp4","./images/oclyn-4.jpg?v=7","./images/oclyn-5.jpg?v=7","./images/oclyn-6.jpg?v=7","./images/oclyn-7.jpg?v=7","./images/oclyn-8.jpg?v=7","./images/oclyn-9.jpg?v=8","./images/oclyn-10.jpg?v=7"], img:"./images/oclyn.jpg?v=3", crack:"./images/oclyn-crack.jpg?v=2",
   desc:"프로젝트 설명을 입력하세요.", c:["#f2f2f2", "#1a1a1a"], motif:"wave"},
  {id:"interwoven-time", ongoing:true, title:"INTERWOVEN TIME", year:"Winter 2025", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:[], img:"./images/interwoven-time.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#eef1e6", "#4a4a55"], motif:"disc"},
  {id:"the-point-of-collection", title:"THE POINT OF COLLECTION", year:"Fall 2026", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal",
   slides:["./images/the-point-of-collection-1.mp4?v=2", "./images/the-point-of-collection-2.jpg", "./images/the-point-of-collection-3.jpg"], img:"./images/the-point-of-collection-thumb.jpg", crack:"./images/the-point-of-collection-crack.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#f2f2f2", "#1a1a1a"], motif:"stamp"},
  {id:"hatching-tomorrow", ongoing:true, title:"HATCHING TOMORROW", year:"Winter 2025", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:[], img:"./images/hatching-tomorrow.jpg?v=4", crack:"./images/hatching-tomorrow-crack.jpg?v=2",
   desc:"프로젝트 설명을 입력하세요.", c:["#0d0d0d", "#5f8079"], motif:"cover"},
  {id:"untitled-01", ongoing:true, title:"UNTITLED 01", year:"2026", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:[], img:"./images/untitled-01.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#cccccc","#333333"], motif:"n"},
  {id:"interwoven-time-2", title:"INTERWOVEN TIME", year:"Winter 2025", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:["./images/interwoven2-1.jpg", "./images/interwoven2-2.jpg", "./images/interwoven2-3.jpg", "./images/interwoven2-4.mp4", "./images/interwoven2-5.jpg?v=2", "./images/interwoven2-6.jpg?v=2", "./images/interwoven2-7.mp4", "./images/interwoven2-8.jpg"], img:"./images/interwoven2-thumb.jpg?v=3", crack:"./images/interwoven2-crack.jpg?v=9",
   desc:"프로젝트 설명을 입력하세요.", c:["#cccccc","#333333"], motif:"n"},
  {id:"samsung-galaxy-unpacked", title:"SAMSUNG GALAXY UNPACKED", year:"2026", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal",
   slides:["./images/samsung-1.mp4"], img:"./images/samsung-thumb.jpg?v=2", crack:"./images/samsung-crack.jpg?v=8",
   desc:"프로젝트 설명을 입력하세요.", c:["#cccccc","#333333"], motif:"n"},
  {id:"blackpink-go", title:"BLACKPINK “GO” M/V", year:"2026", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:["./images/blackpink-1.jpg", "./images/blackpink-2.mp4?v=3", "./images/blackpink-3.jpg", "./images/blackpink-4.jpg", "./images/blackpink-5.jpg", "./images/blackpink-6.jpg", "./images/blackpink-7.jpg", "./images/blackpink-8.jpg", "./images/blackpink-9.jpg", "./images/blackpink-10.jpg"], img:"./images/blackpink-thumb.jpg", crack:"./images/blackpink-crack.jpg?v=2",
   desc:"프로젝트 설명을 입력하세요.", c:["#cccccc","#333333"], motif:"n"},
  {id:"coilisim", title:"COILISIM 蝸殼敎", year:"Summer 2026", client:"Self-initiated", cat:"", role:"Art direction, Visual identity", scope:"Full brand design", sub:"Editorial design", category:"Personal", slides:["./images/coilisim-1.jpg", "./images/coilisim-2.jpg", "./images/coilisim-3.jpg", "./images/coilisim-4.jpg", "./images/coilisim-5.jpg", "./images/coilisim-6.jpg", "./images/coilisim-7.jpg", "./images/coilisim-8.jpg", "./images/coilisim-9.jpg", "./images/coilisim-10.jpg", "./images/coilisim-11.jpg"], img:"./images/untitled-05.jpg",
   desc:"프로젝트 설명을 입력하세요.", c:["#cccccc","#333333"], motif:"n"}
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

const arts=[],thumbs=[],crackArts=[];

/* ───────── UI ───────── */
const $=s=>document.querySelector(s);
const sheet=$('#indexSheet'),detail=$('#detail'),info=$('#info'),tip=$('#tip');
const panel={get open(){return !detail.hidden},close(){detail.querySelectorAll('video').forEach(v=>stopVid(v));detail.hidden=true;document.body.classList.remove('is-detail')}};
let lastList='top',slideAt=0,slideN=1;
function buildIndex(){
  sheet.innerHTML=`<div class="igrid">${projects.map(p=>`<button class="icard" data-id="${p.id}"><div class="iglass"><canvas></canvas><img alt=""></div><div class="icap"><span>${p.title}</span><span>(${p.year})</span></div></button>`).join('')}</div>`;
}
function fillImgs(){sheet.classList.add('noglass');sheet.querySelectorAll('.icard img').forEach((im,i)=>{im.src=arts[i].toDataURL('image/jpeg',.85)})}
let drawThumbs=null;
/* 아직 준비 중인 프로젝트: 클릭하면 들어가지 않고 클릭한 자리에 ONGOING만 잠깐 뜸 */
let ongoEl=null,ongoT=0;
function showOngoing(x,y,ms=1400){
  if(!ongoEl){ongoEl=document.createElement('div');ongoEl.className='ongo';ongoEl.textContent='ONGOING';document.body.appendChild(ongoEl)}
  ongoEl.style.left=Math.round(x)+'px';ongoEl.style.top=Math.round(y)+'px';
  ongoEl.classList.add('on');clearTimeout(ongoT);ongoT=setTimeout(()=>ongoEl.classList.remove('on'),ms);
}
const ongoAt=el=>{const b=el.getBoundingClientRect();showOngoing(b.left+b.width/2,b.top+b.height/2,1300)};
sheet.addEventListener('click',e=>{const r=e.target.closest('.icard');if(!r)return;
  const p=projects.find(q=>q.id===r.dataset.id),g=r.querySelector('.iglass');
  if(p&&p.ongoing&&(!p.crack||!g||reduce)){ongoAt(g||r);return}
  /* GRID에서도 유리 깨짐 */
  if(p&&p.crack&&g&&!reduce){if(r.classList.contains('shatter'))return;
    const ca=crackArts[projects.indexOf(p)],ov=document.createElement(ca?'canvas':'img');ov.className='crack-ov';if(ca){ov.width=ca.width;ov.height=ca.height;ov.getContext('2d').drawImage(ca,0,0)}else ov.src=p.crack;g.appendChild(ov);r.classList.add('shatter');
    if(p.ongoing)ongoAt(g);else setTimeout(()=>{location.hash=r.dataset.id},620);setTimeout(()=>{ov.remove();r.classList.remove('shatter')},1300);return}
  location.hash=r.dataset.id});
document.querySelector('.views').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(!b)return;location.hash=b.dataset.view==='index'?'index':'top'});
function setView(v){document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===v));sheet.hidden=v!=='index';document.body.classList.toggle('is-index',v==='index');if(v==='index'&&drawThumbs)requestAnimationFrame(drawThumbs)}

function openProject(id){
  const i=projects.findIndex(p=>p.id===id);if(i<0)return;const p=projects[i],step=d=>{let k=i;do{k=(k+d+N)%N}while(projects[k].ongoing&&k!==i);return projects[k]},nx=step(1),pv=step(-1);
  const slides=p.slides&&p.slides.length?p.slides:[arts[i].toDataURL('image/jpeg',.9)];
  const isPh=t=>!t||/^프로젝트 설명/.test(t);
  const rows=[['Category',p.category],['Year',p.year],['Credit',p.credit||p.client]].filter(x=>x[1]);
  detail.innerHTML=`<div class="dmeta">
    <a class="dback" href="#${pv.id}" aria-label="Previous Project"><svg class="arr" viewBox="0 0 523.38 65.46" aria-hidden="true"><line x1="523.38" y1="32.73" x2="183.72" y2="32.73" stroke="currentColor" stroke-width="10.91"/><path fill="currentColor" d="M36.54,29.52C10.68,31,.11,31.72,0,32.73c.11,1.01,10.7,1.4,36.54,3.21,127.37,8.91,147.18,29.52,147.18,29.52V0s-19.41,22.23-147.18,29.52Z"/></svg><span class="dlbl">PREVIOUS</span></a>
    <a class="dnext" href="#${nx.id}" aria-label="Next Project"><span class="dlbl">NEXT</span><svg class="arr" viewBox="0 0 523.38 65.46" aria-hidden="true"><line y1="32.73" x2="339.66" y2="32.73" stroke="currentColor" stroke-width="10.91"/><path fill="currentColor" d="M486.84,29.52c25.86,1.48,36.43,2.2,36.54,3.21-.11,1.01-10.7,1.4-36.54,3.21-127.37,8.91-147.18,29.52-147.18,29.52V0s19.41,22.23,147.18,29.52Z"/></svg></a>
  </div>
  <div class="dstage${infoOpen?' open':''}">
  <div class="dside"><button class="dtog" type="button" aria-expanded="${infoOpen}">${infoOpen?'− INFO':'+ INFO'}</button><div class="dinfo"><div class="dname">${p.title}</div>${rows.map(x=>`<div class="drow"><div class="dlab">${x[0]}</div><div>${x[1]}</div></div>`).join('')}${isPh(p.desc)?'':`<p class="ddesc">${p.desc}</p>`}</div></div>
  <div class="dshow${slides.length>1?' multi':''}"><div class="dslides">${slides.map((s,k)=>s&&s.gallery?`<div class="dgal${k?'':' on'}"><div class="dgal-in">${s.gallery.map((g,j)=>`<button class="dgi" type="button" data-j="${j}" aria-label="${p.title} ${j+1} 크게 보기"><img loading="lazy" draggable="false" src="${g}" alt=""></button>`).join('')}</div></div>`:/\.(mp4|webm|mov)($|\?)|^data:video/i.test(s)?`<div class="dvid${k?'':' on'}"><video src="${s}" muted loop playsinline preload="auto" aria-label="${p.title} ${k+1}"></video></div>`:`<img draggable="false" src="${s}" alt="${p.title} ${k+1}"${k?'':' class="on"'}>`).join('')}</div>
    </div>
  </div>
  <div class="dfoot"><span></span><a href="#${pv.id}" aria-label="Previous Project"><svg class="arr" viewBox="0 0 523.38 65.46" aria-hidden="true"><line x1="523.38" y1="32.73" x2="183.72" y2="32.73" stroke="currentColor" stroke-width="10.91"/><path fill="currentColor" d="M36.54,29.52C10.68,31,.11,31.72,0,32.73c.11,1.01,10.7,1.4,36.54,3.21,127.37,8.91,147.18,29.52,147.18,29.52V0s-19.41,22.23-147.18,29.52Z"/></svg></a><a href="#${nx.id}" aria-label="Next Project"><svg class="arr" viewBox="0 0 523.38 65.46" aria-hidden="true"><line y1="32.73" x2="339.66" y2="32.73" stroke="currentColor" stroke-width="10.91"/><path fill="currentColor" d="M486.84,29.52c25.86,1.48,36.43,2.2,36.54,3.21-.11,1.01-10.7,1.4-36.54,3.21-127.37,8.91-147.18,29.52-147.18,29.52V0s19.41,22.23,147.18,29.52Z"/></svg></a></div>`;
  slideAt=0;slideN=slides.length;
  /* 웹: 지금 화면에 띄워진 슬라이드의 영상만 재생(소리 포함), 나머지는 멈춤 / 모바일: 전부 재생, 소리는 화면에 보이는 만큼만 */
  detail.querySelectorAll('.dslides video').forEach(v=>{const sl=v.closest('.dvid');if(isMob()||(sl&&sl.classList.contains('on')))playVid(v,true);else{setVol(v);stopVid(v)}});
  requestAnimationFrame(mobVolumes);
  requestAnimationFrame(()=>requestAnimationFrame(fitGalleries));
  /* 이미지: 항상 화면 정중앙, 한 프로젝트 안의 모든 장은 같은 높이.
     높이 = 가장 가로로 긴 장도 양옆 정보 칸 안에 들어가는 높이. 틀 너비는 지금 보이는 장의 비율을 따라감 */
  const sh0=detail.querySelector('.dshow');
  const ms=[...detail.querySelectorAll('.dslides>img,.dslides>.dvid video')];
  const done=()=>sh0.parentNode.classList.add('ready');
  setTimeout(done,1500);if(!ms.length)done();
  ms.forEach(m=>{const f=()=>{const w=m.naturalWidth||m.videoWidth,h=m.naturalHeight||m.videoHeight;if(!w||!h)return;(m.closest('.dvid')||m)._ar=w/h;sizeShow();if(ms.every(x=>(x.closest('.dvid')||x)._ar))done()};
    if(m.complete||m.readyState>0)f();m.addEventListener('load',f);m.addEventListener('loadedmetadata',f)});
  sizeShow();
  if(info.open)info.close();
  detail.hidden=false;document.body.classList.add('is-detail');detail.scrollTop=0;
}
/* + INFO: 기본은 이미지만 정중앙. 누르면 정보가 열리고 이미지+정보 묶음 전체가 가운데로 이동. 프로젝트 넘겨도 상태 유지 */
var infoOpen=false;
detail.addEventListener('click',e=>{
  const t=e.target.closest('.dtog');if(!t)return;
  infoOpen=!infoOpen;const st=t.closest('.dstage');st.classList.toggle('open',infoOpen);
  t.textContent=infoOpen?'− INFO':'+ INFO';t.setAttribute('aria-expanded',infoOpen);
});
detail.addEventListener('click',e=>{
  const a=e.target.closest('.dback,.dnext,.dfoot a');if(!a)return;
  e.preventDefault();a.classList.add('flash');const h=a.getAttribute('href').slice(1);
  setTimeout(()=>{location.hash=h},reduce?0:140);
});
/* 영상: 소리 켜고 자동 재생. 브라우저가 소리 자동 재생을 막으면 음소거로 재생하다가
   화면을 처음 누르거나 키를 누르는 순간 자동으로 소리를 켭니다. */
/* ── 영상 소리 ─────────────────────────────────────────────
   모든 영상 소리 = VOL(3%). 웹은 띄워진 슬라이드의 영상만, 모바일은 화면에 보이는 만큼만.
   아이폰/아이패드 사파리는 video.volume을 무시하므로 Web Audio(게인)로 줄이고,
   그 경로가 준비되기 전에는 절대 소리를 내지 않음(음소거 재생 → 첫 터치에 3%로 켜짐). */
const VOL=.03;let actx=null;
const NEED_GAIN=(()=>{try{const t=document.createElement('video');t.volume=.5;return Math.abs(t.volume-.5)>.01}catch(e){return true}})();
function primeAudio(){
  if(!NEED_GAIN)return;
  try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state!=='running')actx.resume().catch(()=>{})}catch(e){}
}
/* 사이트 어디든 처음 터치/클릭하는 순간 오디오 경로를 준비 (아이폰은 터치 안에서만 허용) */
['pointerdown','touchend','click','keydown'].forEach(t=>addEventListener(t,primeAudio,{capture:true,passive:true}));
function setVol(v){
  if(!NEED_GAIN){v.volume=VOL;return}
  if(v._g||!actx)return;
  try{const src=actx.createMediaElementSource(v),g=actx.createGain();g.gain.value=VOL;src.connect(g);g.connect(actx.destination);v._g=g}catch(e){}
}
const canSound=v=>!NEED_GAIN||!!(v._g&&actx);
const isMob=()=>matchMedia('(max-width:700px)').matches;
/* 영상 소리 크기 = VOL × f (f: 0~1) */
function vidLevel(v,f){f=Math.max(0,Math.min(1,f));const L=VOL*f;if(v._g)v._g.gain.value=L;else if(!NEED_GAIN)v.volume=L}
/* 모바일: 스크롤로 영상이 화면 밖으로 나갈수록 소리가 점점 작아짐 (영상은 계속 재생) */
function mobVolumes(){
  if(!isMob()||detail.hidden)return;const H=innerHeight;
  detail.querySelectorAll('.dslides video').forEach(v=>{const r=v.getBoundingClientRect();if(!r.height)return;
    const vis=Math.max(0,Math.min(r.bottom,H)-Math.max(r.top,0));vidLevel(v,vis/Math.min(r.height,H))});
}
detail.addEventListener('scroll',mobVolumes,{passive:true});addEventListener('resize',mobVolumes);
/* 끊김 없는 반복 재생: 끝나기 직전에 처음으로 되감고, 의도치 않게 멈추면 바로 다시 재생 */
function stopVid(v){v._want=false;v.pause()}
function keepLoop(v){
  if(v._loopHooked)return;v._loopHooked=true;
  v.addEventListener('ended',()=>{if(v._want){v.currentTime=0;v.play().catch(()=>{})}});
  v.addEventListener('pause',()=>{if(v._want&&!detail.hidden&&!document.hidden)setTimeout(()=>{if(v._want&&v.paused)v.play().catch(()=>{})},60)});
  v.addEventListener('stalled',()=>{if(v._want)v.play().catch(()=>{})});
  const tick=()=>{if(v._want&&!v.paused&&v.duration&&v.currentTime>=v.duration-.07)v.currentTime=0;requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)detail.querySelectorAll('.dslides video').forEach(v=>{if(v._want&&v.paused)v.play().catch(()=>{})})});
function playVid(v,withSound){
  v._want=true;keepLoop(v);
  primeAudio();setVol(v);if(isMob())mobVolumes();
  if(withSound&&!canSound(v)){withSound=false;armUnmute()}
  v.muted=!withSound;
  const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{v.muted=true;v.play().catch(()=>{});armUnmute()});
}
let unmuteArmed=false;
function armUnmute(){
  if(unmuteArmed)return;unmuteArmed=true;
  const on=()=>{unmuteArmed=false;['pointerdown','touchend','keydown'].forEach(t=>removeEventListener(t,on,true));
    primeAudio();if(detail.hidden)return;
    detail.querySelectorAll('.dslides video').forEach(v=>{const s=v.closest('.dvid');if(s&&(s.classList.contains('on')||isMob())){
      setVol(v);if(!canSound(v))return;if(isMob())mobVolumes();v.muted=false;v.play().catch(()=>{v.muted=true})}})};
  ['pointerdown','touchend','keydown'].forEach(t=>addEventListener(t,on,true));
}
function sizeShow(){
  const sh=detail.querySelector('.dshow');if(!sh)return;
  const els=[...sh.querySelectorAll('.dslides>img,.dslides>.dvid,.dslides>.dgal')],ars=els.map(e=>e._ar).filter(Boolean);
  const cur=els.find(e=>e.classList.contains('on'))||els[0];
  sh.parentNode.style.setProperty('--ar',((cur&&cur._ar)||.8).toFixed(4));
}
addEventListener('resize',sizeShow);
function goSlide(d){fitGalleries();
  const imgs=detail.querySelectorAll('.dslides > *');if(imgs.length<2)return;
  slideAt=(slideAt+d+imgs.length)%imgs.length;
  imgs.forEach((im,k)=>{im.classList.toggle('on',k===slideAt);const v=im.querySelector&&im.querySelector('video');if(v){if(k===slideAt){v.currentTime=0;playVid(v,true)}else stopVid(v)}});
  sizeShow();const c=detail.querySelector('.dcount span');if(c)c.textContent=slideAt+1;
}
/* 갤러리: 데스크탑에서는 스크롤 없이 모든 이미지가 틀 안에 잘리지 않고 다 들어가도록
   열 수를 자동으로 골라 가장 크게 배치 */
function fitGalleries(){
  detail.querySelectorAll('.dgal').forEach(g=>{
    const inn=g.querySelector('.dgal-in');
    if(isMob()){inn.style.cssText='';return}
    const n=inn.children.length,G=6,R=2480/3508,cs=getComputedStyle(g);
    const W=g.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),H=g.clientHeight;
    if(!W||!H)return;let best=0,bc=1;
    for(let c=1;c<=n;c++){const r=Math.ceil(n/c),w=Math.min((W-(c-1)*G)/c,((H-(r-1)*G)/r)*R);if(w>best){best=w;bc=c}}
    inn.style.gridTemplateColumns=`repeat(${bc},${best}px)`;inn.style.gap=G+'px';
  });
}
addEventListener('resize',fitGalleries);
/* 갤러리(이미지 쭉 나열): 이미지 클릭 → 크게 보기. 클릭/ESC로 닫기, ←/→로 옆 이미지 */
const lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.innerHTML='<img alt="">';document.body.appendChild(lb);
let lbList=[],lbAt=0;
function lbShow(i){lbAt=(i+lbList.length)%lbList.length;lb.querySelector('img').src=lbList[lbAt]}
function lbOpen(list,i){lbList=list;lbShow(i);lb.hidden=false;document.body.classList.add('is-lb')}
function lbClose(){lb.hidden=true;document.body.classList.remove('is-lb')}
lb.addEventListener('click',lbClose);
addEventListener('keydown',e=>{if(lb.hidden)return;e.stopImmediatePropagation();e.preventDefault();
  if(e.key==='Escape')lbClose();else if(e.key==='ArrowRight')lbShow(lbAt+1);else if(e.key==='ArrowLeft')lbShow(lbAt-1)},true);
detail.addEventListener('click',e=>{
  const gi=e.target.closest('.dgi');
  if(gi){e.stopPropagation();const gal=gi.closest('.dgal');lbOpen([...gal.querySelectorAll('.dgi img')].map(i=>i.currentSrc||i.src),+gi.dataset.j);return}
  const sh=e.target.closest('.dshow');if(!sh||matchMedia('(max-width:700px)').matches)return;
  const r=sh.getBoundingClientRect();goSlide(e.clientX<r.left+r.width/2?-1:1);
});
detail.addEventListener('mousemove',e=>{
  const sh=e.target.closest('.dshow');if(!sh)return;const r=sh.getBoundingClientRect();
  sh.classList.toggle('left',e.clientX<r.left+r.width/2);
});
addEventListener('keydown',e=>{if(!panel.open)return;if(e.key==='ArrowRight')goSlide(1);if(e.key==='ArrowLeft')goSlide(-1);if(e.key==='Escape')location.hash=lastList});
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>{location.hash='top'});
[info].forEach(d=>d.addEventListener('close',()=>{const h=location.hash.slice(1);if(h&&h!=='top'&&h!=='index')history.replaceState(null,'','#top')}));

function route(){
  const h=location.hash.slice(1);
  document.querySelectorAll('.nav a').forEach(a=>a.setAttribute('aria-current',a.getAttribute('href')==='#'+(h==='about'||h==='contact'?h:'top')));
  if(projects.some(p=>p.id===h&&p.ongoing)){history.replaceState(null,'','#'+lastList);route();return}
  if(projects.some(p=>p.id===h)){openProject(h);return}
  if(panel.open)panel.close();
  if(h==='index')lastList='index';else if(h===''||h==='top')lastList='top';
  if(h==='about'||h==='contact'){if(!info.open)info.showModal();document.getElementById(h).scrollIntoView({block:'start'});return}
  if(info.open)info.close();
  setView(h==='index'||document.documentElement.classList.contains('nogl')?'index':'stack');
}
window.addEventListener('hashchange',route);

/* ───────── 3D 매트 유리판 스택 ───────── */
const VS=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const FS=`precision highp float;
uniform sampler2D map;uniform float uHover,uFade,uDim,uEdge,uRaw;uniform vec3 uEC;uniform vec3 uHaze;varying vec2 vUv;
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
 fog*=1.-uHover*.85;
 vec3 col=blur(uv,fog*3.,fog*.008);
 col=mix(col,uHaze,fog*.35);
 col*=vec3(.962,.97,.972);
 col+=vec3(.03)*(1.-uv.y*.7)*(1.-uv.x*.5);
 vec2 e=min(uv,1.-uv);float edge=min(e.x,e.y);
 float tb=1.-uv.y,T=.0045,aa=.0006;
 float bevel=(1.-smoothstep(T-aa,T+aa,tb))*uEdge;
 float f=clamp(tb/T,0.,1.);
 float S=T*1.3*(1.-f);
 float cut=(1.-smoothstep(S-aa,S+aa,min(uv.x,1.-uv.x)*1.4))*bevel;
 /* 유리 깨짐 이미지: 뿌연 효과 없이 원본 그대로, 투명도는 마우스 올렸을 때와 같음 */
 col=mix(col,texture2D(map,uv).rgb,uRaw);
 vec3 ec=uEC;
 vec3 fc=mix(mix(ec,vec3(1.),.25),ec*.82,f);
 col=mix(col,fc,bevel*.55);
 float a=mix(.88,1.,win*(1.-top))*uFade;
 a=mix(a,uFade*.55,bevel)*(1.-cut);
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
    /* 클릭 시 '유리 깨짐' 이미지가 있는 프로젝트 */
    if(projects[i].crack){try{const c2=document.createElement('canvas');c2.width=cv.width;c2.height=cv.height;const im2=new Image();im2.src=projects[i].crack;await im2.decode();coverDraw(c2,im2);crackArts[i]=c2}catch(e){}}
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
  /* 썸네일 넘기는 속도 — 모바일/데스크탑 따로
     step: 한 장 넘기는 데 필요한 스크롤 (화면 높이 대비, 클수록 느림)
     follow: 판이 따라오는 빠르기 (클수록 빠름) */
  /* 맨 앞 판 선명도 (0=다른 판과 같음, 1=마우스 올렸을 때만큼 선명) — 데스크탑 / 모바일 따로 */
  const FRONT_CLEAR=0,FRONT_CLEAR_MOBILE=.45;
  const SCROLL={mobile:{step:.56,follow:8.5},desktop:{step:.9,follow:6.5}};
  const camera=new THREE.PerspectiveCamera(32,1,.1,100);const PT=.2301;let pile=null,pOff=null,pZ=1;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  const geo=new THREE.BoxGeometry(2.1,1.5,.028);
  const aniso=renderer.capabilities.getMaxAnisotropy();
  const ROT=0,NORMAL=new THREE.Vector3(0,0,1);
  const DIR=new THREE.Vector3(0,.3,-1.25),BASE=new THREE.Vector3(0,-.32,1.3);
  const haze=new THREE.Color();
  const deck=new THREE.Group();scene.add(deck);
  const meshes=projects.map((p,i)=>{
    const tex=new THREE.CanvasTexture(arts[i]);
    tex.generateMipmaps=true;tex.minFilter=THREE.LinearMipmapLinearFilter;tex.anisotropy=aniso;
    const glass=new THREE.ShaderMaterial({uniforms:{map:{value:tex},uRaw:{value:0},uHover:{value:0},uFade:{value:0},uDim:{value:0},uEdge:{value:1},uEC:{value:avgTop(arts[i])},uHaze:{value:haze}},vertexShader:VS,fragmentShader:FS,transparent:true,depthWrite:false});
    const side=new THREE.MeshBasicMaterial({color:avgColor(arts[i]),transparent:true,opacity:0,depthWrite:false});
    const mesh=new THREE.Mesh(geo,[side,side,side,side,glass,glass]);
    mesh.rotation.y=ROT;mesh.userData={i,h:0,d:0,glass,side};deck.add(mesh);return mesh;
  });
  const track=$('#track');
  let step=1,camZ=8,camY=0;
  function size(){
    /* 폰 사파리 주소창이 접히고 펴질 때 높이가 바뀌어 화면이 튀지 않도록, 가장 큰 화면 높이(lvh) 기준으로 고정 */
    const w=innerWidth,h=canvas.clientHeight||innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;
    const port=w<h;camera.fov=port?2*Math.atan(PT/camera.aspect)*180/Math.PI:36;
    /* 폰: 주소창 상태(화면 높이)와 상관없이 썸네일 크기는 화면 너비 기준, 위치는 헤더와 푸터 사이 기준으로 고정 */
    DIR.y=w<h?.62:.6;camera.zoom=1;camera.clearViewOffset();camera.updateProjectionMatrix();
    /* 폰: 정지 상태 유리판 묶음의 위·아래 끝을 미리 계산(화면 가운데 기준 px) → 매 프레임 헤더와 푸터 사이 정중앙에 오도록 맞춤 */
    if(port){
      camera.position.set(0,.2,7.1);camera.lookAt(0,.3,1.3);camera.updateMatrixWorld();
      const v=new THREE.Vector3();let top=1e9,bot=-1e9;
      for(let r=0;r<N;r++)for(const[a,b]of[[-1.05,.75],[1.05,.75],[-1.05,-.75],[1.05,-.75]]){
        v.set(a,b,0).add(BASE).addScaledVector(DIR,r).project(camera);const y=(1-v.y)/2*h-h/2;
        if(b>0)top=Math.min(top,y);else if(r===0)bot=Math.max(bot,y)}
      pile={top,bot};
    }else pile=null;
    step=h*(w<h?SCROLL.mobile.step:SCROLL.desktop.step);track.style.height=(h+(N-1)*step)+'px';
    track.innerHTML=projects.map((_,i)=>`<div class="snap" style="top:${i*step}px"></div>`).join('');
    const bg=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#f6f6f5';
    renderer.setClearColor(bg);haze.set(bg).lerp(new THREE.Color('#e4e4e2'),.55);
  }
  size();addEventListener('resize',size);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',size);

  const HOVER=matchMedia('(hover: hover)');
  let cur=0,vel=0,front=-1,hovered=null,picked=null,capM=null,capA=0,mx=0,my=0,cmx=0,cmy=0;
  const ray=new THREE.Raycaster(),ptr=new THREE.Vector2(-9,-9);
  addEventListener('pointermove',e=>{
    if(e.pointerType&&e.pointerType!=='mouse')return;
    ptr.set(e.clientX/innerWidth*2-1,-(e.clientY/(canvas.clientHeight||innerHeight))*2+1);mx=ptr.x;my=ptr.y;
    tip.style.transform=`translate(${e.clientX+16}px,${e.clientY+14}px)`;
  },{passive:true});
  document.addEventListener('pointerleave',()=>ptr.set(-9,-9));
  canvas.addEventListener('click',e=>{if(picked)return;
    /* 탭/클릭한 그 지점에서 바로 판을 찾음 (터치는 hover 상태를 쓰지 않음) */
    ray.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/(canvas.clientHeight||innerHeight))*2+1),camera);
    const hs=ray.intersectObjects(meshes.filter(m=>m.visible&&m.userData.glass.uniforms.uFade.value>.3)),h=hs.length?hs[0].object:null;
    if(!h)return;const ong=projects[h.userData.i].ongoing;
    if(ong){const v=new THREE.Vector3();h.getWorldPosition(v);v.project(camera);showOngoing((v.x+1)/2*innerWidth,(1-v.y)/2*(canvas.clientHeight||innerHeight),1300)}
    picked=h;const id=projects[h.userData.i].id;
    /* 유리 깨짐: 판 이미지를 금 간 이미지로 바꾸고 아주 미세하게 떨린 뒤 열림 */
    const ca=crackArts[h.userData.i];
    if(ca&&!reduce){const U=h.userData.glass.uniforms,orig=U.map.value;
      if(!h.userData.crackTex){const ct=new THREE.CanvasTexture(ca);ct.colorSpace=orig.colorSpace;ct.anisotropy=orig.anisotropy;h.userData.crackTex=ct}
      U.map.value=h.userData.crackTex;U.uRaw.value=1;h.userData.crackT=performance.now();
      setTimeout(()=>{if(!ong)location.hash=id;picked=null},ong?1300:720);
      setTimeout(()=>{U.map.value=orig;U.uRaw.value=0;h.userData.crackT=0},1400);return}
    if(ong){picked=null;return}
    setTimeout(()=>{location.hash=id;picked=null},reduce?0:340)});
  $('#nowOpen').onclick=e=>{const q=projects[(capM||meshes[front]).userData.i];if(q.ongoing){showOngoing(innerWidth/2,innerHeight/2);return}location.hash=q.id};
  addEventListener('keydown',e=>{
    if(panel.open||info.open||!sheet.hidden)return;
    if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();scrollTo({top:Math.min(front+1,N-1)*step,behavior:'smooth'})}
    if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();scrollTo({top:Math.max(front-1,0)*step,behavior:'smooth'})}
  });
  addEventListener('scroll',()=>document.body.classList.toggle('scrolled',scrollY>20),{passive:true});
  /* 트랙패드: 맨 위·맨 아래 끝에서 더 밀어도 화면이 튕기거나(헤더가 밀려 사라짐) 새로고침되지 않게 */
  addEventListener('wheel',e=>{
    if(Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;
    const el=(e.target.closest&&e.target.closest('.dgal.on,.detail:not([hidden]),.sheet:not([hidden])'))||document.scrollingElement;
    const t=el.scrollTop,atTop=t<=0,atBot=t+el.clientHeight>=el.scrollHeight-1;
    if((atTop&&e.deltaY<0)||(atBot&&e.deltaY>0))e.preventDefault();
  },{passive:false});

  const ease=p=>p>=1?1:1-Math.pow(2,-10*p);
  const backOut=p=>{const c=1.35,q=p-1;return 1+(c+1)*q*q*q+c*q*q};
  const ss=THREE.MathUtils.smoothstep,cl=THREE.MathUtils.clamp;
  const tmp=new THREE.Vector3(),BL=new THREE.Vector3(),BR=new THREE.Vector3(),nowEl=$('#now'),t0=performance.now();let last=t0;
  function frame(now){
    const dt=Math.min((now-last)/1000,.05)||.016;last=now;
    const damp=r=>reduce?1:1-Math.exp(-dt*r);
    const target=cl(scrollY/step,0,N-1);
    const prev=cur;cur+=(target-cur)*damp(innerWidth<innerHeight?SCROLL.mobile.follow:SCROLL.desktop.follow);
    vel+=((cur-prev)/dt-vel)*damp(6);
    cmx+=(mx-cmx)*damp(2.5);cmy+=(my-cmy)*damp(2.5);
    camera.position.set(0,.2,camera.aspect<1?7.1:6.3);camera.lookAt(0,camera.aspect<1?.3:.15,1.3);
    /* 폰: 헤더 선 ~ 푸터 선 사이(주소창이 접히든 펴지든 지금 보이는 영역)의 정중앙에 썸네일+캡션 묶음을 놓고,
       공간이 모자라면 살짝 줄임. 주소창이 움직일 땐 튀지 않고 부드럽게 따라감 */
    if(pile){
      const W=innerWidth,Hc=canvas.clientHeight||innerHeight,ct=canvas.getBoundingClientRect().top;
      const hb=document.querySelector('.top').getBoundingClientRect().bottom-ct;
      const fr=document.querySelector('.gfoot').getBoundingClientRect(),ft=(fr.height?fr.top:innerHeight)-ct;
      const CAP=(nowEl.offsetHeight||22)+4,region=ft-hb,H0=pile.bot-pile.top;
      const z=Math.min(1,(region*.92-CAP)/H0),off=Hc/2+(z*(pile.top+pile.bot)+CAP)/2-(hb+ft)/2;
      if(pOff===null){pOff=off;pZ=z}else{pOff+=(off-pOff)*damp(5);pZ+=(z-pZ)*damp(5)}
      camera.zoom=pZ;camera.setViewOffset(W,Hc,0,pOff,W,Hc);camera.updateProjectionMatrix();
    }

    const f=Math.round(cur);
    if(f!==front){front=f}

    const blocked=panel.open||info.open||!sheet.hidden;
    ray.setFromCamera(ptr,camera);
    const hits=blocked?[]:ray.intersectObjects(meshes.filter(m=>m.userData.glass.uniforms.uFade.value>.3));
    const hit=hits.length?hits[0].object:null;
    if(hit!==hovered){hovered=hit;canvas.style.cursor=hit?'pointer':''}

    const intro=stackStart===null?-1:reduce?99:(now-stackStart)/1000;
    /* 오프닝: 중앙에 한 덩어리로 쌓여 있다가 위아래로 쑤욱 펼쳐짐 */
    deck.position.copy(BASE);deck.rotation.set(0,0,0);
    const spread=1,tilt=0;
    meshes.forEach(m=>{
      const u=m.userData,rel=u.i-cur;
      u.h+=((m===picked?2:m===hovered?1:0)-u.h)*damp(9);u.d=0;
      const rank=Math.max(0,rel);
      const si=intro>=99?1:intro<0?0:ease(cl((intro-.12)/1.35,0,1));
      const PIV=2;tmp.copy(DIR).multiplyScalar(PIV+(rel*spread-PIV)*(.015+.985*si));
      tmp.y+=u.h*.3;
      m.position.copy(tmp);
      if(u.crackT){const k=Math.max(0,1-(performance.now()-u.crackT)/220);if(k>0){m.position.x+=(Math.random()-.5)*.026*k;m.position.y+=(Math.random()-.5)*.019*k}}
      m.rotation.y=0;
      m.rotation.x=tilt*.025;
      m.rotation.z=0;
      const fade=ss(rel,-.5,-.08)*(1-.65*ss(rel,4,8))*(intro<0?0:Math.min(1,intro*5));
      const gu=u.glass.uniforms;gu.uFade.value=fade;/* 맨 앞에 온 판은 뿌연 정도를 낮춰 더 선명하게 (넘기는 중엔 자연스럽게 섞임) */gu.uHover.value=Math.max(Math.min(1,u.h),(innerWidth<innerHeight?FRONT_CLEAR_MOBILE:FRONT_CLEAR)*cl(1-Math.abs(rel),0,1));gu.uDim.value=u.d;
      u.side.opacity=fade*.9;
      m.visible=fade>.01;
    });
    {const noHover=!HOVER.matches,tgt=noHover?meshes[front]:(hovered&&hovered.userData.i===front?hovered:null);
     capA+=((tgt&&!picked?1:0)-capA)*damp(picked?22:12);
     if(tgt&&capM!==tgt){capM=tgt;const p=projects[capM.userData.i];$('#nowTitle').textContent=p.title;$('#nowMeta').textContent=p.year}
     const fm=capM||meshes[front];scene.updateMatrixWorld();
     BL.set(-1.05,-.75,.008).applyMatrix4(fm.matrixWorld).project(camera);
     BR.set(1.05,-.75,.008).applyMatrix4(fm.matrixWorld).project(camera);
     const x1=(BL.x+1)/2*innerWidth,x2=(BR.x+1)/2*innerWidth,yb=(1-Math.min(BL.y,BR.y))/2*(canvas.clientHeight||innerHeight);
     /* 가로 화면: 제목은 화면 왼쪽 끝, 연도는 오른쪽 끝, 맨 앞 판의 세로 가운데 높이 / 세로 화면(모바일): 판 바로 아래 */
     if(innerWidth>=innerHeight){nowEl.classList.add('side');nowEl.style.transform=`translate(0px,${yb-(x2-x1)/1.4/2}px) translateY(-50%)`;nowEl.style.width='100%'}
     else{
       /* 모바일: 캡션은 판에 붙어서 같이 움직임. 판이 바뀔 때 흐려지는 정도만 아주 옅게 */
       nowEl.classList.remove('side');nowEl.style.transform=`translate(${x1}px,${yb}px)`;nowEl.style.width=Math.max(0,x2-x1)+'px'}
     const port=innerWidth<innerHeight;
     nowEl.style.opacity=String(capA*(noHover?(port?Math.max(.75,1-Math.abs(cur-front)*.5):Math.max(0,1-Math.abs(cur-front)*2.2)):1)*fm.userData.glass.uniforms.uFade.value*ss(intro,1.15,1.65));}
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
  const mat=new THREE.ShaderMaterial({uniforms:{map:{value:null},uRaw:{value:0},uHover:{value:0},uFade:{value:1},uDim:{value:0},uEdge:{value:0},uHaze:{value:haze}},vertexShader:VS,fragmentShader:FS,transparent:true,depthWrite:false});
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
/* ───────── 저장·소스 보기 억제 (완전 차단은 불가능, 일반 방문자 기준 억제) ───────── */
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('dragstart',e=>{if(e.target.closest&&e.target.closest('img,canvas'))e.preventDefault()});
addEventListener('keydown',e=>{
  const k=(e.key||'').toLowerCase(),mod=e.ctrlKey||e.metaKey;
  if(k==='f12'||(mod&&(k==='u'||k==='s'||k==='p'))||(mod&&(e.shiftKey||e.altKey)&&['i','j','c','u'].includes(k))){e.preventDefault();e.stopPropagation()}
},true);
boot();
