export abstract class EntidadeBase<T> {
  constructor(props: Partial<T>) {
    Object.assign(this, props);
  }
}