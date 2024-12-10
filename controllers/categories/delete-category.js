import Categories from '../../models/categories';

const DeleteCategory = async({
  id
}) => {
  await Categories.deleteOne({_id: id})
}

export default DeleteCategory