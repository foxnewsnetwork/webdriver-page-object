class TimeoutError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'TimeoutError';
  }
}
class WrongUsageError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'WrongUsageError';
  }
}

type CheckFn = () => boolean;

export async function waitUntil(
  checkFn: CheckFn,
  totalTime: number = 6666,
  pollInterval: number = 666
): Promise<boolean> {
  if (typeof checkFn !== 'function') {
    throw new WrongUsageError('The checkFn should be a function, but you gave me something else');
  }
  let remainingTime = totalTime;
  let canStopCheckingNow = await checkFn();

  while (!canStopCheckingNow && remainingTime >= 0) {
    await waitMS(pollInterval);
    canStopCheckingNow = await checkFn();
    remainingTime -= pollInterval;
    if (canStopCheckingNow) {
      return canStopCheckingNow;
    }
  }

  throw new TimeoutError(`Failed to achieve desired state after ${totalTime}`);
}

export function waitMS<T>(n: number, v?: T): Promise<T | void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(v), n);
  });
}
