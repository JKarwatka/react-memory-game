import { FlippableCardState } from "./enums";


export type CardId = string

export interface MemoryCardData {
  id: CardId,
  img: string,
  cardState: FlippableCardState
}

export interface Board {
  [key: string]: MemoryCardData;
}
