export default class Card {
  static colors = {
    RED: 'Red',
    GREEN: 'Green',
    PURPLE: 'Purple'
  }
  // static counts = [1,2,3]
  static shades = {
    NONE: 'None',
    LINE: 'Lined',
    SOLID: 'Solid'
  }

  static shapes = {
    DIAMOND: 'Diamond',
    OVAL: 'Oval',
    SQUIGGLE: 'Squiggle'
  }

  static locations = {
    DECK: 'Deck',
    TABLE: 'Table',
    DISCARD: 'Discard'
  }

  constructor (color, count, shade, shape) {
    this.color = color
    this.count = count
    this.shade = shade
    this.shape = shape
    this.id = this.color+this.count+this.shade+this.shape
    this.location = Card.locations.DECK
    this.selected = false
  }
}
