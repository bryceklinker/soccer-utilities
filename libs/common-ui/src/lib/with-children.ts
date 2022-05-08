import { FC, ReactNode } from 'react';

export type WithChildren<TProps = Record<string, unknown>> = TProps & {
  children?: ReactNode;
};

export type FCWithChildren<TProps = Record<string, unknown>> = FC<
  WithChildren<TProps>
>;
