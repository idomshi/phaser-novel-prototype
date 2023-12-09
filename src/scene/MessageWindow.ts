export class MessageWindow extends Phaser.Scene {
  private container!: Phaser.GameObjects.Container;
  private box!: Phaser.GameObjects.Rectangle;
  private text!: Phaser.GameObjects.Text;
  constructor() {
    super("messagewindow");
  }

  preload(): void {}

  create(): void {
    const { width, height } = this.game.canvas;
    // 4方向marginで指定するのが好きかなぁ。
    const [marginLeft, marginTop, marginRight, marginBottom] = [
      60,
      520,
      60,
      40,
    ];

    // paddingBottomは使うところが無い。
    const [paddingLeft, paddingTop, paddingRight] = [28, 28, 28];

    this.container = this.add.container();
    const w = width - marginLeft - marginRight;
    const h = height - marginTop - marginBottom;
    const cx = marginLeft + w / 2;
    const cy = marginTop + h / 2;

    this.box = new Phaser.GameObjects.Rectangle(
      this,
      cx,
      cy,
      w,
      h,
      0x000000,
      0.75,
    ).setStrokeStyle(2, 0xffffff);
    this.container.add(this.box);

    const dialogBoxTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      wordWrap: {
        width: w - paddingLeft - paddingRight,
        useAdvancedWrap: true,
      },
      padding: { top: 4 },
      fontSize: "24pt",
      fontFamily: "DotGothic16",
    };

    this.text = new Phaser.GameObjects.Text(
      this,
      cx - w / 2 + paddingLeft,
      cy - h / 2 + paddingTop,
      "",
      dialogBoxTextStyle,
    );
    this.container.add(this.text);

    this.text.setText(
      "雨は、羅生門をつつんで、遠くから、ざあっと云う音をあつめて来る。夕闇は次第に空を低くして、見上げると、門の屋根が、斜につき出した甍いらかの先に、重たくうす暗い雲を支えている。",
    );
  }

  update(time: number, delta: number): void {
  }
}
