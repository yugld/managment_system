import { render, screen } from '@testing-library/react';
import EmptyPlaceholder from '@components/EmptyPlaceholder';

describe('EmptyPlaceholder', () => {
  it('отображает переданное сообщение', () => {
    const testMessage = 'Страница не найдена';
    render(<EmptyPlaceholder message={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
