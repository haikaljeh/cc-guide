// ── Page routing ──
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const progressBar = document.getElementById("progress-bar");

function getProgress(pageId) {
  const allPageIds = Array.from(navLinks).map(l => l.dataset.page);
  const index = allPageIds.indexOf(pageId);
  if (index === -1) return 0;
  return ((index + 1) / allPageIds.length) * 100;
}

function switchPage(pageId, updateHistory = true) {
  const currentActive = document.querySelector(".page.active");
  const target = document.getElementById(`page-${pageId}`);
  
  if (!target || currentActive === target) return;

  // 1. Immediate UI Feedback
  updateSidebarActive(pageId);
  if (progressBar) progressBar.style.width = `${getProgress(pageId)}%`;

  // 2. Update History
  if (updateHistory) {
    history.pushState({ pageId }, "", `#${pageId}`);
  }

  // 3. Transition logic
  if (currentActive) {
    currentActive.classList.remove("active");
    setTimeout(() => {
      currentActive.style.display = "none";
      target.style.display = "block";
      target.offsetHeight;
      target.classList.add("active");
    }, 250);
  } else {
    // Initial load
    pages.forEach(p => {
      p.style.display = "none";
      p.classList.remove("active");
    });
    target.style.display = "block";
    target.offsetHeight;
    target.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateSidebarActive(pageId) {
  navLinks.forEach((link) => {
    if (link.dataset.page === pageId) {
      link.classList.add("active");
      
      // Highlight parent section
      document.querySelectorAll(".nav-section-label").forEach(l => l.classList.remove("active-section"));
      let prev = link.parentElement.previousElementSibling;
      while (prev) {
        if (prev.classList.contains("nav-section-label")) {
          prev.classList.add("active-section");
          break;
        }
        prev = prev.previousElementSibling;
      }
    } else {
      link.classList.remove("active");
    }
  });
}

// ── Event Listeners ──

// Click on Nav Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    switchPage(link.dataset.page);
    document.getElementById("sidebar").classList.remove("open");
  });
});

// Handle Browser Back/Forward
window.addEventListener("popstate", (e) => {
  const pageId = e.state?.pageId || window.location.hash.slice(1) || "landing";
  switchPage(pageId, false);
});

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
  const pageId = window.location.hash.slice(1) || "landing";
  switchPage(pageId, false);
});

// ── Search Filter ──
const searchInput = document.getElementById("sidebar-search");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    navLinks.forEach(link => {
      const text = link.textContent.toLowerCase();
      const isVisible = text.includes(term);
      link.parentElement.style.display = isVisible ? "block" : "none";
    });
    
    // Hide section labels if no children are visible
    document.querySelectorAll(".nav-section-label").forEach(label => {
      let next = label.nextElementSibling;
      let hasVisibleChild = false;
      while (next && !next.classList.contains("nav-section-label")) {
        if (next.style.display !== "none") {
          hasVisibleChild = true;
          break;
        }
        next = next.nextElementSibling;
      }
      label.style.display = hasVisibleChild ? "block" : "none";
    });
  });
}

// ── Next Section Click Handler ──
document.addEventListener("click", (e) => {
  const nextBtn = e.target.closest(".next-section");
  if (nextBtn) {
    switchPage(nextBtn.dataset.next);
  }
});

// ── Copy buttons (icon-based) ──
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;

  const text = btn.dataset.copy;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add("copied");
    setTimeout(() => {
      btn.classList.remove("copied");
    }, 1500);
  });
});

// ── Mobile sidebar toggle ──
const toggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// ── Logo Click Handler (Go Home) ──
const logo = document.getElementById("logo");
if (logo) {
  logo.addEventListener("click", () => {
    switchPage("landing");
  });
}
