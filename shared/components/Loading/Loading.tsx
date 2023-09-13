'use client';

import { useLoading } from '@/shared/states';
import styles from './Loading.module.css';

function Loading(): JSX.Element {
  const isOpen = useLoading((state) => state.isOpen);

  return (
    <>
      {isOpen && (
        <div className={styles.background}>
          <div className={styles.middle}>
            <div className={`${styles.bar} ${styles.bar1}`}></div>
            <div className={`${styles.bar} ${styles.bar2}`}></div>
            <div className={`${styles.bar} ${styles.bar3}`}></div>
            <div className={`${styles.bar} ${styles.bar4}`}></div>
            <div className={`${styles.bar} ${styles.bar5}`}></div>
            <div className={`${styles.bar} ${styles.bar6}`}></div>
            <div className={`${styles.bar} ${styles.bar7}`}></div>
            <div className={`${styles.bar} ${styles.bar8}`}></div>
          </div>
        </div>
      )}
    </>
  );
}
export default Loading;
