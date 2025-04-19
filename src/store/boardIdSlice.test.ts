import reducer, { setBoardId } from './boardIdSlice';

describe('boardIdSlice', () => {
  it('Должжен вернуть начальное состояние id доски ', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({ boardId: 0 });
  });

  it('Должен установить состояние id доски', () => {
    expect(reducer({ boardId: 0 }, setBoardId(42))).toEqual({ boardId: 42 });
  });
});
