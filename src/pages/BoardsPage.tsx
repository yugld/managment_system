import { useGetBoardsQuery } from '@store/api';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Divider,
  List,
} from '@mui/material';

function BoardsPage() {
  const { data } = useGetBoardsQuery();

  return (
    <Container>
      <List display="flex" flexDirection="column" gap={1}>
        {data?.map((board) => (
          <div key={board.id}>
            <ListItem button>
              <ListItemText>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">{board.name}</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {board.description}
                    </Typography>
                  </Box>
                  <Link to={`/board/${board.id}`}>Перейти к проекту</Link>
                </Box>
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Container>
  );
}

export default BoardsPage;
