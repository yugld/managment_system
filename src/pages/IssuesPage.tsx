import { useState } from 'react';
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetBoardsQuery,
  useGetUsersQuery,
} from '@store/api';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import { Status } from '@store/types';

const TaskPage = () => {
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [boardFilter, setBoardFilter] = useState<number | 'all'>('all');
  const [searchAssignee, setSearchAssignee] = useState('');
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const { data: tasks, refetch } = useGetTasksQuery();
  const { data: boards } = useGetBoardsQuery();
  const { data: users } = useGetUsersQuery();
  const [createTask] = useCreateTaskMutation();

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

  const handleOpenTaskModal = (taskId: number) => {
    const task = tasks?.find((t) => t.id === taskId);
    setSelectedTask(task);
    setOpenModal(true);
  };

  return (
    <Box>
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

      <List sx={{ mt: 3 }}>
        {filteredTasks?.map((task) => (
          <div key={task.id}>
            <ListItem
              button
              onClick={() => handleOpenTaskModal(task.id)}
              alignItems="flex-start"
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {task.title}
                  </Typography>
                }
                secondary={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Typography component="span" variant="body2">
                        {task.boardName}
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                      >
                        <Avatar
                          alt={task.assignee.fullName}
                          src={task.assignee.avatarUrl || ''}
                          sx={{
                            width: 20,
                            height: 20,
                            marginRight: 1,
                          }}
                        />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {task.assignee.fullName}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      component="span"
                      variant="body2"
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
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'sticky',
          bottom: 20,
          zIndex: 1,
        }}
      >
        <Button
          variant="contained"
          // onClick={}
        >
          Создать задачу
        </Button>
      </Box>
    </Box>
  );
};

export default TaskPage;
