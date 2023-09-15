import { getSongs } from '../services/server';
import { Box } from '@/shared/components';
import { Header, ListItems, Songs } from '../components';

export const revalidate = 0;

export default async function Home(): Promise<JSX.Element> {
  const { data } = await getSongs();

  return (
    <Box fullHeight noPadding>
      <Header title='Welcome back' />
      <ListItems image='/liked.png' name='Liked songs' href='/liked' />
      <Songs songs={data} title='Newest songs' />
    </Box>
  );
}
