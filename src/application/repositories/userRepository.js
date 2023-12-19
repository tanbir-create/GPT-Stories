export default function userRepository(repository) {
  const findOne = (params, selectFields) =>
    repository.findOne(params, selectFields);

  const findByProperty = (params) => repository.findByProperty(params);
  const countAll = (params) => repository.countAll(params);
  const findById = (id, selectFields) => repository.findById(id, selectFields);
  const add = (user) => repository.add(user);
  const deleteById = (id) => repository.deleteById(id);
  const updateById = (id, user) => repository.updateById(id, user);

  return {
    findOne,
    findByProperty,
    countAll,
    findById,
    add,
    deleteById,
    updateById
  };
}
