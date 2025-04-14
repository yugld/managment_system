import CreateTaskButton from '@components/CreateTaskButton';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8 text-md">
          <nav className="flex items-center gap-6">
            <Link to="/issues">Все задачи</Link>
            <Link to="/boards">Проекты</Link>
          </nav>

          <CreateTaskButton />
        </div>
      </header>
    </>
  );
}

export default NavBar;
