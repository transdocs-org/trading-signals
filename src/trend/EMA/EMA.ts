import {MovingAverage} from '../MA/MovingAverage.js';
import {NotEnoughDataError} from '../../error/index.js';

/**
 * 指数移动平均线（EMA）
 * 类型：趋势
 *
 * 与简单移动平均线（SMA）相比，EMA 更加重视近期价格以减少滞后。由于它对价格变化反应迅速，当价格上涨或下跌时，EMA 上升和下降的速度都比 SMA 快。
 *
 * @see https://www.investopedia.com/terms/e/ema.asp
 */
export class EMA extends MovingAverage {
  private pricesCounter = 0;
  private readonly weightFactor: number;

  constructor(public override readonly interval: number) {
    super(interval);
    this.weightFactor = 2 / (this.interval + 1);
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