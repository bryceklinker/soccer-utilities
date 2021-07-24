import { ModelFactory } from '@soccer-utilities/testing-support';
import { RefereeChecksTable } from './RefereeChecksTable';
import { render, screen, within } from '@testing-library/react';
import { Gender, RefereeType } from '@soccer-utilities/models';
import userEvent from '@testing-library/user-event';

describe('RefereeCheckRow', () => {
  test('when check rendered then shows check data', () => {
    const check = ModelFactory.createClientRefereeCheckModel({
      date: '2020-03-26',
      time: '12:34 PM',
      name: 'Bill',
      amount: 35,
    });

    render(<RefereeChecksTable checks={[check]} />);

    const row = screen.getByLabelText('referee check');
    expect(within(row).getByLabelText('date')).toHaveTextContent('2020-03-26');
    expect(within(row).getByLabelText('time')).toHaveTextContent('12:34 PM');
    expect(within(row).getByLabelText('name')).toHaveTextContent('Bill');
    expect(within(row).getByLabelText('amount')).toHaveTextContent('$35');
  });

  test('when check rendered then shows memo', () => {
    const check = ModelFactory.createClientRefereeCheckModel({
      date: '2020-03-26',
      time: '12:34 PM',
      name: 'Bill',
      amount: 35,
      type: RefereeType.Center,
      ageGroup: ModelFactory.createAgeGroup({ age: 14, gender: Gender.Girls }),
    });

    render(<RefereeChecksTable checks={[check]} />);

    const row = screen.getByLabelText('referee check');
    expect(within(row).getByLabelText('memo')).toHaveTextContent(
      'U14 Girls 03/26 12:34 PM Center'
    );
  });

  test('when check copied then notifies of copy', () => {
    const onCopy = jest.fn();
    const check = ModelFactory.createClientRefereeCheckModel();

    render(<RefereeChecksTable checks={[check]} onCopyCheck={onCopy} />);

    userEvent.click(screen.getByRole('button', { name: 'copy check' }));

    expect(onCopy).toHaveBeenCalledWith(check);
  });
});
