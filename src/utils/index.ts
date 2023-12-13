export function isOutOfRange(
  comparator: number,
  { max, min }: { max: number; min: number },
) {
  return comparator > max || comparator < min;
}
