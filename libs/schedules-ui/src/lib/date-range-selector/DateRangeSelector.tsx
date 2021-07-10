import { FunctionComponent, useCallback, useState } from 'react';
import { RowFlexBox } from '@soccer-utilities/common-ui';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DateRange } from '@soccer-utilities/core';
import { IconButton, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { DateSelector } from './DateSelector';

export interface DateRangeSelectorProps {
  start?: string | null;
  end?: string | null;
  onSearch?: (range: DateRange) => void;
}

const useStyles = makeStyles(theme => ({
  spacer: {
    marginRight: theme.spacing(2)
  }
}))
export const DateRangeSelector: FunctionComponent<DateRangeSelectorProps> = ({ start, end, onSearch }) => {
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const handleSearchDateRange = useCallback(() => {
    if (onSearch && startDate && endDate) {
      onSearch({ start: startDate, end: endDate });
    }
  }, [startDate, endDate, onSearch]);
  const styles = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <RowFlexBox alignItems={'center'} justifyContent={'end'}>
        <DateSelector value={startDate || null}
                      onChange={setStartDate}
                      placeholder={'Select Start Date'}
                      aria-label={'start date'} />
        <div className={styles.spacer} />
        <DateSelector value={endDate || null}
                      onChange={setEndDate}
                      placeholder={'Select End Date'}
                      aria-label={'end date'} />
        <div className={styles.spacer} />
        <IconButton aria-label={'search date range'} onClick={handleSearchDateRange}>
          <SearchIcon />
        </IconButton>
      </RowFlexBox>
    </MuiPickersUtilsProvider>
  );
};

