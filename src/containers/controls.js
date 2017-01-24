import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resetDeck, discardSelected, drawThree, markHintCards} from '../actions/index'
import {CardsOnTableSelector, SelectedCardsSelector} from '../selectors/index'

class Controls extends Component {
  componentWillMount () {
    this.props.resetDeck()
  }

  onResetClick () {
    this.props.resetDeck()
  }

  onDrawClick () {
    this.props.drawThree(this.props.cards)
  }

  onHintClick ()  {
    let table = this.props.tableCards
    for (let i = 0; i < table.length - 2; i++) {
      for (let j = i + 1; j < table.length - 1; j++) {
        for (let k = j + 1; k < table.length; k++) {
          console.log(`${i} ${j} ${k}`)
          let set = [table[i], table[j], table[k]]
          if (makesSet(set).length === 0) {
            console.log(set)
            this.props.markHintCards(this.props.cards, set)
            return
          }
        }
      }
    }
    alert("No sets on the table")
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

    this.props.discardSelected(this.props.cards)
  }

  render () {
    return (
      <div className="table">
        <button onClick={this.onResetClick.bind(this)}>Reset Game</button>
        <button onClick={this.onCheckClick.bind(this)}>Check Set</button>
        <button onClick={this.onDrawClick.bind(this)}>Draw 3</button>
        <button onClick={this.onHintClick.bind(this)}>Hint</button>
      </div>
    )
  }
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
  return (characteristics[0] === characteristics[1] && characteristics[0] === characteristics[2]) ||
    (characteristics[0] !== characteristics[1] && characteristics[0] !== characteristics[2] && characteristics[1] !== characteristics[2])
}

function mapStateToProps (state) {
  return {
    cards: state.cards,
    tableCards: CardsOnTableSelector(state),
    selected: SelectedCardsSelector(state)
  }
}

export default connect(mapStateToProps, {resetDeck, discardSelected, drawThree, markHintCards})(Controls)
