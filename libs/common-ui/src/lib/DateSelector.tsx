import { DatePickerProps, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { FunctionComponent, useCallback, useState } from 'react';
import { parse } from 'date-fns';
import { DATE_FORMAT } from '@soccer-utilities/models';
import { TextField } from '@mui/material';
import { DateFormatter } from '@soccer-utilities/core';

export type DateSelectorProps = Omit<
  Omit<DatePickerProps<Date>, 'onChange' | 'renderInput' | 'date'>,
  'value'
> & {
  'aria-label'?: string;
  onChange: (value: string | null) => void;
  value: string | null;
};
export const DateSelector: FunctionComponent<DateSelectorProps> = ({
  'aria-label': ariaLabel,
  value,
  onChange,
  ...rest
}) => {
  const handleChange = useCallback(
    (date: Date | null) => {
      onChange(DateFormatter.safeFormat(date));
    },
    [onChange]
  );

  const actualValue = value ? parse(value, DATE_FORMAT, new Date()) : null;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        value={actualValue}
        onChange={handleChange}
        clearable
        OpenPickerButtonProps={{ 'aria-label': ariaLabel }}
        renderInput={(props) => (
          <TextField
            {...props}
            inputProps={{ ...props.inputProps, 'aria-label': ariaLabel }}
          />
        )}
        {...rest}
      />
    </LocalizationProvider>
  );
};
