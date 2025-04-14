import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { Priority, Status, UpdateTaskRequest } from '@store/types';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetUsersQuery,
  useGetBoardsQuery,
  useGetTaskByIdQuery,
} from '@store/api';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

interface ModalTaskProps {
  open: boolean;
  onClose: () => void;
  taskId?: number;
  onTaskCreated?: () => void;
}

export default function ModalTask({ open, onClose, taskId }: ModalTaskProps) {
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const { data: users } = useGetUsersQuery();
  const { data: boards } = useGetBoardsQuery();
  const { data: taskDataFromApi, isLoading } = useGetTaskByIdQuery(taskId!, {
    skip: !taskId,
  });
  const boardIdFromStore = useSelector((state) => state.board.boardId);
  const [taskData, setTaskData] = useState<UpdateTaskRequest>({
    title: '',
    description: '',
    priority: undefined,
    status: undefined,
    assigneeId: undefined,
    boardId: undefined,
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    priority: false,
    status: false,
    assigneeId: false,
    boardId: false,
  });

  const isBoardPage = pathname.includes('/board/');

  useEffect(() => {
    if (taskId && taskDataFromApi) {
      const board = boards?.find((b) => b.name === taskDataFromApi.boardName);

      setTaskData({
        title: taskDataFromApi.title,
        description: taskDataFromApi.description,
        priority: taskDataFromApi.priority,
        status: taskDataFromApi.status,
        assigneeId: taskDataFromApi.assignee.id,
        boardId: board ? board.id : (boardIdFromStore ?? null),
      });
    } else if (isBoardPage) {
      const boardIdFromUrl = params.get('id');
      setTaskData((prevData) => ({
        ...prevData,
        boardId: boardIdFromUrl ? Number(boardIdFromUrl) : boardIdFromStore,
      }));
    }
  }, [taskId, taskDataFromApi, boards, isBoardPage, boardIdFromStore, params]);

  const validateForm = () => {
    const newErrors = {
      title: !taskData.title,
      description: !taskData.description,
      priority: !taskData.priority,
      status: !taskData.status,
      assigneeId: !taskData.assigneeId,
      boardId: !taskData.boardId,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (taskId) {
      await updateTask({ id: taskId, data: taskData });
    } else {
      await createTask(taskData);
    }
    onClose();
  };

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{taskId ? 'Редактировать' : 'Добавить'} Задачу</DialogTitle>
      <DialogContent>
        <TextField
          label="Название задачи"
          fullWidth
          required
          margin="normal"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          error={errors.title}
        />
        <TextField
          label="Описание задачи"
          fullWidth
          multiline
          required
          rows={4}
          margin="normal"
          value={taskData.description}
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
          error={errors.description}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Проект</InputLabel>
          <Select
            value={taskData.boardId}
            onChange={(e) =>
              setTaskData({ ...taskData, boardId: Number(e.target.value) })
            }
            label="Проект"
            error={errors.boardId}
            disabled={isBoardPage}
          >
            {boards?.map((board) => (
              <MenuItem key={board.id} value={board.id}>
                {board.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Приоритет</InputLabel>
          <Select
            value={taskData.priority}
            onChange={(e) =>
              setTaskData({ ...taskData, priority: e.target.value as Priority })
            }
            label="Приоритет"
            error={errors.priority}
          >
            <MenuItem value="Low">Низкий</MenuItem>
            <MenuItem value="Medium">Средний</MenuItem>
            <MenuItem value="High">Высокий</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Статус</InputLabel>
          <Select
            value={taskData.status}
            onChange={(e) =>
              setTaskData({ ...taskData, status: e.target.value as Status })
            }
            label="Статус"
            error={errors.status}
          >
            <MenuItem value="Backlog">To Do</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Исполнитель</InputLabel>
          <Select
            value={taskData.assigneeId}
            onChange={(e) =>
              setTaskData({ ...taskData, assigneeId: Number(e.target.value) })
            }
            label="Исполнитель"
            error={errors.assigneeId}
          >
            {users?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    alt={user.fullName}
                    src={user.avatarUrl}
                    style={{ marginRight: '8px' }}
                  />
                  {user.fullName}
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {pathname === '/issues' && taskId ? (
          <Button
            component={Link}
            to={`/board/${taskData.boardId}`}
            sx={{ mr: 'auto' }}
            onClick={onClose}
          >
            Перейти к доске
          </Button>
        ) : (
          ''
        )}
        <Button onClick={handleSubmit}>
          {taskId ? 'Сохранить' : 'Создать'} Задачу
        </Button>
      </DialogActions>
    </Dialog>
  );
}
