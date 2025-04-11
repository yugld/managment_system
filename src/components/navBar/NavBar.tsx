import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header className="">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <nav aria-label="Global" className="block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link to="/issues" className="">
                  All tasks
                </Link>
              </li>
              <li>
                <Link to="/boards" className="">
                  Boards
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="#"
              >
                New Task
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
