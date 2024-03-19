import Block from './block.ts';

/* eslint no-use-before-define:0 */
export type PropValue =
  | string
  | number
  | boolean
  | Date
  | EventListener
  | Record<string, string>
  | Record<string, EventListener>
  | Block;

export type PropsType = Record<string, PropValue | PropValue[]>;

export type ChildrenType = Record<string, Block | Block[]>;

export type IndexedType = {
  [key: string]: string | number | IndexedType;
};

export type DataType = {
  [key: string]: Record<string, string> | FormData | string;
};

export type AddUsersDataType = {
  data:
    | {
        users?: number[];
        chatId: number;
      }
    | FormData;
};

export type ResponseType = {
  [key: string]: Record<string, string | { [key: string]: string }> | number;
};
