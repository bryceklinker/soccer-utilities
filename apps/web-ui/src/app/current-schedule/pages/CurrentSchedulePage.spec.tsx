import { screen, waitFor } from '@testing-library/dom';
import { createTestingStore, ModelFactory, renderWithProviders } from '../../../testing';
import { CurrentSchedulePage } from './CurrentSchedulePage';
import userEvent from '@testing-library/user-event';
import { CurrentScheduleActions } from '../state/current-schedule-actions';

describe('CurrentSchedulePage', () => {
  test('when current schedule is missing then requests to load current schedule', () => {
    const store = createTestingStore();

    renderWithProviders(<CurrentSchedulePage />, { store });

    expect(store.getActions()).toContainEqual(CurrentScheduleActions.load.request());
  });

  test('when current schedule is available then shows current schedule', () => {
    const schedule = ModelFactory.createGameSchedule({
      games: ModelFactory.createMany(ModelFactory.createGame, 4)
    });
    const store = createTestingStore(CurrentScheduleActions.load.success(schedule));

    renderWithProviders(<CurrentSchedulePage />, { store });

    expect(screen.getAllByLabelText('game')).toHaveLength(4);
  });

  test('when current schedule is available then skips loading schedule', () => {
    const store = createTestingStore(CurrentScheduleActions.load.success(ModelFactory.createGameSchedule()));

    renderWithProviders(<CurrentSchedulePage />, { store });

    expect(store.getActions()).not.toContainEqual(CurrentScheduleActions.load.request());
  });

  test('when current schedule is loading then shows loading', () => {
    const store = createTestingStore(
      CurrentScheduleActions.load.success(ModelFactory.createGameSchedule()),
      CurrentScheduleActions.load.request()
    );

    renderWithProviders(<CurrentSchedulePage />, { store });

    expect(screen.getByLabelText('loading indicator')).toBeVisible();
  });

  test('when current schedule is loading then skips loading schedule', () => {
    const store = createTestingStore(
      CurrentScheduleActions.load.request()
    );

    renderWithProviders(<CurrentSchedulePage />, { store });

    expect(store.getActions()).not.toContainEqual(CurrentScheduleActions.load.request());
  });

  test('when upload schedule triggered then shows upload schedule dialog', async () => {
    renderWithProviders(<CurrentSchedulePage />);

    userEvent.click(screen.getByLabelText('upload schedule'));

    await waitFor(() => expect(screen.getByLabelText('upload schedule dialog')).toBeVisible());
  });

  test('when schedule is uploaded then requests to upload schedule', async () => {
    const store = createTestingStore();
    const form = new FormData();
    const file = new File([], 'schedule.csv');
    form.append('scheduleFile', file);
    renderWithProviders(<CurrentSchedulePage />, { store });

    await uploadScheduleFile(file);

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(CurrentScheduleActions.upload.request(form));
    });
  });

  test('when schedule is uploaded then hides upload schedule dialog', async () => {
    renderWithProviders(<CurrentSchedulePage />);

    await uploadScheduleFile(new File(['data'], 'schedule.csv'));

    await waitFor(() => expect(screen.queryByLabelText('upload schedule dialog')).not.toBeInTheDocument());
  });

  test('when schedule upload is cancelled then hides upload schedule dialog', async () => {
    renderWithProviders(<CurrentSchedulePage />);

    userEvent.click(screen.getByLabelText('upload schedule'));
    userEvent.click(await screen.findByLabelText('cancel upload button'));

    await waitFor(() => expect(screen.queryByLabelText('upload schedule dialog')).not.toBeInTheDocument());
  });

  test('when schedule fails to load then shows failed to load schedule', async () => {
    const store = createTestingStore(CurrentScheduleActions.load.failed());
    renderWithProviders(<CurrentSchedulePage />, { store });

    expect(screen.getByLabelText('errors')).toBeInTheDocument();
  });

  test('when schedule fails and load is retried then requests to load schedule', async () => {
    const store = createTestingStore(CurrentScheduleActions.load.failed());
    renderWithProviders(<CurrentSchedulePage />, { store });

    store.clearActions();
    userEvent.click(screen.getByLabelText('retry button'));

    expect(store.getActions()).toContainEqual(CurrentScheduleActions.load.request());
  });

  test('when schedule refresh requested then requests to load schedule', async () => {
    const store = createTestingStore();
    renderWithProviders(<CurrentSchedulePage />, { store });

    store.clearActions();
    userEvent.click(screen.getByLabelText('refresh schedule'));

    expect(store.getActions()).toContainEqual(CurrentScheduleActions.load.request());
  });

  test('when schedule failed to load then upload schedule is available', async () => {
    const store = createTestingStore(CurrentScheduleActions.load.failed());
    renderWithProviders(<CurrentSchedulePage />, { store });
    store.clearActions();

    userEvent.click(screen.getByLabelText('upload schedule'));

    expect(await screen.findByLabelText('upload schedule dialog')).toBeVisible();
  });

  test('when schedule failed to load then skips loading schedule', async () => {
    const store = createTestingStore(CurrentScheduleActions.load.failed());
    renderWithProviders(<CurrentSchedulePage />, { store });

    expect(store.getActions()).not.toContainEqual(CurrentScheduleActions.load.request());
  })

  async function uploadScheduleFile(file: File) {
    userEvent.click(screen.getByLabelText('upload schedule'));
    userEvent.upload(await screen.findByLabelText('schedule file'), file);
    await waitFor(() => expect(screen.getByLabelText('upload schedule button')).toBeEnabled());

    userEvent.click(await screen.findByLabelText('upload schedule button'));
  }
});
