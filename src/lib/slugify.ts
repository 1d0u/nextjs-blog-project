export default function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Boşlukları tire ile değiştir
    .replace(/[ğ]/g, 'g')        // Türkçe karakterleri değiştir
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9-]/g, '')  // Alfanumerik ve tire dışındaki karakterleri kaldır
    .replace(/--+/g, '-')        // Birden fazla tireyi tek tireye dönüştür
    .replace(/^-+/, '')          // Baştaki tireleri kaldır
    .replace(/-+$/, '')          // Sondaki tireleri kaldır
} 