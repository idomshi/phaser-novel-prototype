import { updateState } from "../stores";

/** MouseInput、KeyboardInput、Buttonなど、プレイヤーからの入力を受け取る処理を管理するクラス。 */
export class InputManager extends Phaser.Scene {
  constructor() {
    super("inputmanager");
  }

  private pressEnter(): void {
    updateState({ type: "Next" });
  }

  create(): void {
    const enter = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
    enter?.on("down", this.pressEnter);

    const { width, height } = this.game.canvas;
    const zone = this.add.zone(width / 2, height / 2, width, height);
    zone.setInteractive({ useHandCursor: true });
    zone.on("pointerup", this.pressEnter);
  }
}
