import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resetDeck, discardSelected} from '../actions/index'
import {CardsOnTableSelector, SelectedCardsSelector} from '../selectors/index'

import Card from '../models/card'

class Controls extends Component {
  componentWillMount () {
    this.onResetClick()
  }

  onResetClick () {
    let newDeck = makeDeck()
    //shuffle(0, newDeck.length, newDeck) // todo: put this back
    drawCards(9, newDeck)

    this.props.resetDeck(newDeck)
  }

  onCheckClick () {
    let selected = this.props.selected
    if (selected.length !== 3) {
      alert("Only sets of 3 are allowed")
      return
    }

    let badThings = makesSet(selected)
    if (badThings.length !== 0) {
      alert (`Doesn't make a SET: ${badThings.join(', ')}`)
      return
    }

    if (this.props.tableCards.length === 9) {

    }

    this.props.discardSelected()
  }

  render () {
    return (
      <div className="table">
        <button onClick={this.onResetClick.bind(this)}>Reset Game</button>
        <button onClick={this.onCheckClick.bind(this)}>Check Set</button>
      </div>
    )
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

function makesSet (cards) {
  let badThings = []
  if (!sameOrUnique(cards.map(card => card.color))){
    badThings.push("Color")
  }
  if (!sameOrUnique(cards.map(card => card.count))){
    badThings.push("Count")
  }
  if (!sameOrUnique(cards.map(card => card.shade))){
    badThings.push("Shade")
  }
  if (!sameOrUnique(cards.map(card => card.shape))){
    badThings.push("Shape")
  }
  return badThings
}

function sameOrUnique (characteristics) {
  console.log(characteristics)
  return (characteristics[0] === characteristics[1] && characteristics[0] === characteristics[2]) ||
    (characteristics[0] !== characteristics[1] && characteristics[0] !== characteristics[2] && characteristics[1] !== characteristics[2])
}

function drawCards (cardCount, cards) {
  let pos = cards.findIndex(card => card.location === Card.locations.DECK)
  for (let i = 0; i < cardCount; i++) {
    cards[pos+i].location = Card.locations.TABLE
  }
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

function mapStateToProps (state) {
  return {
    cards: state.cards,
    tableCards: CardsOnTableSelector(state),
    selected: SelectedCardsSelector(state)
  }
}

export default connect(mapStateToProps, {resetDeck, discardSelected})(Controls)
