import {EventEmitter} from '@angular/core';

/**
 * Override original EventEmitter with additional constructor parameter
 * in order to emit initial value as soon as an observer subscribes.
 * This avoids the subscriber to wait for next value.
 */

export class EventEmitterInitialValue<T> extends EventEmitter<T> {
  getInitialValue: () => any;

  constructor(isAsync, getInitialValue) {
    super(isAsync);
    this.getInitialValue = getInitialValue;
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
    super.subscribe(generatorOrNext, error, complete);
    super.emit(this.getInitialValue());
  }
}
