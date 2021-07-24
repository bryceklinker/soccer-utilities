import { render, screen } from '@testing-library/react';
import { RefereeChecksTable } from './RefereeChecksTable';
import { ModelFactory } from '@soccer-utilities/testing-support';

describe('RefereeChecksTable', () => {
  test('when rendered with empty checks then shows empty message', () => {
    render(<RefereeChecksTable checks={[]} />);

    expect(screen.getByLabelText('empty')).toBeInTheDocument();
  });

  test('when rendered with checks then shows all checks', () => {
    const checks = ModelFactory.createMany(
      ModelFactory.createClientRefereeCheckModel,
      4
    );

    render(<RefereeChecksTable checks={checks} />);

    expect(screen.getAllByLabelText('referee check')).toHaveLength(4);
  });
});
