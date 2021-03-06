export const createElementFromHTML = (htmlString) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

export const removeContent = (element) => {
  const tmpContent = document.querySelector(".tmp-content");
  if (tmpContent){  tmpContent.remove();  }  
};

export const ucFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
