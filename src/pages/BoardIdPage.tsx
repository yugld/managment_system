import { useParams } from 'react-router-dom';

function BoardIdPage() {
  const { id } = useParams();
  const boardId = Number(id);
  return <>Board {boardId} Id Page</>;
}

export default BoardIdPage;
