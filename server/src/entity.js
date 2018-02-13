"use strict";

var WebSocket = require('ws');
var SAT = require('sat');

class Entity {

  constructor(server, type, width, height){
    this.server = server;

    this.px = 0;
    this.py = server.size + 200;

    this.dx = 0;

    this.width = width;
    this.height = height;
    this.speed = 1;

    this.onetime = {};

    this.polygon = new SAT.Polygon( new SAT.Vector(),[
      new SAT.Vector(0, 0),
      new SAT.Vector(0, this.height / 2),
      new SAT.Vector(this.width / 2, this.height),
      new SAT.Vector(this.width, this.height / 2),
      new SAT.Vector(this.width, 0),
    ]);

    this.polygonBounds = new SAT.Box(new SAT.Vector(), this.width, this.height).toPolygon();

    this.id = server.ai++;
    this.name = '';
  }

  getData() {
    var data = Object.assign({
      px: this.px,
      py: this.py,
      dx: this.dx
    }, this.onetime);
    this.onetime = {};
    return data;
  }

  getX() {
    return Math.sin(this.px * Math.PI / 180) * this.py;
  }

  getY() {
    return -Math.cos(this.px * Math.PI / 180) * (this.py - 3);
  }

  collision(entity) {
    this.updateBoundsPolygon();
    return SAT.testPolygonPolygon(entity.polygonBounds, this.polygonBounds);
  }

  getDistance(entity) {
    var distance = Math.sqrt(Math.pow(this.getX() - entity.getX(), 2) + Math.pow(this.getY() - entity.getY(), 2));
    return distance;
  }

  updateBoundsPolygon() {
    this.polygonBounds.setOffset(new SAT.Vector(this.getX(), this.getY()));
  }


};

module.exports = Entity;