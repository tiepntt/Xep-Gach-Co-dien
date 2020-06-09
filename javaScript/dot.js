class dot {
    constructor(game, row, col, color) {
        this.game = game;
        this.size = DOT_SIZE;
        this.row = row;
        this.col = col;
        this.color = color;
    }
    canLeft() {
        return !((this.col <= 0) || !this.game.board.isEmptyCell(this.row, this.col - 1));
    }
    moveLeft() {
        if (this.canLeft()) {
            this.col--;
        }
    }
    canRight() {
        return !((this.col >= NUM_COLS - 1) || !this.game.board.isEmptyCell(this.row, this.col + 1));
    }
    moveRight() {
        if (this.canRight()) {
            this.col++;
        }
    }
    hitBottom() {
        return this.row == NUM_ROWS - 1;
    }
    canFall() {
        if (this.hitBottom()) return false;
        if (!this.game.board.isEmptyCell(this.row + 1, this.col)) return false;
        return true;
    }
    fall() {
        if (this.canFall()) {
            this.row++;

        }
    }
    update() {

    }
    draw() {

        let x = this.col * this.size;
        let y = this.row * this.size;

        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(x, y, this.size - 1, this.size - 1)
    }
}