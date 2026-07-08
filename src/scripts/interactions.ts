const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

const supportsPointerFine = window.matchMedia('(pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;

if (supportsPointerFine && cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animRing(){
    if (document.hidden) {
      requestAnimationFrame(animRing);
      return;
    }
    rx += (mx - rx) * (prefersReducedMotion ? 0.4 : 0.12);
    ry += (my - ry) * (prefersReducedMotion ? 0.4 : 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function animateCounter(el: Element, target: number, duration = 1600) {
  let start: number | null = null;
  const step = (ts: number) => {
    if(!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toString();
    if(progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toString();
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const target = parseInt(e.target.getAttribute('data-target') || '0');
      animateCounter(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

const heroGrid = document.querySelector('.hero-grid');
if (heroGrid) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    (heroGrid as HTMLElement).style.transform = `translateY(${y * 0.3}px)`;
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = (a as HTMLAnchorElement).getAttribute('href');
    if (href) {
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior:'smooth' });
      }
    }
  });
});
