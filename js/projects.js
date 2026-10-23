/* ==========================================================
   GRAISIX: centralized project data
   Add a new project by adding one object here. Every card,
   count, and detail page pulls from this single source.
   ========================================================== */
const PROJECTS = [
  {
    slug: "relay",
    name: "RELAY",
    category: "APPS",
    status: "IN PROGRESS",
    shortDescription: "Relay is a platform that connects businesses and job seekers through a simple job discovery and application experience.",
    fullDescription: "Relay is a platform that connects businesses and job seekers through a simple job discovery and application experience. Business owners can post job positions they are looking to fill. Job seekers can browse available positions and apply for jobs that match their interests and skills.",
    goals: [
      "Make it simple for businesses to post open positions.",
      "Make it simple for job seekers to discover and apply for relevant roles."
    ],
    features: [],
    futurePlans: "More details coming soon."
  },
  {
    slug: "marber-runner",
    name: "MARBER RUNNER",
    category: "GAMES",
    status: "IN PROGRESS",
    shortDescription: "Marber Runner is a game currently being developed by GRAISIX.",
    fullDescription: "Marber Runner is a game currently being developed by GRAISIX.",
    goals: [],
    features: [],
    futurePlans: "More details coming soon."
  },
  {
    slug: "gaming-console",
    name: "GAMING CONSOLE",
    category: "ROBOTICS",
    status: "IN DEVELOPMENT",
    shortDescription: "A GRAISIX hardware project exploring the development of a dedicated gaming console.",
    fullDescription: "A GRAISIX hardware project exploring the development of a dedicated gaming console.",
    goals: [],
    features: [],
    futurePlans: "Project details are currently being developed."
  },
  {
    slug: "desktop-buddy",
    name: "DESKTOP BUDDY",
    category: "ROBOTICS",
    status: "IN DEVELOPMENT",
    shortDescription: "A GRAISIX desktop companion project designed to bring an interactive hardware experience to the desktop.",
    fullDescription: "A GRAISIX desktop companion project designed to bring an interactive hardware experience to the desktop.",
    goals: [],
    features: [],
    futurePlans: "Project details are currently being developed."
  },
  {
    slug: "portable-music-system",
    name: "PORTABLE MUSIC SYSTEM",
    category: "ROBOTICS",
    status: "IN DEVELOPMENT",
    shortDescription: "A GRAISIX hardware project focused on creating a portable music system.",
    fullDescription: "A GRAISIX hardware project focused on creating a portable music system.",
    goals: [],
    features: [],
    futurePlans: "Project details are currently being developed."
  }
];

// Software: no announced projects yet. Kept out of PROJECTS on purpose.
const SOFTWARE_PLACEHOLDER = {
  name: "SOFTWARE",
  status: "COMING SOON",
  description: "New GRAISIX software projects are currently in development. More will be revealed soon."
};

const CATEGORY_ORDER = ["APPS", "GAMES", "ROBOTICS", "SOFTWARE"];

function statusClass(status){
  if(status === "IN PROGRESS") return "progress";
  if(status === "IN DEVELOPMENT") return "dev";
  return "soon";
}

function projectCardHTML(p){
  return `
  <div class="proj-card reveal">
    <div class="proj-visual"><span>${p.category}</span></div>
    <div class="proj-body">
      <div class="proj-top-row">
        <span class="proj-cat">${p.category}</span>
        <span class="status-badge ${statusClass(p.status)}">${p.status}</span>
      </div>
      <h3>${p.name}</h3>
      <p>${p.shortDescription}</p>
      <a class="proj-link" href="projects/${p.slug}.html" aria-label="View project: ${p.name}">View Project →</a>
    </div>
  </div>`;
}

function softwarePlaceholderHTML(){
  return `
  <div class="proj-card reveal">
    <div class="proj-visual"><span>SOFTWARE</span></div>
    <div class="proj-body">
      <div class="proj-top-row">
        <span class="proj-cat">SOFTWARE</span>
        <span class="status-badge soon">${SOFTWARE_PLACEHOLDER.status}</span>
      </div>
      <h3>${SOFTWARE_PLACEHOLDER.name}</h3>
      <p>${SOFTWARE_PLACEHOLDER.description}</p>
    </div>
  </div>`;
}

// Renders the grouped project sections on the homepage.
function renderProjectGrids(rootId){
  const root = document.getElementById(rootId);
  if(!root) return;
  CATEGORY_ORDER.forEach(cat => {
    const items = PROJECTS.filter(p => p.category === cat);
    const group = document.createElement("div");
    group.className = "project-category";
    group.id = "cat-" + cat.toLowerCase();
    group.innerHTML = `
      <div class="cat-head">
        <h3>${cat}</h3>
        <span class="cat-count">${cat === "SOFTWARE" ? "0 announced" : items.length + (items.length === 1 ? " project" : " projects")}</span>
      </div>
      <div class="projects-grid">
        ${cat === "SOFTWARE" ? softwarePlaceholderHTML() : items.map(projectCardHTML).join("")}
      </div>`;
    root.appendChild(group);
  });
}

// Renders a full project detail page into #project-detail, based on ?slug or data-slug.
function renderProjectDetail(slug){
  const p = PROJECTS.find(x => x.slug === slug);
  const root = document.getElementById("project-detail");
  if(!root || !p) return;

  document.title = p.name.replace(/(\w)(\w*)/g, (m,a,b) => a + b.toLowerCase()) + ": GRAISIX";

  const related = PROJECTS.filter(x => x.category === p.category && x.slug !== p.slug);

  root.innerHTML = `
    <section class="wrap project-hero">
      <a class="back-link" href="../index.html#projects">← Back to Projects</a>
      <div class="proj-top-row">
        <span class="proj-cat">${p.category}</span>
        <span class="status-badge ${statusClass(p.status)}">${p.status}</span>
      </div>
      <h1>${p.name}</h1>
      <p class="tagline-line">${p.shortDescription}</p>
      <div class="project-hero-visual" aria-hidden="true"><span>${p.name}: PROJECT VISUAL</span></div>
    </section>

    <section class="pd-section wrap">
      <h2>About the Project</h2>
      <p>${p.fullDescription}</p>
    </section>

    <section class="pd-section wrap pd-two-col">
      <div>
        <h2>Current Development Status</h2>
        <p><span class="status-badge ${statusClass(p.status)}">${p.status}</span></p>
      </div>
      <div>
        <h2>Project Goals</h2>
        ${p.goals.length ? `<ul class="goal-list">${p.goals.map(g => `<li>${g}</li>`).join("")}</ul>` : `<div class="placeholder-box">More details coming soon.</div>`}
      </div>
    </section>

    <section class="pd-section wrap">
      <h2>Key Features</h2>
      ${p.features.length ? `<ul class="goal-list">${p.features.map(f => `<li>${f}</li>`).join("")}</ul>` : `<div class="placeholder-box">Project details are currently being developed.</div>`}
    </section>

    <section class="pd-section wrap">
      <h2>Development Timeline</h2>
      <div class="placeholder-box">Development timeline coming soon.</div>
    </section>

    <section class="pd-section wrap">
      <h2>Future Plans</h2>
      <div class="placeholder-box">${p.futurePlans}</div>
    </section>

    ${related.length ? `
    <section class="pd-section wrap">
      <h2>Related Projects</h2>
      <div class="related-grid">${related.map(projectCardHTML).map(html => html.replace('href="projects/', 'href="')).join("")}</div>
    </section>` : ""}

    <section class="wrap" style="padding:50px 0 90px;">
      <a class="back-link" href="../index.html#projects">← Back to Projects</a>
    </section>
  `;
}

