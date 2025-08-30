import {AO} from '../AO/AO.js';
import {IndicatorSeries} from '../../types/Indicator.js';
import {MOM} from '../MOM/MOM.js';
import {SMA} from '../../trend/SMA/SMA.js';
import type {HighLow} from '../../types/HighLowClose.js';

/**
 * 加速震荡指标 (AC)
 * 类型：动量
 *
 * 加速震荡指标 (AC) 用于检测动量何时发生变化，由比尔·威廉姆斯开发。如果在上升趋势中的动量开始减缓，可能表明对该资产的兴趣减弱，这通常会导致卖出。反之，在下跌趋势中的动量会在买单进场之前开始减缓。加速震荡指标还会观察动量变化是否存在加速。
 *
 * @see https://www.thinkmarkets.com/en/indicators/bill-williams-accelerator/
 */
export class AC extends IndicatorSeries<HighLow<number>> {
  public readonly ao: AO;
  public readonly momentum: MOM;
  public readonly signal: SMA;

  constructor(
    public readonly shortAO: number,
    public readonly longAO: number,
    public readonly signalInterval: number
  ) {
    super();
    this.ao = new AO(shortAO, longAO);
    this.momentum = new MOM(1);
    this.signal = new SMA(signalInterval);
  }

  override getRequiredInputs() {
    return this.signal.getRequiredInputs();
  }

  update(input: HighLow<number>, replace: boolean) {
    const ao = this.ao.update(input, replace);
    if (ao) {
      this.signal.update(ao, replace);
      if (this.signal.isStable) {
        const result = this.setResult(ao - this.signal.getResultOrThrow(), replace);
        this.momentum.update(result, replace);
        return result;
      }
    }
    return null;
  }
}