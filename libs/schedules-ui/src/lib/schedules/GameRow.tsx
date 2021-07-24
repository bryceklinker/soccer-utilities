import { FunctionComponent } from 'react';
import { GameModel } from '@soccer-utilities/models';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { ColumnFlexBox } from '@soccer-utilities/common-ui';

export type GameRowProps = {
  game: GameModel;
};
export const GameRow: FunctionComponent<GameRowProps> = ({ game }) => {
  const referees = game.referees.map((ref, i) => (
    <Typography key={i} variant={'body1'}>
      {ref.type}: {ref.name}
    </Typography>
  ));
  return (
    <TableRow aria-label={'game'}>
      <TableCell aria-label={'date'}>{game.date}</TableCell>
      <TableCell aria-label={'time'}>{game.time}</TableCell>
      <TableCell aria-label={'home team'}>{game.homeTeam}</TableCell>
      <TableCell aria-label={'away team'}>{game.awayTeam}</TableCell>
      <TableCell aria-label={'field'}>{game.field}</TableCell>
      <TableCell aria-label={'age group'}>
        U{game.ageGroup.age} {game.ageGroup.gender}
      </TableCell>
      <TableCell aria-label={'referees'}>
        <ColumnFlexBox>{referees}</ColumnFlexBox>
      </TableCell>
    </TableRow>
  );
};
