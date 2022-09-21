import { Routes, Route, Link } from "react-router-dom"
import Characters from "./pages/Characters"
import Error404 from "./pages/Error404"
import CharacterInfo from "./pages/CharacterInfo"
import Quotes from "./pages/Quotes"
import CharacterQuotes from "./pages/CharacterQuotes"
function App() {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="container mx-auto">
          <div className="hidden sm:block">
            <div className="flex gap-4">
              <Link
                to="/"
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                Characters
              </Link>
              <Link
                to="/quotes"
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                All Quotes
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="bg-gray-900 text-center text-white block px-3 py-2 rounded-md text-base font-medium">
              Characters
            </Link>
            <Link
              to="/quotes"
              className="bg-gray-900 text-center text-white block px-3 py-2 rounded-md text-base font-medium">
              All Quotes
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterInfo />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quotes/:id" element={<CharacterQuotes />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
