import {IndicatorSeries} from '../../types/Indicator.js';
import {SMA} from '../SMA/SMA.js';

/**
 * 威尔德平滑移动平均线 (WSMA)
 * 类型：趋势
 *
 * 由约翰·威尔斯·威尔德（Jr.）开发，用于识别和发现看涨与看跌趋势。与指数移动平均线类似，
 * 区别在于它使用 1/周期 的平滑系数，使其对价格变化的反应更慢。
 *
 * 同义词：
 * - 修正指数移动平均线 (MEMA)
 * - 平滑移动平均线 (SMMA)
 * - 威尔斯·威尔德平滑 (WWS)
 *
 * @see https://tlc.thinkorswim.com/center/reference/Tech-Indicators/studies-library/V-Z/WildersSmoothing
 */
export class WSMA extends IndicatorSeries {
  private readonly indicator: SMA;
  private readonly smoothingFactor: number;

  constructor(public readonly interval: number) {
    super();
    this.indicator = new SMA(interval);
    this.smoothingFactor = 1 / this.interval;
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(price: number, replace: boolean) {
    const sma = this.indicator.update(price, replace);
    if (replace && this.previousResult !== undefined) {
      const smoothed = (price - this.previousResult) * this.smoothingFactor;
      return this.setResult(smoothed + this.previousResult, replace);
    } else if (!replace && this.result !== undefined) {
      const smoothed = (price - this.result) * this.smoothingFactor;
      return this.setResult(smoothed + this.result, replace);
    } else if (this.result === undefined && sma !== null) {
      return this.setResult(sma, replace);
    }

    return null;
  }
}