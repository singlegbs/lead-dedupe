/* Original, dependency-free contour background for LeadDedupe. */
(() => {
  const canvas = document.getElementById('hero-background');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, last = 0, phase = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(118, 189, 106, 0.22)';
    const cx = width * 0.70, cy = height * 0.48;
    const scale = Math.max(width, height * 1.35);
    for (let i = 0; i < 22; i++) {
      const r = scale * (0.13 + i * 0.035);
      ctx.beginPath();
      for (let j = 0; j <= 100; j++) {
        const a = j * Math.PI * 2 / 100;
        const ripple = 1 + 0.075 * Math.sin(3 * a + phase + i * 0.12)
          + 0.045 * Math.cos(5 * a - phase * 0.7 + i * 0.09);
        const x = cx + Math.cos(a) * r * ripple;
        const y = cy + Math.sin(a) * r * 0.58 * ripple;
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function tick(now) {
    frame = 0;
    if (document.hidden || motion.matches) return;
    if (!last) last = now;
    if (now - last >= 33) {
      phase += Math.min(now - last, 100) * 0.00008;
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; last = 0;
    if (document.hidden) return;
    draw();
    if (!motion.matches) frame = requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', syncMotion);
  if (motion.addEventListener) motion.addEventListener('change', syncMotion);
  else motion.addListener(syncMotion);
  resize();
  syncMotion();
})();
