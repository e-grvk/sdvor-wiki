export const Navbar = () => (
  <nav className="bg-primary text-black p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl text-black font-semibold flex items-center space-x-2">
        <span>Консультант-вики</span>
      </h1>

      <ul className="flex space-x-4">
        <li>
          <a href="http://localhost:3001">Главная</a>
        </li>
      </ul>
    </div>
  </nav>
)
