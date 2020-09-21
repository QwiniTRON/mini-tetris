import Game from './src/game.js'
import View from './src/View.js'
import Controller from './src/Controller.js'

const element = document.getElementById('root')

const game = new Game()
const view = new View(element, 480, 640, 20, 10)
const controller = new Controller(game, view)

window.game = game
window.view = view
window.controller = controller































