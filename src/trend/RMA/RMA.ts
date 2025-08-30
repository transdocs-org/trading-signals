import {MovingAverage} from '../MA/MovingAverage.js';
import {NotEnoughDataError} from '../../error/index.js';

/**
 * 相对移动平均 (RMA)
 * 类型：趋势
 *
 * 使用 RMA 来识别看涨或看跌趋势。与 SMA 和 EMA 相比，它提供更平滑的曲线，对价格变化反应更慢。
 *
 * @see https://www.tradingcode.net/tradingview/ema-versus-rma/
 * @see https://www.tradingcode.net/tradingview/relative-moving-average/#calculation-process
 */
export class RMA extends MovingAverage {
  private pricesCounter = 0;
  private readonly weightFactor: number;

  constructor(public override readonly interval: number) {
    super(interval);
    this.weightFactor = 1 / this.interval;
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(price: number, replace: boolean): number {
    if (!replace) {
      this.pricesCounter++;
    } else if (replace && this.pricesCounter === 0) {
      this.pricesCounter++;
    }

    if (replace && this.previousResult !== undefined) {
      return this.setResult(price * this.weightFactor + this.previousResult * (1 - this.weightFactor), replace);
    }
    return this.setResult(
      price * this.weightFactor + (this.result !== undefined ? this.result : price) * (1 - this.weightFactor),
      replace
    );
  }

  override getResultOrThrow(): number {
    if (this.pricesCounter < this.interval) {
      throw new NotEnoughDataError(this.getRequiredInputs());
    }

    return this.result!;
  }

  override get isStable(): boolean {
    try {
      this.getResultOrThrow();
      return true;
    } catch {
      return false;
    }
  }
}