// Nome do cache (mude a versão se alterar arquivos no futuro)
const CACHE_NAME = 'almoxavic-cache-v1';

// Arquivos que o app vai salvar no celular para rodar rápido e offline
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Evento de Instalação: Salva as páginas essenciais no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Almoxavic: Guardando arquivos essenciais no cache...');
      return cache.addAll(assets);
    })
  );
});

// Evento de Ativação: Limpa caches antigos de versões anteriores
self.addEventListener('activate', event => {
  console.log('Almoxavic: Service Worker ativo com sucesso!');
});

// Evento de Fetch: Intercepta os acessos para carregar do cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Retorna o arquivo do cache se existir; se não, busca na internet normal
      return cachedResponse || fetch(event.request);
    })
  );
});