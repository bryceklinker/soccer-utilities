import { FunctionComponent } from 'react';
import { GameScheduleModel } from '@soccer-utilities/models';
import { ColumnFlexBox, RowFlexBox } from '@soccer-utilities/common-ui';
import { GamesTable } from './GamesTable';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import UploadIcon from '@material-ui/icons/CloudUpload';

export type GameScheduleProps = {
  schedule?: GameScheduleModel | null;
  onRefresh?: () => void;
  onUpload?: () => void;
};
export const GameSchedule: FunctionComponent<GameScheduleProps> = ({
  schedule,
  onRefresh,
  onUpload,
}) => {
  return (
    <ColumnFlexBox>
      <Toolbar>
        <RowFlexBox alignItems={'center'} justifyItems={'space-around'}>
          <RowFlexBox />
          <Typography variant={'subtitle1'} aria-label={'last updated'}>
            {schedule?.lastUpdated || 'No Schedule'}
          </Typography>
          <IconButton aria-label={'upload schedule'} onClick={onUpload}>
            <UploadIcon />
          </IconButton>
          <IconButton aria-label={'refresh schedule'} onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </RowFlexBox>
      </Toolbar>

      <GamesTable games={schedule?.games || []} />
    </ColumnFlexBox>
  );
};
