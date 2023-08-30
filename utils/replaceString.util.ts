/**
 * @param originalString
 * @param oldSubstring
 * @param newSubstring
 * @returns replacedString - string containing oldSubsring replaced by newSubstring
 */

export const replaceString = (
  originalString: string,
  oldSubstring: string,
  newSubstring: string
): string => {
  const replacedString: string = originalString.replace(
    oldSubstring,
    newSubstring
  );
  return replacedString;
};
