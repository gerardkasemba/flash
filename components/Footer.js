// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo and Brand */}
        <div className="text-lg font-bold">StudySync</div>

        {/* Quick Links */}
        <div className="flex space-x-8">
          <a href="/about" className="text-gray-400 hover:text-white">
            About
          </a>
          <a href="/help" className="text-gray-400 hover:text-white">
            Help
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white">
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          {/* Facebook Icon */}
          <a
            href="https://facebook.com"
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h6.25v-7H9.75v-2.75h2.5V10.5c0-2.75 1.5-4 3.75-4 1.1 0 1.75.08 2 .1V8h-1.75C15 8 14.25 8.8 14.25 9.8v1.45h3L16.5 13.75h-2v7H18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </a>

          {/* Twitter Icon */}
          <a
            href="https://twitter.com"
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>

          {/* Instagram Icon */}
          <a
            href="https://instagram.com"
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5zm-4.25 5.75a3 3 0 110 6 3 3 0 010-6zm0-1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm5.5-.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://linkedin.com"
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v5.25A2.75 2.75 0 0119.25 22H4.75A2.75 2.75 0 012 19.25V4.75A2.75 2.75 0 014.75 2h14.5A2.75 2.75 0 0122 4.75V8h-1.5V4.75a1.25 1.25 0 00-1.25-1.25H4.75A1.25 1.25 0 003.5 4.75v14.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V14a4.5 4.5 0 00-4.5-4.5h-6a4.5 4.5 0 00-4.5 4.5v5h-1.5v-5a6 6 0 016-6h6z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
