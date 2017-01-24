export const RESET_DECK = 'RESET_DECK'
export const CLICK_CARD = 'CLICK_CARD'
export const DISCARD_SELECTED = 'DISCARD_SELECTED'
export const DRAW_THREE = 'DRAW_THREE'
export const MARK_HINT = 'MARK_HINT'
export const LOCATIONS = {
  DECK: 'Deck',
  TABLE: 'Table',
  DISCARD: 'Discard'
}

const COLORS = {
  RED: 'r',
  GREEN: 'g',
  PURPLE: 'p'
}

const SHADES = {
  NONE: 'O',
  LINE: 'H',
  SOLID: 'S'
}

const SHAPES = {
  DIAMOND: 'D',
  OVAL: 'P',
  SQUIGGLE: 'S'
}


export function resetDeck () {
  let deck = makeDeck()
  shuffle(0, deck.length, deck)
  deck = drawCards(9, deck)

  return {
    type: RESET_DECK,
    payload: deck
  }
}

export function clickCard (card) {
  let newCard = Object.assign({}, card, {selected: !card.selected})
  return {
    type: CLICK_CARD,
    payload: newCard
  }
}

export function drawThree (deck) {
  return {
    type: DRAW_THREE,
    payload: drawCards(3, deck)
  }
}

export function markHintCards (deck, hints) {
  let ids = hints.map(card => card.id)
  let nextDeck = deck.map(card => {
    if (ids.includes(card.id)) {
      return Object.assign({}, card, {selected: true})
    } else {
      return Object.assign({}, card, {selected: false})
    }
  })

  return {
    type: MARK_HINT,
    payload: nextDeck
  }
}

export function discardSelected (deck) {
  let selected = deck.filter( card => card.selected)
  // Bring over the unselected cards
  let nextDeck = deck.filter((card) =>
    selected.find(pick => card.id === pick.id) === undefined
  )
  // Update selected, put 'em on the end
  selected.forEach(pick => {
    nextDeck.push(Object.assign({}, pick, {selected: false, location: LOCATIONS.DISCARD}))
  })
  // If we dropped below 9, draw up
  let onTable = nextDeck.filter( card => card.location === LOCATIONS.TABLE)
  if (onTable.length < 9) {
    nextDeck = drawCards(3, nextDeck)
  }

  return {
    type: DISCARD_SELECTED,
    payload: nextDeck
  }
}

function makeDeck () {
  let newDeck = []
  Object.values(COLORS).forEach(color => {
    Object.values(SHADES).forEach(shade => {
      Object.values(SHAPES).forEach(shape => {
        for (let count = 1; count <= 3; count++) {
          newDeck.push({
            color,
            count,
            shade,
            shape,
            location: LOCATIONS.DECK,
            selected: false,
            id: count+shade+color+shape
          })
        }
      })
    })
  })
  return newDeck
}

function shuffle (start, end, cards) {
  var currentIndex = end, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (start !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = cards[ currentIndex ];
    cards[ currentIndex ] = cards[ randomIndex ];
    cards[ randomIndex ] = temporaryValue;
  }
}

function drawCards (cardCount, cards) {
  let pos = cards.findIndex(card => card.location === LOCATIONS.DECK)
  if (pos === -1) {
    return cards
  }
  let newCards = []
  for (let i = 0; i < cardCount && pos+i < cards.length; i++) {
    newCards.push(Object.assign({}, cards[pos+i], {location: LOCATIONS.TABLE}))
  }
  return [
    ...cards.slice(0, pos),
    ...newCards,
    ...cards.slice(pos+newCards.length)
  ]
}
