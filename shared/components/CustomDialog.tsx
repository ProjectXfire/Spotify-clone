'use client';

import { useDialog } from '../states';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function CustomDialog() {
  const isOpen = useDialog((state) => state.isOpen);
  const close = useDialog((state) => state.close);
  const content = useDialog((state) => state.component);

  const onClose = (): void => {
    close();
  };

  return (
    <Dialog open={isOpen} fullWidth onClose={onClose}>
      <DialogContent sx={{ minHeight: 200, pt: 4.5, position: 'relative' }}>
        <IconButton size='small' sx={{ position: 'absolute', right: 5, top: 5 }} onClick={onClose}>
          <Close />
        </IconButton>
        {content}
      </DialogContent>
    </Dialog>
  );
}
export default CustomDialog;
