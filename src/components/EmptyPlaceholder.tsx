import { Box, Typography } from '@mui/material';

interface EmptyPlaceholderProps {
  message: string;
}

function EmptyPlaceholder({ message }: EmptyPlaceholderProps) {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
}

export default EmptyPlaceholder;
