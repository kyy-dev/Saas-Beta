const supportedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maximumFileSize = 15 * 1024 * 1024;

export function validateImageFile(file) {
  if (!supportedTypes.has(file.type)) {
    return "Format tidak didukung. Pilih JPG, PNG, atau WebP.";
  }

  if (file.size > maximumFileSize) {
    return "File melebihi 15 MB. Pilih gambar yang lebih kecil.";
  }

  return null;
}
