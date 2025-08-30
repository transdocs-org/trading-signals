import {IndicatorSeries} from '../../types/Indicator.js';

/**
 * 移动平均线 (MA)
 * 类型：趋势
 *
 * 用于趋势跟踪（滞后）指标的基类。移动平均周期越长，滞后越大。
 *
 * @see https://www.investopedia.com/terms/m/movingaverage.asp
 */
export abstract class MovingAverage extends IndicatorSeries {
  constructor(public readonly interval: number) {
    super();
  }
}