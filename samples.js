'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const chips = document.querySelector('.chips');
  const tool = document.querySelector('#tool');
  const hero = document.querySelector('#hero-paste');
  const channelArea = document.querySelector('#channels');
  if (!chips || !tool || !hero || !channelArea || typeof loadDemo !== 'function') return;

  const categories = [
    { label: 'Agency list', key: 'agency', slug: 'agency', company: 'Avenza Sample Agency', first: 'Agency prospects', second: 'Agency follow-up' },
    { label: 'E-commerce list', key: 'commerce', slug: 'commerce', company: 'Veluno Sample Shop', first: 'Store prospects', second: 'Store follow-up' },
    { label: 'Sales teams', key: 'sales', slug: 'sales', company: 'Mivora Sample Sales', first: 'Sales outreach', second: 'Sales follow-up' },
    { label: 'Recruiters', key: 'recruiters', slug: 'recruiting', company: 'Zerilo Sample Talent', first: 'Recruiting outreach', second: 'Recruiting follow-up' },
    { label: 'CRM imports', key: 'crm', slug: 'crm', company: 'Kevora Sample CRM', first: 'CRM import A', second: 'CRM import B' },
    { label: 'Cold outreach', key: 'outreach', slug: 'outreach', company: 'Talivo Sample Outreach', first: 'Cold outreach A', second: 'Cold outreach B' }
  ];
  const firstNames = ['Tavi','Nilo','Zeli','Mavi','Rilo','Kemi','Vano','Seli','Daro','Lumi','Pavi','Reni','Telo','Mira','Favi','Kalo'];
  const lastNames = ['Vela','Novi','Zaro','Mero','Ravi','Kelo','Veni','Saro','Dovi','Laro','Pelo','Ravo','Teni','Mavo','Felo','Kavi'];
  const buttons = Array.from(chips.querySelectorAll('button'));
  const clearActive = () => buttons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  clearActive();

  function makeLists(category) {
    const header = 'Email,First name,Last name,Company,Phone,Notes';
    const rows = firstNames.map((name, i) => {
      const n = i + 1;
      const phone = String(100 + i).padStart(4, '0');
      return `person${n}@lead${n}.${category.slug}.example.com,${name},${lastNames[i]},${category.company} ${String(n).padStart(2, '0')},202-555-${phone},Fictional sample`;
    });
    const a = rows.slice(0, 10).concat(rows[1], rows[2]);
    const b = rows.slice(7, 16).concat(rows[8]);
    return [[header].concat(a).join('\n'), [header].concat(b).join('\n')];
  }

  chips.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button || !chips.contains(button)) return;
    const category = categories.find(item => item.label === button.textContent.trim());
    if (!category) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    samples[category.key] = [makeLists(category)];
    loadDemo(category.key);
    channels[0].name = category.first;
    channels[1].name = category.second;
    renderChannels();
    renderResults();
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    tool.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
  }, true);

  hero.addEventListener('input', clearActive);
  channelArea.addEventListener('input', event => {
    if (event.target.matches('textarea[data-action="text"]')) clearActive();
  });
  channelArea.addEventListener('change', event => {
    if (event.target.matches('input[data-action="file"]') && event.target.files.length) clearActive();
  });
  const heroGo = document.querySelector('#hero-go');
  if (heroGo) heroGo.addEventListener('click', () => { if (hero.value.trim()) clearActive(); });
  const clear = document.querySelector('#clear');
  if (clear) clear.addEventListener('click', clearActive);
});
