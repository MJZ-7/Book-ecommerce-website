import { Footer } from "@/components/footer"
import { Hero } from "@/components/heroSection"

import { Link } from "react-router-dom"

export function Home() {
  return (
    <>
      <Hero />

      <div className="mx-5">
        <aside className="bg-gray-100 dark:bg-gray-800 py-8 px-6 md:px-8 lg:px-12">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Browse by Genre
            </h2>
            <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Fiction
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Non-Fiction
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Mystery
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Romance
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Science Fiction
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Fantasy
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                Biography
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                History
              </Link>
            </nav>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  )
}
