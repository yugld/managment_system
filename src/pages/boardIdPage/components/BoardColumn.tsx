import { Box, List, ListItem, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { Status, GetTasksOnBoardResponse } from '@store/types';
import TaskCard from './TaskCard';
import { useRef, useEffect } from 'react';

interface BoardColumnProps {
  status: Status;
  tasks: GetTasksOnBoardResponse[];
  onDrop: (taskId: number, newStatus: Status) => void;
  onEdit: (taskId: number) => void;
}

const statusColors: Record<Status, string> = {
  Backlog: '#facc15',
  InProgress: '#3b82f6',
  Done: '#10b981',
};

function BoardColumn({ status, tasks, onDrop, onEdit }: BoardColumnProps) {
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number }) => {
      onDrop(item.id, status);
    },
  });

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <Box
      ref={dropRef}
      className="flex flex-col shadow items-center py-2 bg-white rounded-lg"
    >
      <Typography variant="h6" sx={{ color: statusColors[status], m: 1 }}>
        {status}
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} component="button">
            <TaskCard task={task} onEdit={() => onEdit(task.id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default BoardColumn;
