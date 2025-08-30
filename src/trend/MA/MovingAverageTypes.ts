import type {EMA} from '../EMA/EMA.js';
import type {RMA} from '../RMA/RMA.js';
import type {SMA} from '../SMA/SMA.js';
import type {WMA} from '../WMA/WMA.js';
import type {WSMA} from '../WSMA/WSMA.js';

/** 移动平均类型：可以是 EMA、RMA、SMA、WMA 或 WSMA 的构造函数 */
export type MovingAverageTypes = typeof EMA | typeof RMA | typeof SMA | typeof WMA | typeof WSMA;