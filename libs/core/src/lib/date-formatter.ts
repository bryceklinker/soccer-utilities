import { format } from 'date-fns';
import { DATE_FORMAT } from '@soccer-utilities/models';

function safeFormat(date: Date | null): string | null {
  try {
    return date ? format(date, DATE_FORMAT) : null;
  } catch {
    return null;
  }
}

export const DateFormatter = {
  safeFormat,
};
