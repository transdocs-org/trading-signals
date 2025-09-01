import {IndicatorSeries} from '../../types/Indicator.js';
import {SMA} from '../../trend/SMA/SMA.js';
import {pushUpdate} from '../../util/pushUpdate.js';

/**
 * 重心（CG）
 * 类型：动量
 *
 * John Ehlers 的重心（CG）振荡器的实现。重心（CG）旨在以最小滞后（领先指标）识别价格走势的转折点。CG 的峰值和谷底可能领先于实际价格的高点和低点。CG 通常与其自身的信号线配对，用于进出场触发。
 *
 * 解读：
 * 穿越零线可能暗示趋势的转变。
 *
 * 注意：
 * - 根据规范，价格输入应按以下方式计算：((最高价 + 最低价) / 2)
 * - 所选区间应为主导周期长度的一半（信号线）
 * - 如果区间过短，CG 振荡器会失去平滑性，变得过于敏感，不利于盈利交易
 * @see http://www.mesasoftware.com/papers/TheCGOscillator.pdf
 */
export class CG extends IndicatorSeries {
  public signal: SMA;

  public readonly prices: number[] = [];

  override get isStable(): boolean {
    return this.signal.isStable;
  }

  constructor(
    public readonly interval: number,
    public readonly signalInterval: number
  ) {
    super();
    this.signal = new SMA(signalInterval);
  }

  override getRequiredInputs() {
    return this.signal.getRequiredInputs();
  }

  update(price: number, replace: boolean) {
    pushUpdate(this.prices, replace, price, this.interval);

    let nominator = 0;
    let denominator = 0;

    for (let i = 0; i < this.prices.length; ++i) {
      const price = this.prices[i];
      nominator = nominator + price * (i + 1);
      denominator = denominator + price;
    }

    const cg = denominator > 0 ? nominator / denominator : 0;

    this.signal.update(cg, replace);

    if (this.signal.isStable) {
      return this.setResult(cg, replace);
    }

    return null;
  }
}