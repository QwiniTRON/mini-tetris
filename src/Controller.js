export default class Controller {
    constructor(game, view) {
        this.game = game
        this.view = view
        this.isPlay = false
        this.isStartOverlay = true
        this.interval = null
        this.isGameOver = false

        this.startTimer()
        this.view.renderStartScreen()

        document.addEventListener('keydown', this.handleKeyDown.bind(this), {
            passive: true
        })
    }

    update() {
        this.game.movePieceDown()
        this.updateView()
    }

    startTimer() {
        const speed = Math.max(1000 - this.game.getState().level * 100, 100)
        
        if (!this.interval) {

            this.interval = setTimeout(function circleFunc() {
                const speed = Math.max(1000 - this.game.getState().level * 100, 100)

                this.interval = setTimeout(circleFunc.bind(this), speed)
                
                if (this.isPlay) {
                    this.update()
                }
            }.bind(this), speed)
        }
    }

    stopTimer() {
        if (this.interval) {
            clearTimeout(this.interval)
            this.interval = null
        }
    }

    play() {
        this.isPlay = true
        this.startTimer()
        this.updateView()
    }

    pause() {
        this.isPlay = false
        this.stopTimer()
        this.updateView()
    }

    updateView() {
        const state = this.game.getState()
        if(state.isGameOver){
            this.isGameOver = true
            this.stopTimer()
            return this.view.renderGameOverScreen(state)
        }

        this.view.render(state)
    }

    handleKeyDown(event) {
        let game = this.game,
            view = this.view;

        if (event.key === 'ArrowRight' && !this.isGameOver) {
            game.movePieceRight()
            view.render(game.getState())
        }

        if (event.key === 'ArrowLeft' && !this.isGameOver) {
            game.movePieceLeft()
            view.render(game.getState())
        }

        if (event.key === 'ArrowDown' && !this.isGameOver) {
            game.movePieceDown()
            view.render(game.getState())
        }

        if (event.key === 'ArrowUp' && !this.isGameOver) {
            game.rotatePiece()
            view.render(game.getState())
        }

        if (event.key === 'Enter') {
            if(this.isGameOver){
                this.game.restart()
                this.isGameOver = false
                this.isStartOverlay = false
                this.isPlay = true
                this.play()
            }else{
                this.isPlay = true
                this.isStartOverlay = false
                view.render(game.getState())
            }
        }

        if (event.key === ' ' && !this.isStartOverlay && !this.isGameOver) {
            if (this.isPlay) {
                this.pause()
                view.renderPauseScreen()
            } else {
                this.play()
            }
        }
    }
}