import Message from "../../models/messages";

const DeleteMessage = async({
 messageId,
 userId
}) => {
  await Message.deleteOne({ _id: messageId, userId });
}

export default DeleteMessage