document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("urlInput");
  const shortenButton = document.getElementById("shortenButton");
  const shortUrl = document.getElementById("shortUrl");

  shortenButton.addEventListener("click", async () => {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlInput.value }),
    });

    if (response.ok) {
      const data = await response.json();
      shortUrl.textContent = `Shortened URL: ${data.shortUrl}`;
    } else {
      shortUrl.textContent = "Error shortening URL.";
    }
  });
});
