import{a as f,S as m}from"./assets/vendor-CwMn2xmy.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const h="46669299-ebb68efeed7427af4171916f3",y="https://pixabay.com/api/",g=async(r,t=1,s=15)=>{const n=`${y}?key=${h}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${s}`;try{return(await f.get(n)).data.hits}catch{throw new Error("Помилка завантаження зображень")}},L=r=>{const t=document.querySelector(".list-photos"),s=r.map(e=>`
        <li>
            <a href="${e.largeImageURL}">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
            </a>
            <div>
                <p>Likes: ${e.likes}</p>
                <p>Views: ${e.views}</p>
                <p>Comments: ${e.comments}</p>
                <p>Downloads: ${e.downloads}</p>
            </div>
        </li>
    `).join("");t.insertAdjacentHTML("beforeend",s),new m(".list-photos a").refresh()},b=document.getElementById("search-form"),d=document.getElementById("search-field"),l=document.getElementById("load-more"),w=document.querySelector(".list-photos"),i=document.createElement("div");i.textContent="Завантаження...";i.classList.add("loading-indicator");let c=1,u="";b.addEventListener("submit",async r=>{r.preventDefault();const t=d.value.trim();t&&(c=1,u=t,w.innerHTML="",l.style.display="none",await p(t),d.value="")});l.addEventListener("click",async()=>{c+=1,await p(u)});async function p(r){document.body.appendChild(i);try{const t=await g(r,c);if(t.length===0&&c===1){showNoResultsMessage();return}L(t),t.length>0&&(l.style.display="block")}catch(t){console.error(t)}finally{i.remove()}}
//# sourceMappingURL=index.js.map
