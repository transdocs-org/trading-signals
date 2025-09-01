import {TechnicalIndicator} from '../../types/Indicator.js';
import type {MovingAverage} from '../MA/MovingAverage.js';
import type {MovingAverageTypes} from '../MA/MovingAverageTypes.js';
import {SMA} from '../SMA/SMA.js';

export interface DMAResult {
  long: number;
  short: number;
}

/**
 * 双重移动平均线（DMA）
 * 类型：趋势指标
 *
 * DMA 由两条移动平均线组成：短期与长期。
 *
 * 双重移动平均线交叉：
 * 短期均线上穿长期均线表示看涨买入机会。
 * 短期均线下穿长期均线表示看跌卖出机会。
 *
 * @see https://faculty.fuqua.duke.edu/~charvey/Teaching/BA453_2002/CCAM/CCAM.htm#_Toc2634228
 */
export class DMA extends TechnicalIndicator<DMAResult, number> {
  public readonly short: MovingAverage;
  public readonly long: MovingAverage;

  constructor(short: number, long: number, SmoothingIndicator: MovingAverageTypes = SMA) {
    super();
    this.short = new SmoothingIndicator(short);
    this.long = new SmoothingIndicator(long);
  }

  override get isStable(): boolean {
    return this.long.isStable;
  }

  override getRequiredInputs() {
    return this.long.getRequiredInputs();
  }

  update(price: number, replace: boolean) {
    this.short.update(price, replace);
    this.long.update(price, replace);

    if (this.isStable) {
      return (this.result = {
        long: this.long.getResultOrThrow(),
        short: this.short.getResultOrThrow(),
      });
    }

    return null;
  }
}