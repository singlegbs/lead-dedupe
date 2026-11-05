/* MagicBento-inspired adaptation. Copyright (c) 2026 David Haz; MIT with Commons Clause. https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md */
document.addEventListener('DOMContentLoaded',function(){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.mb-card').forEach(function(card){
    card.addEventListener('pointermove',function(event){
      if(reduced.matches||!fine.matches)return;
      const r=card.getBoundingClientRect();if(!r.width||!r.height)return;
      const x=Math.max(0,Math.min(1,(event.clientX-r.left)/r.width));
      const y=Math.max(0,Math.min(1,(event.clientY-r.top)/r.height));
      card.style.setProperty('--mb-x',(x*100)+'%');card.style.setProperty('--mb-y',(y*100)+'%');
      card.style.setProperty('--mb-rx',((.5-y)*3)+'deg');card.style.setProperty('--mb-ry',((x-.5)*3)+'deg');
    });
    card.addEventListener('pointerleave',function(){['--mb-x','--mb-y','--mb-rx','--mb-ry'].forEach(function(p){card.style.removeProperty(p)});});
  });
});
/* LeadDedupe page enhancements, written for this site. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('load', function(){ window.scrollTo({top:0,left:0,behavior:'instant'}); });
document.addEventListener('DOMContentLoaded', function(){
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = 'motion.css?v=2';
  css.addEventListener('load', function(){
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-visible');
        entry.target.classList.remove('motion-pending');
        observer.unobserve(entry.target);
      });
    }, {threshold:0.1});
    document.querySelectorAll('.mb-card, .bento article').forEach(function(el,i){
      el.classList.add('motion-item','motion-pending');
      el.style.setProperty('--reveal-delay', Math.min(i%4*45,135)+'ms');
      observer.observe(el);
    });
  });
  document.head.appendChild(css);
});
