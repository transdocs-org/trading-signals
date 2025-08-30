import {EMA} from '../EMA/EMA.js';
import {IndicatorSeries} from '../../types/Indicator.js';

/**
 * 双重指数移动平均线（DEMA）
 * 类型：趋势
 *
 * 双重指数移动平均线（DEMA）由 Patrick G. Mulloy 开发。它通过对近期值赋予更高权重，试图消除移动平均线固有的滞后性。其名称来源于将 EMA 的值翻倍，使其对短期价格变动的反应比普通 EMA 更快。
 *
 * @see https://www.investopedia.com/terms/d/double-exponential-moving-average.asp
 */
export class DEMA extends IndicatorSeries {
  private readonly inner: EMA;
  private readonly outer: EMA;

  constructor(public readonly interval: number) {
    super();
    this.inner = new EMA(interval);
    this.outer = new EMA(interval);
  }

  override getRequiredInputs() {
    return this.outer.getRequiredInputs();
  }

  update(price: number, replace: boolean): number {
    const innerResult = this.inner.update(price, replace);
    const outerResult = this.outer.update(innerResult, replace);
    return this.setResult(innerResult * 2 - outerResult, replace);
  }

  override get isStable(): boolean {
    return this.outer.isStable;
  }
}