import { $chars, $message, next } from "./temporary";

const updateMessage = {
  next: "Next",
} as const;

// type UpdateMessage = { type: 'Next' } | { type: 'Jump' }の
// 形式にするか迷ったけどとりあえずtypeof keyof typeofで。
type UpdateMessage = typeof updateMessage[keyof typeof updateMessage];

const messageQueue: [UpdateMessage, any][] = [];

/** キューからアイテムが無くなるまでメッセージに基づき状態を更新する。 */
function popAndUpdate() {
  let item = messageQueue.shift();
  while (item !== undefined) {
    const [msg, _payload] = item;
    switch (msg) {
      case "Next": {
        next();
      }
    }

    item = messageQueue.shift();
  }
}

/** 状態を更新するためのMessageを受け取る。 */
export function updateState(msg: UpdateMessage, payload: any) {
  messageQueue.push([msg, payload]);
  popAndUpdate();
}

export const temporary = {
  subscribeChars: $chars.subscribe,
  subscribeMessage: $message.subscribe,
};
