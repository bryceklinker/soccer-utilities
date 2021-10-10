import { FunctionComponent } from 'react';
import { GameScheduleModel } from '@soccer-utilities/models';
import { ColumnFlexBox, RowFlexBox } from '@soccer-utilities/common-ui';
import { GamesTable } from './GamesTable';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadIcon from '@mui/icons-material/CloudUpload';

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
          <IconButton
            aria-label={'upload schedule'}
            onClick={onUpload}
            size="large"
          >
            <UploadIcon />
          </IconButton>
          <IconButton
            aria-label={'refresh schedule'}
            onClick={onRefresh}
            size="large"
          >
            <RefreshIcon />
          </IconButton>
        </RowFlexBox>
      </Toolbar>

      <GamesTable games={schedule?.games || []} />
    </ColumnFlexBox>
  );
};
