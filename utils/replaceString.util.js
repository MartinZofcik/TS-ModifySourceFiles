/**
 * @param originalString
 * @param oldSubstring
 * @param newSubstring
 * @returns replacedString - string containing oldSubsring replaced by newSubstring
 */

export const replaceString = (originalString, oldSubstring, newSubstring) => {
  const replacedString = originalString.replace(oldSubstring, newSubstring);
  return replacedString;
};
