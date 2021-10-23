import { FunctionComponent, useCallback, useState } from 'react';
import { DateSelector, RowFlexBox } from '@soccer-utilities/common-ui';
import { DateRangeModel } from '@soccer-utilities/models';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export interface DateRangeSelectorProps {
  start?: string | null;
  end?: string | null;
  onSearch?: (range?: DateRangeModel) => void;
}

const styles = {
  spacer: {
    marginRight: 2,
  },
} as const;
export const DateRangeSelector: FunctionComponent<DateRangeSelectorProps> = ({
  start,
  end,
  onSearch,
}) => {
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const handleSearchDateRange = useCallback(() => {
    if (!onSearch) {
      return;
    }

    console.log('OnSearch', { startDate, endDate });
    if (!startDate || !endDate) {
      onSearch(undefined);
    } else {
      onSearch({ start: startDate, end: endDate });
    }
  }, [startDate, endDate, onSearch]);
  const disableSearch = (startDate && !endDate) || (endDate && !startDate);
  return (
    <RowFlexBox alignItems={'center'} justifyContent={'end'}>
      <DateSelector
        value={startDate || null}
        onChange={setStartDate}
        aria-label={'start date'}
      />
      <Box sx={styles.spacer} />
      <DateSelector
        value={endDate || null}
        onChange={setEndDate}
        aria-label={'end date'}
      />
      <Box sx={styles.spacer} />
      <IconButton
        aria-label={'search date range'}
        onClick={handleSearchDateRange}
        disabled={!!disableSearch}
        size="large"
      >
        <SearchIcon />
      </IconButton>
    </RowFlexBox>
  );
};
