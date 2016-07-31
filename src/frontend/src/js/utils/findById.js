export default function findById(collection, idToFind, defaultValue = {}) {
  const result = collection.find(({ id }) => id === idToFind);
  return result || defaultValue;
}
