import { FunctionComponent, useCallback, useState } from 'react';
import { DateSelector, RowFlexBox } from '@soccer-utilities/common-ui';
import { DateRangeModel } from '@soccer-utilities/core';
import { IconButton, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export interface DateRangeSelectorProps {
  start?: string | null;
  end?: string | null;
  onSearch?: (range?: DateRangeModel) => void;
}

const useStyles = makeStyles(theme => ({
  spacer: {
    marginRight: theme.spacing(2)
  }
}));
export const DateRangeSelector: FunctionComponent<DateRangeSelectorProps> = ({ start, end, onSearch }) => {
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const handleSearchDateRange = useCallback(() => {
    if (!onSearch) {
      return;
    }

    if (!startDate || !endDate) {
      onSearch(undefined);
    } else {
      onSearch({ start: startDate, end: endDate });
    }
  }, [startDate, endDate, onSearch]);
  const styles = useStyles();
  const disableSearch = (startDate && !endDate) || (endDate && !startDate);
  return (
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
      <IconButton aria-label={'search date range'} onClick={handleSearchDateRange} disabled={!!disableSearch}>
        <SearchIcon />
      </IconButton>
    </RowFlexBox>
  );
};

