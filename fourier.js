
function DiscreteFourierTransform(coordinates) {
  let res = [];
  const N = coordinates.length;
  for (let k = 0; k < N; k++) {
    let im = 0;
    let re = 0;
    for (let n = 0; n < N; n++){
      const angle = (TWO_PI * k * n) / N;
      re += coordinates[n] * cos(angle);
      im += coordinates[n] * sin(angle);
    }
  re = re / N;
  im = - im/N;

  res[k] = {freq:k, amp:sqrt(re ** 2 + im ** 2), phase:atan2(im, re)};
  }
  return res;
}
