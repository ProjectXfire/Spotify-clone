import styles from './Library.module.css';
import { LibraryMusic, Add } from '@mui/icons-material';
import { LibItem } from '..';

function Library(): JSX.Element {
  const onAdd = (): void => {};

  return (
    <div className={styles.library}>
      <LibItem
        startIcon={<LibraryMusic />}
        text='Your library'
        actionIcon={<Add />}
        onClick={onAdd}
      />
      <div>List of songs</div>
    </div>
  );
}
export default Library;
