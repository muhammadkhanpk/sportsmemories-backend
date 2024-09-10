import Album from '../../models/album';

const DeleteAlbum = async({ albumId }) => {
  await Album.deleteOne({ _id: albumId });
}

export default DeleteAlbum