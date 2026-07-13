const GOOGLE_REVIEW_URL="https://g.page/r/Ca2HFL1UovrSEBM/review";
const STORAGE_KEY="kasturiUsedReviewIdsV1";

const chips=document.querySelectorAll(".chip"),selected=new Set();
chips.forEach(c=>c.addEventListener("click",()=>{const v=c.dataset.value;
  selected.has(v)?selected.delete(v):selected.add(v);
  c.classList.toggle("selected")}));
const stars=document.querySelectorAll(".star"),ratingText=document.getElementById("ratingText");
let currentRating=0,reviewData=[];
const labels={1:"Not Good",2:"Could Be Better",3:"Good",4:"Great Experience",5:"Absolutely Loved It"};
stars.forEach(s=>s.addEventListener("click",()=>{
  currentRating=+s.dataset.value;
  stars.forEach(x=>x.classList.toggle("filled",+x.dataset.value<=currentRating));
  ratingText.textContent=`${currentRating} ${currentRating===1?"Star":"Stars"} – ${labels[currentRating]}`;
  ratingText.classList.remove("placeholder")}));
fetch("reviews.json").then(r=>{if(!r.ok)throw Error("reviews.json failed");return r.json()}).then(d=>reviewData=d.reviews).catch(console.error);
function used()
{
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY))||{}
  }
  catch{return{}}}
function pickReview(){
 const chosen=[...selected],pool=reviewData.filter(r=>r.rating===currentRating&&r.categories.some(c=>chosen.includes(c)));
 if(!pool.length)
  return null;
 const key=`${currentRating}::${chosen.sort().join("|")}`,map=used();
 let ids=new Set(map[key]||[]),available=pool.filter(r=>!ids.has(r.id));
 if(!available.length)
  {
    ids=new Set();map[key]=[];
    available=pool
  }
 const item=available[Math.floor(Math.random()*available.length)];
 ids.add(item.id);map[key]=[...ids];
 localStorage.setItem(STORAGE_KEY,JSON.stringify(map));
 return item;
}
function typewrite(el,text)
{
  el.innerHTML='<span class="cursor-blink"></span>';
  let i=0;
  const t=setInterval(()=>{
    i++;el.innerHTML=text.slice(0,i)+'<span class="cursor-blink"></span>';
    if(i>=text.length)
      {
        clearInterval(t);el.textContent=text
      }
    },14)
}
const generateBtn=document.getElementById("generateBtn"),resultCard=document.getElementById("resultCard"),reviewTextEl=document.getElementById("reviewText");
generateBtn.addEventListener("click",()=>{if(!selected.size||!currentRating)
  {
    alert("Please select at least one experience and a rating.");
    return
  }
  if(!reviewData.length)
    {
      alert("Reviews are still loading. Please try again.");
      return
    }
    generateBtn.classList.add("loading");
    generateBtn.disabled=true;
    setTimeout(()=>{
      const item=pickReview();
      generateBtn.classList.remove("loading");
      generateBtn.disabled=false;
      if(!item)
        {
          alert("No review is available for this selection.");
          return
        }
        resultCard.classList.add("show");
        typewrite(reviewTextEl,item.review);
        resultCard.scrollIntoView({behavior:"smooth",block:"nearest"})
    },)
  });

function openPopup()
{
  document.getElementById("popup").classList.add("open");
  document.body.style.overflow="hidden"
}
function closePopup()
{
  document.getElementById("popup").classList.remove("open");
  document.body.style.overflow=""
}
document.getElementById("popupGoogleBtn").addEventListener("click",closePopup);
document.getElementById("popup").addEventListener("click",e=>{if(e.target===e.currentTarget)closePopup()});
const googleBtn = document.getElementById("googleBtn");
const popupGoogleBtn = document.getElementById("popupGoogleBtn");

popupGoogleBtn.href = GOOGLE_REVIEW_URL;

googleBtn.addEventListener("click", async () => {

    const text = reviewTextEl.textContent.trim();

    if (!text) {
        alert("Please generate a review first.");
        return;
    }

    // Copy review
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }

    // Show popup
    openPopup();
});
document.getElementById("googleBtn").addEventListener("click", async () => {

    const text = reviewTextEl.textContent.trim();

    if (!text) {
        alert("Please generate a review first.");
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }

    openPopup();
});