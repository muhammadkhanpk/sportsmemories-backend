import Event from '../../models/event';

const UploadEventMedia = async({
  eventId,
  newMedia
}) => {
  const updatedEvent = await Event.findOneAndUpdate({
    _id: eventId  
  }, {
    $addToSet: { media: { $each: newMedia }}
  }, {
    new: true
  })
  return updatedEvent.toObject();
}

export default UploadEventMedia