import Event from '../../models/event';

const GetUserEvents = async({ userId }) => {
  const events = await Event.find({ userId });
  return events;
}

export default GetUserEvents