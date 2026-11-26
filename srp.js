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
const roleRotator=document.querySelector('.role-rotator');
if(roleRotator&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const roles=['Flutter Developer','Mobile App Developer','Backend Developer'];
 let roleIndex=0;
 let charIndex=roles[0].length;
 let deleting=true;
 const tick=()=>{
  const current=roles[roleIndex];
  if(deleting){
   charIndex--;
   roleRotator.textContent=current.slice(0,Math.max(0,charIndex));
   if(charIndex<=0){deleting=false;roleIndex=(roleIndex+1)%roles.length;setTimeout(tick,280);return;}
   setTimeout(tick,48);
  }else{
   const next=roles[roleIndex];
   charIndex++;
   roleRotator.textContent=next.slice(0,charIndex);
   if(charIndex>=next.length){deleting=true;setTimeout(tick,1700);return;}
   setTimeout(tick,82);
  }
 };
 setTimeout(tick,1800);
}

const motionTargets=document.querySelectorAll('.section-heading,.project-card,.about-content,.experience-card,.toolkit-layout,.education-content,.contact-section');
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
 const motionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('is-visible');motionObserver.unobserve(entry.target);}
  });
 },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
 motionTargets.forEach(target=>{target.classList.add('reveal-item');motionObserver.observe(target);});
}else{
 motionTargets.forEach(target=>target.classList.add('is-visible'));
}
