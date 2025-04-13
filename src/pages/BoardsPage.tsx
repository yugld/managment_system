import { useGetBoardsQuery } from '@store/api';
import { Link } from 'react-router-dom';

function BoardsPage() {
  const { data: boards, error, isLoading } = useGetBoardsQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    const errorMessage = error.toString();
    return <div>Error: {errorMessage}</div>;
  }

  if (!Array.isArray(boards)) {
    return <div>Unexpected data format. Expected an array.</div>;
  }
  return (
    <div>
      <h2>Список досок</h2>
      <ul>
        {boards?.map((board) => (
          <li key={board.id}>
            {board.name} (Задач: {board.taskCount})
            <Link to={`/board/${board.id}`}>LINK</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardsPage;
