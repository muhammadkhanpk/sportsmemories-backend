import { Types } from 'mongoose';

import Event from '../../models/event';

const CreateEvent = async({
  name,
  description,
  media,
  eventType,
  userId
}) => {
  const event = new Event({
    _id: new Types.ObjectId().toHexString(),
    name,
    description,
    eventType,
    media,
    userId
  });
  await event.save();
  return event.toObject();
}

export default CreateEvent