import char_0 from "../../assets/character/0.webp";

export class Characters extends Phaser.Scene {
  private character!: Phaser.GameObjects.Container;
  constructor() {
    super("characters");
  }

  preload() {
    this.load.image("char-0", char_0);
  }

  create() {
    const { width, height } = this.game.canvas;
    this.character = this.add.container(width / 2, height / 2);
    const image = this.add.image(0, 0, "char-0").setScale(2);
    image.setName("0");
    this.character.add(image);
  }
}
