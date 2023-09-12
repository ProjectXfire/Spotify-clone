import NextLink from 'next/link';
import styles from './RouteItem.module.css';
import { type IRoutes } from '@/shared/types';

interface Props {
  route: IRoutes;
}

function RouteItem({ route }: Props): JSX.Element {
  const Icon = route.icon;

  return (
    <NextLink
      className={`${styles['route-item']} ${route.active ? styles.active : ''}`}
      href={route.href}
    >
      <Icon /> {route.label}
    </NextLink>
  );
}
export default RouteItem;
