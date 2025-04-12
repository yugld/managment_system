import { useGetBoardsQuery } from '@store/api';

function BoardsPage() {
  const { data: boards, error, isLoading } = useGetBoardsQuery();

  if (isLoading) return <div>Loading...</div>;

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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardsPage;
