import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import { FunctionComponent, useCallback } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { parse } from 'date-fns';
import { DATE_FORMAT } from '@soccer-utilities/core';

export type DateSelectorProps = Omit<Omit<KeyboardDatePickerProps, 'onChange'>, 'value'> & {
  onChange: (value: string) => void;
  value: string | null;
}
export const DateSelector: FunctionComponent<DateSelectorProps> = ({
                                                                     'aria-label': ariaLabel,
                                                                     value,
                                                                     onChange,
                                                                     ...rest
                                                                   }) => {
  const handleChange = useCallback((date: MaterialUiPickersDate | null, newValue?: string | null) => {
    if (newValue) {
      onChange(newValue);
    }
  }, [onChange]);
  return <KeyboardDatePicker value={value ? parse(value, DATE_FORMAT, new Date()) : null}
                             format={DATE_FORMAT}
                             inputProps={{ 'aria-label': ariaLabel }}
                             KeyboardButtonProps={{ 'aria-label': ariaLabel }}
                             DialogProps={{ 'aria-label': ariaLabel }}
                             onChange={handleChange}
                             {...rest} />;
};
