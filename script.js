// Inicializa o mapa
    var map = L.map('map').setView([-14.235, -51.925], 4); // Brasil

    // Adiciona camada do mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Exemplo de pontos (latitude, longitude, nome)
    var organizacoes = [
      { nome: "Instituto APAE São Paulo", lat: -23.5505, lng: -46.6333 },
      { nome: "Associação Pestalozzi Rio de Janeiro", lat: -22.9068, lng: -43.1729 }
    ];

    // Adiciona marcadores no mapa
    organizacoes.forEach(org => {
      L.marker([org.lat, org.lng])
        .addTo(map)
        .bindPopup(`<b>${org.nome}</b>`);
    });