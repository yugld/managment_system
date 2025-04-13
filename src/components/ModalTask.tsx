import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSearchParams } from 'react-router-dom';

interface ModalTaskProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalTask({ open, onClose }: ModalTaskProps) {
  const [params] = useSearchParams();
  const id = params.get('id');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{id ? 'Редактировать' : 'Добавить'} Задачу</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
        />
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
