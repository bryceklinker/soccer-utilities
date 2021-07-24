import { ModelFactory } from '@soccer-utilities/testing-support';
import { render, screen } from '@testing-library/react';
import { GameSchedule } from './GameSchedule';
import userEvent from '@testing-library/user-event';

describe('GameSchedule', () => {
  test('when schedule is rendered then shows each game', () => {
    const schedule = ModelFactory.createGameSchedule({
      games: ModelFactory.createMany(ModelFactory.createGame, 6),
    });

    render(<GameSchedule schedule={schedule} />);

    expect(screen.getAllByLabelText('game')).toHaveLength(6);
  });

  test('when schedule is rendered then shows last updated date', () => {
    const schedule = ModelFactory.createGameSchedule({
      lastUpdated: '2021-09-23',
    });

    render(<GameSchedule schedule={schedule} />);

    expect(screen.getByLabelText('last updated')).toHaveTextContent(
      '2021-09-23'
    );
  });

  test('when refresh schedule triggered then notifies for refresh', () => {
    const onRefresh = jest.fn();
    render(
      <GameSchedule
        schedule={ModelFactory.createGameSchedule()}
        onRefresh={onRefresh}
      />
    );

    userEvent.click(screen.getByLabelText('refresh schedule'));

    expect(onRefresh).toHaveBeenCalled();
  });

  test('when upload schedule triggered then notifies upload schedule', () => {
    const onUpload = jest.fn();
    render(
      <GameSchedule
        schedule={ModelFactory.createGameSchedule()}
        onUpload={onUpload}
      />
    );

    userEvent.click(screen.getByLabelText('upload schedule'));

    expect(onUpload).toHaveBeenCalled();
  });

  test('when schedule missing then shows no schedule', () => {
    render(<GameSchedule schedule={null} />);

    expect(screen.getByLabelText('no games')).toBeInTheDocument();
    expect(screen.getByLabelText('last updated')).toHaveTextContent(
      'No Schedule'
    );
  });
});
