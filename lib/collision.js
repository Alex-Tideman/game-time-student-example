class Collision {

  constructor(game) {
    this.game = game;
    this.dino = game.dino;
    this.cacti = game.cacti;
    this.bullets = game.bullets;
  }

  get cactus() {
    return this.cacti[0];
  }

  rearrangeCactiWhenPastDino(){
    let that = this;
    this.cacti = this.cacti.sort(function(a, b) {
      if (that.firstCactusPastDino(a, b, that.dino)) {
        return 1;
      } else if (that.firstCactusPastSecondCactus(a, b, that.dino)) {
        return 1;
      }
    });
  }

  firstCactusPastSecondCactus(a, b, dino) {
    return   (a.x > dino.x && a.x > b.x);
  }

  firstCactusPastDino(a, b, dino) {
    return (a.x + a.width < dino.x && a.x < b.x);
  }

  moveCactusToEndOfCacti(cactus) {
    this.cacti.shift();
    this.cacti.push(cactus);
  }

  detectHit() {
    this.rearrangeCactiWhenPastDino();
    if (this.dinoHitCactus()) this.game.active = false;
    if (this.bulletHitCactus()) {
      this.cactus.shot = true;
      this.game.removeBullet();
    }
  }

  bulletHitCactus() {
    for (var i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];
      if (bullet.x + bullet.width > this.cactus.x &&
         (bullet.y > this.cactus.y || bullet.y + bullet.height > this.cactus.y)) {
          return true;
        } else {
          return false;
        }
      }
    }

  dinoHitCactus() {
    this.rearrangeCactiWhenPastDino();
    return this.bottomRightDinoHit() ||
           this.bottomMiddleDinoHit() ||
           this.bottomLeftDinoHit();
  }

  bottomRightDinoHit() {
    return this.dino.bottomRight.x > this.cactus.x &&
           this.dino.bottomRight.x < this.cactus.x + this.cactus.width &&
           this.dino.bottomRight.y > this.cactus.y;
  }

  bottomMiddleDinoHit() {
    return this.dino.bottomMiddle.x > this.cactus.x &&
           this.dino.bottomMiddle.x < this.cactus.x + this.cactus.width &&
           this.dino.bottomMiddle.y > this.cactus.y;
  }

  bottomLeftDinoHit() {
    return this.dino.bottomLeft.x > this.cactus.x &&
           this.dino.bottomLeft.x < this.cactus.x + this.cactus.width &&
           this.dino.bottomLeft.y > this.cactus.y;
  }
}

module.exports = Collision;