export const deleteSpace = (str: string) => {
  if (str != undefined) {
    str = str.replace(/-/g, ' ');
  }
  return str;
};
