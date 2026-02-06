// Client form submission
document.getElementById('client-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('client-name').value;
    const address = document.getElementById('client-address').value;
    const phone = document.getElementById('deb-phone').value;
    // Open WhatsApp for payment
    const whatsappMessage = `Paiement des frais du site 500F pour ${name}. Adresse: ${address}. Téléphone: ${phone}`;
    window.open(`https://wa.me/062635548?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    // Store the request
    const requests = JSON.parse(localStorage.getItem('clientRequests')) || [];
    requests.push({ name, address, phone, id: Date.now() });
    localStorage.setItem('clientRequests', JSON.stringify(requests));
    // Clear form
    this.reset();
    // Update requests display
    displayClientRequests();
});

// Debrousseur form submission
document.getElementById('debrousseur-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('deb-name').value;
    const email = document.getElementById('deb-email').value;
    const phone = document.getElementById('deb-phone').value;
    // Simulate registration
    const messageDiv = document.getElementById('deb-message');
    messageDiv.innerHTML = `<p style="color: green;">Inscription réussie pour ${name}. Vous paierez 10% (50F) sur chaque commande acceptée.</p>`;
    messageDiv.classList.add('show');
    // Clear form
    this.reset();
});

// Function to display client requests
function displayClientRequests() {
    const requests = JSON.parse(localStorage.getItem('clientRequests')) || [];
    const container = document.getElementById('client-requests');
    container.innerHTML = '<h3>Demandes Clients</h3>';
    if (requests.length === 0) {
        container.innerHTML += '<p>Aucune demande pour le moment.</p>';
        return;
    }
    requests.forEach(request => {
        const item = document.createElement('div');
        item.className = 'request-item';
        item.innerHTML = `
            <p><strong>Nom:</strong> ${request.name}</p>
            <p><strong>Adresse:</strong> ${request.address}</p>
            <p><strong>Téléphone:</strong> ${request.phone}</p>
            <button onclick="acceptRequest(${request.id})">Accepter et payer 10% (50F)</button>
        `;
        container.appendChild(item);
    });
}

// Function to accept a request and simulate payment
function acceptRequest(id) {
    const requests = JSON.parse(localStorage.getItem('clientRequests')) || [];
    const request = requests.find(r => r.id === id);
    if (request) {
        // Open WhatsApp for 10% payment
        const whatsappMessage = `Paiement des 10% (50F) pour la commande de ${request.name}. Adresse: ${request.address}. Téléphone: ${request.phone}`;
        window.open(`https://wa.me/062635548?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        // Remove the request from storage
        const updatedRequests = requests.filter(r => r.id !== id);
        localStorage.setItem('clientRequests', JSON.stringify(updatedRequests));
        // Update display
        displayClientRequests();
    }
}

// Load requests on page load
document.addEventListener('DOMContentLoaded', displayClientRequests);
