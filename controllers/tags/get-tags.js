import Tags from "../../models/tags";

const GetTags = async({ url }) => {
  const tag = await Tags.findOne({ url }).lean();
  return tag;
}

export default GetTags