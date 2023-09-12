import { Box } from '@/shared/components';
import { Header, Songs } from '../components';

export default function Home() {
  return (
    <Box fullHeight noPadding>
      <Header />
      <Songs />
    </Box>
  );
}
