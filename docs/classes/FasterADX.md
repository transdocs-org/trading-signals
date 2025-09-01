[trading-signals](../README.md) / [Exports](../modules.md) / FasterADX

# Class: FasterADX

Tracks results of an indicator over time and memorizes the highest & lowest result.

## Hierarchy

- [`NumberIndicatorSeries`](NumberIndicatorSeries.md)<[`HighLowCloseNumber`](../modules.md#highlowclosenumber)\>

  ↳ **`FasterADX`**

## Table of contents

### Constructors

- [constructor](FasterADX.md#constructor)

### Properties

- [highest](FasterADX.md#highest)
- [interval](FasterADX.md#interval)
- [lowest](FasterADX.md#lowest)

### Accessors

- [isStable](FasterADX.md#isstable)
- [mdi](FasterADX.md#mdi)
- [pdi](FasterADX.md#pdi)

### Methods

- [getResult](FasterADX.md#getresult)
- [update](FasterADX.md#update)

## Constructors

### constructor

• **new FasterADX**(`interval`, `SmoothingIndicator?`)

#### Parameters

| Name                 | Type                                                                 | Default value |
| :------------------- | :------------------------------------------------------------------- | :------------ |
| `interval`           | `number`                                                             | `undefined`   |
| `SmoothingIndicator` | [`FasterMovingAverageTypes`](../modules.md#fastermovingaveragetypes) | `FasterWSMA`  |

#### Overrides

[NumberIndicatorSeries](NumberIndicatorSeries.md).[constructor](NumberIndicatorSeries.md#constructor)

#### Defined in

[ADX/ADX.ts:65](https://github.com/bennycode/trading-signals/blob/53d8192/src/ADX/ADX.ts#L65)

## Properties

### highest

• `Optional` **highest**: `number`

Highest return value over the lifetime (not interval!) of the indicator.

#### Inherited from

[NumberIndicatorSeries](NumberIndicatorSeries.md).[highest](NumberIndicatorSeries.md#highest)

#### Defined in

[Indicator.ts:56](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L56)

---

### interval

• `Readonly` **interval**: `number`

#### Defined in

[ADX/ADX.ts:65](https://github.com/bennycode/trading-signals/blob/53d8192/src/ADX/ADX.ts#L65)

---

### lowest

• `Optional` **lowest**: `number`

Lowest return value over the lifetime (not interval!) of the indicator.

#### Inherited from

[NumberIndicatorSeries](NumberIndicatorSeries.md).[lowest](NumberIndicatorSeries.md#lowest)

#### Defined in

[Indicator.ts:58](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L58)

## Accessors

### isStable

• `get` **isStable**(): `boolean`

#### Returns

`boolean`

#### Inherited from

NumberIndicatorSeries.isStable

#### Defined in

[Indicator.ts:61](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L61)

---

### mdi

• `get` **mdi**(): `number` \| `void`

#### Returns

`number` \| `void`

#### Defined in

[ADX/ADX.ts:71](https://github.com/bennycode/trading-signals/blob/53d8192/src/ADX/ADX.ts#L71)

---

### pdi

• `get` **pdi**(): `number` \| `void`

#### Returns

`number` \| `void`

#### Defined in

[ADX/ADX.ts:75](https://github.com/bennycode/trading-signals/blob/53d8192/src/ADX/ADX.ts#L75)

## Methods

### getResult

▸ **getResult**(): `number`

#### Returns

`number`

#### Inherited from

[NumberIndicatorSeries](NumberIndicatorSeries.md).[getResult](NumberIndicatorSeries.md#getresult)

#### Defined in

[Indicator.ts:65](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L65)

---

### update

▸ **update**(`candle`): `number` \| `void`

#### Parameters

| Name     | Type                                                     |
| :------- | :------------------------------------------------------- |
| `candle` | [`HighLowCloseNumber`](../modules.md#highlowclosenumber) |

#### Returns

`number` \| `void`

#### Overrides

[NumberIndicatorSeries](NumberIndicatorSeries.md).[update](NumberIndicatorSeries.md#update)

#### Defined in

[ADX/ADX.ts:79](https://github.com/bennycode/trading-signals/blob/53d8192/src/ADX/ADX.ts#L79)
