import { ChangeEvent, FunctionComponent, useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UploadScheduleFormValidator = Yup.object().shape({
  scheduleFile: Yup.mixed<File>().required()
})

interface UploadScheduleForm {
  scheduleFile: File | null;
}

export type UploadScheduleDialogProps = {
  open: boolean;
  onUpload?: (formData: FormData) => void;
  onCancel?: () => void;
}
export const UploadScheduleDialog: FunctionComponent<UploadScheduleDialogProps> = ({ open, onUpload, onCancel }) => {
  const initialValues = useMemo<UploadScheduleForm>(() => ({scheduleFile: null}), []);
  const formik = useFormik<UploadScheduleForm>({
    initialValues,
    onSubmit: (values) => {
      if (onUpload && values.scheduleFile) {
        const form = new FormData();
        form.append('scheduleFile', values.scheduleFile);
        onUpload(form);
      }
    },
    validationSchema: UploadScheduleFormValidator,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      formik.setFieldValue('scheduleFile', evt.target.files[0]);
    }
  };
  const isUploadDisabled = !formik.isValid || formik.isSubmitting || formik.isValidating;
  return (
    <Dialog open={open} aria-label={'upload schedule dialog'}>
      <DialogTitle>Upload Game Schedule</DialogTitle>
      <DialogContent>
        <FormControl>
          <InputLabel htmlFor={'scheduleFile'}>
            Schedule File
            <Input name={'scheduleFile'}
                   type={'file'}
                   onChange={handleFileChange}
                   inputProps={{
                     'aria-label': 'schedule file'
                   }}
            />
          </InputLabel>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button aria-label={'cancel upload button'} onClick={onCancel}>
          Cancel
        </Button>
        <Button color={'primary'} aria-label={'upload schedule button'} disabled={isUploadDisabled} onClick={() => formik.submitForm()}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
