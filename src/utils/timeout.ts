export function timeout(time: Number) : Promise<undefined> {
  return new Promise(function(resolve) {
    window.setTimeout(resolve, time);
  });
}
