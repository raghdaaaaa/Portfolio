const menuToggle=document.querySelector('#menu-toggle');
const navigation=document.querySelector('#main-navigation');
const closeMenu=()=>{if(!navigation||!menuToggle)return;navigation.classList.remove('active');menuToggle.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation menu');};
if(menuToggle&&navigation){
 menuToggle.addEventListener('click',()=>{const open=!navigation.classList.contains('active');navigation.classList.toggle('active',open);menuToggle.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});
 navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
 document.addEventListener('click',event=>{if(navigation.classList.contains('active')&&!navigation.contains(event.target)&&!menuToggle.contains(event.target))closeMenu();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
 window.addEventListener('resize',()=>{if(window.innerWidth>700)closeMenu();});
}
const year=document.querySelector('#copyright-year');if(year)year.textContent=new Date().getFullYear();