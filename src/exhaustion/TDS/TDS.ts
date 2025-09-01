import {IndicatorSeries} from '../../types/Indicator.js';

/**
 * Tom Demark 序列指标 (TDS)
 * 类型：衰竭型
 *
 * TD Sequential 指标用于识别资产价格的潜在转折点。
 * 它包含两个阶段：TD Setup 和 TD Countdown。本实现仅关注 TD Setup 阶段，
 * 这是最常用于趋势衰竭信号的部分。
 *
 * - 看涨 Setup：连续 9 根 K 线的收盘价都高于 4 根 K 线前的收盘价。当第 8 或第 9 根 K 线的最低价低于第 6 和第 7 根 K 线的最低价时，可能出现卖出机会。
 * - 看跌 Setup：连续 9 根 K 线的收盘价都低于 4 根 K 线前的收盘价。当第 8 或第 9 根 K 线的最低价低于第 6 和第 7 根 K 线的最低价时，可能出现买入机会。
 *
 * @see https://github.com/bennycode/trading-signals/discussions/239
 * @see https://hackernoon.com/how-to-buy-sell-cryptocurrency-with-number-indicator-td-sequential-5af46f0ebce1
 * @see https://practicaltechnicalanalysis.blogspot.com/2013/01/tom-demark-sequential.html
 */
export class TDS extends IndicatorSeries {
  private readonly closes: number[] = [];
  private setupCount: number = 0;
  private setupDirection: 'bullish' | 'bearish' | null = null;

  override getRequiredInputs() {
    return 9;
  }

  update(close: number, replace: boolean): number | null {
    if (replace) {
      this.closes.pop();
    }
    this.closes.push(close);
    if (this.closes.length < 5) {
      return null;
    }
    // 仅保留最近 13 根 K 线的收盘价以节省内存
    if (this.closes.length > 13) {
      this.closes.shift();
    }
    const index = this.closes.length - 1;
    const prev4 = this.closes[index - 4];
    if (close > prev4) {
      if (this.setupDirection === 'bearish') {
        this.setupCount = 1;
        this.setupDirection = 'bullish';
      } else {
        this.setupCount++;
        this.setupDirection = 'bullish';
      }
    } else if (close < prev4) {
      if (this.setupDirection === 'bullish') {
        this.setupCount = 1;
        this.setupDirection = 'bearish';
      } else {
        this.setupCount++;
        this.setupDirection = 'bearish';
      }
    }
    // Setup 完成
    if (this.setupCount >= this.getRequiredInputs()) {
      const result = this.setupDirection === 'bullish' ? 1 : -1;
      this.setupCount = 0;
      this.setupDirection = null;
      return this.setResult(result, replace);
    }
    return null;
  }
}