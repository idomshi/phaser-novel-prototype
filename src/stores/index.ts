import {
  $chars,
  $message,
  removeChar,
  setChar,
  setMessage,
} from "./temporary";

import { useStateMachine } from "../stateMachine";

const { next } = useStateMachine(updateState);

interface Next {
  type: "Next";
}

interface SetText {
  type: "SetText";
  text: string;
}

interface ShowCharacter {
  type: "ShowCharacter";
  name: string;
  face: string;
}

interface RemoveCharacter {
  type: "RemoveCharacter";
  name: string;
}

type UpdateMessage =
  | Next
  | SetText
  | ShowCharacter
  | RemoveCharacter;

const messageQueue: UpdateMessage[] = [];

/** キューからアイテムが無くなるまでメッセージに基づき状態を更新する。 */
function popAndUpdate() {
  let msg = messageQueue.shift();
  while (msg !== undefined) {
    switch (msg.type) {
      case "Next": {
        next({ global: {}, savedata: {}, temporary: { flag: true } });
        break;
      }

      case "SetText": {
        setMessage(msg.text);
        break;
      }

      case "ShowCharacter": {
        setChar(msg.name, msg.face);
        break;
      }

      case "RemoveCharacter": {
        removeChar(msg.name);
        break;
      }
    }

    msg = messageQueue.shift();
  }
}

/** 状態を更新するためのMessageを受け取る。 */
export function updateState(msg: UpdateMessage) {
  messageQueue.push(msg);
  popAndUpdate();
}

export const temporary = {
  subscribeChars: $chars.subscribe,
  subscribeMessage: $message.subscribe,
};
