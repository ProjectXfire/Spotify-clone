'use client';

import styles from './Library.module.css';
import { useDialog } from '@/shared/states';
import { useUser } from '@/app/(site)/hooks';
import { LibraryMusic, Add } from '@mui/icons-material';
import { LibItem } from '..';
import { AuthDialog, UploadDialog } from '@/app/(site)/components';

function Library(): JSX.Element {
  const open = useDialog((state) => state.open);
  const setComponent = useDialog((state) => state.setComponent);
  const { user } = useUser();

  const onAddModal = (): void => {
    if (!user) {
      setComponent(<AuthDialog />);
    } else {
      // Check subscription
      setComponent(<UploadDialog />);
    }
    open();
  };

  return (
    <div className={styles.library}>
      <LibItem
        startIcon={<LibraryMusic />}
        text='Your library'
        actionIcon={<Add />}
        onClick={onAddModal}
      />
      <div>List of songs</div>
    </div>
  );
}
export default Library;
