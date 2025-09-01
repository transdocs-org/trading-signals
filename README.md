# 交易信号

![语言详情](https://img.shields.io/github/languages/top/bennycode/trading-signals) ![代码覆盖率](https://img.shields.io/codecov/c/github/bennycode/trading-signals/main) ![许可证](https://img.shields.io/npm/l/trading-signals.svg) ![包版本](https://img.shields.io/npm/v/trading-signals.svg)

使用 JavaScript / TypeScript 进行技术分析的技术指标与叠加工具。

## 动机

“trading-signals” 库为常见技术指标提供了 TypeScript 实现。它非常适合算法交易，让开发者能够为自动化交易策略执行信号计算。

所有指标都可以通过将数据（价格或 [K 线](https://en.wikipedia.org/wiki/Candlestick_chart)）流式传输到 `add` 方法来进行实时更新。某些指标还提供 `static` 批处理方法，以便在回测或历史数据导入时一次性提供数据，从而进一步提升性能。你可以通过运行提供的 [演示脚本](./src/start/demo.ts) 并输入 `npm start` 来尝试流式输入数据，该脚本使用键盘输入流。

## 安装
```bash
npm install trading-signals
```
## 用法

**CommonJS：**
```ts
const {SMA} = require('trading-signals');
```
**ESM：**
```ts
import {SMA} from 'trading-signals';
```
**示例：**
```typescript
import {SMA} from 'trading-signals';

const sma = new SMA(3);

// 可以逐个添加数值：
sma.add(40);
sma.add(30);
sma.add(20);

// 也可以一次性添加多个数值：
sma.updates([20, 40, 80]);

// 可以替换之前的某个值（适用于实时图表）：
sma.replace(40);

// 可以检查指标是否已稳定：
console.log(sma.isStable); // true

// 如果指标已稳定，可以获取其结果：
console.log(sma.getResult()); // 50.0003

// 还可以在不使用可选链的情况下获取结果：
console.log(sma.getResultOrThrow()); // 50.0003

// 同样支持多种精度：
console.log(sma.getResultOrThrow().toFixed(2)); // "50.00"
console.log(sma.getResultOrThrow().toFixed(4)); // "50.0003"

// 每个指标还包含便捷功能，例如生命周期内的“最低”和“最高”值：
console.log(sma.lowest?.toFixed(2)); // "23.33"
console.log(sma.highest?.toFixed(2)); // "53.33"
```
### 何时使用 `add(...)`？

要输入数据，你需要调用指标的 `add` 方法。根据是否已达到该区间所需的最小输入数据量，`add` 方法可能会也可能不会返回指标的结果。

### 何时使用 `getResultOrThrow()`？

你可以随时调用 `getResultOrThrow()`，但如果指标尚未收到最少数据量，它会抛出错误。如果在指标收到所需数量的输入值之前调用 `getResultOrThrow()`，将抛出 `NotEnoughDataError`。

**示例：**
```ts
import {SMA} from 'trading-signals';

// 我们的周期是 3，因此需要 3 个输入值
const sma = new SMA(3);

// 我们提供了 2 个输入值
sma.add(10);
sma.add(40);

try {
  // 这里会抛出一个错误，因为最少需要 3 个输入值
  sma.getResultOrThrow();
} catch (error) {
  console.log(error.constructor.name); // "NotEnoughDataError"
}

// 我们提供第 3 个输入值
sma.add(70);

// 现在，我们可以得到正确的结果
console.log(sma.getResultOrThrow()); // 40
```
大多数情况下，所需的最小数据量取决于所使用的周期/时间范围。如果不确定，可以查看指标的测试文件，了解正确用法的示例。

## 技术指标类型

- 衰竭指标：识别趋势衰竭和潜在反转。
- 动量指标：衡量价格在特定方向上的速度和力度
- 趋势指标：衡量趋势方向（上升趋势、下降趋势或横盘趋势）
- 波动率指标：衡量价格随时间变化的幅度，与方向无关
- 成交量指标：基于成交量衡量趋势的强度

## 支持的技术指标

1. 加速带 (ABANDS)
1. 加速震荡指标 (AC)
1. 平均趋向指数 (ADX)
1. 平均真实波幅 (ATR)
1. 动量震荡指标 (AO)
1. 布林带 (BBANDS)
1. 布林带宽度 (BBW)
1. 重心 (CG)
1. 商品通道指数 (CCI)
1. 动向指数 (DMI / DX)
1. 双重指数移动平均线 (DEMA)
1. 双重移动平均线 (DMA)
1. 指数移动平均线 (EMA)
1. 四分位距 (IQR)
1. 线性回归 (LINREG)
1. 平均绝对偏差 (MAD)
1. 动量 (MOM / MTM)
1. 移动平均收敛背离 (MACD)
1. 能量潮指标 (OBV)
1. 抛物线SAR (PSAR)
1. 区间扩张指数 (REI)
1. 变动率 (ROC)
1. 相对移动平均线 (RMA)
1. 相对强弱指数 (RSI)
1. 简单移动平均线 (SMA)
1. Spencer 15点移动平均线 (SMA15)
1. 随机震荡指标 (STOCH)
1. 随机RSI (STOCHRSI)
1. Tom Demark序列指标 (TDS)
1. 真实波幅 (TR)
1. 成交量加权平均价格 (VWAP)
1. 加权移动平均线 (WMA)
1. 威尔德平滑移动平均线 (WSMA / WWS / SMMA / MEMA)
1. 之字转向指标 (ZigZag)

实用方法：

1. 平均值 / 均值
1. 网格尺寸（用于[网格交易机器人](https://b2broker.com/news/understanding-grid-trading-purpose-pros-cons/)）
1. 最大值
1. 中位数
1. 最小值
1. 四分位数
1. 标准差
1. 连涨/连跌

## 性能

### 浮点运算注意事项

JavaScript 使用双精度浮点运算。例如，`0.1 + 0.2` 会得到 `0.30000000000000004`，这是由于二进制浮点表示造成的。

![JavaScript 算术](https://raw.githubusercontent.com/bennycode/trading-signals/HEAD/js-arithmetic.png)

虽然这并不完全精确，但在实际应用中通常无关紧要，因为指标通常使用平均值，已经平滑了精度误差。在测试用例中，你可以使用 Vitest 的 [toBeCloseTo](https://vitest.dev/api/expect.html#tobecloseto) 断言来控制精度。

本库的早期版本（直到版本 6）使用 [big.js][1] 进行任意精度运算，但这使得计算速度平均慢了约 100 倍。因此，从版本 7 开始移除了对 [big.js][1] 的支持。

## 免责声明

[trading-signals](https://github.com/bennycode/trading-signals) 的信息和出版物不构成财务建议、投资建议、交易建议或任何形式的建议。所有来自 [trading-signals](https://github.com/bennycode/trading-signals) 的结果仅用于信息目的。

在根据您自身个人情况做出任何投资之前，进行自己的分析非常重要。如果您需要财务建议或其他一般建议，建议您在自己的司法管辖区寻找一位具备相关资质的个人为您提供相应建议。

## 替代方案

- [Cloud9Trader 指标 (JavaScript)](https://github.com/Cloud9Trader/TechnicalIndicators)
- [Crypto Trading Hub 指标 (TypeScript)](https://github.com/anandanand84/technicalindicators)
- [Highcharts 指标 (TypeScript)](https://github.com/highcharts/highcharts/tree/v12.3.0/ts/Stock/Indicators)
- [Indicator TS (TypeScript)](https://github.com/cinar/indicatorts)
- [Jesse 交易机器人指标 (Python)](https://docs.jesse.trade/docs/indicators/reference.html)
- [LEAN 指标 (C#)](https://github.com/QuantConnect/Lean/tree/master/Indicators)
- [libindicators (C#)](https://github.com/mgfx/libindicators)
- [Pandas TA (Python)](https://github.com/twopirllc/pandas-ta)
- [Stock Indicators for .NET (C#)](https://github.com/DaveSkender/Stock.Indicators)
- [StockSharp (C#)](https://github.com/StockSharp/StockSharp)
- [ta-lib (C)](https://github.com/TA-Lib/ta-lib/tree/main/src/ta_func)
- [ta-math (TypeScript)](https://github.com/munrocket/ta-math)
- [ta4j (Java)](https://github.com/ta4j/ta4j)
- [Technical Analysis for Rust (Rust)](https://github.com/greyblake/ta-rs)
- [Technical Analysis Library using Pandas and Numpy (Python)](https://github.com/bukosabino/ta)
- [Tulip Indicators (ANSI C)](https://github.com/TulipCharts/tulipindicators)

## 维护者

[![Benny Neugebauer on Stack Exchange][stack_exchange_bennycode_badge]][stack_exchange_bennycode_url]

## ⭐️ 成为 TypeScript 摇滚明星！ ⭐️

此软件包由 Benny Code 构建。查看我的 [**TypeScript 课程**](https://typescript.tv/)，成为编程摇滚明星！

[<img src="https://raw.githubusercontent.com/bennycode/trading-signals/main/tstv.png">](https://typescript.tv/)

[1]: http://mikemcl.github.io/big.js/
[stack_exchange_bennycode_badge]: https://stackexchange.com/users/flair/203782.png?theme=default
[stack_exchange_bennycode_url]: https://stackexchange.com/users/203782/benny-neugebauer?tab=accounts

## 许可证

本项目采用 [MIT](./LICENSE) 许可证。