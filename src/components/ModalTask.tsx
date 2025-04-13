import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSearchParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { UpdateTaskRequest } from '@store/types';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetUsersQuery,
  useGetBoardsQuery,
} from '@store/api';

interface ModalTaskProps {
  open: boolean;
  onClose: () => void;
  taskId?: number;
  onTaskCreated?: () => void;
}

export default function ModalTask({ open, onClose, taskId }: ModalTaskProps) {
  const [params] = useSearchParams();
  const id = params.get('id');
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const { data: users } = useGetUsersQuery();
  const { data: boards } = useGetBoardsQuery();

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    priority: false,
    status: false,
    assigneeId: false,
    boardId: false,
  });

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

  const [taskData, setTaskData] = useState<UpdateTaskRequest>({
    title: '',
    description: '',
    priority: '',
    status: '',
    assigneeId: '',
    boardId: '',
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{id ? 'Редактировать' : 'Добавить'} Задачу</DialogTitle>
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
              setTaskData({ ...taskData, boardId: e.target.value })
            }
            label="Проект"
            error={errors.boardId}
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
              setTaskData({ ...taskData, priority: e.target.value })
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
              setTaskData({ ...taskData, status: e.target.value })
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
              setTaskData({ ...taskData, assigneeId: e.target.value })
            }
            label="Исполнитель"
            error={errors.assigneeId}
          >
            {users?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Перейти к доске</Button>
        <Button onClick={handleSubmit}>
          {id ? 'Сохранить' : 'Создать'} Задачу
        </Button>
      </DialogActions>
    </Dialog>
  );
}
