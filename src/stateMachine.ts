// ステートマシンを書くよ。
export interface ScenarioContext {
  global: {};
  savedata: {};
  temporary: {
    [K: string]: any;
  };
}

function always() {
  return true;
}
function never() {
  return false;
}

const transitionMatrix = {
  start: { start: always, main: always, ending: never },
  main: {
    start: never,
    main: always,
    ending: (ctx: ScenarioContext) => ctx.temporary.flag,
  },
  ending: { start: always, main: never, ending: always },
};

const scenario = {
  start: [],
  main: [],
  ending: [],
};

let current = "start";
let pointer = 0;

export function useStateMachine(updateFn: Function) {
  function next(context: ScenarioContext): void {
    // generatorのようでgeneratorでない。まぁ使いかたは似ているがgeneratorである必要はない。
    updateFn({ type: "SetText", text: "メッセージ" });
  }

  function save(): string {
    return "";
  }

  function load(json: string): void {}

  return { next, save, load };
}
