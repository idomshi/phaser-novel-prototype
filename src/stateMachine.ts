// ステートマシンを書くよ。
interface ScenarioText {
  type: "text";
  text: string;
  continue?: boolean;
}

interface BackgroundImage {
  type: "background";
  name: string;
  continue?: boolean;
}

interface ShowCharacter {
  type: "showCharacter";
  name: string;
  face: string;
  continue?: boolean;
}

interface RemoveCharacter {
  type: "removeCharacter";
  name: string;
  continue?: boolean;
}

interface MoveNext {
  type: "moveNext";
  to: Function;
  sceneName?: string;
  continue?: false;
}

interface FadeOut {
  type: "fadeOut";
  time?: number;
  continue?: boolean;
}

interface FadeIn {
  type: "fadeIn";
  time?: number;
  continue?: boolean;
}

interface Wait {
  type: "wait";
  time: number;
  continue?: boolean;
}

interface PlayBgm {
  type: "playBgm";
  name?: string;
  continue?: boolean;
}

type ScenarioItem =
  | ScenarioText
  | BackgroundImage
  | ShowCharacter
  | RemoveCharacter
  | MoveNext
  | FadeOut
  | FadeIn
  | Wait
  | PlayBgm;

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

type TransitionMatrix = {
  [K: string]: [string, Function][];
};

const transitionMatrix: TransitionMatrix = {
  start: [
    ["main", always],
  ],
  main: [
    ["ending", (ctx: ScenarioContext) => ctx.temporary.flag],
    ["main", always],
  ],
  ending: [
    ["start", always],
  ],
};

type Scenario = {
  [K: string]: ScenarioItem[];
};

const scenario: Scenario = {
  start: [
    {
      type: "text",
      text:
        "雨は、羅生門をつつんで、遠くから、ざあっと云う音をあつめて来る。夕闇は次第に空を低くして、見上げると、門の屋根が、斜につき出した甍いらかの先に、重たくうす暗い雲を支えている。",
      continue: false,
    },
  ],
  main: [
    {
      type: "showCharacter",
      name: "char_0",
      face: "char-0",
      continue: false,
    },
    {
      type: "text",
      text:
        "どうにもならない事を、どうにかするためには、手段を選んでいる遑いとまはない。選んでいれば、築土ついじの下か、道ばたの土の上で、饑死うえじにをするばかりである。",
      continue: false,
    },
    {
      type: "text",
      text:
        "そうして、この門の上へ持って来て、犬のように棄てられてしまうばかりである。",
      continue: false,
    },
    {
      type: "showCharacter",
      name: "char_1",
      face: "char-1",
      continue: false,
    },
    {
      type: "text",
      text:
        "選ばないとすれば――下人の考えは、何度も同じ道を低徊ていかいした揚句あげくに、やっとこの局所へ逢着ほうちゃくした。",
      continue: false,
    },
  ],
  ending: [
    {
      type: "text",
      text:
        "しかしこの「すれば」は、いつまでたっても、結局「すれば」であった。",
      continue: false,
    },
    {
      type: "removeCharacter",
      name: "char_0",
      continue: false,
    },
    {
      type: "text",
      text:
        "下人は、手段を選ばないという事を肯定しながらも、この「すれば」のかたをつけるために、当然、その後に来る可き「盗人ぬすびとになるよりほかに仕方がない」と云う事を、積極的に肯定するだけの、勇気が出ずにいたのである。",
      continue: false,
    },
    {
      type: "removeCharacter",
      name: "char_1",
      continue: false,
    },
  ],
};

let current = "start";
let pointer = 0;

// ステートマシンの遷移を実行する。
function updateState(context: ScenarioContext) {
  for (const [name, func] of transitionMatrix[current]) {
    if (func(context)) {
      current = name;
      pointer = 0;
      return;
    }
  }
}

export function useStateMachine(updateFn: Function) {
  function next(context: ScenarioContext): void {
    const code = scenario[current][pointer];
    switch (code.type) {
      case "text": {
        updateFn({ type: "SetText", text: code.text });
        break;
      }

      case "showCharacter": {
        updateFn({ type: "ShowCharacter", name: code.name, face: code.face });
        break;
      }

      case "removeCharacter": {
        updateFn({ type: "RemoveCharacter", name: code.name });
        break;
      }
    }

    pointer += 1;
    if (pointer >= scenario[current].length) {
      // 最後まで行ったらjumpする。
      updateState(context);
    }
  }

  function save(): string {
    return "";
  }

  function load(json: string): void {}

  return { next, save, load };
}
