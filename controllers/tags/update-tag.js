import Tags from "../../models/tags";

const UpdateTag = async({
  url,
  tags
}) => {
  const updatedTag = await Tags.findOneAndUpdate({
    url
  }, {
    $set: {
      tags
    }
  }, {
    new: true
  })
  return updatedTag.toObject();
}

export default UpdateTag