import { FunctionComponent } from 'react';
import { ColumnFlexBox, RowFlexBox, Spacer } from '@soccer-utilities/common-ui';
import { RefereeChecksTable } from './RefereeChecksTable';
import { ClientRefereeCheckModel } from '@soccer-utilities/models';
import { Toolbar, Typography } from '@material-ui/core';

export interface RefereeChecksProps {
  checks: Array<ClientRefereeCheckModel>;
  onCopyCheck?: (check: ClientRefereeCheckModel) => void;
}

export const RefereeChecks: FunctionComponent<RefereeChecksProps> = ({
  checks,
  onCopyCheck,
}: RefereeChecksProps) => {
  return (
    <ColumnFlexBox>
      <Toolbar>
        <RowFlexBox>
          <Spacer />
          <Typography variant={'body1'} aria-label={'referee check count'}>
            Number of Checks {checks.length}
          </Typography>
        </RowFlexBox>
      </Toolbar>
      <RefereeChecksTable checks={checks} onCopyCheck={onCopyCheck} />
    </ColumnFlexBox>
  );
};
