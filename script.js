// Inicializa o mapa
const map = L.map('map').setView([-14.235, -51.925], 4); // Brasil

// Adiciona camada do mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Dados das organizações
const organizacoes = [
  { nome: "Instituto Mara Gabrilli", lat: -23.542456, lng: -46.671372, cidade: "São Paulo", estado: "SP", telefone: "Não fornecido", email: "Não fornecido", tipo: "ONG" },
  { nome: "Fundação Dorina Nowill para Cegos", lat: -23.597960, lng: -46.643878, cidade: "São Paulo", estado: "SP", telefone: "(11) 5087-0999", email: "atendimento@fundacaodorina.org.br", tipo: "Fundaçaõ filantrópica e sem fins lucrativos" },
  { nome: "Associação Desportiva para Deficientes", lat: -23.65997, lng: -46.64466, cidade: "São Paulo", estado: "SP", telefone: "(11) 5011-6133", email: "voluntario@add.org.br", tipo: "ONG" },
  { nome: "Instituto Brasileiro dos Direitos da Pessoa com Deficiência", lat: -22.92487, lng: -43.17866, cidade: "Rio de Janeiro", estado: "RJ", telefone: "(21) 3235-9290", email: "ibdd@ibdd.org.br", tipo: "ONG" },
];

// Cria marcadores e armazena em array
const marcadores = organizacoes.map(org => {
  const marker = L.marker([org.lat, org.lng])
    .bindPopup(`<b>${org.nome}</b><br>Cidade: ${org.cidade}<br>Estado: ${org.estado}<br>Telefone: ${org.telefone}<br>Email: ${org.email}<br>Tipo: ${org.tipo}`);
  marker.addTo(map);

  return { marker, org };
});

// Lista as organizações na barra lateral
const orgList = document.getElementById('organizationList');
organizacoes.forEach(org => {
  const li = document.createElement('li');
  li.textContent = org.nome;
  li.style.cursor = 'pointer';
  li.addEventListener('click', () => {
    map.setView([org.lat, org.lng], 12);
  });
  orgList.appendChild(li);
});

// Função para filtrar e mostrar/ocultar marcadores e atualizar a lista
function buscarOrganizacoes(termo) {
  const termoLower = termo.toLowerCase();
  // Limpa a lista atual
  orgList.innerHTML = '';

  marcadores.forEach(({ marker, org }) => {
    const match =
      org.nome.toLowerCase().includes(termoLower) ||
      org.cidade.toLowerCase().includes(termoLower) ||
      org.estado.toLowerCase().includes(termoLower);

    if (match || !termo) {
      marker.addTo(map);

      // Adiciona à lista apenas se corresponder ao filtro
      const li = document.createElement('li');
      li.textContent = org.nome;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        map.setView([org.lat, org.lng], 12);
      });
      orgList.appendChild(li);
    } else {
      map.removeLayer(marker);
    }
  });
}

// Evento de busca (input e botão)
document.getElementById('searchInput').addEventListener('input', function () {
  buscarOrganizacoes(this.value);
});
document.getElementById('filterButton').addEventListener('click', function () {
  const termo = document.getElementById('typeFilter').value;
  buscarOrganizacoes(termo);
});

// Inicializa com todas as organizações
buscarOrganizacoes('');

