class World {

  constructor(game) {
    this.game = game;
    this.setup();

    this.rot = 0;
  }

  setup() {
    this.platforms = [];

    var iterations = 80;
    var gap = 360 / iterations;
    var distance = 800;
    var cx = 0;
    var cy = 0;

    var noisemap = [];
    noise.seed(Math.random());

    for (var i = 0; i < iterations + 1; i++) {
      noisemap[i] = noise.simplex2(i, 0) * 20;
      console.log(noisemap[i]);
    }

    for (var i = 0; i < iterations - 2; i++) {
      var a1 = i * gap * Math.PI / 180;
      var a2 = (i + 1) * gap * Math.PI / 180;
      var x1 = Math.sin(a1) * (distance + noisemap[i]) + cx;
      var y1 = Math.cos(a1) * (distance + noisemap[i]) + cy;
      var x2 = Math.sin(a2) * (distance + noisemap[i + 1]) + cx;
      var y2 = Math.cos(a2) * (distance + noisemap[i + 1]) + cy;
      this.platforms.push(new Platform(x1, y1, x2, y2));
    }
    this.platforms.push(new Platform(
      Math.sin(78 * gap * Math.PI / 180) * (distance + noisemap[78]),
      Math.cos(78 * gap * Math.PI / 180) * (distance + noisemap[78]),
      Math.sin(78 * gap * Math.PI / 180) * (distance + noisemap[78]) / 6 * 5,
      Math.cos(78 * gap * Math.PI / 180) * (distance + noisemap[78]) / 6 * 5
    ).nonclimbable());
    this.platforms.push(new Platform(
      Math.sin(80 * gap * Math.PI / 180) * (distance + noisemap[0]),
      Math.cos(80 * gap * Math.PI / 180) * (distance + noisemap[0]),
      Math.sin(80 * gap * Math.PI / 180) * (distance + noisemap[0]) / 6 * 4,
      Math.cos(80 * gap * Math.PI / 180) * (distance + noisemap[0]) / 6 * 4
    ).nonclimbable());
    this.platforms.push(new Platform(
      Math.sin(78 * gap * Math.PI / 180) * (distance + noisemap[78]) / 6 * 5,
      Math.cos(78 * gap * Math.PI / 180) * (distance + noisemap[78]) / 6 * 5,
      Math.sin(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 5,
      Math.cos(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 5
    ));
    this.platforms.push(new Platform(
      Math.sin(80 * gap * Math.PI / 180) * (distance + noisemap[0]) / 6 * 4,
      Math.cos(80 * gap * Math.PI / 180) * (distance + noisemap[0]) / 6 * 4,
      Math.sin(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 4,
      Math.cos(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 4
    ));
    this.platforms.push(new Platform(
      Math.sin(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 5,
      Math.cos(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 5,
      Math.sin(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 4,
      Math.cos(70 * gap * Math.PI / 180) * (distance + noisemap[70]) / 6 * 4
    ));
  }

  update() {
    /*for (var i = 0; i < this.platforms.length; i++) {
      this.platforms[i].polygon.setAngle(this.game.player.rot);
    }*/
  }

  render(gl) {
    gl.save();
    this.game.camera.translate(gl);
    gl.beginPath();
    gl.lineWidth = 2;
    gl.strokeStyle = 'green';
    for (var i = 0; i < this.platforms.length; i++) {
      this.platforms[i].render(gl);
    }
    gl.stroke();
    gl.restore();
  }

  collision(other, rot) {
    var response = new SAT.Response();
    for (var i = 0; i < this.platforms.length; i++) {
      if (this.platforms[i].collision(other, response, rot)) {
        return response;
      }
    }
    return null;
  }

}
