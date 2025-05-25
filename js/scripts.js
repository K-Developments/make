document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');
  let lastScroll = 0;
  let isScrollingDown = false;
  let animation;

  // Animate nav links on page load
  function animateNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    gsap.set(navLinks, { opacity: 0, y: 20 });
    gsap.to(navLinks, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.8
    });
  }

  // Set initial header style
  gsap.set(header, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(0px)',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
  });

  function initAnimations() {
    animateNavLinks();
  }

  window.addEventListener('scroll', function () {
    const currentScroll = window.scrollY;
    isScrollingDown = currentScroll > lastScroll;
    lastScroll = currentScroll;

    if (animation) animation.kill();

    if (currentScroll <= 2) {
      animation = gsap.timeline()
        .to(header, {
          backgroundColor: 'rgba(255, 255, 255, 0)',
          backdropFilter: 'blur(0px)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.8,
          ease: "expo.out"
        })
        .to(header, {
          y: 0,
          duration: 0.6,
          ease: "back.out"
        }, 0);
      return;
    }

    if (isScrollingDown && currentScroll > 100) {
      animation = gsap.timeline()
        .to(header, {
          y: -100,
          duration: 0.5,
          ease: "power3.inOut"
        })
        .to(header, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          duration: 0.4,
          ease: "power2.out"
        }, 0);
    } else if (!isScrollingDown) {
      animation = gsap.timeline()
        .to(header, {
          y: 0,
          duration: 0.8,
          ease: "expo.out"
        })
        .to(header, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          duration: 0.6,
          ease: "power2.out"
        }, 0);
    }

    // Logo scaling
    gsap.to(".logo img", {
      scale: currentScroll > 100 ? 0.7 : 1.2,
      duration: 0.5,
      ease: "back.out"
    });
  });

  window.addEventListener('load', function () {
    setTimeout(() => {
      initAnimations();
      animateHeroWidthTransition();
      const content = document.getElementById('contentWidth');
      if (content) content.style.display = 'block';
    }, 2000);
  });

  // Hero Animation
 function animateHeroWidthTransition() {
  const heroTL = gsap.timeline();
  const isMobile = window.matchMedia("(max-width: 768px)").matches; // Adjust breakpoint as needed

  if (isMobile) {
    // Mobile animation - bottom to top height gain
    heroTL.fromTo(".hero-image", 
     
      { height: "100%", 
        width: 0,

        x: "0" },
      {
        width: "100%",
        x: "0",
        duration: 1,
        ease: "power2.inOut",
        immediateRender: true
      }
    );
  } else {
    const heroImage = document.querySelector('.hero-image');
heroImage.style.width = "50%";
heroImage.style.height = "100vh";
    // Desktop animation - original width-based animation
    heroTL.to(".hero-image",{
      width: "100%",
     height:"100%",
      x: 0,
      duration: 1,
      ease: "power2.inOut",
      immediateRender: true
    }
   );
  }

  // Common content animation (works for both cases)
  heroTL.to("#hero-content", {
    x: () => {
      const contentWidth = document.querySelector("#hero-content").offsetWidth;
      const containerWidth = document.querySelector('#home').offsetWidth;
      return -(containerWidth / contentWidth - 200);
    },
    duration: 2,
    ease: "power3.inOut"
  }, "<");
}
  // Mobile Menu
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const hamburger = document.getElementById('hamburger');
  const hamburgerLines = hamburger?.querySelectorAll('span');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuLinks = document.getElementById('mobileMenuLinks')?.querySelectorAll('li');
  let menuOpen = false;

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      menuOpen = !menuOpen;

      if (menuOpen) {
        document.body.style.overflow = 'hidden';

        gsap.timeline()
          .to(hamburgerLines[0], {
            y: 6,
            rotate: 45,
            transformOrigin: "center",
            ease: "expo.out",
            duration: 0.4
          })
          .to(hamburgerLines[1], {
            scaleX: 0,
            opacity: 0,
            ease: "expo.out",
            duration: 0.3
          }, "-=0.3")
          .to(hamburgerLines[2], {
            y: -6,
            rotate: -45,
            transformOrigin: "center",
            ease: "expo.out",
            duration: 0.4
          }, "-=0.4");

        gsap.to(mobileMenu, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.fromTo(mobileMenuLinks,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      } else {
        document.body.style.overflow = '';

        gsap.timeline()
          .to(hamburgerLines[0], {
            y: 0,
            rotate: 0,
            ease: "expo.inOut",
            duration: 0.4
          })
          .to(hamburgerLines[1], {
            scaleX: 1,
            opacity: 1,
            ease: "expo.inOut",
            duration: 0.3
          }, "-=0.3")
          .to(hamburgerLines[2], {
            y: 0,
            rotate: 0,
            ease: "expo.inOut",
            duration: 0.4
          }, "-=0.4");

        gsap.to(mobileMenu, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.inOut'
        });

        gsap.to(mobileMenuLinks, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.05,
          ease: 'power2.in'
        });
      }
    });

    mobileMenuLinks?.forEach(link => {
      link.addEventListener('click', function () {
        if (menuOpen) {
          mobileMenuButton.click();
        }
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 300) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
});

// Disable scroll during page load
window.addEventListener('load', () => {
  document.body.style.overflow = 'hidden';
  document.body.style.pointerEvents = 'none';

  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
  }, 2000);
});

// Swiper
const heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Swiper GSAP animation
window.addEventListener("load", () => {
  gsap.from(".hero-content", {
    delay:2.8,
    opacity:0,
    ease: "power2.out",
  });

 
});