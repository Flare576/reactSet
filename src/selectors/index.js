import {createSelector} from 'reselect'
import Card from '../models/card'

const getCards =  (state) => state.cards

export const CardsOnTableSelector = createSelector(
  [getCards],
  (cards) => cards.filter( card => card.location === Card.locations.TABLE)
)

export const SelectedCardsSelector = createSelector(
  [getCards],
  (cards) => cards.filter( card => card.selected)
)
