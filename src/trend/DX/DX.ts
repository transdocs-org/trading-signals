import {ATR} from '../../volatility/ATR/ATR.js';
import {IndicatorSeries} from '../../types/Indicator.js';
import type {MovingAverage} from '../MA/MovingAverage.js';
import type {MovingAverageTypes} from '../MA/MovingAverageTypes.js';
import type {HighLowClose} from '../../types/HighLowClose.js';
import {WSMA} from '../WSMA/WSMA.js';

/**
 * 方向运动指数 (DMI / DX)
 * 类型：趋势（使用 +DI 与 -DI）
 *
 * DX 由 John Welles Wilder (Jr.) 提出，可帮助交易者评估趋势的强度（动量）
 * 以及趋势的方向。
 *
 * 若趋势没有变化，则 DX 为 `0`。当趋势更强时（无论是正向还是负向），
 * 返回值会增大。要判断趋势是看涨还是看跌，需比较 +DI 与 -DI。当
 * +DI 高于 -DI 时，市场向上的压力大于向下的压力。
 *
 * @see https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/dmi
 */
export class DX extends IndicatorSeries<HighLowClose<number>> {
  private readonly movesUp: MovingAverage;
  private readonly movesDown: MovingAverage;
  private previousCandle?: HighLowClose<number>;
  private secondLastCandle?: HighLowClose<number>;
  private readonly atr: ATR;
  public mdi?: number;
  public pdi?: number;

  constructor(
    public readonly interval: number,
    SmoothingIndicator: MovingAverageTypes = WSMA
  ) {
    super();
    this.atr = new ATR(this.interval, SmoothingIndicator);
    this.movesDown = new SmoothingIndicator(this.interval);
    this.movesUp = new SmoothingIndicator(this.interval);
  }

  private updateState(candle: HighLowClose<number>, pdm: number, mdm: number, replace: boolean): void {
    this.atr.update(candle, replace);
    this.movesUp.update(pdm, replace);
    this.movesDown.update(mdm, replace);
    if (this.previousCandle) {
      this.secondLastCandle = this.previousCandle;
    }
    this.previousCandle = candle;
  }

  override getRequiredInputs() {
    return this.movesUp.getRequiredInputs();
  }

  update(candle: HighLowClose<number>, replace: boolean) {
    if (!this.previousCandle) {
      this.updateState(candle, 0, 0, replace);
      return null;
    }

    if (this.secondLastCandle && replace) {
      this.previousCandle = this.secondLastCandle;
    }

    const currentHigh = candle.high;
    const previousHigh = this.previousCandle.high;

    const currentLow = candle.low;
    const previousLow = this.previousCandle.low;

    const higherHigh = currentHigh - previousHigh;
    const lowerLow = previousLow - currentLow;

    const noHigherHighs = higherHigh < 0;
    const lowsRise = higherHigh < lowerLow;

    const pdm = noHigherHighs || lowsRise ? 0 : higherHigh;

    const noLowerLows = lowerLow < 0;
    const highsRise = lowerLow < higherHigh;

    const mdm = noLowerLows || highsRise ? 0 : lowerLow;

    this.updateState(candle, pdm, mdm, replace);

    if (this.movesUp.isStable) {
      this.pdi = this.movesUp.getResultOrThrow() / this.atr.getResultOrThrow();
      this.mdi = this.movesDown.getResultOrThrow() / this.atr.getResultOrThrow();

      const dmDiff = Math.abs(this.pdi - this.mdi);
      const dmSum = this.pdi + this.mdi;

      if (dmSum === 0) {
        return this.setResult(0, replace);
      }

      return this.setResult((dmDiff / dmSum) * 100, replace);
    }

    return null;
  }
}