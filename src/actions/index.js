export const RESET_DECK = 'RESET_DECK'
export const CLICK_CARD = 'CLICK_CARD'
export const DISCARD_SELECTED = 'DISCARD_SELECTED'

export function resetDeck (deck) {
  return {
    type: RESET_DECK,
    payload: deck
  }
}

export function clickCard (card) {
  return {
    type: CLICK_CARD,
    payload: card
  }
}

export function discardSelected () {
  return {
    type: DISCARD_SELECTED
  }
}

function makeDeck () {
  let newDeck = []
  Object.keys(Card.colors).forEach(color => {
    Object.keys(Card.shades).forEach(shade => {
      Object.keys(Card.shapes).forEach(shape => {
        for (let count = 1; count <= 3; count++) {
          newDeck.push(new Card(color, count, shade, shape))
        }
      })
    })
  })
  return newDeck
}
