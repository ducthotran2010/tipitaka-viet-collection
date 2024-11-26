/**
 * Usage example
 * const array = [ some array elements ];
 * const chunkSize = 5;
 * const chunks = chunkArray(array, chunkSize);
 */
export function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}
