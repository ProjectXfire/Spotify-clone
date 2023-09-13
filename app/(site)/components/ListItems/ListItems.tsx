'use client';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ListItem.module.css';
import { PlayCircleFilled } from '@mui/icons-material';

interface Props {
  image: string;
  name: string;
  href: string;
}

function ListItems({ name, image, href }: Props): JSX.Element {
  const router = useRouter();

  const onClick = (): void => {
    // Add authentication
    router.push(href);
  };

  return (
    <button className={styles['liked-song']} type='button' onClick={onClick}>
      <NextImage src={image} width={60} height={60} alt='liked' />
      <div className={styles['liked-song__text']}>
        <p>{name}</p>
        <PlayCircleFilled className={styles['play-button']} color='success' />
      </div>
    </button>
  );
}
export default ListItems;
