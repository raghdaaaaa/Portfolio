const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#main-navigation');
const navLinks = [...document.querySelectorAll('.navigation a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const animatedTitle = document.querySelector('.animated-title');

const closeMenu = () => {
  navigation.classList.remove('active');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
};

menuToggle.addEventListener('click', () => {
  const willOpen = !navigation.classList.contains('active');
  navigation.classList.toggle('active', willOpen);
  menuToggle.classList.toggle('open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (
    navigation.classList.contains('active') &&
    !navigation.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 895) {
    closeMenu();
  }
});

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 16);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveLink(visible.target.id);
      }
    },
    {
      rootMargin: '-18% 0px -55% 0px',
      threshold: [0.05, 0.25, 0.5]
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  window.addEventListener('scroll', () => {
    const marker = window.scrollY + 220;
    let current = sections[0]?.id;

    sections.forEach((section) => {
      if (section.offsetTop <= marker) {
        current = section.id;
      }
    });

    setActiveLink(current);
  });
}

const titles = [
  'Flutter Developer',
  'Mobile App Developer',
  'Software Developer'
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let titleIndex = 0;
let typingTimer;

const wait = (milliseconds) => new Promise((resolve) => {
  window.setTimeout(resolve, milliseconds);
});

async function typeTitle() {
  if (prefersReducedMotion) {
    animatedTitle.textContent = titles[titleIndex];
    return;
  }

  const title = titles[titleIndex];

  for (let index = 1; index <= title.length; index += 1) {
    animatedTitle.textContent = title.slice(0, index);
    await wait(55);
  }

  await wait(1500);

  for (let index = title.length; index >= 0; index -= 1) {
    animatedTitle.textContent = title.slice(0, index);
    await wait(28);
  }

  titleIndex = (titleIndex + 1) % titles.length;
  typingTimer = window.setTimeout(typeTitle, 280);
}

if (animatedTitle) {
  typeTitle();
}

window.addEventListener('beforeunload', () => {
  window.clearTimeout(typingTimer);
});

const year = document.querySelector('#copyright-year');
if (year) {
  year.textContent = new Date().getFullYear();
}
