import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import {
  useGetBoardsQuery,
  useGetBoardTasksQuery,
  useUpdateTaskStatusMutation,
} from '@store/api';
import { Status, GetTasksOnBoardResponse } from '@store/types';
import ModalTask from '@components/ModalTask';
import BoardColumn from './components/BoardColumn';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBoardId } from '@store/boardIdSlice';

function BoardIdPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: boardTasks } = useGetBoardTasksQuery(id);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [tasks, setTasks] = useState<{
    [key in Status]: GetTasksOnBoardResponse[];
  }>({
    Backlog: [],
    InProgress: [],
    Done: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState<GetTasksOnBoardResponse | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(setBoardId(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (boardTasks) {
      const groupedTasks = boardTasks.reduce(
        (acc, task) => {
          acc[task.status].push(task);
          return acc;
        },
        { Backlog: [], InProgress: [], Done: [] }
      );
      setTasks(groupedTasks);
    }
  }, [boardTasks]);

  const handleDrop = (taskId: number, newStatus: Status) => {
    updateTaskStatus({ taskId, data: { status: newStatus } });
  };

  const handleEditTask = (taskId: number) => {
    const task = boardTasks?.find((t) => t.id === taskId);
    setSelectedTask(task || null);
    setOpenModal(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Grid container spacing={2}>
          {['Backlog', 'InProgress', 'Done'].map((status) => (
            <Grid item xs={4} key={status}>
              <BoardColumn
                status={status as Status}
                tasks={tasks[status as Status]}
                onDrop={handleDrop}
                onEdit={handleEditTask}
              />
            </Grid>
          ))}
        </Grid>

        {openModal && (
          <ModalTask
            open={openModal}
            onClose={() => setOpenModal(false)}
            taskId={selectedTask?.id}
          />
        )}
      </Container>
    </DndProvider>
  );
}

export default BoardIdPage;
