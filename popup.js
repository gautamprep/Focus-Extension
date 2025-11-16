document.addEventListener('DOMContentLoaded',()=>{
  const btn = document.getElementById('open');
  if (btn){
    btn.addEventListener('click', ()=> {
      try{
        chrome.tabs.create({ url: chrome.runtime.getURL('newtab.html') });
      }catch(e){
        window.open('newtab.html','_blank');
      }
    });
  }
});