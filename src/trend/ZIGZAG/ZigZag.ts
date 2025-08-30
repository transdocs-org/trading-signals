import {IndicatorSeries} from '../../types/Indicator.js';
import type {HighLow} from '../../types/HighLowClose.js';

export type ZigZagConfig = {
  /**
   * 建立新极值点所需的百分比变化。
   * 典型值范围为 3 到 12（表示 3% 到 12%）。
   */
  deviation: number;
};

/**
 * ZigZag 指标（ZigZag）
 * 类型：趋势
 *
 * ZigZag 指标是一种技术分析工具，通过过滤掉较小的价格波动来识别价格趋势。它通过识别价格序列中的重要高点和低点并在它们之间画线来工作。要使一个高点或低点被视为重要，价格必须从前一个极值点反转至少指定的百分比（偏差）。
 *
 * 该指标在追踪高点和低点之间交替：确认高点后，它会寻找重要的低点；确认低点后，它会寻找重要的高点。
 *
 * Zig Zag 指标被认为是非常滞后的指标，因为它的值仅在每个时间段结束后才绘制，并且只有在价格显著移动后才会形成一条永久的新线。交易者可以使用 RSI、ADX 和随机震荡指标等流行技术指标来确认当 ZigZag 线改变方向时证券价格是否超买或超卖。
 *
 * @see https://www.investopedia.com/ask/answers/030415/what-zig-zag-indicator-formula-and-how-it-calculated.asp
 * @see https://www.investopedia.com/terms/z/zig_zag_indicator.asp
 * @see https://capex.com/en/academy/zigzag
 * @see https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/zig-zag-indicator/
 */
export class ZigZag extends IndicatorSeries<HighLow> {
  private readonly deviation: number;
  private isUp: boolean = false;
  private highestExtreme: number | null = null;
  private lowestExtreme: number | null = null;

  constructor(config: ZigZagConfig) {
    super();
    this.deviation = config.deviation;
  }

  override getRequiredInputs(): number {
    return 1;
  }

  update(candle: HighLow<number>, replace: boolean): number | null {
    const low = candle.low;
    const high = candle.high;

    if (this.lowestExtreme === null) {
      this.lowestExtreme = low;
    }

    if (this.highestExtreme === null) {
      this.highestExtreme = high;
    }

    if (this.isUp) {
      const uptrendReversal =
        this.lowestExtreme + ((this.highestExtreme - this.lowestExtreme) * (100 - this.deviation)) / 100;

      if (high > this.highestExtreme) {
        this.highestExtreme = high;
      } else if (low < uptrendReversal) {
        this.isUp = false;
        this.lowestExtreme = low;
        return this.setResult(this.highestExtreme, replace);
      }
    } else {
      const downtrendReversal = low + ((this.highestExtreme - low) * this.deviation) / 100;

      if (low < this.lowestExtreme) {
        this.lowestExtreme = low;
      } else if (high > downtrendReversal) {
        this.isUp = true;
        this.highestExtreme = high;
        return this.setResult(this.lowestExtreme, replace);
      }
    }

    return null;
  }
}