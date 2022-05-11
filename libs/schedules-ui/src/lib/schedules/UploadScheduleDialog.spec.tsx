import { render, screen, waitFor } from '@testing-library/react';
import { UploadScheduleDialog } from './UploadScheduleDialog';
import userEvent from '@testing-library/user-event';

describe('UploadScheduleDialog', () => {
  test('when open then shows dialog', async () => {
    render(<UploadScheduleDialog open={true} />);

    expect(
      await screen.findByLabelText('upload schedule dialog')
    ).toBeInTheDocument();
  });

  test('when dialog closed then dialog is hidden', async () => {
    render(<UploadScheduleDialog open={false} />);

    await waitFor(() =>
      expect(
        screen.queryByLabelText('upload schedule dialog')
      ).not.toBeInTheDocument()
    );
  });

  test('when file missing then upload is disabled', async () => {
    render(<UploadScheduleDialog open={true} />);

    expect(
      await screen.findByLabelText('upload schedule button')
    ).toBeDisabled();
  });

  test('when file uploaded then notifies file upload', async () => {
    const onUpload = jest.fn();
    const file = new File(['data'], 'schedule.csv');
    render(<UploadScheduleDialog open={true} onUpload={onUpload} />);

    await userEvent.upload(await screen.findByLabelText('schedule file'), file);
    await waitFor(() =>
      expect(screen.getByLabelText('upload schedule button')).toBeEnabled()
    );

    await userEvent.click(
      await screen.findByLabelText('upload schedule button')
    );

    const expectedForm = new FormData();
    expectedForm.append('scheduleFile', file);
    await waitFor(() => expect(onUpload).toHaveBeenCalledWith(expectedForm));
  });

  test('when upload cancelled then notifies upload cancelled', async () => {
    const onCancel = jest.fn();
    render(<UploadScheduleDialog open={true} onCancel={onCancel} />);

    await userEvent.click(await screen.findByLabelText('cancel upload button'));

    await waitFor(() => expect(onCancel).toHaveBeenCalled());
  });
});
