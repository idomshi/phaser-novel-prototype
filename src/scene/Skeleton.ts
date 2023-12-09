export class Skeleton extends Phaser.Scene {
  constructor() {
    super("skeleton");
  }

  create() {
    this.scene.launch("background");
    this.scene.launch("messagewindow");
  }
}
