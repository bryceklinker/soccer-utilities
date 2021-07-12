import { render, screen } from '@testing-library/react';
import { RefereeChecks } from './RefereeChecks';
import { RefereeChecksTable } from '@soccer-utilities/schedules-ui';
import { ModelFactory } from '@soccer-utilities/testing-support';
import userEvent from '@testing-library/user-event';

describe('RefereeChecks', () => {
  test('when empty referee checks are rendered then shows empty message', () => {
    render(<RefereeChecks checks={[]} />);

    expect(screen.getByLabelText('empty')).toBeInTheDocument();
  });

  test('when checks rendered then shows checks', () => {
    const checks = ModelFactory.createMany(ModelFactory.createClientRefereeCheckModel, 5);
    render(<RefereeChecksTable checks={checks} />);

    expect(screen.getAllByLabelText('referee check')).toHaveLength(5);
  });

  test('when check copied then notifies of copy', () => {
    const onCopy = jest.fn();
    const check = ModelFactory.createClientRefereeCheckModel();

    render(<RefereeChecks checks={[check]} onCopyCheck={onCopy} />);

    userEvent.click(screen.getByRole('button', {name: 'copy check'}));

    expect(onCopy).toHaveBeenCalledWith(check);
  })
});