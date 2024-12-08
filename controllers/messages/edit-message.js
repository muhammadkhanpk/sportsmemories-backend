import Message from "../../models/messages";

const EditMessage = async ({ messageId, userId, text, image }) => {
  // Prepare the update object dynamically to only include provided fields
  const updateFields = {};
  
  if (text) updateFields.text = text; // Update text only if provided
  if (image) updateFields.image = image; // Update image only if provided

  const editedMessage = await Message.findOneAndUpdate(
    { _id: messageId, userId }, // Find message by ID and userId for security
    { $set: updateFields }, // Update only provided fields
    { new: true } // Return the updated document
  );

  return editedMessage ? editedMessage.toObject() : null; // Return the updated message or null if not found
};

export default EditMessage;
