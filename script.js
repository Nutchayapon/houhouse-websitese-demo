const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");
const roleSummary = document.querySelector(".role-summary");
const memberGrid = document.querySelector(".member-grid");
const trackForm = document.querySelector(".track-form");
const trackResult = document.querySelector(".track-result");

const people = [
  {
    name: "Professor Seraphine Rowe",
    role: "Teacher",
    title: "Lead Instructor",
    image: "assets/head.svg",
    alt: "Professor Seraphine Rowe portrait",
  },
  {
    name: "Mira Solene",
    role: "TA",
    title: "Creative Lab Assistant",
    image: "assets/member-2.svg",
    alt: "Mira Solene portrait",
  },
  {
    name: "Arin Valtor",
    role: "Member",
    title: "Frontend Explorer",
    image: "assets/member-1.svg",
    alt: "Arin Valtor portrait",
  },
  {
    name: "Tarin Vale",
    role: "Member",
    title: "Data Apprentice",
    image: "assets/member-3.svg",
    alt: "Tarin Vale portrait",
  },
  {
    name: "Luna Maris",
    role: "Member",
    title: "Design Storyteller",
    image: "assets/member-4.svg",
    alt: "Luna Maris portrait",
  },
];

const trackDetails = {
  dev: {
    label: "Dev",
    summary: "You are strongest in building structured, useful systems.",
    nextStep: "Recommended focus: HTML/CSS, JavaScript, APIs, Git, and deployment workflows.",
  },
  creative: {
    label: "Creative",
    summary: "You are strongest in visual direction, storytelling, and user experience.",
    nextStep: "Recommended focus: UI design, content, branding, motion, and creative prototyping.",
  },
  ml: {
    label: "ML and DL",
    summary: "You are strongest in data-driven thinking, experiments, and model behavior.",
    nextStep: "Recommended focus: Python, statistics, machine learning, deep learning, and evaluation.",
  },
};

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      menuLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => observer.observe(section));

function renderPeople() {
  const counts = people.reduce(
    (total, person) => {
      total[person.role] += 1;
      return total;
    },
    { Teacher: 0, TA: 0, Member: 0 }
  );

  roleSummary.innerHTML = `
    <div><span>Teachers</span><strong>${counts.Teacher}</strong></div>
    <div><span>TAs</span><strong>${counts.TA}</strong></div>
    <div><span>Members</span><strong>${counts.Member}</strong></div>
  `;

  memberGrid.innerHTML = people
    .map(
      (person) => `
        <article class="member-card" data-role="${person.role}">
          <img src="${person.image}" alt="${person.alt}" />
          <div class="member-meta">
            <span class="role-badge">${person.role}</span>
            <h3>${person.name}</h3>
            <p>${person.title}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function classifyTrack(formData) {
  const scores = { dev: 0, creative: 0, ml: 0 };
  formData.forEach((value) => {
    scores[value] += 1;
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

trackForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(trackForm);
  const selectedValues = [...formData.values()];
  const trackKey = classifyTrack(selectedValues);
  const track = trackDetails[trackKey];

  trackResult.innerHTML = `
    <span class="result-label">Recommended Track</span>
    <h3>${track.label}</h3>
    <p>${track.summary}</p>
    <p>${track.nextStep}</p>
  `;
});

renderPeople();
