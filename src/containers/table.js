import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardsOnTableSelector} from '../selectors/index'
import {clickCard} from '../actions/index'

class Table extends Component {

  onCardClick (card) {
    this.props.clickCard(card)
  }

  renderCard (card) {
    return (
      <div
        onClick={() => this.props.clickCard(card)}
        className={`card ${card.selected ? 'selected' : ''}`}
        key={card.id}>
        <span>{card.count}</span>
        <span>{card.color}</span>
        <span>{card.shade}</span>
        <span>{card.shape}</span>
      </div>
    )
  }

  render () {
    console.log(this.props.cards)
    return (
      <div className="cardTable">
        {this.props.cards.map(card => this.renderCard(card))}
        <div className="breaker" />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    cards: CardsOnTableSelector(state)
  }
}

export default connect(mapStateToProps, {clickCard})(Table)
