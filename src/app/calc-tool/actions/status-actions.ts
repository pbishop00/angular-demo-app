
export class SetErrorMessage {
    static readonly type = '[Status] Set Error Message';
    constructor(public message: string) { }
  }
  
  export class ClearErrorMessage {
    static readonly type = '[Status] Clear Error Message';
    constructor() { }
  }