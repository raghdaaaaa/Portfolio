const menuIcon = document.querySelector('#menu-icon');
const navigation = document.querySelector('.navigation');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navigation a[href^="#"]');

const closeMenu = () => {
  navigation.classList.remove('active');
  menuIcon.classList.remove('fa-xmark');
  menuIcon.classList.add('fa-bars');
  menuIcon.setAttribute('aria-label', 'Open navigation menu');
  menuIcon.setAttribute('aria-expanded', 'false');
};

menuIcon.addEventListener('click', () => {
  navigation.classList.toggle('active');
  const isOpen = navigation.classList.contains('active');
  menuIcon.classList.toggle('fa-bars', !isOpen);
  menuIcon.classList.toggle('fa-xmark', isOpen);
  menuIcon.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  menuIcon.setAttribute('aria-expanded', String(isOpen));
});

menuIcon.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    menuIcon.click();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 180;
  let currentSection = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 895) {
    closeMenu();
  }
});
