import { FunctionComponent } from 'react';
import { ColumnFlexBox } from '@soccer-utilities/common-ui';
import { RefereeChecksTable } from './RefereeChecksTable';
import { ClientRefereeCheckModel } from '@soccer-utilities/models';

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
      <RefereeChecksTable checks={checks} onCopyCheck={onCopyCheck} />
    </ColumnFlexBox>
  );
};
