import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { GameSchedule, UploadScheduleDialog } from '@soccer-utilities/schedules-ui';
import { Typography } from '@material-ui/core';
import { CurrentScheduleLoadError } from '../components/CurrentScheduleLoadError';
import { selectHasErrors } from '../../errors/state/errors-selectors';
import { selectIsLoading } from '../../loading/state/loading-selectors';
import { useRootDispatch, useRootSelector } from '../../state/root-hooks';
import { useCurrentSchedule } from '../state/current-schedule-selectors';
import { CurrentScheduleActions } from '../state/current-schedule-actions';

export const CurrentSchedulePage: FunctionComponent = () => {
  const schedule = useCurrentSchedule();
  const isLoadingSchedule = useRootSelector(selectIsLoading(CurrentScheduleActions.load.request));
  const hasLoadingErrors = useRootSelector(selectHasErrors(CurrentScheduleActions.load.request));
  const dispatch = useRootDispatch();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleScheduleUpload = useCallback((form: FormData) => {
    dispatch(CurrentScheduleActions.upload.request(form));
    setIsUploadOpen(false);
  }, [dispatch, setIsUploadOpen]);

  const handleCancelUpload = useCallback(() => setIsUploadOpen(false), [setIsUploadOpen]);
  const handleLoadSchedule = useCallback(() => dispatch(CurrentScheduleActions.load.request()), [dispatch]);
  const handleUploadSchedule = useCallback(() => setIsUploadOpen(true), [setIsUploadOpen]);

  useEffect(() => {
    if (schedule || isLoadingSchedule || hasLoadingErrors) {
      return;
    }

    dispatch(CurrentScheduleActions.load.request());
  }, [schedule, isLoadingSchedule, hasLoadingErrors, dispatch]);

  if (isLoadingSchedule) {
    return (
      <LoadingIndicator show center>
        <Typography variant={'h4'}>Loading Current Schedule</Typography>
      </LoadingIndicator>
    );
  }

  return (
    <>
      {
        !hasLoadingErrors
          ? <GameSchedule schedule={schedule} onRefresh={handleLoadSchedule} onUpload={handleUploadSchedule} />
          : null
      }
      {
        hasLoadingErrors
          ? <CurrentScheduleLoadError onRetry={handleLoadSchedule} onUpload={handleUploadSchedule} />
          : null
      }
      {
        isUploadOpen
          ? <UploadScheduleDialog open={true} onUpload={handleScheduleUpload} onCancel={handleCancelUpload} />
          : null
      }
    </>
  );
};
