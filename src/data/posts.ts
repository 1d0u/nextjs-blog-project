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
    title: '10 Golden Rules for Healthy Living',
    slug: '10-golden-rules-for-healthy-living',
    excerpt: 'Take a step towards a healthier life with simple but effective habits you can add to your daily routine.',
    content: `
      Living a healthy life is not as difficult as you think. Here are 10 golden rules you can easily add to your daily life:

      1. Drink at least 8 glasses of water a day
      2. Exercise regularly
      3. Get enough sleep
      4. Eat a balanced diet
      5. Stay away from stress
      6. Get regular check-ups
      7. Strengthen your social relationships
      8. Get hobbies
      9. Practice meditation
      10. Think positive

      When you adapt these rules to your life, you will see significant improvements in both your physical and mental health.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    category: {
      id: '2',
      name: 'Lifestyle',
      slug: 'lifestyle',
    },
    author: {
      id: '2',
      name: 'Ayse Demir',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
    publishedAt: '2024-01-14T15:30:00Z',
    readingTime: '7 dk',
  },
  {
    id: '3',
    title: 'An Unforgettable Weekend in Cappadocia',
    slug: 'unforgettable-weekend-in-cappadocia',
    excerpt: 'I\'m sharing my amazing weekend in Cappadocia, one of Turkey\'s most enchanting destinations.',
    content: `
      Cappadocia is one of the most special places not only in Turkey but in the world. It offers an unforgettable experience with its fairy chimneys, hot air balloons, and unique natural beauties.

      ## Where to Stay?

      The best option for accommodation in Cappadocia is cave hotels. These hotels offer you an authentic experience while providing all the amenities of modern comfort.

      ## What to Do?

      - Balloon tour (must!)
      - Goreme Open Air Museum
      - Underground cities
      - ATV tour
      - Pigeon Valley
      - Uchisar Castle

      ## How to Get There?

      The easiest way to reach Cappadocia is to use Nevsehir Airport. You can get transfer service from the airport to the hotel area.
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