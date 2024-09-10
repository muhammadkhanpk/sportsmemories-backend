import Album from '../../models/album';
import Event from '../../models/event';

const DeleteEvent = async({ eventId }) => {
  await Event.deleteOne({ _id: eventId });
  await Album.deleteMany({ eventId });
}

export default DeleteEvent