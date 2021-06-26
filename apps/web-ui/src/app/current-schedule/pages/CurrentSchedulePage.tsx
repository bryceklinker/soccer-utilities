import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { LoadingIndicator } from '@soccer-utilities/common-ui';
import { GameSchedule, UploadScheduleDialog } from '@soccer-utilities/schedules-ui';
import { CurrentScheduleActions, useCurrentSchedule, useIsCurrentScheduleLoading } from '../state';
import { useRootDispatch } from '../../state';

export const CurrentSchedulePage: FunctionComponent = () => {
  const schedule = useCurrentSchedule();
  const isLoadingSchedule = useIsCurrentScheduleLoading();
  const dispatch = useRootDispatch();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleScheduleUpload = useCallback((form: FormData) => {
    dispatch(CurrentScheduleActions.upload.request(form));
    setIsUploadOpen(false);
  }, [dispatch, setIsUploadOpen]);

  const handleCancelUpload = useCallback(() => setIsUploadOpen(false), [setIsUploadOpen]);

  useEffect(() => {
    if (schedule || isLoadingSchedule) {
      return;
    }

    dispatch(CurrentScheduleActions.load.request());
  }, [schedule, isLoadingSchedule, dispatch]);

  if (isLoadingSchedule) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <GameSchedule schedule={schedule} onUpload={() => setIsUploadOpen(true)} />
      {
        isUploadOpen
          ? <UploadScheduleDialog open={true} onUpload={handleScheduleUpload} onCancel={handleCancelUpload} />
          : null
      }
    </>
  );
};
