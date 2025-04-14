import { Box, Typography } from '@mui/material';
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

  return (
    <Box
      ref={drag}
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        width: 250,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={(e) => {
        if (!isDragging) {
          onEdit();
        }
      }}
    >
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
        {task.assignee?.fullName}
      </Typography>
    </Box>
  );
}

export default TaskCard;
