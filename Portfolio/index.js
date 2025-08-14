(() => {
  const canvas = document.getElementById("cursor-ribbon");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let dpr = Math.max(1, window.devicePixelRatio || 1);
  let w, h;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
  }
  resize();
  window.addEventListener("resize", resize);


  const points = [];
  const MAX_POINTS = 30;   
  const EASE = 0.18;       
  let target = { x: w / 2, y: h / 2 };
  let head   = { x: w / 2, y: h / 2 };

  // track mouse
  window.addEventListener("mousemove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  }, { passive: true });


  window.addEventListener("touchstart", () => {
    canvas.style.display = "none";
  }, { passive: true });

  function step() {
  
    head.x += (target.x - head.x) * EASE;
    head.y += (target.y - head.y) * EASE;

    // push new head position
    points.unshift({ x: head.x, y: head.y });
    if (points.length > MAX_POINTS) points.pop();

 
    ctx.clearRect(0, 0, w, h);
    if (points.length > 1) {
      ctx.lineWidth = 2;             
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "red";       

      ctx.beginPath();
    
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const p = points[i];
        const n = points[i + 1];
        const mx = (p.x + n.x) / 2;
        const my = (p.y + n.y) / 2;
        ctx.quadraticCurveTo(p.x, p.y, mx, my);
      }
      // tail endpoint
      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();





(function () {
 
  const quoteHTML =
    "<span class='serif'>With great power</span> comes great responsibility…<br>" +
    "<span class='serif'>and frontend with React</span> is no joke.";

  const authorEl = document.getElementById("typed-author");

  new Typed("#typed-quote", {
    strings: [quoteHTML],
    typeSpeed: 50,
    backSpeed: 25,
    showCursor: false,
    cursorChar: "|",
    smartBackspace: false,
    backDelay: 700,
    startDelay: 100,
    loop: false,
    contentType: "html", 
    onComplete: () => {
     
      if (authorEl) authorEl.classList.remove("hidden");
    }
  });
})();

const reveals = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
      observer.unobserve(entry.target); 
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));




