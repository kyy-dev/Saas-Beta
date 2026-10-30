import { validateImageFile } from "./file-validation.js";
import { createPdf } from "./image-to-pdf.js";

const fileInput = document.getElementById("image-file");
const dropzone = document.getElementById("dropzone");
const previewFrame = document.getElementById("image-preview-frame");
const preview = document.getElementById("image-preview");
const previewError = document.getElementById("image-preview-error");
const fileStatus = document.getElementById("file-status");
const replaceButton = document.getElementById("replace-file");
const removeButton = document.getElementById("remove-file");
const processButton = document.getElementById("process-button");
const actionNote = document.getElementById("action-note");
const resultPanel = document.getElementById("result-panel");
const resultMessage = document.getElementById("result-message");
const downloadLink = document.getElementById("download-link");
const toolInputs = document.querySelectorAll('input[name="tool"]');

let currentFile = null;
let previewUrl = null;
let resultBlob = null;
let resultUrl = null;
let selectedTool = "";
let isProcessing = false;
let statusState = "empty";

function setFileStatus(message, state = "ready") {
  statusState = state;
  fileStatus.textContent = message;
  fileStatus.dataset.state = state;
  dropzone.dataset.state = state;
}

function clearResult() {
  resultBlob = null;
  if (resultUrl) {
    URL.revokeObjectURL(resultUrl);
    resultUrl = null;
  }
  resultPanel.hidden = true;
  resultPanel.dataset.state = "empty";
  downloadLink.hidden = true;
  downloadLink.removeAttribute("href");
}

function updateAction() {
  const readyToConvert = currentFile && selectedTool === "pdf" && !isProcessing;
  const backgroundUnavailable = selectedTool === "background";

  processButton.disabled = !readyToConvert || Boolean(resultBlob);
  processButton.textContent = isProcessing
    ? "Membuat PDF..."
    : resultBlob
      ? "PDF selesai"
      : selectedTool === "pdf"
        ? "Buat PDF"
        : backgroundUnavailable
          ? "Layanan belum tersedia"
          : "Pilih pekerjaan";

  actionNote.textContent = backgroundUnavailable
    ? "Penghapusan background belum aktif karena layanan pemrosesan belum terhubung."
    : "File tetap di perangkat saat dikonversi ke PDF.";
}

function clearPreview() {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  preview.removeAttribute("src");
  preview.hidden = true;
  previewError.hidden = true;
  previewFrame.hidden = true;
  previewFrame.classList.remove("has-error");
  dropzone.classList.remove("has-preview");
}

function acceptFile(file) {
  if (!file) return;

  clearResult();
  const validationError = validateImageFile(file);
  if (validationError) {
    currentFile = null;
    clearPreview();
    replaceButton.hidden = true;
    removeButton.hidden = true;
    fileInput.value = "";
    setFileStatus(validationError, "error");
    updateAction();
    return;
  }

  currentFile = file;
  clearPreview();
  previewUrl = URL.createObjectURL(file);
  preview.src = previewUrl;
  preview.alt = `Pratinjau ${file.name}`;
  preview.hidden = false;
  previewFrame.hidden = false;
  dropzone.classList.add("has-preview");
  replaceButton.hidden = false;
  removeButton.hidden = false;
  fileInput.value = "";
  setFileStatus(`${file.name} siap. Pilih pekerjaan untuk melanjutkan.`);
  updateAction();
}

function removeFile() {
  currentFile = null;
  clearPreview();
  clearResult();
  replaceButton.hidden = true;
  removeButton.hidden = true;
  fileInput.value = "";
  setFileStatus("Belum ada gambar. Pilih file untuk memulai.", "empty");
  updateAction();
}

preview.addEventListener("error", () => {
  if (!previewUrl || preview.currentSrc !== previewUrl) return;
  currentFile = null;
  clearPreview();
  previewFrame.hidden = false;
  previewFrame.classList.add("has-error");
  previewError.hidden = false;
  replaceButton.hidden = true;
  removeButton.hidden = true;
  clearResult();
  setFileStatus("Gambar tidak dapat dibaca. Pilih file gambar lain.", "error");
  updateAction();
});

function downloadPdf() {
  if (!resultBlob) return;
  const url = URL.createObjectURL(resultBlob);
  const link = document.createElement("a");
  const baseName = currentFile.name.replace(/\.[^.]+$/, "") || "pixelshift";
  link.href = url;
  link.download = `${baseName}.pdf`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function processImage() {
  if (resultBlob) {
    downloadPdf();
    return;
  }
  if (!currentFile || selectedTool !== "pdf" || isProcessing) return;

  isProcessing = true;
  statusState = "loading";
  setFileStatus("Membuat PDF dari gambar di browser...", statusState);
  resultPanel.hidden = false;
  resultPanel.dataset.state = statusState;
  resultMessage.textContent = "Menyiapkan halaman PDF.";
  downloadLink.hidden = true;
  updateAction();

  try {
    resultBlob = await createPdf(currentFile);
    resultPanel.dataset.state = "success";
    resultMessage.textContent = "PDF siap diunduh. File asli tetap berada di perangkat.";
    downloadLink.hidden = false;
    resultUrl = URL.createObjectURL(resultBlob);
    downloadLink.href = resultUrl;
    downloadLink.download = `${currentFile.name.replace(/\.[^.]+$/, "") || "pixelshift"}.pdf`;
    setFileStatus(`${currentFile.name} berhasil dikonversi ke PDF.`, "success");
  } catch (error) {
    resultBlob = null;
    resultPanel.dataset.state = "error";
    resultMessage.textContent =
      error instanceof Error
        ? `PDF gagal dibuat. ${error.message} Coba gambar lain atau ulangi.`
        : "PDF gagal dibuat. Coba gambar lain atau ulangi.";
    setFileStatus("Konversi gagal. Gambar masih tersedia untuk dicoba kembali.", "error");
  } finally {
    isProcessing = false;
    updateAction();
  }
}

fileInput.addEventListener("change", () => acceptFile(fileInput.files[0]));
replaceButton.addEventListener("click", () => fileInput.click());
removeButton.addEventListener("click", removeFile);
processButton.addEventListener("click", processImage);

toolInputs.forEach((input) => {
  input.addEventListener("change", () => {
    selectedTool = input.value;
    clearResult();
    if (currentFile) {
      if (selectedTool === "background") {
        setFileStatus("Penghapusan background belum tersedia karena layanannya belum terhubung.", "notice");
      } else {
        setFileStatus(`${currentFile.name} siap dikonversi ke PDF.`);
      }
    }
    updateAction();
  });
});

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropzone.dataset.state = "dragging";
});

dropzone.addEventListener("dragleave", (event) => {
  if (!dropzone.contains(event.relatedTarget)) {
    dropzone.dataset.state = currentFile ? statusState : "empty";
  }
});

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.dataset.state = currentFile ? statusState : "empty";
  acceptFile(event.dataTransfer.files[0]);
});

window.addEventListener("beforeunload", () => {
  clearPreview();
  if (resultUrl) URL.revokeObjectURL(resultUrl);
});
