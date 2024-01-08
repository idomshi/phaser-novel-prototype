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
        text: "メッセージ",
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
