import { tools } from "./tools.js";
import { renderToolIllustration } from "./illustrations.js";

const imageTools = document.getElementById("image-tools");
const linkTools = document.getElementById("link-tools");

function renderToolCard(tool) {
  const status = tool.status === "aktif" ? "Aktif" : "Dalam pengembangan";
  const content = `
    <span class="tool-card-illustration" aria-hidden="true">${renderToolIllustration(tool.illustration)}</span>
    <div class="tool-card-content">
      <div class="tool-card-heading">
        <h3 class="tool-card-title">${tool.name}</h3>
        <span class="tool-status tool-status-${tool.status}">${status}</span>
      </div>
      <p class="tool-card-description">${tool.description}</p>
    </div>
  `;

  if (tool.status === "aktif") {
    return `<a class="tool-card tool-card-active" href="${tool.href}">${content}</a>`;
  }

  return `<article class="tool-card tool-card-development" aria-disabled="true">${content}</article>`;
}

imageTools.innerHTML = tools.filter((tool) => tool.group === "gambar").map(renderToolCard).join("");
linkTools.innerHTML = tools.filter((tool) => tool.group === "tautan").map(renderToolCard).join("");
