import styles from './Library.module.css';

interface Props {
  startIcon?: React.ReactNode;
  text?: string;
  actionIcon?: React.ReactNode;
  onClick?: () => void;
}

function LibItem({ startIcon, text, actionIcon, onClick }: Props): JSX.Element {
  const handleClick = (): void => {
    if (onClick) onClick();
  };

  return (
    <div className={styles['library-item']}>
      <div className={styles['library-item__text']}>
        {startIcon} {text}
      </div>
      <button className={styles['library-item__action']} type='button' onClick={handleClick}>
        {actionIcon}
      </button>
    </div>
  );
}
export default LibItem;
