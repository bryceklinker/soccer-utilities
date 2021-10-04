import { FunctionComponent } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { TimesheetStatus, UserTimesheetModel } from '@soccer-utilities/models';
import {
  ColumnFlexBox,
  Formatter,
  NoOp,
  RowFlexBox,
} from '@soccer-utilities/common-ui';

interface TimesheetCardProps {
  timesheet: UserTimesheetModel;
  onClockIn?: (timesheet: UserTimesheetModel) => void;
  onClockOut?: (timesheet: UserTimesheetModel) => void;
  onPay?: (timesheet: UserTimesheetModel) => void;
}

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
}));
export const TimesheetCard: FunctionComponent<TimesheetCardProps> = ({
  timesheet,
  onClockIn = NoOp,
  onClockOut = NoOp,
  onPay = NoOp,
}) => {
  const canClockIn = timesheet.status === TimesheetStatus.New;
  const canClockOut = timesheet.status === TimesheetStatus.Open;
  const canPay = timesheet.status === TimesheetStatus.Complete;
  const styles = useStyles();
  return (
    <Card className={styles.card} aria-label={'timesheet'}>
      <CardHeader
        title={
          <Typography variant={'h3'} aria-label={'title'}>
            {timesheet.username}
          </Typography>
        }
      />
      <CardContent className={styles.content}>
        <ColumnFlexBox>
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
        </ColumnFlexBox>
      </CardContent>
      <CardActions>
        <ColumnFlexBox flex={1} />
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
