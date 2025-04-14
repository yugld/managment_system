import { Box, List, ListItem, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { Status, GetTasksOnBoardResponse } from '@store/types';
import TaskCard from './TaskCard';

interface BoardColumnProps {
  status: Status;
  tasks: GetTasksOnBoardResponse[];
  onDrop: (taskId: number, newStatus: Status) => void;
  onEdit: (taskId: number) => void;
}

function BoardColumn({ status, tasks, onDrop, onEdit }: BoardColumnProps) {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number }) => onDrop(item.id, status),
  });

  return (
    <Box
      ref={drop}
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      bgcolor="#f4f4f4"
      borderRadius={2}
      width={300}
    >
      <Typography variant="h6">{status}</Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} button>
            <TaskCard task={task} onEdit={() => onEdit(task.id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default BoardColumn;
