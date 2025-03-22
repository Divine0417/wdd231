document.querySelector(".more-button").addEventListener("click", function(event) {
    event.stopPropagation();
    document.querySelector(".more-nav").classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    let dropdown = document.querySelector(".more-nav");
    if (!event.target.closest(".more")) {
        dropdown.classList.remove("show");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById("currentyear").textContent = currentYear;
    document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const ariaExpanded = navMenu.classList.contains('active') ? 'true' : 'false';
      navMenu.setAttribute('aria-expanded', ariaExpanded);
    });
  });
  