document.addEventListener('DOMContentLoaded', () => {
  const sections = [
    'sections/home.html',
    'sections/about.html',
    'sections/projects.html',
    'sections/contact.html'
  ];

  const container = document.getElementById('container');
  let currentSectionIndex = 0;

  const loadSection = async (index) => {
    if (index < sections.length) {
      const response = await fetch(sections[index]);
      const content = await response.text();
      container.insertAdjacentHTML('beforeend', content);
    }
  };

  const loadInitialSections = async () => {
    for (let i = 0; i < 2; i++) { // Load at least two sections initially
      await loadSection(i);
      currentSectionIndex = i;
    }
  };

  const handleScroll = async () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      currentSectionIndex++;
      await loadSection(currentSectionIndex);
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Load the initial sections
  loadInitialSections();

  // Smooth scroll to section
  const navbarLinks = document.querySelectorAll('#navbar a');
  navbarLinks.forEach(link => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      const targetIndex = sections.findIndex(section => section.includes(targetId));
      if (targetIndex > currentSectionIndex) {
        for (let i = currentSectionIndex + 1; i <= targetIndex; i++) {
          await loadSection(i);
        }
        currentSectionIndex = targetIndex;
      }
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });
});
