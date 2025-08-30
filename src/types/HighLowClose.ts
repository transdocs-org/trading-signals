export type HighLow<T = number> = {
  /** 最高价 */
  high: T;
  /** 最低价 */
  low: T;
};

export type HighLowClose<T = number> = HighLow<T> & {
  /** 收盘价 */
  close: T;
};

export type OpenHighLowClose<T = number> = HighLowClose<T> & {
  /** 开盘价 */
  open: T;
};

export type OpenHighLowCloseVolume<T = number> = OpenHighLowClose<T> & {
  /** 成交量 */
  volume: T;
};

export type HighLowCloseVolume<T = number> = Omit<OpenHighLowCloseVolume<T>, 'open'>;