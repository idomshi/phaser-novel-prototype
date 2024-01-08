import char_0 from "../../assets/character/0.webp";
import char_1 from "../../assets/character/1.webp";
import { temporary } from "../stores";
import { Character } from "../stores/temporary";

export class Characters extends Phaser.Scene {
  private character!: Phaser.GameObjects.Container;
  private charsChanges: Character[] = [];
  constructor() {
    super("characters");
  }

  preload() {
    this.load.image("char-0", char_0);
    this.load.image("char-1", char_1);
  }

  create() {
    const { width, height } = this.game.canvas;
    this.character = this.add.container(width / 2, height / 2);

    temporary.subscribeChars((val) => {
      this.charsChanges = [...val];
    });
  }

  update(): void {
    const char_num = this.charsChanges.length;
    if (char_num > 0) {
      // 全部一回destroyしちゃってるので良くない。
      // nameが同じものは使いまわしたい。
      this.character.each((v: any) => {
        v.destroy();
      });

      // 立ち絵のx座標を計算する。
      const { width } = this.game.canvas;

      const step = Math.round(width / (char_num + 1));
      let pos = step - width / 2;
      for (const c of this.charsChanges) {
        const image = this.add.image(pos, 0, c.face)
          .setScale(2);
        image.setName(c.name);
        this.character.add(image);
        pos += step;
      }

      this.charsChanges = [];
    }
  }
}
