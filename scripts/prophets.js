const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const filterButtons = document.querySelectorAll('.filter-btn');

async function getProphetData() {
    const response = await fetch(url);
    const { prophets } = await response.json();
    prophets.forEach(prophet => {
        prophet.age = calculateAge(prophet.birthdate, prophet.death);
    });
    displayProphets(prophets);
    setupFilters(prophets);
}

const calculateAge = (birthdate, deathdate) => {
    const birth = new Date(birthdate);
    const death = deathdate ? new Date(deathdate) : new Date();
    return death.getFullYear() - birth.getFullYear() - (death < new Date(birth.setFullYear(death.getFullYear())) ? 1 : 0);
};

const displayProphets = (prophets) => {
    cards.innerHTML = prophets.map((prophet, index) => `
        <section class="prophet-card">
            <h2>${prophet.name} ${prophet.lastname} – ${index + 1}th Latter-day President</h2>
            <img src="${prophet.imageurl}" alt="Portrait of ${prophet.name} ${prophet.lastname}" loading="lazy" width="340" height="440">
            <div class="prophet-details">
                <p><strong>Birth:</strong> ${prophet.birthdate}</p>
                <p><strong>Place:</strong> ${prophet.birthplace}</p>
                <p><strong>Children:</strong> ${prophet.numofchildren}</p>
                <p><strong>Prophet Years:</strong> ${prophet.length}</p>
                <p><strong>Death:</strong> ${prophet.death || "Still Living"}</p>
                <p><strong>Age:</strong> ${prophet.age}</p>
            </div>
        </section>
    `).join('');
};

const setupFilters = (prophets) => {
    const filters = {
        "utah-born": p => p.birthplace.includes("Utah"),
        "outside-us": p => !p.birthplace.includes("United States"),
        "lived-95": p => p.age >= 95,
        "large-family": p => p.numofchildren >= 10,
        "long-presidency": p => p.length >= 15,
        "all": () => true
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filter;
            displayProphets(prophets.filter(filters[filterType]));
        });
    });
};

getProphetData();
