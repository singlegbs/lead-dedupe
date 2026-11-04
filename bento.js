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
