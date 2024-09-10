import Event from '../../models/event';

const GetEvent = async({ eventId }) => {
  const event = await Event.findOne({ _id: eventId });
  return event;
}

export default GetEvent