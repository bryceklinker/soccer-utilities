import { FunctionComponent } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import { TimesheetStatus, UserTimesheetModel } from '@soccer-utilities/models';
import { Formatter, NoOp } from '@soccer-utilities/common-ui';

interface TimesheetCardProps {
  timesheet: UserTimesheetModel;
  onClockIn?: (timesheet: UserTimesheetModel) => void;
  onClockOut?: (timesheet: UserTimesheetModel) => void;
  onPay?: (timesheet: UserTimesheetModel) => void;
}

export const TimesheetCard: FunctionComponent<TimesheetCardProps> = ({
  timesheet,
  onClockIn = NoOp,
  onClockOut = NoOp,
  onPay = NoOp,
}) => {
  const canClockIn = timesheet.status === TimesheetStatus.New;
  const canClockOut = timesheet.status === TimesheetStatus.Open;
  const canPay = timesheet.status === TimesheetStatus.Complete;
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant={'h3'} aria-label={'title'}>
            {timesheet.username}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant={'body1'} aria-label={'rate'}>
          Hourly Rate: {Formatter.number(timesheet.rate)}
        </Typography>
        <Typography variant={'body1'} aria-label={'hours'}>
          Hours Worked: {Formatter.number(timesheet.hours)}
        </Typography>
        <Typography variant={'body1'} aria-label={'amount'}>
          Total Amount: {Formatter.currency(timesheet.amount)}
        </Typography>
        <Typography variant={'body1'} aria-label={'status'}>
          Status: {timesheet.status}
        </Typography>
        <Typography variant={'body1'} aria-label={'time in'}>
          Time In: {Formatter.datetime(timesheet.timeIn)}
        </Typography>
        <Typography variant={'body1'} aria-label={'time out'}>
          Time Out: {Formatter.datetime(timesheet.timeOut)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          aria-label={'clock in'}
          disabled={!canClockIn}
          onClick={() => onClockIn(timesheet)}
        >
          Clock In
        </Button>
        <Button
          aria-label={'clock out'}
          disabled={!canClockOut}
          onClick={() => onClockOut(timesheet)}
        >
          Clock out
        </Button>
        <Button
          aria-label={'pay'}
          disabled={!canPay}
          onClick={() => onPay(timesheet)}
        >
          Pay
        </Button>
      </CardActions>
    </Card>
  );
};
