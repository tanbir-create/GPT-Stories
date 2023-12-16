export default function userRepository(repository) {
  const findOne = (params, selectFields) =>
    repository.findOne(params, selectFields);
  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id) => repository.findById(id);
  const add = (user) => repository.add(user);
  const deleteById = (id) => repository.deleteById(id);

  return {
    findOne,
    findByProperty,
    countAll,
    findById,
    add,
    deleteById
  };
}
