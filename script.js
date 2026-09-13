(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  var THEME_KEY = 'gc-theme';
  var rootEl = document.documentElement;
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    rootEl.setAttribute('data-theme', theme);
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#0d1b2c' : '#ffffff');
    }
  }

  (function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      applyTheme('dark');
    }
  })();

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    if (rootEl.getAttribute('data-theme') === 'dark') {
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
    themeToggle.addEventListener('click', function () {
      var next = rootEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      themeToggle.setAttribute('aria-label', next === 'dark'
        ? 'Switch to light mode' : 'Switch to dark mode');
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  revealEls.forEach(function (el) {
    var idx = 0;
    var sib = el.previousElementSibling;
    while (sib) {
      if (sib.classList.contains('reveal')) idx++;
      sib = sib.previousElementSibling;
    }
    el.style.setProperty('--d', Math.min(idx * 0.07, 0.56) + 's');
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    siteNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Reviews ---------- */
  var reviews = [
    { name: 'Joyce Fergus', meta: '6 reviews', time: '2 months ago', stars: 5,
      text: 'Gulf Coast A/C & Heating installed a complete, new system in my home this week. Tom and Randy are very pleasant, efficient and knowledgeable. The whole installation was completed in about six hours, which included clean up, removal & disposal of all new system crating and old parts.\n\nLast year they replaced the ductwork in my 50 year old home so I have great confidence in this company. They are very reliable and their work is reasonably priced.' },
    { name: 'Slap 5', meta: 'Local Guide', time: '2 months ago', stars: 5,
      text: 'Came out quickly to solve my problem, pricing was fair and got the job done. All I need!\n\nExcellent Service! My AC was out and these guys came in quickly and fixed my issue. Very professional and very knowledgeable. Thank you again for doing such a great job for our family.' },
    { name: 'Toni Carrillo', meta: '6 reviews', time: '3 months ago', stars: 5,
      text: 'Great job all done. Very professional techs.' },
    { name: 'christy guilianelle', meta: '10 reviews', time: '3 months ago', stars: 5,
      text: 'Very professional, reasonable and excellent service. Highly recommend.' },
    { name: 'bob mendez', meta: '4 reviews', time: '3 months ago', stars: 5,
      text: 'Keep It Cool AC and Heating ... always on time, they do great work and very professional, thank you.' },
    { name: 'T Sterne', meta: '8 reviews', time: '3 months ago', stars: 5,
      text: 'Gulf Coast A/C delivered above and beyond. I had an older unit, weekend failure. They got the unit repaired and back up and running. I asked for a quote on a new system while they were here, they came in with a very competitive quote. Less than a week later we had a complete new system and a refund credit for the temporary repair on the old system. The new system saved me hundreds over the next year with a higher SEER rating and efficiency. Great service company!' },
    { name: 'alex a1', meta: '4 reviews', time: '3 months ago', stars: 5,
      text: 'Great service.' },
    { name: 'Mary Miner', meta: 'Local Guide', time: '3 months ago', stars: 5,
      text: 'They are awesome and responsive when I called. Easy to get a hold of.' },
    { name: 'david esser', meta: '2 reviews', time: '3 months ago', stars: 5,
      text: 'Great fast install! Great price!' },
    { name: 'Jensie Sloan', meta: 'Local Guide', time: '3 months ago', stars: 5,
      text: 'Gulf Coast A/C & Htg installed my HVAC system at an affordable price. They did a great job! I highly recommend them.' },
    { name: "Young's Guns", meta: '4 reviews', time: '3 months ago', stars: 5,
      text: 'Great service! Fast service timing! Just the best of the best!' },
    { name: 'Jessica Washington', meta: '7 reviews', time: '3 months ago', stars: 5,
      text: "I'm giving them 5 stars for their punctuality and timely service. The technician was respectful and was able to fix my unit quick." },
    { name: 'Abi Semtner', meta: '5 reviews', time: '3 months ago', stars: 5,
      text: 'Amazing!!!' },
    { name: 'Patty 61', meta: '2 reviews', time: '9 months ago', stars: 5,
      text: 'Always gets the repair or install done in a timely manner and reasonable cost. Honest and reliable.' },
    { name: 'RD Office', meta: '1 review', time: '9 months ago', stars: 5,
      text: 'Gulf Coast just installed a new 4 ton unit in the attic. Had the old one out and new installed on the first day. A few details on second day and done. Knowledgeable and professional team. Reasonable charges and most importantly gets it done right.' },
    { name: 'Meroflkarin', meta: '2 reviews', time: 'a year ago', stars: 5,
      text: 'This locally owned business is the best by far for their quality of work and values! Been helping my family and I for nearly 10 years now. They are always ready to help you rain or shine. As well as better prices compared to other commercially owned companies. Both men are professional and informative when it comes to any questions that need answering. Thank you for your service!' }
  ];

  var REVIEWS_PER_PAGE = 6;
  var reviewGrid = document.getElementById('reviewGrid');
  var reviewNote = document.getElementById('reviewNote');
  var toggleBtn = document.getElementById('toggleReviews');

  function starString(n) {
    return '\u2605'.repeat(Math.max(0, Math.min(5, n)));
  }

  function renderReviews(upTo) {
    if (!reviewGrid) return;
    reviewGrid.innerHTML = reviews.slice(0, upTo).map(function (r, i) {
      return (
        '<article class="review-card" style="--i:' + i + '">' +
          '<div class="review-meta">' +
            '<strong>' + r.name + '</strong>' +
            '<span class="review-time">' + r.time + '</span>' +
          '</div>' +
          '<div class="review-stars" aria-label="' + (r.stars || 5) + ' out of 5 stars">' +
            starString(r.stars || 5) + '<span class="review-meta"> &middot; ' + r.meta + '</span>' +
          '</div>' +
          '<p>' + r.text.replace('\n', '<br>') + '</p>' +
        '</article>'
      );
    }).join('');
    reviewGrid.classList.add('visible');
  }

  function currentCount() {
    if (!reviewGrid) return 0;
    return reviewGrid.querySelectorAll('.review-card').length;
  }

  if (toggleBtn) {
    var showAll = false;
    toggleBtn.addEventListener('click', function () {
      showAll = !showAll;
      renderReviews(showAll ? reviews.length : REVIEWS_PER_PAGE);
      toggleBtn.textContent = showAll ? 'Show Fewer Reviews' : 'Show More Reviews';
      if (reviewNote) reviewNote.textContent = '';
    });
  }

  if (reviewGrid) {
    renderReviews(REVIEWS_PER_PAGE);
  }
})();