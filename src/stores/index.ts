import { $message, next } from "./temporary";

const updateMessage = {
  next: "Next",
} as const;

// type UpdateMessage = { type: 'Next' } | { type: 'Jump' }の
// 形式にするか迷ったけどとりあえずtypeof keyof typeofで。
type UpdateMessage = typeof updateMessage[keyof typeof updateMessage];

export function updateState(msg: UpdateMessage, payload: any) {
  switch (msg) {
    case "Next": {
      next();
    }
  }
}

export const temporary = {
  subscribeMessage: $message.subscribe,
};
