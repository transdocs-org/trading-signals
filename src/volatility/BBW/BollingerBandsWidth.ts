import type {BollingerBands} from '../BBANDS/BollingerBands.js';
import {IndicatorSeries} from '../../types/Indicator.js';

/**
 * 布林带宽度 (BBW)
 * 类型：波动性指标
 *
 * 布林带宽度（BBW）指标由 John A. Bollinger 开发，将布林带的信息合并为一个明确的数值。
 * 它通过表示上轨与下轨之间的差值，来定义基础布林带的狭窄程度。
 *
 * @see https://www.tradingview.com/support/solutions/43000501972-bollinger-bands-width-bbw/
 */
export class BollingerBandsWidth extends IndicatorSeries {
  constructor(public readonly bollingerBands: BollingerBands) {
    super();
  }

  override getRequiredInputs() {
    return this.bollingerBands.getRequiredInputs();
  }

  update(price: number, replace: boolean) {
    const result = this.bollingerBands.update(price, replace);
    if (result) {
      return this.setResult((result.upper - result.lower) / result.middle, replace);
    }

    return null;
  }
}