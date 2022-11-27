/**
 *
 * @param {number} start
 * @param {number} end
 * @returns list with values between 2 numbers inclusive
 */
export const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)
}
