import { Post } from '@/types/blog'

export const posts: Post[] = [
  {
    id: '1',
    title: 'Next.js 13 ile Modern Web Uygulamaları',
    slug: 'nextjs-13-ile-modern-web-uygulamalari',
    excerpt: 'Next.js 13, React uygulamaları geliştirmek için güçlü özellikler sunuyor. App Router, Server Components ve daha fazlası...',
    content: `
      Next.js 13, React uygulamaları geliştirmek için en popüler framework'lerden biri haline geldi. Yeni sürümle birlikte gelen App Router, Server Components ve diğer özellikler, geliştirme sürecini daha da kolaylaştırıyor.

      ## Yeni Özellikler

      - **App Router**: Daha iyi performans ve daha kolay routing
      - **Server Components**: Daha hızlı sayfa yüklemeleri
      - **Streaming**: Aşamalı sayfa render etme
      - **Turbopack**: Daha hızlı development deneyimi

      ## Neden Next.js 13?

      Next.js 13, modern web uygulamaları geliştirmek için ihtiyacınız olan her şeyi sunuyor. React'in gücünü, server-side rendering ve static site generation özellikleriyle birleştirerek, hem geliştirici deneyimini hem de kullanıcı deneyimini iyileştiriyor.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    category: {
      id: '1',
      name: 'Teknoloji',
      slug: 'teknoloji',
    },
    author: {
      id: '1',
      name: 'Ali Yılmaz',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    readingTime: '5 dk',
  },
  {
    id: '2',
    title: 'Sağlıklı Yaşam İçin 10 Altın Kural',
    slug: 'saglikli-yasam-icin-10-altin-kural',
    excerpt: 'Günlük rutininize ekleyebileceğiniz basit ama etkili alışkanlıklarla daha sağlıklı bir yaşama adım atın.',
    content: `
      Sağlıklı bir yaşam sürmek, sandığınız kadar zor değil. İşte size günlük hayatınıza kolayca ekleyebileceğiniz 10 altın kural:

      1. Günde en az 8 bardak su için
      2. Düzenli egzersiz yapın
      3. Yeterli uyku alın
      4. Dengeli beslenin
      5. Stresten uzak durun
      6. Düzenli check-up yaptırın
      7. Sosyal ilişkilerinizi güçlendirin
      8. Hobiler edinin
      9. Meditasyon yapın
      10. Pozitif düşünün

      Bu kuralları hayatınıza adapte ettiğinizde, hem fiziksel hem de mental sağlığınızda önemli iyileşmeler göreceksiniz.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    category: {
      id: '2',
      name: 'Yaşam',
      slug: 'yasam',
    },
    author: {
      id: '2',
      name: 'Ayşe Demir',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    publishedAt: '2024-01-14T15:30:00Z',
    readingTime: '7 dk',
  },
  {
    id: '3',
    title: 'Kapadokya\'da Unutulmaz Bir Hafta Sonu',
    slug: 'kapadokyada-unutulmaz-bir-hafta-sonu',
    excerpt: 'Türkiye\'nin en büyüleyici destinasyonlarından biri olan Kapadokya\'da geçirdiğim muhteşem hafta sonunu sizlerle paylaşıyorum.',
    content: `
      Kapadokya, sadece Türkiye'nin değil, dünyanın en özel yerlerinden biri. Peri bacaları, sıcak hava balonları ve eşsiz doğal güzellikleriyle unutulmaz bir deneyim sunuyor.

      ## Nerede Kalmalı?

      Kapadokya'da konaklama için en iyi seçenek mağara oteller. Bu oteller size authentic bir deneyim yaşatırken, modern konforun tüm imkanlarını da sunuyor.

      ## Ne Yapmalı?

      - Balon turu (mutlaka!)
      - Göreme Açık Hava Müzesi
      - Yeraltı şehirleri
      - ATV turu
      - Güvercinlik Vadisi
      - Uçhisar Kalesi

      ## Nasıl Gitmeli?

      Kapadokya'ya ulaşım için en kolay yol Nevşehir Havalimanı'nı kullanmak. Havalimanından otellerın bulunduğu bölgeye transfer hizmeti alabilirsiniz.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd',
    category: {
      id: '3',
      name: 'Seyahat',
      slug: 'seyahat',
    },
    author: {
      id: '3',
      name: 'Mehmet Kaya',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    publishedAt: '2024-01-13T09:15:00Z',
    readingTime: '6 dk',
  },
] 