import {IndicatorSeries} from '../../types/Indicator.js';
import type {HighLowClose} from '../../types/HighLowClose.js';

/**
 * 区间扩张指数 (REI)
 * 类型：动量振荡器
 *
 * 区间扩张指数 (REI) 是一种动量振荡器，用于衡量价格方向运动的速度和幅度。由 Thomas DeMark 开发，它将当日的区间与给定周期内的平均区间进行比较。它量化了当前价格区间相对于平均区间是收缩还是扩张。REI 最常用于 8 日周期。极端的 REI 值通常预示着潜在的反转点，因为它们反映了可能不可持续的急剧方向性走势。
 *
 * 解读：
 * 根据 Thomas DeMark 的说法，当 REI 升至 +60 以上随后回落（价格疲软），或跌至 -60 以下随后回升（价格走强），可能预示动量转变。
 *
 * - REI > +60：超买状态 —— 强劲的上升动量可能不可持续（当从上方向下穿越时）
 * - REI 介于 +60 与 -60 之间：中性区间 —— 市场既未获得上升动力，也未出现下跌压力
 * - REI < -60：超卖状态 —— 强劲的下跌动量可能反转（当从下方向上穿越时）
 *
 * @see https://en.wikipedia.org/wiki/Range_expansion_index
 * @see https://www.quantifiedstrategies.com/range-expansion-index/
 * @see https://www.prorealcode.com/prorealtime-indicators/range-expansion-index-rei/
 * @see https://github.com/EarnForex/Range-Expansion-Index
 * @see https://www.sierrachart.com/index.php?page=doc/StudiesReference.php&ID=448
 */
export class REI extends IndicatorSeries<HighLowClose<number>> {
  private readonly highs: number[] = [];
  private readonly lows: number[] = [];
  private readonly closes: number[] = [];

  constructor(public readonly interval: number) {
    super();
  }

  override getRequiredInputs() {
    return this.interval + 8;
  }

  private calculateN(j: number) {
    if (
      this.highs[j - 2] < this.closes[j - 7] &&
      this.highs[j - 2] < this.closes[j - 8] &&
      this.highs[j] < this.highs[j - 5] &&
      this.highs[j] < this.highs[j - 6]
    ) {
      return 0;
    }
    return 1;
  }

  private calculateM(j: number) {
    if (
      this.lows[j - 2] > this.closes[j - 7] &&
      this.lows[j - 2] > this.closes[j - 8] &&
      this.lows[j] > this.lows[j - 5] &&
      this.lows[j] > this.lows[j - 6]
    ) {
      return 0;
    }
    return 1;
  }

  override update(candle: HighLowClose<number>, replace: boolean) {
    if (replace) {
      this.highs.pop();
      this.lows.pop();
      this.closes.pop();
    }

    this.highs.push(candle.high);
    this.lows.push(candle.low);
    this.closes.push(candle.close);

    // 计算 REI 至少需要 interval + 8 根 K 线
    // REI 使用前期数据进行比较
    if (this.highs.length < this.getRequiredInputs()) {
      return null;
    }

    // 计算周期内的总和
    let subValueSum = 0;
    let absValueSum = 0;

    const limitIndex = this.highs.length - 1;

    for (let j = limitIndex; j > this.interval; j--) {
      const diffHighs = this.highs[j] - this.highs[j - 2];
      const diffLows = this.lows[j] - this.lows[j - 2];

      const n = this.calculateN(j);
      const m = this.calculateM(j);
      const s = diffHighs + diffLows;

      const subValue = n * m * s;
      const absDailyValue = Math.abs(diffHighs) + Math.abs(diffLows);

      subValueSum += subValue;
      absValueSum += absDailyValue;
    }

    // 防止除以 0
    if (absValueSum === 0) {
      return this.setResult(0, replace);
    }

    const rei = (subValueSum / absValueSum) * 100;
    return this.setResult(rei, replace);
  }
}