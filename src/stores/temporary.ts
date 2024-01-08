import { action, atom } from "nanostores";

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

type Scenario =
  | ScenarioText
  | BackgroundImage
  | ShowCharacter
  | MoveNext
  | FadeOut
  | FadeIn
  | Wait
  | PlayBgm;

export const $message = atom("");

export interface Character {
  name: string;
  face: string;
}

export const $chars = atom<Character[]>([]);

const scenario: Scenario[] = [
  {
    type: "text",
    text:
      "雨は、羅生門をつつんで、遠くから、ざあっと云う音をあつめて来る。夕闇は次第に空を低くして、見上げると、門の屋根が、斜につき出した甍いらかの先に、重たくうす暗い雲を支えている。",
    continue: false,
  },
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
  {
    type: "text",
    text: "しかしこの「すれば」は、いつまでたっても、結局「すれば」であった。",
    continue: false,
  },
  {
    type: "text",
    text:
      "下人は、手段を選ばないという事を肯定しながらも、この「すれば」のかたをつけるために、当然、その後に来る可き「盗人ぬすびとになるよりほかに仕方がない」と云う事を、積極的に肯定するだけの、勇気が出ずにいたのである。",
    continue: false,
  },
];

let p = 0;

const setMessage = action($message, "setMessage", (store, str) => {
  store.set(str);
});

const setChar = action(
  $chars,
  "setChar",
  (store, name: string, face: string) => {
    const oldVal = store.value ?? [];
    const idx = oldVal.findIndex((value) => value.name === name);
    let newVal;
    if (idx < 0) {
      newVal = [...oldVal, { name, face }];
    } else {
      oldVal.splice(idx, 1, { name, face });
      newVal = oldVal;
    }
    store.set(newVal);
  },
);

export const next = () => {
  const code = scenario[p];
  switch (code.type) {
    case "text": {
      setMessage(code.text);
      break;
    }

    case "showCharacter": {
      setChar(code.name, code.face);
      break;
    }
  }
  p += 1;
  if (p >= scenario.length) p = 0;
};
