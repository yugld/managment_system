import { useState } from 'react';
import { useGetTasksQuery, useGetBoardsQuery } from '@store/api';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Box,
  Avatar,
  Typography,
  Paper,
} from '@mui/material';
import { Status } from '@store/types';
import ModalTask from '@components/ModalTask';
import CreateTaskButton from '@components/CreateTaskButton';
import Loader from '@components/Loader';
import EmptyPlaceholder from '@components/EmptyPlaceholder';

const IssuesPage = () => {
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [boardFilter, setBoardFilter] = useState<number | 'all'>('all');
  const [searchAssignee, setSearchAssignee] = useState('');
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const { data: boards } = useGetBoardsQuery(undefined);
  const { data: tasks, isLoading } = useGetTasksQuery(undefined);

  if (isLoading) return <Loader />;

  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter;
    const matchesBoard = boardFilter === 'all' || task.boardId === boardFilter;
    const matchesAssignee = task.assignee.fullName
      .toLowerCase()
      .includes(searchAssignee.toLowerCase());
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesBoard && matchesAssignee && matchesSearch;
  });

  const handleEditTask = (taskId: number) => {
    const task = tasks?.find((t) => t.id === taskId);
    if (task) setSelectedTask(task.id);
    setOpenModal(true);
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        flexWrap="wrap"
        alignItems="flex-start"
        sx={{ mt: 2 }}
      >
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Поиск по названию"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField
            label="Поиск по исполнителю"
            value={searchAssignee}
            onChange={(e) => setSearchAssignee(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
          />

          <FormControl sx={{ flex: 1, minWidth: 200 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status)}
              label="Статус"
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="Backlog">Backlog</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1, minWidth: 200 }}>
            <InputLabel>Доска</InputLabel>
            <Select
              value={boardFilter}
              onChange={(e) => setBoardFilter(e.target.value as number)}
              label="Доска"
            >
              <MenuItem value="all">Все</MenuItem>
              {boards?.map((board) => (
                <MenuItem key={board.id} value={board.id}>
                  {board.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <Box display="flex" flexDirection="column" gap={2} mt={3}>
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks?.map((task) => (
            <Paper
              key={task.id}
              elevation={2}
              sx={{
                p: 2,
                borderRadius: 2,
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              onClick={() => handleEditTask(task.id)}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.boardName}
                  </Typography>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Avatar
                      alt={task.assignee.fullName}
                      src={task.assignee.avatarUrl || ''}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography variant="body2" color="text.primary">
                      {task.assignee.fullName}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    color:
                      task.status === 'Backlog'
                        ? 'gray'
                        : task.status === 'InProgress'
                          ? 'orange'
                          : task.status === 'Done'
                            ? 'green'
                            : 'text.primary',
                  }}
                >
                  {task.status}
                </Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <EmptyPlaceholder message="Задачи не найдены" />
        )}
      </Box>

      <Box className="mt-3 flex justify-end sticky bottom-5 right-5 z-[1]">
        <CreateTaskButton />
      </Box>

      {openModal && (
        <ModalTask
          open={openModal}
          onClose={() => setOpenModal(false)}
          taskId={selectedTask || 0}
        />
      )}
    </>
  );
};

export default IssuesPage;
