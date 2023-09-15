export interface ISong {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export interface ILikedSong {
  user_id: string;
  song_id: string;
  songs: ISong;
}
