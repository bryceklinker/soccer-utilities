import { parseISO } from 'date-fns';

const NOT_AVAILABLE = 'N/A';

function number(value?: number | null): string {
  if (value) {
    return value.toFixed(2);
  }
  return NOT_AVAILABLE;
}

function currency(value?: number | null): string {
  if (value) {
    return `$${number(value)}`;
  }

  return NOT_AVAILABLE;
}

function date(value?: string | null): string {
  if (!value) {
    return NOT_AVAILABLE;
  }
  const date = parseISO(value);
  return date.toLocaleDateString();
}

function time(value?: string | null): string {
  if (!value) {
    return NOT_AVAILABLE;
  }

  const datetime = parseISO(value);
  return datetime.toLocaleTimeString();
}

function datetime(value?: string | null): string {
  if (!value) {
    return NOT_AVAILABLE;
  }

  return `${date(value)} ${time(value)}`;
}

export const Formatter = {
  number,
  currency,
  date,
  time,
  datetime,
};
