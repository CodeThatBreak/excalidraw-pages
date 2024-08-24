const FONTS = [
  "Assistant-Bold",
  "Assitant-Medium",
  "Assitant-Regular",
  "Assitant-SemiBold",
  "CascadiaCode-Regular",
  "ComicShanns-Regular",
  "Excalifont-Regular",
  "LiberationSans-Regular",
  "Virgil-Regular",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  const isFontRequest = url.includes(".woff2");

  if (isFontRequest) {
    const fontName = FONTS.find((font) => url.includes(font));

    if (fontName) {
      event.respondWith(
        fetch(`fonts/assets/${fontName}.woff2`, {
          headers: {
            accept: "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "cache-control": "no-cache",
          },
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "omit",
        })
      );
    }
  }
});
