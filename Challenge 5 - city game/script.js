const map = L.map('map').setView([50.8503, 4.3517], 8); // Centraal in België

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const locations = [
    { lat: 50.8503, lng: 4.3517, name: 'Brussel', challenge: 'Wat is de bekendste bezienswaardigheid in Brussel?' },
    { lat: 51.2194, lng: 4.4025, name: 'Antwerpen', challenge: 'Welke bekende Belgische schilder komt uit Antwerpen?' },
    { lat: 51.0543, lng: 3.7174, name: 'Gent', challenge: 'Wat is de naam van het beroemde kasteel in Gent?' },
    { lat: 51.2093, lng: 3.2247, name: 'Brugge', challenge: 'Welke beroemde markt vind je in Brugge?' },
    { lat: 50.6326, lng: 5.5797, name: 'Luik', challenge: 'Wat is de naam van het beroemde station in Luik?' }
];

locations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map)
        .bindPopup(`${loc.name}: ${loc.challenge}`);
});

function showChallenge(location) {
    const challengeDiv = document.getElementById('challenge');
    const challengeText = document.getElementById('challenge-text');
    const challengeAnswer = document.getElementById('challenge-answer');
    challengeText.textContent = location.challenge;
    challengeAnswer.value = '';
    challengeDiv.style.display = 'block';

    const challengeSubmit = document.getElementById('challenge-submit');
    challengeSubmit.onclick = () => {
        const userAnswer = challengeAnswer.value.trim().toLowerCase();
        const correctAnswers = {
            'Wat is de bekendste bezienswaardigheid in Brussel?': ['atomium', 'manneken pis'],
            'Welke bekende Belgische schilder komt uit Antwerpen?': ['peter paul rubens', 'rubens'],
            'Wat is de naam van het beroemde kasteel in Gent?': ['gravensteen'],
            'Welke beroemde markt vind je in Brugge?': ['grote markt', 'markt'],
            'Wat is de naam van het beroemde station in Luik?': ['guillemins', 'station guillemins']
        };

        if (correctAnswers[location.challenge].includes(userAnswer)) {
            alert('Correct!');
            localStorage.setItem(location.challenge, 'completed');
        } else {
            alert('Incorrect. Probeer het opnieuw!');
        }
        challengeDiv.style.display = 'none';
    };

    const challengeSkip = document.getElementById('challenge-skip');
    challengeSkip.onclick = () => {
        challengeDiv.style.display = 'none';
    };
}

function addLocationButtons() {
    const buttonsDiv = document.getElementById('location-buttons');
    locations.forEach((loc, index) => {
        const button = document.createElement('button');
        button.className = 'location-button';
        button.textContent = `Ga naar ${loc.name}`;
        button.onclick = () => {
            map.setView([loc.lat, loc.lng], 13);
            if (!localStorage.getItem(loc.challenge)) {
                showChallenge(loc);
            } else {
                alert('Je hebt deze uitdaging al voltooid!');
            }
        };
        buttonsDiv.appendChild(button);
    });
}

addLocationButtons();