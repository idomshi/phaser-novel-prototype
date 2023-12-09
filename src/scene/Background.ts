import bg_0 from "../../assets/bg/0.webp";

export class Background extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Image;

  constructor() {
    super("background");
  }

  preload() {
    this.load.image("bg-0", bg_0);
  }

  create() {
    const { width, height } = this.game.canvas;
    this.bg = this.add.image(width / 2, height / 2, "bg-0").setScale(2);
  }
}
