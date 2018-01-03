export interface PageAction<T> {
  (bubbleFn: () => T): Promise<T>;
}

export interface ActionsHash {
  [key: string]: PageAction<any>;
}