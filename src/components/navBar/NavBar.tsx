import ModalTask from '@components/ModalTask';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8 text-md">
          <nav className="flex items-center gap-6">
            <Link to="/issues">Все задачи</Link>
            <Link to="/boards">Проекты</Link>
          </nav>

          <button
            className="rounded-xl bg-sky-500 px-5 py-2.5 font-medium text-white hover:bg-sky-600 transition"
            onClick={() => setOpenModal(true)}
          >
            Новая задача
          </button>
        </div>
      </header>

      {openModal && (
        <ModalTask open={openModal} onClose={() => setOpenModal(false)} />
      )}
    </>
  );
}

export default NavBar;
