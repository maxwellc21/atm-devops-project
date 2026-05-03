
const pages = {
  "home":"content/home.html",
  "build-plan":"content/build-plan.html",
  "week1":"content/week1.html",
  "week2":"content/week2.html",
  "week3":"content/week3.html",
  "week4":"content/week4.html",
  "week5":"content/week5.html",
  "week6":"content/week6.html",
  "week7":"content/week7.html",
  "mongodb":"content/mongodb.html",
  "final-demo":"content/final-demo.html"
};

const content = document.getElementById("content");
const main = document.querySelector(".main");

async function loadPage(page, push=true){
  const file = pages[page] || pages.home;
  content.innerHTML = '<div class="notice">Loading...</div>';
  try{
    const res = await fetch(file);
    if(!res.ok) throw new Error("Could not load page");
    const html = await res.text();
    content.innerHTML = html;
    document.querySelectorAll(".nav-link").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === page);
    });
    main.scrollTo({top:0, behavior:"smooth"});
    if(push) location.hash = page;
  }catch(e){
    content.innerHTML = '<div class="notice"><h2>Could not load content</h2><p>Use GitHub Pages, Live Server, or Python HTTP server. Do not open this file directly with file://.</p></div>';
  }
}

document.addEventListener("click", event => {
  const btn = event.target.closest("[data-page]");
  if(btn){
    event.preventDefault();
    loadPage(btn.dataset.page);
  }
});

window.addEventListener("hashchange", () => {
  loadPage(location.hash.replace("#","") || "home", false);
});

document.getElementById("topBtn").addEventListener("click", () => {
  main.scrollTo({top:0, behavior:"smooth"});
});

loadPage(location.hash.replace("#","") || "home", false);
