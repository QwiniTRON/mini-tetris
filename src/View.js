export default class View {
    static colors = ['cyan', 'red', 'blue', 'green', 'orange', 'yellow', 'purple']


    constructor(elementTarget, width, height, rows, columns) {
        this.target = elementTarget
        this.width = width
        this.height = height

        this.playfieldBorderWidth = 4
        this.playfieldX = this.playfieldBorderWidth
        this.playfieldY = this.playfieldBorderWidth
        this.playfieldWidth = this.width * 2 / 3
        this.playfieldHeight = this.height
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2

        this.blockWidth = this.playfieldInnerWidth / columns
        this.blockHeight = this.playfieldInnerHeight / rows

        this.panelX = this.playfieldWidth + 10
        this.panelY = 0
        this.panelWidth = this.width / 3
        this.panelHeight = this.height

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.target.append(this.canvas)
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    render(state) {
        this.clearScreen()
        this.renderPanel(state)
        this.renderPlayfield(state.playField)
    }

    renderPlayfield(playField) {
        this.ctx.strokeStyle = 'red'
        this.ctx.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight)

        for (let y = 0; y < playField.length; y++) {
            const line = playField[y]

            for (let x = 0; x < line.length; x++) {
                const cell = line[x]

                if (cell) {
                    this.renderBlock(
                        x * this.blockWidth + this.playfieldBorderWidth,
                        y * this.blockHeight + this.playfieldBorderWidth, 
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[cell - 1]
                    )
                }
            }
        }
    }

    renderPanel({ level, score, nextPiece, lines }) {
        this.ctx.textAlign = 'start'
        this.ctx.textBaseline = 'top'
        this.ctx.fillStyle = '#fff'
        this.ctx.font = 'bold 14px sans-serif'

        this.ctx.fillText(`Level: ${level}`, this.panelX, 0)
        this.ctx.fillText(`Score: ${score}`, this.panelX, 24)
        this.ctx.fillText(`Lines: ${lines}`, this.panelX, 48)
        this.ctx.fillText(`Next:`, this.panelX, 96)

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                if (nextPiece.blocks[y][x]) {
                    this.renderBlock(x * 15 + this.panelX, 108 + y * 15, 15, 15, View.colors[nextPiece.blocks[y][x] - 1])
                }
            }
        }
    }

    renderBlock(x, y, width, height, color) {
        this.ctx.fillStyle = color
        this.ctx.strokeStyle = '#000'
        this.ctx.lineWidth = 2
        this.ctx.fillRect(x, y, width, height)
        this.ctx.strokeRect(x, y, width, height)
    }

    renderStartScreen(){
        this.ctx.fillStyle = '#fff'
        this.ctx.font = 'bold 24px Arial '
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'top'

        this.ctx.fillText('Press Enter to start!', this.width /2, this.height / 2)
    }

    renderPauseScreen(){
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
        this.ctx.fillRect(0, 0, this.width, this.height)
        
        this.ctx.fillStyle = '#fff'
        this.ctx.font = 'bold 24px Arial '
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'top'

        this.ctx.fillText('Press Space to resume!', this.width /2, this.height / 2)
    }

    renderGameOverScreen({score}){
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
        this.ctx.fillRect(0, 0, this.width, this.height)
        
        this.ctx.fillStyle = '#fff'
        this.ctx.font = 'bold 24px Arial '
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'top'

        this.ctx.fillText('Game Over!', this.width /2, this.height / 2)
        this.ctx.fillText(`Score: ${score}`, this.width /2, this.height / 2 + 48)
        this.ctx.fillText('Press Enter to Restart', this.width /2, this.height / 2 + 96)
    }
}