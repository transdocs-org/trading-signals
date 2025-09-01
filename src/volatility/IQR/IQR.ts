import {IndicatorSeries} from '../../types/Indicator.js';
import {getQuartile} from '../../util/getQuartile.js';

/**
 * 四分位距 (IQR)
 * 类型：波动率
 *
 * IQR 是数据集中第 75 百分位数（Q3）与第 25 百分位数（Q1）之差。它是一种衡量统计离散度的指标，对异常值具有鲁棒性。
 *
 * @see https://github.com/bennycode/trading-signals/discussions/752
 * @see https://en.wikipedia.org/wiki/Interquartile_range
 */
export class IQR extends IndicatorSeries {
  private readonly values: number[] = [];

  constructor(public readonly interval: number) {
    super();
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(value: number, replace: boolean): number | null {
    if (replace) {
      this.values.pop();
    }

    this.values.push(value);

    if (this.values.length > this.interval) {
      this.values.shift();
    }

    if (this.values.length < this.interval) {
      return null;
    }

    const q1 = getQuartile(this.values, 0.25);
    const q3 = getQuartile(this.values, 0.75);

    return this.setResult(q3 - q1, replace);
  }
}