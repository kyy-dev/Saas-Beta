const cookieName = "pixelshift_consent";
const cookieValue = "privacy-v1";
const cookieLifetime = 60 * 60 * 24 * 180;

const dialog = document.createElement("dialog");
dialog.className = "privacy-dialog";
dialog.id = "privacy-dialog";
dialog.setAttribute("aria-labelledby", "privacy-dialog-title");
dialog.setAttribute("aria-describedby", "privacy-dialog-intro");
dialog.innerHTML = `
  <div class="privacy-dialog-header">
    <p class="eyebrow">Whetkit / Informasi</p>
    <h2 id="privacy-dialog-title">Privasi & penggunaan</h2>
    <p id="privacy-dialog-intro">Baca cara gambar diproses dan pilihan yang disimpan di browser.</p>
  </div>
  <div class="privacy-dialog-content">
    <section aria-labelledby="privacy-files-title">
      <h3 id="privacy-files-title">Pemrosesan gambar</h3>
      <p>Alat PDF membuat file langsung di browser. Gambar yang kamu pilih tidak diunggah ke server Whetkit.</p>
    </section>
    <section aria-labelledby="privacy-data-title">
      <h3 id="privacy-data-title">Data dan cookie</h3>
      <p>Whetkit tidak meminta nama, email, atau akun. Situs ini tidak memakai cookie analitik atau iklan. Satu cookie fungsional menyimpan persetujuan ini selama 180 hari agar pemberitahuan tidak muncul lagi di setiap kunjungan.</p>
    </section>
    <section aria-labelledby="privacy-visits-title">
      <h3 id="privacy-visits-title">Kunjungan ke situs</h3>
      <p>Saat membuka situs, browser mengirim permintaan ke penyedia hosting. Penyedia hosting dapat memproses alamat IP dan informasi teknis koneksi sesuai kebijakannya.</p>
    </section>
    <section aria-labelledby="privacy-use-title">
      <h3 id="privacy-use-title">Aturan penggunaan</h3>
      <p>Gunakan gambar yang kamu miliki atau berizin untuk diproses. Kamu bertanggung jawab memastikan penggunaan dan pembagian hasilnya tidak melanggar hak orang lain. Jika memakai perangkat bersama, hapus file hasil unduhan setelah selesai.</p>
    </section>
    <section aria-labelledby="privacy-tools-title">
      <h3 id="privacy-tools-title">Alat yang belum tersedia</h3>
      <p>Alat berlabel “Dalam pengembangan” belum bisa digunakan dan belum menerima file atau tautan.</p>
    </section>
  </div>
  <form class="privacy-consent-form">
    <label class="privacy-consent-option">
      <input name="privacy-acknowledgement" type="checkbox" required>
      <span>Saya sudah membaca pemberitahuan privasi dan aturan penggunaan.</span>
    </label>
    <label class="privacy-consent-option">
      <input name="cookie-consent" type="checkbox" required>
      <span>Saya setuju cookie fungsional menyimpan persetujuan ini selama 180 hari.</span>
    </label>
    <p class="privacy-consent-error" role="alert" hidden></p>
    <div class="privacy-dialog-actions">
      <button class="button button-primary" type="submit">Setuju dan lanjutkan</button>
      <button class="button privacy-dialog-close" type="button">Tutup</button>
      <button class="privacy-dialog-revoke" type="button" hidden>Hapus persetujuan</button>
    </div>
  </form>
`;

document.body.append(dialog);

const form = dialog.querySelector(".privacy-consent-form");
const consentCheckbox = form.elements.namedItem("cookie-consent");
const acknowledgementCheckbox = form.elements.namedItem("privacy-acknowledgement");
const submitButton = form.querySelector('button[type="submit"]');
const closeButton = dialog.querySelector(".privacy-dialog-close");
const revokeButton = dialog.querySelector(".privacy-dialog-revoke");
const errorMessage = dialog.querySelector(".privacy-consent-error");

function hasConsent() {
  return document.cookie.split("; ").some((cookie) => cookie === `${cookieName}=${cookieValue}`);
}

function updateSubmitState() {
  submitButton.disabled = !consentCheckbox.checked || !acknowledgementCheckbox.checked;
}

function openDialog() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
  revokeButton.hidden = !hasConsent();
  consentCheckbox.checked = hasConsent();
  acknowledgementCheckbox.checked = hasConsent();
  updateSubmitState();

  if (!dialog.open) {
    dialog.showModal();
    acknowledgementCheckbox.focus();
  }
}

for (const link of document.querySelectorAll('a[href="#privacy-dialog"]')) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openDialog();
  });
}

closeButton.addEventListener("click", () => dialog.close());
consentCheckbox.addEventListener("change", updateSubmitState);
acknowledgementCheckbox.addEventListener("change", updateSubmitState);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const secureAttribute = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${cookieName}=${cookieValue}; Max-Age=${cookieLifetime}; Path=/; SameSite=Lax${secureAttribute}`;

  if (!hasConsent()) {
    errorMessage.textContent =
      "Persetujuan belum tersimpan. Izinkan cookie untuk situs ini, lalu coba lagi.";
    errorMessage.hidden = false;
    return;
  }

  dialog.close();
});

revokeButton.addEventListener("click", () => {
  document.cookie = `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax`;
  if (hasConsent()) {
    errorMessage.textContent = "Persetujuan belum bisa dihapus. Periksa pengaturan cookie browser.";
    errorMessage.hidden = false;
    return;
  }

  dialog.close();
});

if (!hasConsent()) openDialog();
