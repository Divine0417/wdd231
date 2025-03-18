const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const filterButtons = document.querySelector('#filters'); // Container for filter buttons

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  allProphets = data.prophets; // Store all prophets globally for filtering
  displayProphets(allProphets);
  createFilterButtons(); // Initialize filter buttons
}

const displayProphets = (prophets) => {
  cards.innerHTML = ''; // Clear previous content before rendering
  prophets.forEach((prophet, index) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname} – ${index + 1}th Latter-day President`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute(
      'alt',
      `Portrait of ${prophet.name} ${prophet.lastname} – ${index + 1}th Latter-day President`
    );
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
};

// Filter functions
const filterProphets = (criteria) => {
  let filteredProphets = allProphets.filter(criteria);
  displayProphets(filteredProphets);
};

// Create filter buttons dynamically
const createFilterButtons = () => {
  const filters = [
    { text: 'Born in Utah', condition: (p) => p.birthplace.includes('Utah') },
    { text: 'Born outside the U.S.', condition: (p) => !p.birthplace.includes('United States') },
    { text: 'Lived to 95+', condition: (p) => p.death && (p.death - p.birthdate.split('-')[0] >= 95) },
    { text: 'Had 10+ children', condition: (p) => p.numofchildren >= 10 },
    { text: 'Served 15+ years as President', condition: (p) => p.length !== 'N/A' && parseInt(p.length) >= 15 }
  ];

  filters.forEach(({ text, condition }) => {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', () => filterProphets(condition));
    filterButtons.appendChild(button);
  });

  // Add a reset button
  let resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Filters';
  resetButton.addEventListener('click', () => displayProphets(allProphets));
  filterButtons.appendChild(resetButton);
};

let allProphets = []; // Global variable to store all prophets

getProphetData();
