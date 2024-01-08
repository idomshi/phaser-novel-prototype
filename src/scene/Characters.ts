import char_0 from "../../assets/character/0.webp";
import char_1 from "../../assets/character/1.webp";
import { temporary } from "../stores";
import { Character } from "../stores/temporary";

export class Characters extends Phaser.Scene {
  private character!: Phaser.GameObjects.Container;
  private charsChanges: Character[] | undefined = undefined;
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
    const chars = this.charsChanges;
    if (chars !== undefined) {
      // nameが違うものを抽出する。
      const arr = this.character.getAll("name")
        .map((v) => v.name)
        .filter((v) => chars.find((w) => w.name === v) === undefined);

      // nameが同じものは使いまわしたい。
      arr.forEach((name) => {
        this.character.getByName(name).destroy();
      });

      // 立ち絵のx座標を計算する。
      const { width } = this.game.canvas;

      const step = Math.round(width / (chars.length + 1));
      let pos = step - width / 2;
      for (const c of chars) {
        const imageObject = this.character.getByName(
          c.name,
        ) as Phaser.GameObjects.Image;
        if (imageObject === null) {
          // 新しいキャラクターならimageを追加する。
          const image = this.add.image(pos, 0, c.face)
            .setScale(2);
          image.setName(c.name);
          this.character.add(image);
        } else {
          // すでに表示されているキャラクターなら画像を置き換える。
          imageObject.setTexture(c.face);
          imageObject.setX(pos);
        }

        pos += step;
      }

      this.charsChanges = undefined;
    }
  }
}
