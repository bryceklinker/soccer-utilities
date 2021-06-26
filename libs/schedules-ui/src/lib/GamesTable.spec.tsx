import { ModelFactory } from '@soccer-utilities/core/testing';
import { render, screen } from '@testing-library/react';
import { GamesTable } from '@soccer-utilities/schedules-ui';

describe('GamesTable', () => {
  test('when games are rendered then shows each game', () => {
    const games = ModelFactory.createMany(ModelFactory.createGame, 3);

    render(<GamesTable games={games} />);

    expect(screen.getAllByLabelText('game')).toHaveLength(3);
  });

  test('when empty games are rendered then shows no games', () => {
    render(<GamesTable games={[]} />);

    expect(screen.getByLabelText('no games')).toBeInTheDocument();
  })
});
