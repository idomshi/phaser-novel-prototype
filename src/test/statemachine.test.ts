import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useStateMachine } from "../stateMachine";

describe("state machine", () => {
  describe("next", () => {
    beforeEach(() => {});
    beforeAll(() => {});
    afterEach(() => {
      vi.restoreAllMocks();
    });
    afterAll(() => {});

    // nextを呼んだ時に正しくMsgが発行されるか
    it("can send Msg Text", () => {
      const updateFn = vi.fn();

      // Viteのプラグインを使うと、たぶんuseStateMachineがimportだけで使えるんだと思う。
      // const useStateMachine = generateStateMachine(graph)
      const { next } = useStateMachine(updateFn);
      const context = { global: {}, savedata: {}, temporary: {} };
      next(context);

      expect(updateFn).toHaveBeenCalledTimes(1);
      expect(updateFn.mock.calls[0][0]).toEqual({
        type: "SetText",
        text:
          "雨は、羅生門をつつんで、遠くから、ざあっと云う音をあつめて来る。夕闇は次第に空を低くして、見上げると、門の屋根が、斜につき出した甍いらかの先に、重たくうす暗い雲を支えている。",
      });
    });
  });

  // describe("save", () => {
  //   // saveを呼んだ時に必要な情報がJSONで返ってくるか
  // });

  // describe("load", () => {
  //   // loadをで状態を復元できるか
  // });
});
