import { useGetBoardsQuery } from '@store/api';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import Layout from '@components/Layout';

function BoardsPage() {
  const { data } = useGetBoardsQuery();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {data?.map((board) => (
        <Paper
          key={board.id}
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography fontWeight={600}>{board.name}</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {board.description}
            </Typography>
          </Box>
          <Link to={`/board/${board.id}`}>Перейти к проекту</Link>
        </Paper>
      ))}
    </Box>
  );
}

export default BoardsPage;
