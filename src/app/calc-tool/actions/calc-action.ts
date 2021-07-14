

export class Add{

    static readonly type = '[MathOp] Add'
    constructor(public input: number){}
}
export class Subtract{

    static readonly type = '[MathOp] Subtract'
    constructor(public input: number){}
}
export class Multiply{

    static readonly type = '[MathOp] Multiply'
    constructor(public input: number){}
}
export class Divide{

    static readonly type = '[MathOp] Divide'
    constructor(public input: number){}
}
