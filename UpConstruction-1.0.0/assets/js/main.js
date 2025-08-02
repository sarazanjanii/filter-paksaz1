document.addEventListener('DOMContentLoaded', () => {
  // ===== Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  // ===== Mobile Navbar Toggle
  const nav = document.getElementById('navbar');
  const navShow = document.querySelector('.mobile-nav-show');
  const navHide = document.querySelector('.mobile-nav-hide');
  const overlay = document.querySelector('.menu-overlay');

  const toggleMobileNav = (show) => {
    nav.classList.toggle('mobile-nav-active', show);
    overlay.style.display = show ? 'block' : 'none';
    navShow.classList.toggle('d-none', show);
    navHide.classList.toggle('d-none', !show);
  };

  navShow.addEventListener('click', () => toggleMobileNav(true));
  navHide.addEventListener('click', () => toggleMobileNav(false));
  overlay.addEventListener('click', () => toggleMobileNav(false));

  // ===== Scroll Top Button
  const scrollTop = document.querySelector('.scroll-top');
  const handleScrollTop = () => {
    scrollTop.classList.toggle('active', window.scrollY > 100);
  };
  if (scrollTop) {
    window.addEventListener('scroll', handleScrollTop);
    window.addEventListener('load', handleScrollTop);
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ===== Scroll-Based Header Style
  const header = document.getElementById('header');
  const headerLinks = document.querySelectorAll('#navbar a');
  const handleHeaderScroll = () => {
    const scrolled = window.scrollY > 600;
    header.classList.toggle('header-bg-light', scrolled);
    headerLinks.forEach(link => {
      link.classList.toggle('text-white', !scrolled);
      link.classList.toggle('text-black', scrolled);
    });
  };
  window.addEventListener('scroll', handleHeaderScroll);
  window.addEventListener('load', handleHeaderScroll);

  // ===== Close Mobile Menu on Nav Click
  document.querySelectorAll('#navbar a[href^="#"]').forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) {
      link.addEventListener('click', () => toggleMobileNav(false));
    }
  });

  // ===== AOS
  const aos_init = () => {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false,
    });
  };
  window.addEventListener('load', aos_init);

  // ===== Swiper (hero only)
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  // ===== PureCounter
  new PureCounter();

  // ===== Contact Form Validation
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  }
});


// ================ breadcrumb==========

document.addEventListener('DOMContentLoaded', function () {
  var breadcrumbs = document.querySelector('.breadcrumbs');
  var body = document.body;

  if (breadcrumbs) {
    breadcrumbs.addEventListener('click', function (e) {
      e.stopPropagation();
      body.classList.toggle('mobile-nav-active');
    });
  }

  // بستن منو با کلیک بیرون
  document.addEventListener('click', function (e) {
    if (body.classList.contains('mobile-nav-active')) {
      var navbar = document.querySelector('.navbar');
      if (navbar && !navbar.contains(e.target) && !breadcrumbs.contains(e.target)) {
        body.classList.remove('mobile-nav-active');
      }
    }
  });
});


// ============== scrolled ====================

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // easeOutCubic: حس سر خوردن
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('.custom-scroll').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetY, 1500); // زمان برحسب میلی‌ثانیه
    }
  });
});
