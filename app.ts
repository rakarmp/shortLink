// Import modul yang diperlukan
import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { nanoid } from "https://deno.land/x/nanoid/mod.ts";

// Inisialisasi aplikasi Oak
const app = new Application();
const router = new Router();

// Daftar URL yang dipendekkan
const urlDatabase: Record<string, string> = {};

// Menangani permintaan untuk berkas statis (HTML dan CSS)
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});

// Menangani permintaan untuk pemendekan URL
router.post("/shorten", async (context) => {
  const data = await context.request.body().value;
  const originalUrl = data.url;

  const shortId = nanoid(7); // Generate ID pendek dengan panjang 7 karakter
  urlDatabase[shortId] = originalUrl;

  context.response.body = {
    shortUrl: `https://able-worm-91.deno.dev/${shortId}`,
  };
});

router.get("/:shortId", async (context) => {
  const shortId = context.params.shortId;
  const originalUrl = urlDatabase[shortId];

  if (originalUrl) {
    context.response.redirect(originalUrl);
  } else {
    context.response.body = "URL not found.";
  }
});

// Terapkan router ke aplikasi
app.use(router.routes());
app.use(router.allowedMethods());

// Jalankan server
console.log("Server is running on https://able-worm-91.deno.dev");
await app.listen({ port: 8000 });
