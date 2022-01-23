import { ModelFactory } from '@soccer-utilities/testing-support';
import { render, screen } from '@testing-library/react';
import { RefereeReimbursementChecks } from '@soccer-utilities/schedules-ui';

describe('RefereeReimbursementCheckRow', () => {
  test('when rendered then shows reimbursement check details', () => {
    const check = ModelFactory.createRefereeReimbursementCheck({
      games: ModelFactory.createMany(ModelFactory.createGame, 4),
    });

    render(<RefereeReimbursementChecks checks={[check]} />);

    expect(screen.getByLabelText('referee')).toHaveTextContent(check.referee);
    expect(screen.getByLabelText('amount')).toHaveTextContent(
      `${check.amount}`
    );
    expect(screen.getByLabelText('number of games')).toHaveTextContent('4');
  });
});
