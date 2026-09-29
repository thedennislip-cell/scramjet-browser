function hire(url) {
  url = url.trim();
  if (!isUrl(url)) url = "https://www.duckduckgo.com/?q=" + encodeURIComponent(url);
  else if (!(url.startsWith("https://") || url.startsWith("http://")))
    url = "https://" + url;
  else if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      url
    )
  )
    url = "http://" + url;

  sessionStorage.setItem("encodedUrl", url);
  location.href = "!";
}

function isUrl(str = "") {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// The current static deployment does not provide the proxy route that hire()
// expects. Keep the address bar useful for ordinary browsing by opening a
// website or a search in a new tab instead of navigating to a blank route.
document.addEventListener("DOMContentLoaded", () => {
  const address = document.getElementById("proxy-address");
  if (!address) return;

  address.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const value = address.value.trim();
    if (!value) return;

    const destination = isUrl(value)
      ? (/^https?:\/\//i.test(value) ? value : "https://" + value)
      : "https://duckduckgo.com/?q=" + encodeURIComponent(value);

    window.open(destination, "_blank", "noopener,noreferrer");
  });
});
