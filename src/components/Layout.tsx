import { Outlet } from 'react-router-dom';
import NavBar from './navBar/NavBar';

function Layout() {
  return (
    <>
      <NavBar />
      <div className="pt-20 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
