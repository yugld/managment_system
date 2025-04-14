import NavBar from '@components/navBar/NavBar';
import BoardIdPage from '@pages/boardIdPage/BoardIdPage';
import BoardsPage from '@pages/BoardsPage';
import IssuesPage from '@pages/IssuesPage';
import NotFound from '@pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardIdPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
