import char_0 from "../../assets/character/0.webp";
import char_1 from "../../assets/character/1.webp";

export class Characters extends Phaser.Scene {
  private character!: Phaser.GameObjects.Container;
  constructor() {
    super("characters");
  }

  preload() {
    this.load.image("char-0", char_0);
    this.load.image("char-1", char_1);
  }

  create() {
    const { width, height } = this.game.canvas;
    const [cx, cy] = [width >> 1, height >> 1];
    this.character = this.add.container(cx, cy);

    // 立ち絵のx座標を計算する。
    const chars = ["char-0", "char-1"];
    const char_num = chars.length;
    const step = Math.round(width / (char_num + 1));
    let pos = step - cx;
    for (let i = 0; i <= char_num; ++i) {
      const image = this.add.image(pos, 0, chars[i])
        .setScale(2);
      image.setName(String(i));
      this.character.add(image);
      pos += step;
    }
  }
}
