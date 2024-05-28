import { Link } from "react-router-dom"

export function Footer() {
  return (
    <div className="mt-4">
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p>© 2023 Bookshelf. All rights reserved.</p>
          <nav className="flex items-center space-x-4 md:space-x-6">
            <Link className="text-gray-400 hover:text-gray-50" to="#">
              Privacy Policy
            </Link>
            <Link className="text-gray-400 hover:text-gray-50" to="#">
              Terms of Service
            </Link>
            <Link className="text-gray-400 hover:text-gray-50" to="/contactus">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
