import { GameModel } from '@soccer-utilities/core';
import { FunctionComponent } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { GameRow } from './GameRow';

export type GameProps = {
  games: Array<GameModel>;
}

export const GamesTable: FunctionComponent<GameProps> = ({games}) => {
  const rows = games.map((game, i) => <GameRow key={i} game={game} />);

  if (rows.length === 0) {
    return <Typography aria-label={'no games'} variant={'h3'}>No Games Available</Typography>
  }

  return (
    <Table aria-label={'games table'}>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Home Team</TableCell>
          <TableCell>Away Team</TableCell>
          <TableCell>Field</TableCell>
          <TableCell>Age Group</TableCell>
          <TableCell>Referees</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows}
      </TableBody>
    </Table>
  )
}


