import Event from '../../models/event';

const GetAllEvents = async({}) => {
  const events = await Event.find({});
  return events;
}

export default GetAllEvents