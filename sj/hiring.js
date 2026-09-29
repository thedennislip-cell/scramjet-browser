function hire(value) {
  const input = value.trim();
  if (!input) return;

  // Treat text that isn't a web address as a normal web search.
  if (!isUrl(input)) {
    window.location.assign(
      "https://duckduckgo.com/?q=" + encodeURIComponent(input)
    );
    return;
  }

  // Add HTTPS when the user enters a domain without a protocol.
  const destination = /^https?:\/\//i.test(input)
    ? input
    : "https://" + input;

  window.location.assign(destination);
}

function isUrl(str = "") {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?"
      + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"
      + "((\\d{1,3}\\.){3}\\d{1,3}))"
      + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"
      + "(\\?[;&a-z\\d%_.~+=-]*)?"
      + "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(str);
}

// Connect the homepage address bar to Enter.
document.addEventListener("DOMContentLoaded", () => {
  const address = document.getElementById("proxy-address");
  if (!address) return;

  address.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    hire(address.value);
  });
});
