/**
 * 向数组添加一个元素，或替换数组中的最后一个元素。
 * 如果超出数组限制大小，最旧的数组元素将被移除并由函数返回。
 */
export function pushUpdate<T>(array: T[], replace: boolean, item: T, maxLength: number) {
  if (array.length > 0 && replace === true) {
    array[array.length - 1] = item;
  } else {
    array.push(item);
  }

  if (array.length > maxLength) {
    return array.shift();
  }

  return null;
}