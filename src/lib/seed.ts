import { connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import '../models/User.js';
import '../models/Category.js';
import '../models/Post.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const User = mongoose.model('User');
const Category = mongoose.model('Category');
const Post = mongoose.model('Post');

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error('DATABASE_URL ortam değişkeni tanımlanmamış.');
}

async function seed() {
  try {
    console.log('Veritabanına bağlanılıyor...');
    await connect(MONGODB_URI);
    console.log('Veritabanına bağlantı başarılı!');

    console.log('Mevcut veriler temizleniyor...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('Veriler temizlendi!');

    console.log('Admin kullanıcı oluşturuluyor...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'admin',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    });
    console.log('Admin kullanıcı oluşturuldu!');

    console.log('Kategoriler oluşturuluyor...');
    const categories = await Category.create([
      {
        name: 'Teknoloji',
        slug: 'teknoloji',
        description: 'Yazılım, donanım ve teknoloji dünyasından en son gelişmeler.'
      },
      {
        name: 'Yaşam',
        slug: 'yasam',
        description: 'Günlük yaşam, sağlık ve kişisel gelişim üzerine yazılar.'
      },
      {
        name: 'Seyahat',
        slug: 'seyahat',
        description: 'Dünyanın dört bir yanından gezi notları ve seyahat tavsiyeleri.'
      }
    ]);
    console.log('Kategoriler oluşturuldu!');

    console.log('Blog yazıları oluşturuluyor...');
    await Post.create([
      {
        title: 'Next.js ile Modern Web Uygulamaları',
        slug: 'nextjs-ile-modern-web-uygulamalari',
        content: 'Next.js, React uygulamaları geliştirmek için güçlü özellikler sunuyor. App Router, Server Components ve daha fazlası ile modern web uygulamaları geliştirmek artık çok daha kolay. Bu yazıda Next.js 13 ile gelen yeni özellikleri ve best practice\'leri inceleyeceğiz.',
        excerpt: 'Next.js 13, React uygulamaları geliştirmek için güçlü özellikler sunuyor. App Router, Server Components ve daha fazlası...',
        featuredImage: 'https://picsum.photos/800/400?random=1',
        author: adminUser._id,
        category: categories[0]._id,
        status: 'published'
      },
      {
        title: 'Sağlıklı Yaşam İçin İpuçları',
        slug: 'saglikli-yasam-icin-ipuclari',
        content: 'Sağlıklı bir yaşam için düzenli egzersiz ve dengeli beslenme şart. Günlük rutininize ekleyebileceğiniz basit alışkanlıklar ile daha sağlıklı bir yaşama adım atabilirsiniz. İşte size yardımcı olacak öneriler...',
        excerpt: 'Günlük rutininize ekleyebileceğiniz basit alışkanlıklar ile daha sağlıklı bir yaşam...',
        featuredImage: 'https://picsum.photos/800/400?random=2',
        author: adminUser._id,
        category: categories[1]._id,
        status: 'published'
      },
      {
        title: 'Places to Visit in Istanbul',
        slug: 'places-to-visit-in-istanbul',
        content: 'The historical and cultural richness of Istanbul is endless. From Hagia Sophia to Topkapi Palace, from Grand Bazaar to Galata Tower, many historical places await you. In this guide, you will find Istanbul\'s most beautiful places and travel tips.',
        excerpt: 'The most beautiful historical places in Istanbul and must-see locations...',
        featuredImage: 'https://picsum.photos/800/400?random=3',
        author: adminUser._id,
        category: categories[2]._id,
        status: 'published'
      }
    ]);
    console.log('Blog posts created!');

    console.log('Demo data successfully created!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed().catch(console.error); 