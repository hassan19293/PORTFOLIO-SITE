/* =====================================================
   BUILDIFO
   SCRIPT.JS
   PART 2
   Cursor + Counter + Parallax + Magnetic Buttons
====================================================== */

/* ===========================
   Custom Cursor
=========================== */

const cursor = document.createElement("div");

cursor.className = "custom-cursor";

document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {

cursor.style.left = e.clientX + "px";

cursor.style.top = e.clientY + "px";

});

document.querySelectorAll("a,button,.service-card,.product-card,.work-card").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.classList.add("active");

});

el.addEventListener("mouseleave",()=>{

cursor.classList.remove("active");

});

});

/* ===========================
   Counter Animation
=========================== */

const counters=document.querySelectorAll(".stats h2");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter=entry.target;

const target=parseInt(counter.innerText);

let count=0;

const speed=Math.max(20,target/60);

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count)+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

};

update();

counterObserver.unobserve(counter);

});

},{threshold:.5});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/* ===========================
   Parallax
=========================== */

window.addEventListener("scroll",()=>{

const value=window.scrollY;

document.querySelectorAll(".circle").forEach(circle=>{

circle.style.transform=`translateY(${value*0.15}px)`;

});

});

/* ===========================
   Magnetic Buttons
=========================== */

document.querySelectorAll(".primary,.secondary,.nav-btn").forEach(button=>{

button.addEventListener("mousemove",(e)=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

button.style.transform=`translate(${x*0.15}px,${y*0.15}px)`;

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translate(0,0)";

});

});

/* ===========================
   Active Navigation
=========================== */

const navLinks=document.querySelectorAll("nav a");

const sectionObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+entry.target.id){

link.classList.add("active");

}

});

}

});

},{threshold:.6});

document.querySelectorAll("section[id]").forEach(section=>{

sectionObserver.observe(section);

});
/* =====================================================
   BUILDIFO
   SCRIPT.JS
   PART 3
   Loading Screen + Text Reveal + Tilt + Scroll Progress
======================================================*/

/* ===========================
   Page Loader
=========================== */

window.addEventListener("load",()=>{

const loader=document.createElement("div");

loader.className="loader";

loader.innerHTML=`
<div class="loader-logo">
BUILDIFO
</div>
`;

document.body.appendChild(loader);

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},800);

},1200);

});

/* ===========================
   Scroll Progress
=========================== */

const progress=document.createElement("div");

progress.className="scroll-progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const scrollTop=window.scrollY;

const height=document.documentElement.scrollHeight-window.innerHeight;

const percent=(scrollTop/height)*100;

progress.style.width=percent+"%";

});

/* ===========================
   Tilt Cards
=========================== */

document.querySelectorAll(".glass-card,.service-card,.product-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=((y/rect.height)-0.5)*-12;

const rotateY=((x/rect.width)-0.5)*12;

card.style.transform=`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/* ===========================
   Hero Text Animation
=========================== */

const heroTitle=document.querySelector(".hero h1");

if(heroTitle){

const text=heroTitle.innerHTML;

heroTitle.innerHTML="";

text.split("").forEach((letter,index)=>{

const span=document.createElement("span");

span.innerHTML=letter===" "?"&nbsp;":letter;

span.style.opacity="0";

span.style.display="inline-block";

span.style.transform="translateY(50px)";

span.style.transition=".6s";

heroTitle.appendChild(span);

setTimeout(()=>{

span.style.opacity="1";

span.style.transform="translateY(0)";

},index*30);

});

}

/* ===========================
   Floating Elements
=========================== */

document.querySelectorAll(".glass-card").forEach((card,index)=>{

setInterval(()=>{

card.style.transform=`translateY(${Math.sin(Date.now()/700+index)*6}px)`;

},20);

});

/* ===========================
   Random Glow Pulse
=========================== */

setInterval(()=>{

document.querySelectorAll(".glass-card").forEach(card=>{

card.style.boxShadow=`
0 20px 60px
rgba(78,168,255,${Math.random()*0.25})
`;

});

},2500);

/* =====================================================
   BUILDIFO
   SCRIPT.JS
   PART 4 (FINAL)
   Mobile Menu + Contact Form + Utilities
======================================================*/

/* ===========================
   Mobile Navigation
=========================== */

const nav = document.querySelector("nav");

const menu = document.createElement("div");

menu.className = "menu-toggle";

menu.innerHTML = "☰";

document.querySelector(".header .container").appendChild(menu);

menu.addEventListener("click", () => {

    nav.classList.toggle("open");

    menu.classList.toggle("active");

});

/* ===========================
   Close Menu on Link Click
=========================== */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        menu.classList.remove("active");

    });

});

/* ===========================
   Contact Form
=========================== */

const form = document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

const name=form.querySelector('input[type="text"]').value.trim();

const email=form.querySelector('input[type="email"]').value.trim();

if(name===""||email===""){

alert("Please fill in all required fields.");

return;

}

const button=form.querySelector("button");

button.innerHTML="Sending...";

button.disabled=true;

setTimeout(()=>{

button.innerHTML="Message Sent ✓";

button.style.background="#22c55e";

setTimeout(()=>{

button.innerHTML="Share Your Vision";

button.disabled=false;

button.style.background="";

form.reset();

},2500);

},1500);

});

}

/* ===========================
   Current Year
=========================== */

const year=document.querySelector(".year");

if(year){

year.textContent=new Date().getFullYear();

}

/* ===========================
   Disable Right Click
=========================== */

document.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});

/* ===========================
   Keyboard Shortcuts
=========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

nav.classList.remove("open");

}

});

/* ===========================
   Performance
=========================== */

window.addEventListener("resize",()=>{

document.body.classList.remove("menu-open");

});

console.log("%cBUILDIFO","font-size:32px;font-weight:800;color:#4ea8ff;");
console.log("AI Product Studio Ready.");
