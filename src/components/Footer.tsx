import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full py-8">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="rounded-xl border-b border-white/[0.02] bg-[#0A0D0F]/80 backdrop-blur-md shadow-lg shadow-black/20 px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white/90 tracking-wider uppercase">Blog</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                    All Posts
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white/90 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="mailto:info@example.com" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                    Email
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white/90 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A0D0F] font-semibold text-white/90">
                  1d0u
                </div>
                <span className="text-sm font-medium text-white/70">Blog</span>
              </div>
              <p className="text-sm text-white/50 flex items-center gap-2">
                &copy; {new Date().getFullYear()} Made with <span className="text-red-500">❤</span> by{' '}
                <a 
                  href="https://github.com/1d0u" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  @1d0u
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 