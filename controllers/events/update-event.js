import Event from '../../models/event';

const UpdateEvent = async({
  name,
  description,
  media,
  eventId
}) => {
  const updatedEvent = await Event.findOneAndUpdate({
    _id: eventId  
  }, {
    $set: {
      name,
      description,
      media,
    }
  }, {
    new: true
  })
  return updatedEvent.toObject();
}

export default UpdateEvent