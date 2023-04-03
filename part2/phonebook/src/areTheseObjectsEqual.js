/** Function checking for equality of two objects.
 *  Use only if the application should save different numbers under the same name
 */

const areTheseObjectsEqual = (first, second) => {
  const firstProperties = Object.getOwnPropertyNames(first);
  const secondProperties = Object.getOwnPropertyNames(second);
  /** Check for same number of properties */
  if (firstProperties.length !== secondProperties.length) {
    return false;
  }
  /** Check if the same properties are contained in both objects */
  const hasAllKeys = firstProperties.every(
    (value) => !!secondProperties.find((v) => v === value)
  );

  if (!hasAllKeys) {
    return false;
  }
  /** Check if all properties have the same values in both objects */
  for (const key of firstProperties) {
    if (first[key] !== second[key]) {
      return false;
    }
  }

  return true;
};
