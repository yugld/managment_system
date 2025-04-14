import { Avatar, Box, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { GetTasksOnBoardResponse } from '@store/types';

interface TaskCardProps {
  task: GetTasksOnBoardResponse;
  onEdit: () => void;
}

function TaskCard({ task, onEdit }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box
      ref={drag}
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'pointer',
      }}
      onClick={() => {
        if (!isDragging) onEdit();
      }}
    >
      <Typography variant="body1" fontWeight="bold">
        {task.title}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
        {task.description}
      </Typography>

      {task.assignee && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 2,
            color: 'gray',
          }}
        >
          <Avatar
            src={task.assignee.avatarUrl || ''}
            alt={task.assignee.fullName}
            sx={{ width: 20, height: 20 }}
          >
            {!task.assignee.avatarUrl && getInitials(task.assignee.fullName)}
          </Avatar>
          <Typography variant="body2">{task.assignee.fullName}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default TaskCard;
