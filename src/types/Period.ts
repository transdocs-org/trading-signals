import {TechnicalIndicator} from './Indicator.js';
import {pushUpdate} from '../util/pushUpdate.js';

export interface PeriodResult {
  highest: number;
  lowest: number;
}

export class Period extends TechnicalIndicator<PeriodResult, number> {
  public values: number[];
  /** 当前周期内的最高返回值。 */
  private _highest?: number;
  /** 当前周期内的最低返回值。 */
  private _lowest?: number;

  get highest() {
    return this._highest;
  }

  get lowest() {
    return this._lowest;
  }

  constructor(public readonly interval: number) {
    super();
    this.values = [];
  }

  override getRequiredInputs() {
    return this.interval;
  }

  update(value: number, replace: boolean) {
    pushUpdate(this.values, replace, value, this.interval);

    if (this.values.length === this.interval) {
      this._lowest = Math.min(...this.values);
      this._highest = Math.max(...this.values);
      return (this.result = {
        highest: this._highest,
        lowest: this._lowest,
      });
    }

    return null;
  }
}