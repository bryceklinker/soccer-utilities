import { ModelFactory } from '@soccer-utilities/testing-support';
import { render, screen, within } from '@testing-library/react';
import { GamesTable } from '@soccer-utilities/schedules-ui';
import { Gender, RefereeType } from '@soccer-utilities/core';

describe('GameRow', () => {
  test('when game is rendered then shows game details', () => {
    const game = ModelFactory.createGame({
      ageGroup: ModelFactory.createAgeGroup({ age: 14, gender: Gender.Boys })
    });

    render(<GamesTable games={[game]} />);

    const row = within(screen.getByLabelText('game'));
    expect(row.getByLabelText('date')).toHaveTextContent(game.date);
    expect(row.getByLabelText('time')).toHaveTextContent(game.time);
    expect(row.getByLabelText('home team')).toHaveTextContent(game.homeTeam);
    expect(row.getByLabelText('away team')).toHaveTextContent(game.awayTeam);
    expect(row.getByLabelText('field')).toHaveTextContent(game.field);
    expect(row.getByLabelText('age group')).toHaveTextContent('U14 Boys');
  });

  test('when game has referees then shows referees', () => {
    const game = ModelFactory.createGame({
      referees: [
        ModelFactory.createReferee({ type: RefereeType.Center, name: 'John' }),
        ModelFactory.createReferee({ type: RefereeType.Assistant, name: 'Jim' })
      ]
    });

    render(<GamesTable games={[game]} />);

    const row = within(screen.getByLabelText('game'));
    expect(row.getByLabelText('referees')).toHaveTextContent('Center: John');
    expect(row.getByLabelText('referees')).toHaveTextContent('Assistant: Jim');
  });
});
