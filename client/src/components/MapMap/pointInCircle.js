

const pointInCircle = (center, radius, point) => {
  const centerY = center[0];
  const centerX = center[1];
  const y = point[0];
  const x = point[1] ; // *.5? because long 180 vs lat 90?
  const squareDist = (centerX - x) ** 2 + (centerY - y) ** 2
    return ( squareDist < (radius ** 2) )
};

// console.log(pointInCircle(0, 0, 3, -1, -1)); //true
// console.log(pointInCircle(0, 0, 3, 3, 3)); //false


// function arePointsNear(checkPoint, centerPoint, km) {
//   ///needs long normalisation added?
//   // Note: The code doesn't take into consideration if you are passing the 0/360 longitude. If that is the case, you would first have to normalise the longitudes.
//   // assuming [lat, long]
//   var ky = 40000 / 360;
//   var kx = Math.cos(Math.PI * centerPoint[0] / 180.0) * ky;
//   var dx = Math.abs(centerPoint.lng - checkPoint[1]) * kx;
//   var dy = Math.abs(centerPoint.lat - checkPoint[0]) * ky;
//   return Math.sqrt(dx * dx + dy * dy) <= km;
// }
// console.log(arePointsNear([0, 0], [.05, .05], 1000));