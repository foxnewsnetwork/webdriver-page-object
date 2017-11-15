class TimeoutError extends Error {}
class WrongUsageError extends Error {}

export async function waitUntil(checkFn, totalTime = 6666, pollInterval = 666) {
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

export function waitMS(n, v) {
  return new Promise(resolve => {
    setTimeout(() => resolve(v), n);
  });
}
