import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-2 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hakkında Bölümü */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Hakkımda
            </h3>
            <p className="text-sm">
              Fullstack Developer olarak modern web teknolojileri ile frontend ve backend geliştirme yapıyorum.
            </p>
          </div>

          {/* İletişim */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2 text-white">
              İletişim
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="mailto:talhaylmz111@gmail.com" className="hover:text-white transition-colors inline-block">
                  talhaylmz111@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/VOONQA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-block">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/talha-y%C4%B1lmaz-495482295/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-block">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Footer */}
        <div className="border-t border-gray-700 mt-3 pt-3 text-center text-sm">
          <p>Copyright &copy; {new Date().getFullYear()} Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
