import { getSongsByTitle } from '../../services/server';
import { Header, SongsResult } from '../../components';
import { Box, Search } from '@/shared/components';

interface Props {
  searchParams: { title: string };
}

async function SearchPage({ searchParams }: Props): Promise<JSX.Element> {
  const { title } = searchParams;
  const { data } = await getSongsByTitle(title);

  return (
    <Box fullHeight noPadding>
      <Header title='Search' />
      <Search queryName='title' />
      <SongsResult songs={data} />
    </Box>
  );
}
export default SearchPage;
