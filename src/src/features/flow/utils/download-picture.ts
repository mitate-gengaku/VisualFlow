export const downPicture = (url: string) => {
  const a = document.createElement('a');
 
  a.setAttribute('download', 'download.png');
  a.setAttribute('href', url);
  a.click();
} 