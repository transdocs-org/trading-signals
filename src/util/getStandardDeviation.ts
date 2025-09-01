import {getAverage} from './getAverage.js';

/**
 * 标准差用于计算一组价格相对于其平均价格的离散程度。
 * 与平均绝对偏差（MAD）相比，标准差能更明显地突出异常值。
 *
 * @see https://www.mathsisfun.com/data/standard-deviation-formulas.html
 * @see https://www.youtube.com/watch?v=9-8E8L_77-8
 */
export function getStandardDeviation(values: number[], average?: number): number {
  const middle = average || getAverage(values);
  const squaredDifferences = values.map(value => value - middle).map(value => value * value);
  const averageDifference = getAverage(squaredDifferences);
  return Math.sqrt(averageDifference);
}