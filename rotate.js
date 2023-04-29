// https://stackoverflow.com/a/67468546
p5.Vector.prototype.rotate3d = function(axis, angle) {
    axis = p5.Vector.normalize(axis);
    return p5.Vector.add(
        p5.Vector.mult(this, cos(angle)),
        p5.Vector.add(
          p5.Vector.mult(
            p5.Vector.cross(axis, this),
            sin(angle)
          ),
          p5.Vector.mult(
            p5.Vector.mult(
              axis,
              p5.Vector.dot(axis, this)
            ),
            (1 - cos(angle))
          )
        )
  );
};
