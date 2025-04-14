document.addEventListener('DOMContentLoaded', () => {
    loadCards();
    displayVisitMessage();
    document.getElementById('year').textContent = new Date().getFullYear();
  });
  
  async function loadCards() {
    const response = await fetch('data/discover.json');
    const data = await response.json();
    const container = document.getElementById('discoverGrid');
  
    data.forEach((item, index) => {
      const card = document.createElement('section');
      card.classList.add('card');
      card.style.gridArea = `card${index + 1}`;
      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.alt}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button onclick="window.open('${item.url}', '_blank')">Learn More</button>
      `;
      container.appendChild(card);
    });
  }
  
  function displayVisitMessage() {
    const messageContainer = document.getElementById('visitorMessage');
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    let message = "Welcome! Let us know if you have any questions.";
  
    if (lastVisit) {
      const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
      if (days === 0) {
        message = "Back so soon! Awesome!";
      } else if (days === 1) {
        message = "You last visited 1 day ago.";
      } else {
        message = `You last visited ${days} days ago.`;
      }
    }
  
    localStorage.setItem('lastVisit', now);
    messageContainer.textContent = message;
  }
