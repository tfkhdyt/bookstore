export class FetchError<T> extends Error {
  public info: T | null;
  public status: number | null;

  constructor(message: string) {
    super(message);
    this.info = null;
    this.status = null;
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
