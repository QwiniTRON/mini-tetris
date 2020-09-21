export default class Game {
    // S \\
    static points = [
        40, 100, 300, 1200
    ]

    // . \\

    score = 0
    lines = 0
    get level() {
        return Math.floor(this.lines * 0.1)
    }
    playfied = this.createPlayField()
    topOut = false

    activePiece = this.createPiece()
    // {
    //     x: 0,
    //     y: 0,
    //     blocks: [
    //         [0, 1, 0],
    //         [1, 1, 1],
    //         [0, 0, 0]
    //     ]
    // get blocks(){
    //     return this.rotation[this.rotationIndex]
    // },
    // rotationIndex: 0,
    // rotation: [
    //     [
    //         [0, 1, 0],
    //         [1, 1, 1],
    //         [0, 0, 0]
    //     ],
    //     [
    //         [0, 1, 0],
    //         [0, 1, 1],
    //         [0, 1, 0]
    //     ],
    //     [
    //         [0, 0, 0],
    //         [1, 1, 1],
    //         [0, 1, 0]
    //     ],
    //     [
    //         [0, 1, 0],
    //         [1, 1, 0],
    //         [0, 1, 0]
    //     ]
    // ]
    // }

    nextPiece = this.createPiece()

    // NEW \\

    // () \\

    restart() {
        this.nextPiece = this.createPiece()
        this.score = 0
        this.lines = 0
        this.playfied = this.createPlayField()
        this.topOut = false
        this.activePiece = this.createPiece()
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7)
        const type = 'IJLOSTZ'[index]
        const piece = {
            x: 0,
            y: 0,
            blocks: ''
        }

        switch (type) {
            case 'I':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
                break;
            case 'J':
                piece.blocks = [
                    [0, 0, 0],
                    [2, 2, 2],
                    [0, 0, 2]
                ]
                break;
            case 'L':
                piece.blocks = [
                    [0, 0, 0],
                    [3, 3, 3],
                    [3, 0, 0]
                ]
                break;
            case 'O':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [0, 4, 4, 0],
                    [0, 4, 4, 0],
                    [0, 0, 0, 0]
                ]
                break;
            case 'S':
                piece.blocks = [
                    [0, 0, 0],
                    [0, 5, 5],
                    [5, 5, 0]
                ]
                break;
            case 'T':
                piece.blocks = [
                    [0, 6, 0],
                    [6, 6, 6],
                    [0, 0, 0]
                ]
                break;
            case 'Z':
                piece.blocks = [
                    [0, 0, 0],
                    [7, 7, 0],
                    [0, 7, 7]
                ]
                break;
            default:
                throw new Error('Game Error: Неизветный тип')
                break;
        }

        const topLineLength = piece.blocks[0].length
        for (let i = 0; i <= topLineLength; i++) {
            if (piece.blocks[0][i]) {
                break;
            }
            if (i == topLineLength) {
                piece.y -= 1
            }
        }

        piece.x = Math.floor((10 - topLineLength) / 2)


        return piece
    }

    rotatePiece() {
        // ONE
        // this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3? this.activePiece.rotationIndex + 1 : 0
        // console.log(this.hasCollision());

        // if(this.hasCollision()){
        //     this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0? this.activePiece.rotationIndex - 1 : 3
        // }

        // return this.activePiece.blocks




        // TWO
        // const blocks = this.activePiece.blocks
        // const length = blocks.length

        // const temp = []
        // for (let i = 0; i < length; i++) {
        //     temp[i] = Array(length).fill(0)
        // }

        // for (let y = 0; y < length; y++) {
        //     for (let x = 0; x < length; x++) {
        //         temp[x][y] = blocks[length - 1 - y][x]
        //     }
        // }

        // this.activePiece.blocks = temp

        // if (this.hasCollision()) {
        //     this.activePiece.blocks = blocks
        // }

        // THREE
        this.rotateBlocks()

        if (this.hasCollision()) {
            this.rotateBlocks(false)
        }
    }

    rotateBlocks(clockWise = true) {
        const blocks = this.activePiece.blocks
        const length = blocks.length
        const x = Math.floor(length / 2)
        const y = length - 1

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                const temp = blocks[i][j];

                if (clockWise) {
                    blocks[i][j] = blocks[y - j][i]
                    blocks[y - j][i] = blocks[y - i][y - j]
                    blocks[y - i][y - j] = blocks[j][y - i]
                    blocks[j][y - i] = temp
                } else {
                    blocks[i][j] = blocks[j][y - i]
                    blocks[j][y - i] = blocks[y - i][y - j]
                    blocks[y - i][y - j] = blocks[y - j][i]
                    blocks[y - j][i] = temp
                }
            }
        }
    }

    movePieceLeft() {
        this.activePiece.x -= 1

        if (this.hasCollision()) {
            this.activePiece.x += 1
        }
    }

    movePieceRight() {
        this.activePiece.x += 1

        if (this.hasCollision()) {
            this.activePiece.x -= 1
        }
    }

    movePieceDown() {
        if (this.topOut) return

        this.activePiece.y += 1

        if (this.hasCollision()) {
            this.activePiece.y -= 1
            this.lockPiece()
            this.clearLines()
            this.updatePieces()
        }

        if (this.hasCollision()) {
            this.topOut = true
        }
    }

    updatePieces() {
        this.activePiece = this.nextPiece
        this.nextPiece = this.createPiece()
    }

    hasCollision() {
        const playfied = this.playfied
        const { x, y, blocks } = this.activePiece

        for (let yl = 0; yl < blocks.length; yl++) {
            for (let xl = 0; xl < blocks[yl].length; xl++) {
                // console.log(blocks[yl][xl]);
                // console.log(playfied[y + yl]);
                // console.log(playfied[y + yl][x + xl]);

                if (
                    blocks[yl][xl] &&
                    ((playfied[y + yl] === undefined || playfied[y + yl][x + xl] === undefined) ||
                        playfied[y + yl][x + xl])
                ) {
                    return true
                }
            }
        }
        return false
    }

    lockPiece() {
        const { x, y, blocks } = this.activePiece

        for (let yl = 0; yl < blocks.length; yl++) {
            for (let xl = 0; xl < blocks[yl].length; xl++) {
                if (blocks[yl][xl]) {
                    this.playfied[y + yl][x + xl] = blocks[yl][xl]
                }
            }
        }
    }

    createPlayField() {
        const newPlayField = []

        for (let y = 0; y < 20; y++) {
            newPlayField[y] = []

            for (let x = 0; x < 10; x++) {
                newPlayField[y][x] = 0
            }
        }

        return newPlayField
    }

    getState() {
        const playFieldCopy = this.createPlayField()
        const { blocks, x: activeX, y: activeY } = this.activePiece

        for (let y = 0; y < this.playfied.length; y++) {
            for (let x = 0; x < this.playfied[y].length; x++) {
                playFieldCopy[y][x] = this.playfied[y][x]
            }
        }

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playFieldCopy[y + activeY][x + activeX] = blocks[y][x]
                }
            }
        }

        return {
            playField: playFieldCopy,
            lines: this.lines,
            level: this.level,
            score: this.score,
            nextPiece: this.nextPiece,
            isGameOver: this.topOut
        }
    }

    updateScore(lineCount) {
        if (lineCount) {
            this.score += Game.points[lineCount - 1] * (this.level + 1)
            this.lines += lineCount
        }
    }

    clearLines() {
        let lines = []
        const rows = 20
        const cols = 10
        const playfield = this.playfied

        for (let y = rows - 1; y > -1; y--) {
            let numberOfBlocks = 0

            for (let x = 0; x < playfield[y].length; x++) {
                if (playfield[y][x]) {
                    numberOfBlocks++
                }
            }

            // if (numberOfBlocks === 0) {
            //     break;
            // }

            if (numberOfBlocks == playfield[y].length) {
                lines.unshift(y)
            }
        }

        for (const i of lines) {
            playfield.splice(i, 1)
            playfield.unshift(Array(cols).fill(0))
        }


        // for (let x = 0; x < playfield[playfield.length - 1]; x++) {

        //     if (!playfield[playfield.length - 1][x]) {

        //         for (let y = playfield.length - 2; y >= 0; y--) {
        //             if (!playfield[y][x]) {
        //                 break;
        //             } else {
        //                 playfield[y + 1][x] = playfield[y][x]
        //                 playfield[y][x] = 0
        //             }
        //         }
        //     }
        // }


        this.updateScore(lines.length)
    }

}



