import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@components/Layout';
import BoardIdPage from '@pages/boardIdPage/BoardIdPage';
import BoardsPage from '@pages/BoardsPage';
import IssuesPage from '@pages/IssuesPage';
import NotFound from '@pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BoardsPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/board/:id" element={<BoardIdPage />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
