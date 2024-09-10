import { Types } from 'mongoose';

import Album from '../../models/album';

const CreateAlbum = async({
  name,
  description,
  media,
  albumType,
  eventId
}) => {
  const album = new Album({
    _id: new Types.ObjectId().toHexString(),
    name,
    description,
    media,
    eventId,
    albumType
  });
  await album.save();
  return album.toObject();
}

export default CreateAlbum