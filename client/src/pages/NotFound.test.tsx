import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('отображает сообщение об ошибке', () => {
    render(<NotFound />);
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
