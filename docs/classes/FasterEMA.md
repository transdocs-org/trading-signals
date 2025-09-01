[trading-signals](../README.md) / [Exports](../modules.md) / FasterEMA

# Class: FasterEMA

Tracks results of an indicator over time and memorizes the highest & lowest result.

## Hierarchy

- [`FasterMovingAverage`](FasterMovingAverage.md)

  ↳ **`FasterEMA`**

## Table of contents

### Constructors

- [constructor](FasterEMA.md#constructor)

### Properties

- [highest](FasterEMA.md#highest)
- [interval](FasterEMA.md#interval)
- [lowest](FasterEMA.md#lowest)

### Accessors

- [isStable](FasterEMA.md#isstable)

### Methods

- [getResult](FasterEMA.md#getresult)
- [update](FasterEMA.md#update)
- [updates](FasterEMA.md#updates)

## Constructors

### constructor

• **new FasterEMA**(`interval`)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `interval` | `number` |

#### Overrides

[FasterMovingAverage](FasterMovingAverage.md).[constructor](FasterMovingAverage.md#constructor)

#### Defined in

[EMA/EMA.ts:56](https://github.com/bennycode/trading-signals/blob/53d8192/src/EMA/EMA.ts#L56)

## Properties

### highest

• `Optional` **highest**: `number`

Highest return value over the lifetime (not interval!) of the indicator.

#### Inherited from

[FasterMovingAverage](FasterMovingAverage.md).[highest](FasterMovingAverage.md#highest)

#### Defined in

[Indicator.ts:56](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L56)

---

### interval

• `Readonly` **interval**: `number`

#### Inherited from

[FasterMovingAverage](FasterMovingAverage.md).[interval](FasterMovingAverage.md#interval)

#### Defined in

[EMA/EMA.ts:56](https://github.com/bennycode/trading-signals/blob/53d8192/src/EMA/EMA.ts#L56)

---

### lowest

• `Optional` **lowest**: `number`

Lowest return value over the lifetime (not interval!) of the indicator.

#### Inherited from

[FasterMovingAverage](FasterMovingAverage.md).[lowest](FasterMovingAverage.md#lowest)

#### Defined in

[Indicator.ts:58](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L58)

## Accessors

### isStable

• `get` **isStable**(): `boolean`

#### Returns

`boolean`

#### Overrides

FasterMovingAverage.isStable

#### Defined in

[EMA/EMA.ts:80](https://github.com/bennycode/trading-signals/blob/53d8192/src/EMA/EMA.ts#L80)

## Methods

### getResult

▸ **getResult**(): `number`

#### Returns

`number`

#### Overrides

[FasterMovingAverage](FasterMovingAverage.md).[getResult](FasterMovingAverage.md#getresult)

#### Defined in

[EMA/EMA.ts:72](https://github.com/bennycode/trading-signals/blob/53d8192/src/EMA/EMA.ts#L72)

---

### update

▸ **update**(`price`): `number`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `price` | `number` |

#### Returns

`number`

#### Overrides

[FasterMovingAverage](FasterMovingAverage.md).[update](FasterMovingAverage.md#update)

#### Defined in

[EMA/EMA.ts:61](https://github.com/bennycode/trading-signals/blob/53d8192/src/EMA/EMA.ts#L61)

---

### updates

▸ **updates**(`prices`): `number` \| `void`

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `prices` | `number`[] |

#### Returns

`number` \| `void`

#### Inherited from

[FasterMovingAverage](FasterMovingAverage.md).[updates](FasterMovingAverage.md#updates)

#### Defined in

[MA/MovingAverage.ts:30](https://github.com/bennycode/trading-signals/blob/53d8192/src/MA/MovingAverage.ts#L30)
