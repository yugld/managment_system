import { CircularProgress, Box } from '@mui/material';

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      py: 10,
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loader;
