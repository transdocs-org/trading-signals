[trading-signals](../README.md) / [Exports](../modules.md) / FasterSMA

# Class: FasterSMA

Tracks results of an indicator over time and memorizes the highest & lowest result.

## Hierarchy

- [`FasterMovingAverage`](FasterMovingAverage.md)

  ↳ **`FasterSMA`**

## Table of contents

### Constructors

- [constructor](FasterSMA.md#constructor)

### Properties

- [highest](FasterSMA.md#highest)
- [interval](FasterSMA.md#interval)
- [lowest](FasterSMA.md#lowest)
- [prices](FasterSMA.md#prices)

### Accessors

- [isStable](FasterSMA.md#isstable)

### Methods

- [getResult](FasterSMA.md#getresult)
- [update](FasterSMA.md#update)
- [updates](FasterSMA.md#updates)

## Constructors

### constructor

• **new FasterSMA**(`interval`)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `interval` | `number` |

#### Inherited from

[FasterMovingAverage](FasterMovingAverage.md).[constructor](FasterMovingAverage.md#constructor)

#### Defined in

[MA/MovingAverage.ts:26](https://github.com/bennycode/trading-signals/blob/53d8192/src/MA/MovingAverage.ts#L26)

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

[MA/MovingAverage.ts:26](https://github.com/bennycode/trading-signals/blob/53d8192/src/MA/MovingAverage.ts#L26)

---

### lowest

• `Optional` **lowest**: `number`

Lowest return value over the lifetime (not interval!) of the indicator.

#### Inherited from

[FasterMovingAverage](FasterMovingAverage.md).[lowest](FasterMovingAverage.md#lowest)

#### Defined in

[Indicator.ts:58](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L58)

---

### prices

• `Readonly` **prices**: `number`[] = `[]`

#### Defined in

[SMA/SMA.ts:36](https://github.com/bennycode/trading-signals/blob/53d8192/src/SMA/SMA.ts#L36)

## Accessors

### isStable

• `get` **isStable**(): `boolean`

#### Returns

`boolean`

#### Inherited from

FasterMovingAverage.isStable

#### Defined in

[Indicator.ts:61](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L61)

## Methods

### getResult

▸ **getResult**(): `number`

#### Returns

`number`

#### Inherited from

[FasterMovingAverage](FasterMovingAverage.md).[getResult](FasterMovingAverage.md#getresult)

#### Defined in

[Indicator.ts:65](https://github.com/bennycode/trading-signals/blob/53d8192/src/Indicator.ts#L65)

---

### update

▸ **update**(`price`): `number` \| `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `price` | `number` |

#### Returns

`number` \| `void`

#### Overrides

[FasterMovingAverage](FasterMovingAverage.md).[update](FasterMovingAverage.md#update)

#### Defined in

[SMA/SMA.ts:38](https://github.com/bennycode/trading-signals/blob/53d8192/src/SMA/SMA.ts#L38)

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
