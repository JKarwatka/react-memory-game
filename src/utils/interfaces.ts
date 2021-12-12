import { MemoryCardState } from "./enums";


export type CardId = string

export interface MemoryCardData {
  id: CardId,
  img: string,
  cardState: MemoryCardState
}
