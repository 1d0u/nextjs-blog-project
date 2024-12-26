# Next.js Blog Project

A modern blog platform built with Next.js, MongoDB, and TailwindCSS.

## Features

- 🌓 Dark mode support
- 📱 Responsive design
- 🎨 Modern and clean UI with glass morphism effects
- 🔒 User authentication with NextAuth.js
- 📝 Rich text editor with TipTap
- 🏷️ Category system with filtering
- 🔖 Bookmark system
- 📊 User dashboard
- 🖼️ Image upload support
- 💬 Comment system
- 🔍 SEO friendly

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- TailwindCSS
- MongoDB
- Prisma
- NextAuth.js
- TipTap Editor
- Cloudinary (for image uploads)

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/1d0u/nextjs-blog-project.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Fill in the following environment variables in your `.env` file:
```env
DATABASE_URL="your_mongodb_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

5. Seed the database (optional)
```bash
npm run seed
```

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features in Detail

### Authentication
- Email/Password authentication
- Profile management
- Role-based authorization

### Blog Management
- Create, edit, and delete posts
- Rich text editor with markdown support
- Image upload and management
- Draft/publish system
- Category management
- Post bookmarking

### User Interface
- Modern glass morphism design
- Responsive layout
- Dark mode support
- Category filtering
- User dashboard
- Profile pages

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
