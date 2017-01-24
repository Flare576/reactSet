import {createSelector} from 'reselect'
import {LOCATIONS} from '../actions/index'

const getCards =  (state) => state.cards

export const CardsInDeckSelector = createSelector(
  [getCards],
  (cards) => cards.filter( card => card.location === LOCATIONS.DECK)
)

export const CardsOnTableSelector = createSelector(
  [getCards],
  (cards) => cards.filter( card => card.location === LOCATIONS.TABLE)
)

export const SelectedCardsSelector = createSelector(
  [getCards],
  (cards) => cards.filter( card => card.selected)
)
