
// // Only for valuement entities
import { Injectable } from '@angular/core';

// Only for valuement entities
type value = number | string | false;
type CircuitType = 'series' | 'parallel';

// For the return or valueumnet entities
interface Ohm<T> {
    V: T;
    R: T;
    I: T;
}
interface NResistor<T> {
    [key: string]: T;
}

interface RLC<T> {
    R: T;
    L: T;
    C: T;
}
interface RL<T> {
    R: T;
    L: T;
}
interface RC<T> {
    R: T;
    C: T;
}

interface Calorie<T> extends Ohm<T> {
    H: T;
    P: T;
    QJ: T;
    t$s: T;
}

@Injectable({
  providedIn: 'root'
})
export class MathFormulaService {
    private range(range: number): number[] {
        return new Array<number>(range).fill(0);
    }

    private falseCounter(value: { [key: string]: any } | any[]): number {
        let count = 0;

        if (Array.isArray(value)) {
            value.forEach(val => {
                if (val === false) {
                    count++;
                }
            });
        } else {
            for (const val in value) {
                if (value[val] === false) {
                    count++;
                } 
            }
        }
    
        return count;
    }

    private allToSigDigs<T>(value: T, toSigDigs?: boolean): T {
        if (!toSigDigs) { console.log('NOT INTO'); return value; }

        if (typeof value === 'number') {
            // @ts-ignore
            return Number(val.toPrecision(3));
        } else if (Array.isArray(value)) {
            // @ts-ignore
            return value.map(val => {
                if (typeof val === 'number') {
                    return Number(val.toPrecision(3));
                } else {
                    return val;
                }
            });
        } else {
            // @ts-ignore
            const resValue: T = {};

            for (const val in value) {
                let key = value[val];
                // @ts-ignore
                resValue[val] = (typeof key === 'number') ?
                    Number(key.toPrecision(3)) : key;
            }
            return resValue;
        }
    }

    private orSigDigs(value: number, toSigDigs: boolean): number {
        if (toSigDigs) {
            return Number(value.toPrecision(3));
        } else {
            return value;
        }
    }

    /**
     * @description オームの法則
     * @param V 電圧 V[V]
     * @param R 抵抗 R[Ω]
     * @param I 電流 I[A]
     */
    ohm(value: Ohm<value>, toSigDigs?: boolean): Ohm<number> | false { 

        // 一括で定義（分割代入）
        let [v, r, i] = this.range(3);

        console.log('Before: ', value);
        console.log('After:  ', this.allToSigDigs(value, toSigDigs));
        value = this.allToSigDigs<Ohm<value>>(value, toSigDigs);

        // ２つ以上 false を含んでいないか確認
        if (this.falseCounter([value.V, value.I, value.R]) >= 2) {
            return false;
        }

        if (!value.V) {
            r = value.R as number;
            i = value.I as number;
            v = this.orSigDigs((r * i), !!toSigDigs);
        } else if (!value.R) {
            v = value.V as number;
            i = value.I as number;
            r = this.orSigDigs((v / i), !!toString);
        } else {
            // !value.I
            v = value.V as number;
            r = value.R as number;
            i = this.orSigDigs((v / r), !!toString);
        }
    
        return { V: v, R: r, I: i };
    }

    /** RLC で使用される値 */
    // 抵抗 R[Ω]
    resistor(value: {}) {
    }
    // インダクタンス L[H]
    inductance(value: {}) { 
    }
    // 静電容量 C[F]
    capacitance(value: {}) {
        
    }


    /** RLC系列の functions */
    /**
     * @description RLC回路
     * @param R 抵抗 R[Ω]
     * @param L リアクタンス L[Ω]
     * @param C コンデンサ C[Ω]
     */
    rlc(circuitType: CircuitType, value: RLC<value>): RLC<number> {
        let [r, l, c] = this.range(3);

        if (circuitType === 'series') {
            // 直列の処理

        } else if (circuitType === 'parallel') {
            // 並列の処理

        }

        return { R: r, L: l, C: c };
    }

    /**
     * @description RLC回路
     * @param R 抵抗 R[Ω]
     * @param L リアクタンス L[Ω]
     */
    rl(circuitType: CircuitType, value: RL<value>): RL<number> {
        let [r, l] = this.range(2);

        if (circuitType === 'series') {
            // 直列の処理

        } else if (circuitType === 'parallel') {
            // 並列の処理

        }

        return { R: r, L: l };
    }

    /**
     * @description RLC回路
     * @param R 抵抗 R[Ω]
     * @param C コンデンサ C[Ω]
     */
    rc(circuitType: CircuitType, value: RC<value>): RC<number> {
        let [r, c] = this.range(2);

        if (circuitType === 'series') {
            // 直列の処理

        } else if (circuitType === 'parallel') {
            // 並列の処理

        }

        return { R: r, C: c };
    }


    /**
     * @description ジュール
     * @br
     * @param H 熱量 H[J] ※Hはヒート(heat)の略
     * @param QJ 発生熱 Q[J]
     * @param P 電力 P[W]
     * @param t$s 時間 time/sの略 [s] 
     * @br
     * @param V 電流 V[v] 
     * @param R 抵抗 R[Ω]
     * @param I 電流 I[A]
     */
    calorie(value: Calorie<value>, toSigDigs: boolean): Calorie<number> {
        let [h, p, qj, t$s, v, r, i] = this.range(7);
        const ohm = this.ohm({ V: value.V, R: value.R, I: value.I }, toSigDigs);


        return { H: h, P: p, QJ: qj, t$s, V: v, R: r, I: i};
    }


    //共進周波数
    resonanceFrequency(value: { L: value, C: value }) {
        
    }

    /** 電力(P)についての functions  */
    // 電力[W]
    electricity() { }
    // 電力量[Wh]
    electricEnergy(value: { P: value, T: value, V: value, I: value, R:value}) {
    }
    // 有効電力[W]
    activePower(value: { V: value, I: value, phi: value }) {
        
    }
    // 無効電力[Var]
    reactivePower(value: { V: value, I: value, phi: value }) {
        
    }
    // 皮相電力[V.A]
    apparentPower(value: { V: value, I: value}) {
        
    }
    // 力率
    powerFactor(value: { P: value, Ps: value }) {
    }
}
