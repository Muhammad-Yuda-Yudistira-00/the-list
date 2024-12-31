// Fungsi untuk mendeteksi perangkat ponsel
const isMobileDevice = (): boolean => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

// Fungsi untuk normalisasi kapitalisasi otomatis di tengah kalimat
const normalizeCapitalization = (text: string): string => {
  // Hanya jalankan logika di perangkat ponsel
  if (!isMobileDevice()) return text;

  return text.replace(/(\S)([A-Z])([a-z]*)/g, (match, prevChar, firstChar, rest) => {
    // Normalisasi hanya jika tidak ada tanda baca sebelum huruf kapital
    if (!/[.!?]\s*$/.test(prevChar)) {
      return prevChar + firstChar.toLowerCase() + rest;
    }
    return match; // Biarkan apa adanya jika ada tanda baca sebelumnya
  });
};

export default normalizeCapitalization