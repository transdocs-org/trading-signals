import {NotEnoughDataError} from '../error/NotEnoughDataError.js';

type Nullable<Result> = Result | null;

interface Indicator<Result = number, Input = number> {
  isStable: boolean;
  add(input: Input): Nullable<Result>;
  getRequiredInputs(): number;
  getResult(): Nullable<Result>;
  getResultOrThrow(): Result;
  replace(input: Input): Nullable<Result>;
  update(input: Input, replace: boolean): Nullable<Result>;
  updates(input: Input[], replace: boolean): Nullable<Result>[];
}

export abstract class TechnicalIndicator<Result, Input> implements Indicator<Result, Input> {
  protected result: Result | undefined;

  abstract getRequiredInputs(): number;

  getResult() {
    try {
      return this.getResultOrThrow();
    } catch {
      return null;
    }
  }

  getResultOrThrow() {
    if (this.result === undefined) {
      throw new NotEnoughDataError(this.getRequiredInputs());
    }

    return this.result;
  }

  get isStable(): boolean {
    return this.result !== undefined;
  }

  add(input: Input) {
    return this.update(input, false);
  }

  replace(input: Input) {
    return this.update(input, true);
  }

  abstract update(input: Input, replace: boolean): Result | null;

  updates(inputs: readonly Input[], replace: boolean = false) {
    return inputs.map(input => this.update(input, replace));
  }
}

/**
 * 随时间跟踪指标的结果。
 */
export abstract class BaseIndicatorSeries<Result, Input> extends TechnicalIndicator<Result, Input> {
  protected previousResult?: Result;
  protected abstract setResult(value: Result, replace: boolean): Result;
}

export abstract class IndicatorSeries<Input = number> extends BaseIndicatorSeries<number, Input> {
  protected setResult(value: number, replace: boolean): number {
    // 替换最新值时，先恢复上一个结果
    if (replace) {
      this.result = this.previousResult;
    }

    // 缓存上一个结果
    this.previousResult = this.result;

    // 设置新结果
    return (this.result = value);
  }
}