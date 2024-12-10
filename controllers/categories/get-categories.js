import Categories from "../../models/categories";

const GetCategories= async({ type }) => {
  const category = await Categories.find({ type });
  return category
}

export default GetCategories