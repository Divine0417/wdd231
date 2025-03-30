async function fetchData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data, 'grid'); // Default to grid view
  }

  function displayMembers(data, view) {
    const container = document.querySelector('.members-container');
    container.className = `members-container ${view}`; // Switch view class
    container.innerHTML = ''; // Clear existing content
    data.forEach(member => {
      const memberDiv = document.createElement('div');
      memberDiv.className = 'member';
      memberDiv.innerHTML = `
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <img src="${member.image}" alt="${member.name}">
      `;
      container.appendChild(memberDiv);
    });
  }

  document.getElementById('gridView').addEventListener('click', () => {
    fetchData().then(data => displayMembers(data, 'grid'));
  });
  
  document.getElementById('listView').addEventListener('click', () => {
    fetchData().then(data => displayMembers(data, 'list'));
  });
  