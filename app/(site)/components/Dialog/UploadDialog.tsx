'use client';

import { useRef } from 'react';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import styles from './Dialog.module.css';
import { type ICreateSongDto } from '../../dtos';
import { SongSchema } from '../../schemas';
import { addNewSong } from '../../services';
import { useUser } from '../../hooks';
import { useDialog, useLoading } from '@/shared/states';
import { Button, TextField, Typography } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function UploadDialog(): JSX.Element {
  const initValues: ICreateSongDto = {
    author: '',
    song: null,
    title: '',
    image: null
  };

  const songInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const closeDialog = useDialog((state) => state.close);
  const openLoading = useLoading((state) => state.open);
  const closeLoading = useLoading((state) => state.close);

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const onSubmit = async (values: ICreateSongDto): Promise<void> => {
    openLoading();
    if (!user) return;
    const { message, errorMessage } = await addNewSong(values, user.id, supabaseClient);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.success(message);
      closeDialog();
    }
    closeLoading();
  };

  return (
    <div className={styles.dialog}>
      <Typography variant='h6' fontWeight='bold' textAlign='center'>
        Add a song
      </Typography>
      <Typography variant='body2' textAlign='center'>
        Upload an mp3 file
      </Typography>
      <Formik initialValues={initValues} validationSchema={SongSchema} onSubmit={onSubmit}>
        {({ getFieldProps, errors, touched, handleSubmit, values, setFieldValue }) => (
          <Form className={styles['dialog-song']} onSubmit={handleSubmit}>
            <TextField
              {...getFieldProps('title')}
              color='secondary'
              fullWidth
              label='Title'
              variant='outlined'
              error={!!errors.title && !!touched.title}
            />
            <TextField
              {...getFieldProps('author')}
              color='secondary'
              fullWidth
              label='Author'
              variant='outlined'
              error={!!errors.author && !!touched.author}
            />
            <Typography variant='body2'>Select a song file</Typography>
            <Button
              disableElevation
              variant='contained'
              onClick={() => {
                songInputRef.current?.click();
              }}
            >
              <Typography sx={{ opacity: 0.4, mr: 2 }} variant='body2'>
                Choose a file (.mp3)
              </Typography>
              {values.song ? values.song.name : 'No file chosen'}
            </Button>
            <input
              style={{ display: 'none' }}
              ref={songInputRef}
              type='file'
              accept='.mp3'
              onChange={(e) => {
                if (e.target.files) setFieldValue('song', e.target.files[0]);
              }}
            />
            <Typography variant='body2'>Select a cover</Typography>
            <Button
              disableElevation
              variant='contained'
              onClick={() => {
                imageInputRef.current?.click();
              }}
            >
              <Typography sx={{ opacity: 0.4, mr: 2 }} variant='body2'>
                Choose a file
              </Typography>
              {values.image ? values.image.name : 'No file chosen'}
            </Button>
            <input
              style={{ display: 'none' }}
              ref={imageInputRef}
              type='file'
              accept='image/*'
              onChange={(e) => {
                if (e.target.files) setFieldValue('image', e.target.files[0]);
              }}
            />

            <Button
              sx={{ borderRadius: 20 }}
              type='submit'
              disableElevation
              color='primary'
              variant='contained'
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default UploadDialog;
