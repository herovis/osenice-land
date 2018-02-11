class Entity {

  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 1.0;
    this.rot = 0;
    this.dx = 0;
    this.dy = 0;

    this.polygon = new SAT.Polygon( new SAT.Vector(),[
      new SAT.Vector(0, 0),
      new SAT.Vector(0, this.height / 2),
      new SAT.Vector(this.width / 2, this.height),
      new SAT.Vector(this.width, this.height / 2),
      new SAT.Vector(this.width, 0),
    ]);//new SAT.Box(new SAT.Vector(), this.width, this.height).toPolygon();
  }

  update() {
    this.rot = Math.atan2(-this.getX(), -this.getY());
  }

  render(gl) {

  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

}
