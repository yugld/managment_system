import { useGetBoardsQuery, useGetTasksQuery } from '@store/api';

function IssuesPage() {
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    isError: isErrorTasks,
  } = useGetTasksQuery();

  const {
    data: boards,
    isLoading: isLoadingBoards,
    isError: isErrorBoards,
  } = useGetBoardsQuery();

  if (isLoadingTasks || isLoadingBoards) {
    return <div>Loading...</div>;
  }

  if (isErrorTasks) {
    return <div>Error loading tasks!</div>;
  }

  if (isErrorBoards) {
    return <div>Error loading boards!</div>;
  }

  return (
    <>
      <h1>Issues Page</h1>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <a href={`tasks/${task.id}`}>{task.title}</a>
          </div>
        ))
      ) : (
        <div>No tasks available</div>
      )}
    </>
  );
}

export default IssuesPage;
