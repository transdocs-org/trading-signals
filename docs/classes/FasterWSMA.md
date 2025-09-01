[trading-signals](../README.md) / [Exports](../modules.md) / FasterWSMA

# Class: FasterWSMA

Tracks results of an indicator over time and memorizes the highest & lowest result.

## Hierarchy

- [`NumberIndicatorSeries`](NumberIndicatorSeries.md)

  ↳ **`FasterWSMA`**

## Table of contents

### Constructors

- [constructor](FasterWSMA.md#constructor)

### Properties

- [highest](FasterWSMA.md#highest)
- [interval](FasterWSMA.md#interval)
- [lowest](FasterWSMA.md#lowest)

### Accessors

- [isStable](FasterWSMA.md#isstable)

### Methods

- [getResult](FasterWSMA.md#getresult)
- [update](FasterWSMA.md#update)
- [updates](FasterWSMA.md#updates)

## Constructors

### constructor

• **new FasterWSMA**(`interval`)

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `interval` | `number` |

#### Overrides

[NumberIndicatorSeries](NumberIndicatorSeries.md).[constructor](NumberIndicatorSeries.md#constructor)

#### Defined in

[WSMA/WSMA.ts:52](https://github.com/bennycode/trading-signals/blob/53d8192/src/WSMA/WSMA.ts#L52)

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

[WSMA/WSMA.ts:52](https://github.com/bennycode/trading-signals/blob/53d8192/src/WSMA/WSMA.ts#L52)

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

▸ **update**(`price`): `number` \| `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `price` | `number` |

#### Returns

`number` \| `void`

#### Overrides

[NumberIndicatorSeries](NumberIndicatorSeries.md).[update](NumberIndicatorSeries.md#update)

#### Defined in

[WSMA/WSMA.ts:63](https://github.com/bennycode/trading-signals/blob/53d8192/src/WSMA/WSMA.ts#L63)

---

### updates

▸ **updates**(`prices`): `number` \| `void`

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `prices` | `number`[] |

#### Returns

`number` \| `void`

#### Defined in

[WSMA/WSMA.ts:58](https://github.com/bennycode/trading-signals/blob/53d8192/src/WSMA/WSMA.ts#L58)
