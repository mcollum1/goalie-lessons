/* ─────────────────────────────────────────────────────────────
   HockeyHub Goalie Coach — Service Worker
   Strategy:
     • App shell (HTML, JS, CSS, fonts) → Cache-first, update in background
     • Drill clips (MP4) → Cache-on-access (streamed, stored on first view)
     • Google API calls → Network-only (always live)
   ───────────────────────────────────────────────────────────── */

const CACHE_VERSION  = 'hh-goalie-v2';
const CLIP_CACHE     = 'hh-clips-v1';

// Files to pre-cache on install — the full app shell
const APP_SHELL = [
  '/',
  '/index.html',
  '/session.html',
  '/lesson_plan_preview_crease_positioning.html',
  '/drill-review.html',
  '/drill_library.js',
  '/manifest.json',
];

/* ── Install: cache app shell ────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // addAll fetches and caches; failures are silent per-file
      return Promise.allSettled(
        APP_SHELL.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: delete old caches ────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION && k !== CLIP_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: routing logic ───────────────────────────────── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Google APIs — always network-only (tokens, calendar data)
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('accounts.google.com') ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    return; // let browser handle it normally
  }

  // 2. Drill clips (MP4) — cache-on-access, serve from cache when offline
  if (url.pathname.includes('/drill-clips/') && request.destination === 'video') {
    event.respondWith(
      caches.open(CLIP_CACHE).then(async cache => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const resp = await fetch(request);
          if (resp.ok) cache.put(request, resp.clone());
          return resp;
        } catch {
          return new Response('', { status: 503, statusText: 'Offline' });
        }
      })
    );
    return;
  }

  // 3. App shell and other same-origin assets — cache-first, network fallback
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        // Return cache immediately, then update in background
        const networkFetch = fetch(request).then(resp => {
          if (resp.ok) {
            caches.open(CACHE_VERSION).then(cache => cache.put(request, resp.clone()));
          }
          return resp;
        }).catch(() => cached); // if network fails, cached is the fallback

        return cached || networkFetch;
      })
    );
  }
});
