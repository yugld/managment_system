import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
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
  const { data: boards } = useGetBoardsQuery();
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
      <Box className="h-screen w-full overflow-x-auto">
        <div className=" text-lg font-semibold">
          {boards?.find((b) => b.id === Number(id))?.name ||
            'Загрузка названия...'}
        </div>

        <Box className="flex gap-8 py-4 justify-start items-start w-full">
          {['Backlog', 'InProgress', 'Done'].map((status) => (
            <div key={status} className="flex-1 min-w-[250px]">
              <BoardColumn
                status={status as Status}
                tasks={tasks[status as Status]}
                onDrop={handleDrop}
                onEdit={handleEditTask}
              />
            </div>
          ))}
        </Box>

        {openModal && (
          <ModalTask
            open={openModal}
            onClose={() => setOpenModal(false)}
            taskId={selectedTask?.id}
          />
        )}
      </Box>
    </DndProvider>
  );
}

export default BoardIdPage;
