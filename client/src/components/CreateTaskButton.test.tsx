import { render, screen, fireEvent } from '@testing-library/react';
import CreateTaskButton from './CreateTaskButton';
import { vi } from 'vitest';

vi.mock('@components/ModalTask', () => ({
  default: () => <div data-testid="modal-task">Модальное окно</div>,
}));

describe('CreateTaskButton', () => {
  it('открывает модальное окно при нажатии на кнопку', () => {
    render(<CreateTaskButton />);
    expect(screen.queryByTestId('modal-task')).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /создать задачу/i });
    fireEvent.click(button);

    expect(screen.getByTestId('modal-task')).toBeInTheDocument();
  });
});
