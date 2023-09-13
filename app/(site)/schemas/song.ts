import * as Yup from 'yup';

export const SongSchema = Yup.object({
  title: Yup.string().required(),
  author: Yup.string().required(),
  image: Yup.mixed().test('fileType', 'Must be a file', (value) => {
    return value === null || value instanceof File;
  }),
  song: Yup.mixed().test('fileType', 'Must be a file', (value) => {
    return value === null || value instanceof File;
  })
});
