import Album from '../../models/album';

const UploadEventMedia = async ({ eventId, newMedia, name }) => {
  const updatedAlbum = await Album.findOneAndUpdate(
    { eventId, name },
    {
      $setOnInsert: {
        _id: 'uncategorized'
      },
      $set: {
        description: 'Uncategorized',
        albumType: 'Uncategorized'
      },
      $addToSet: { 
        media: { $each: newMedia }  // Add items in newMedia to the media array without duplicates
      }
    },
    {
      upsert: true,
      new: true  // Return the modified document
    }
  ).lean();

  return updatedAlbum;
}

export default UploadEventMedia;
