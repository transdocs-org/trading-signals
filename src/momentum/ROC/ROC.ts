import {IndicatorSeries} from '../../types/Indicator.js';
import {pushUpdate} from '../../util/pushUpdate.js';

/**
 * 变动率指标 (ROC)
 * 类型：动量
 *
 * 正的变动率 (ROC) 表示高动量和上升趋势。ROC 下降甚至为负则表明下降趋势。
 *
 * @see https://www.investopedia.com/terms/r/rateofchange.asp
 */
export class ROC extends IndicatorSeries {
  public readonly prices: number[] = [];

  constructor(public readonly interval: number) {
    super();
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(price: number, replace: boolean) {
    const comparePrice = pushUpdate(this.prices, replace, price, this.interval);

    if (comparePrice) {
      return this.setResult((price - comparePrice) / comparePrice, replace);
    }

    return null;
  }
}