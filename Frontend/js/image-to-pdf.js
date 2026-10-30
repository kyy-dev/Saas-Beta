function concatenateBytes(chunks) {
  const totalLength = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const output = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function createPdfBytes(jpegBytes, width, height) {
  const encoder = new TextEncoder();
  const objects = [
    encoder.encode("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"),
    encoder.encode("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"),
    encoder.encode(
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] ` +
      "/Resources << /XObject << /Image 4 0 R >> >> /Contents 5 0 R >>\nendobj\n"
    ),
    concatenateBytes([
      encoder.encode(
        `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ` +
        `/Length ${jpegBytes.length} >>\nstream\n`
      ),
      jpegBytes,
      encoder.encode("\nendstream\nendobj\n")
    ]),
    encoder.encode(
      `5 0 obj\n<< /Length ${encoder.encode(
        `q\n${width} 0 0 ${height} 0 0 cm\n/Image Do\nQ\n`
      ).length} >>\nstream\nq\n${width} 0 0 ${height} 0 0 cm\n/Image Do\nQ\n` +
      "endstream\nendobj\n"
    )
  ];
  const header = encoder.encode("%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n");
  const offsets = [0];
  let byteOffset = header.length;

  for (const object of objects) {
    offsets.push(byteOffset);
    byteOffset += object.length;
  }

  const xrefOffset = byteOffset;
  const xref = encoder.encode(
    `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n` +
    offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("") +
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n` +
    `startxref\n${xrefOffset}\n%%EOF`
  );

  return concatenateBytes([header, ...objects, xref]);
}

export async function createPdf(file) {
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas tidak tersedia di browser ini.");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0);

    const jpegBlob = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Gambar tidak dapat disiapkan sebagai PDF."));
      }, "image/jpeg", 0.92);
    });
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const pdfBytes = createPdfBytes(jpegBytes, canvas.width, canvas.height);
    return new Blob([pdfBytes], { type: "application/pdf" });
  } finally {
    bitmap.close();
  }
}
