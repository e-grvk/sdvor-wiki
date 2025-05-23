import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Консультант-вики</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-orange-500">
                Главная
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                О проекте
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
