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
        title: 'İstanbul\'da Gezilecek Yerler',
        slug: 'istanbulda-gezilecek-yerler',
        content: 'İstanbul\'un tarihi ve kültürel zenginlikleri saymakla bitmez. Ayasofya\'dan Topkapı Sarayı\'na, Kapalıçarşı\'dan Galata Kulesi\'ne kadar birçok tarihi mekan sizi bekliyor. Bu rehberde İstanbul\'un en güzel yerlerini ve gezi ipuçlarını bulacaksınız.',
        excerpt: 'İstanbul\'un en güzel tarihi mekanları ve mutlaka görülmesi gereken yerleri...',
        featuredImage: 'https://picsum.photos/800/400?random=3',
        author: adminUser._id,
        category: categories[2]._id,
        status: 'published'
      }
    ]);
    console.log('Blog yazıları oluşturuldu!');

    console.log('Demo veriler başarıyla oluşturuldu!');
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seed().catch(console.error); 