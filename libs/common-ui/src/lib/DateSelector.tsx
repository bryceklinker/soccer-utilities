import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';
import { FunctionComponent, useCallback } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { parse } from 'date-fns';
import { DATE_FORMAT } from '@soccer-utilities/models';
import DateFnsUtils from '@date-io/date-fns';

export type DateSelectorProps = Omit<
  Omit<KeyboardDatePickerProps, 'onChange'>,
  'value'
> & {
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
    (date: MaterialUiPickersDate | null, newValue?: string | null) => {
      onChange(newValue || null);
    },
    [onChange]
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        value={value ? parse(value, DATE_FORMAT, new Date()) : null}
        format={DATE_FORMAT}
        inputProps={{ 'aria-label': ariaLabel }}
        KeyboardButtonProps={{ 'aria-label': ariaLabel }}
        DialogProps={{ 'aria-label': ariaLabel }}
        onChange={handleChange}
        clearable
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};
