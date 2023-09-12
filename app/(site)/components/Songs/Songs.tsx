import { Typography } from '@mui/material';
import styles from './Songs.module.css';

function Songs(): JSX.Element {
  return (
    <section className={styles['songs-container']}>
      <Typography variant='h5'>Newest songs</Typography>
      <ul>List of songs</ul>
    </section>
  );
}
export default Songs;
