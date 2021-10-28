import { FunctionComponent, useCallback, useState } from 'react';
import { LoadingIndicator } from './LoadingIndicator';
import { NoOp } from './no-op';
import { RowFlexBox } from './RowFlexBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { HideableIconButton } from './HideableIconButton';

interface ConfirmableButtonProps {
  show?: boolean;
  isLoading?: boolean;
  'aria-label'?: string;
  onClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ConfirmableButton: FunctionComponent<ConfirmableButtonProps> = ({
  'aria-label': ariaLabel,
  show = true,
  isLoading = false,
  onClick = NoOp,
  onConfirm = NoOp,
  onCancel = NoOp,
  children,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const handleClick = useCallback(() => {
    setIsConfirming(true);
    onClick();
  }, [onClick, setIsConfirming]);
  const handleConfirm = useCallback(() => {
    setIsConfirming(false);
    onConfirm();
  }, [onConfirm, setIsConfirming]);
  const handleCancel = useCallback(() => {
    setIsConfirming(false);
    onCancel();
  }, [onCancel, setIsConfirming]);

  if (!show) {
    return null;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <RowFlexBox>
      <HideableIconButton
        show={!isConfirming}
        onClick={handleClick}
        aria-label={ariaLabel}
      >
        {children}
      </HideableIconButton>

      <HideableIconButton
        show={isConfirming}
        onClick={handleConfirm}
        aria-label={`${ariaLabel} confirm`}
      >
        <CheckCircleIcon color={'success'} />
      </HideableIconButton>

      <HideableIconButton
        show={isConfirming}
        onClick={handleCancel}
        aria-label={`${ariaLabel} cancel`}
      >
        <CancelIcon color={'error'} />
      </HideableIconButton>
    </RowFlexBox>
  );
};
