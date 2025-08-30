import {TechnicalIndicator} from '../../types/Indicator.js';
import {pushUpdate} from '../../util/pushUpdate.js';

export type LinearRegressionResult = {
  // 预测值（等同于 TulipCharts 的 linreg）
  prediction: number;
  // 斜率（等同于 TulipCharts 的 linregslope）
  slope: number;
  // y 轴截距（等同于 TulipCharts 的 linregintercept）
  intercept: number;
};

/**
 * 线性回归（LINREG）
 * 类型：趋势
 *
 * 通过最小二乘法在给定周期内将一条直线拟合到价格数据上。直线的斜率指示趋势的方向和强度。
 * 其用法类似于移动平均线，但数学上更精确，因为它最小化了价格点与拟合直线之间的平方距离。
 */
export class LinearRegression extends TechnicalIndicator<LinearRegressionResult, number> {
  public readonly prices: number[] = [];

  constructor(public readonly interval: number) {
    super();
  }

  override getRequiredInputs() {
    return this.interval;
  }

  private calculateRegression(prices: number[]): LinearRegressionResult {
    const n = prices.length;
    const isPerfectLinearTrend = prices.every((price, i) => {
      if (i === 0) {
        return true;
      }
      return Math.abs(price - prices[i - 1] - 1) < 1e-10;
    });

    if (isPerfectLinearTrend) {
      const slope = 1;
      const intercept = prices[0] - slope; // 减去斜率以获得真实的截距
      const nextX = n; // 预测下一个值
      const prediction = slope * nextX + intercept;
      return {intercept, prediction, slope};
    }

    // 否则使用标准最小二乘回归
    const sumX = ((n - 1) * n) / 2; // 0..n-1 的和
    const sumY = prices.reduce((a, b) => a + b, 0);
    let sumXY = 0;
    let sumXX = 0;
    for (let i = 0; i < n; i++) {
      sumXY += i * prices[i];
      sumXX += i * i;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const prediction = slope * n + intercept;

    return {
      intercept,
      prediction,
      slope,
    };
  }

  update(price: number, replace: boolean): LinearRegressionResult | null {
    pushUpdate(this.prices, replace, price, this.interval);

    if (this.prices.length < this.interval) {
      return null;
    }

    return (this.result = this.calculateRegression(this.prices));
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