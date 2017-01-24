import {RESET_DECK, DRAW_THREE, CLICK_CARD, MARK_HINT, DISCARD_SELECTED} from '../actions/index'

export default function (state=[], action) {
  switch (action.type) {
    case RESET_DECK:
    case DRAW_THREE:
    case DISCARD_SELECTED:
    case MARK_HINT:
      return action.payload
    case CLICK_CARD:
      let cardIdx = state.findIndex(card => card.id === action.payload.id)
      return [
        ...state.slice(0, cardIdx),
        action.payload,
        ...state.slice(cardIdx+1)
      ]
    default: return state
  }
}
