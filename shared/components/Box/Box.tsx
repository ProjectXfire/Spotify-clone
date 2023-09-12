import styles from './Box.module.css';

interface Props {
  children: React.ReactNode;
  fullHeight?: boolean;
  noPadding?: boolean;
}

function Box({ children, fullHeight, noPadding }: Props): JSX.Element {
  return (
    <section
      className={`${styles['box']} ${fullHeight ? styles['box--height'] : ''} ${
        noPadding ? styles['no-padding'] : ''
      }`}
    >
      {children}
    </section>
  );
}
export default Box;
