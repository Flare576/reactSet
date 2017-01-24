import {RESET_DECK, CLICK_CARD, DISCARD_SELECTED} from '../actions/index'
import Card from '../models/card'

export default function (state=[], action) {
  switch (action.type) {
    case RESET_DECK: return action.payload
    case CLICK_CARD:
      let cardIdx = state.findIndex(card => card.id === action.payload.id)
      let card = state[cardIdx]
      let newCard = Object.assign({}, card, {selected: !card.selected})
      return [
        ...state.slice(0, cardIdx),
        newCard,
        ...state.slice(cardIdx+1)
      ]
    case DISCARD_SELECTED:
      let selected = state.filter( card => card.selected)
      let nextState = state.filter((card) =>
        selected.find(pick => card.id === pick.id) === undefined
      )
      selected.forEach(pick => {
        nextState.push(Object.assign({}, pick, {selected: false, location: Card.locations.DISCARD}))
      })
      return nextState
    default: return state
  }
}
