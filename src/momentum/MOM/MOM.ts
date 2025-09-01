import {IndicatorSeries} from '../../types/Indicator.js';
import {pushUpdate} from '../../util/pushUpdate.js';

/**
 * 动量指标 (MOM / MTM)
 * 类型：动量型
 *
 * 动量指标返回当前价格与 n 个周期前价格之间的变化量。
 *
 * @see https://en.wikipedia.org/wiki/Momentum_(technical_analysis)
 * @see https://www.warriortrading.com/momentum-indicator/
 */
export class MOM extends IndicatorSeries {
  private readonly history: number[];
  private readonly historyLength: number;

  constructor(public readonly interval: number) {
    super();
    this.historyLength = interval + 1;
    this.history = [];
  }

  override getRequiredInputs() {
    return this.historyLength;
  }

  update(value: number, replace: boolean) {
    pushUpdate(this.history, replace, value, this.historyLength);

    if (this.history.length === this.historyLength) {
      return this.setResult(value - this.history[0], replace);
    }

    return null;
  }
}