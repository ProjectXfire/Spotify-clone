import { Box } from '@/shared/components';
import { Header, LikedSongs } from '../../components';
import { getLikedSongs } from '../../services/server';

export const revalidate = 0;

async function LikedSongsPage(): Promise<JSX.Element> {
  const { data } = await getLikedSongs();

  return (
    <Box fullHeight noPadding>
      <Header liked />
      <LikedSongs songs={data} />
    </Box>
  );
}
export default LikedSongsPage;
