export const generateStorageKey = () => {
  return `save-data-${new Date().toLocaleDateString("sv-SV").toString()}`;
};
