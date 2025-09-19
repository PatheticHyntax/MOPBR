// Inicializa o mapa
const map = L.map('map').setView([-14.235, -51.925], 4); // Brasil

// Adiciona camada do mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Dados das organizações
const organizacoes = [
  { nome: "APAE – Distrito Federal", lat: -23.5611, lng: -46.6833, cidade: "Brasília", estado: "DF", telefone: "(61) 2101-0460 / (61) 9 9338-9242", email: "apaedf@apaedf.org.br", tipo: "Associação sem fins lucrativos / associação de pais e amigos dos excepcionais", regiao: "Centro-Oeste" },
  { nome: "Associação Desportiva para Deficientes", lat: -23.65997, lng: -46.64466, cidade: "São Paulo", estado: "SP", telefone: "(11) 5011-6133", email: "voluntario@add.org.br", tipo: "ONG", regiao: "Sudeste" },
  { nome: "Associação dos Deficientes Visuais de Rondônia", lat: -8.7608, lng: -63.9026, cidade: "Porto Velho", estado: "RO", telefone: "(69) 3224-4071", email: "asdevron@asdevron.org.br", tipo: "Associação sem fins lucrativos", regiao: "Norte" },
  { nome: "Associação dos Deficientes Visuais do Estado do Rio de Janeiro", lat: -22.9243, lng: -43.1790, cidade: "Rio de Janeiro", estado: "RJ", telefone: "(21) 4126-9347", email: "adverj@adverj.org.br", tipo: "Associação sem fins lucrativos", regiao: "Sudeste" },
  { nome: "Fundação Dorina Nowill para Cegos", lat: -23.597960, lng: -46.643878, cidade: "São Paulo", estado: "SP", telefone: "(11) 5087-0999", email: "atendimento@fundacaodorina.org.br", tipo: "Fundaçaõ filantrópica e sem fins lucrativos", regiao: "Sudeste" },
  { nome: "Instituto Brasileiro dos Direitos da Pessoa com Deficiência", lat: -22.92487, lng: -43.17866, cidade: "Rio de Janeiro", estado: "RJ", telefone: "(21) 3235-9290", email: "ibdd@ibdd.org.br", tipo: "ONG", regiao: "Sudeste" },
  { nome: "Instituto Mara Gabrilli", lat: -23.542456, lng: -46.671372, cidade: "São Paulo", estado: "SP", telefone: "Não fornecido", email: "Não fornecido", tipo: "ONG", regiao: "Sudeste" },
  { nome: "Instituto Rodrigo Mendes", lat: -23.584, lng: -46.7221, cidade: "São Paulo", estado: "SP", telefone: "(11) 3726-8418", email: "adm@rm.org.br", tipo: "Organização sem fins lucrativos / associação privada", regiao: "Sudeste" },
].sort((a, b) => a.nome.localeCompare(b.nome));

const colors = {
  'Sudeste': '#724a97ff', // Violeta
  'Norte': '#008000',     // Verde
  'Centro-Oeste': '#ceb549ff', // Amarelo
  'Nordeste': '#c57c38ff', // Laranja
  'Sul': '#b13333ff',    // Vermelho
  'Default': '#3e3e99ff' // Azul
};

// Cria marcadores e armazena em array
const marcadores = organizacoes.map(org => {
  // Escolhe uma cor baseada na região (exemplo simples)
  let markerColor = 'blue';
  switch (org.regiao) {
    case 'Sudeste': markerColor = 'violet'; break;
    case 'Norte': markerColor = 'green'; break;
    case 'Centro-Oeste': markerColor = 'yellow'; break;
    case 'Nordeste': markerColor = 'orange'; break;
    case 'Sul': markerColor = 'red'; break;
    default: markerColor = 'blue';
  }

  // Usa o ícone colorido do Leaflet
  const icon = L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${markerColor}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const marker = L.marker([org.lat, org.lng], { icon })
    .bindPopup(`<b>${org.nome}</b><br>Cidade: ${org.cidade}<br>Estado: ${org.estado}<br>Telefone: ${org.telefone}<br>Email: ${org.email}<br>Tipo: ${org.tipo}`);
  marker.addTo(map);

  return { marker, org };
});

// Lista as associações na barra lateral
const orgList = document.getElementById('organizationList');
organizacoes.forEach(org => {
  const li = document.createElement('li');
  li.textContent = org.nome;
  li.style.cursor = 'pointer';

  // Define a cor do texto conforme a cor do marcador
  let bgColor = 'blue';
  switch (org.regiao) {
    case 'Sudeste': bgColor = '#724a97ff'; break;
    case 'Norte': bgColor = '#008000'; break;
    case 'Centro-Oeste': bgColor = '#ceb549ff'; break;
    case 'Nordeste': bgColor = '#c57c38ff'; break;
    case 'Sul': bgColor = '#b13333ff'; break;
    default: bgColor = '#3e3e99ff';
  }
  li.style.backgroundColor = bgColor;

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
      li.style.backgroundColor = colors[org.regiao] || colors['Default'];
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

