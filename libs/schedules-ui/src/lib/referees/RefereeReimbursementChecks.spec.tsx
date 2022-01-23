import { render, screen } from '@testing-library/react';
import { RefereeReimbursementChecks } from './RefereeReimbursementChecks';
import { ModelFactory } from '@soccer-utilities/testing-support';

describe('RefereeReimbursementChecks', () => {
  test('when empty checks are rendered then shows empty message', () => {
    render(<RefereeReimbursementChecks checks={[]} />);

    expect(screen.getByLabelText('empty')).toBeInTheDocument();
  });

  test('when checks are rendered then shows each check', () => {
    const checks = ModelFactory.createMany(
      ModelFactory.createRefereeReimbursementCheck,
      5
    );
    render(<RefereeReimbursementChecks checks={checks} />);

    expect(screen.getAllByLabelText('reimbursement check')).toHaveLength(5);
  });
});
