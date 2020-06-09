class brick {
    constructor(game, row_board, col_board) {
        this.dots = [];
        this.data = [];
        this.row_board = row_board;
        this.col_board = col_board;
        this.game = game;
        this.color = null;
        this.initDots();

    }
    initData() {
        var data = [
            [
                x, x, x, x
            ],
            [
                [x, x, x],
                [_, x, _]
            ],
            [
                [x, x],
                [x, x]
            ],
            [
                [x, x, _],
                [_, x, x]
            ],
            [
                [_, x, x],
                [x, x, _]
            ],
            [
                [x, _],
                [x, _],
                [x, x],
            ],
            [
                [_, x],
                [_, x],
                [x, x],
            ]

        ]

        var color = [
                '#FFA500', '#0000AA', '#FF0000', '#006600', '#8B4513'
            ]
            // 
        var num = Math.floor(Math.random() * (data.length));
        this.data = data[num];
        this.numData = num;
        var num_color = Math.floor(Math.random() * (color.length))
        this.color = color[num_color];
    }
    setBrick(data, color) {
        this.data = data;
        this.color = color;
    }
    initDots() {
        this.initData();
        this.initBrick();
    }
    initBrick() {
        this.dots = []
        this.checkPositionValidate();
        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data[0].length; col++) {
                if (this.data[row][col] == x) {
                    this.dots.push(new dot(this.game, row + this.row_board, col + this.col_board, this.color))
                }
            }
        }
    }
    canFall() {
        var res = true;
        this.dots.forEach(dot => {
            if (!dot.canFall()) res = false;
        });
        return res;
    }

    moveDown() {
        while (this.canFall()) {
            this.fall();
        }
    }
    canMoveLeft() {
        var res = true;
        this.dots.forEach(dot => {
            if (!dot.canLeft()) res = false;
        });
        return res;
    }
    canMoveRight() {
        var res = true;
        this.dots.forEach(dot => {
            if (!dot.canRight()) res = false;
        });
        return res;
    }
    moveLeft(speed) {
        this.col_board -= speed;
        if (this.canMoveLeft()) {
            this.dots.forEach(dot => {
                dot.moveLeft();
            });
        }
    }
    moveRight(speed) {
        if (this.canMoveRight()) {
            this.col_board += speed;
            this.dots.forEach(dot => {
                dot.moveRight();
            });
        }
    }
    checkPositionValidate() {
        var brick_length = this.col_board + this.data[0].length - NUM_COLS;
        if (brick_length >= 0) this.col_board -= brick_length;
        if (brick_length <= -NUM_COLS + 1) this.col_board = 0;
    }
    rotate() {
        var data_temp = [];
        for (let col = this.data[0].length - 1; col >= 0; col--) {
            var data_row = [];
            for (let row = 0; row < this.data.length; row++) {
                data_row.push(this.data[row][col]);
            }
            data_temp.push(data_row);
        }



        var canRote = true;
        this.checkPositionValidate();
        for (let row = 0; row < data_temp.length; row++) {
            for (let col = 0; col < data_temp[0].length; col++) {
                if (data_temp[row][col] == x &&
                    !(this.game.board.isEmptyCell(row + this.row_board, col + this.col_board))) {
                    canRote = false;
                }
            }
        }
        if (canRote) {
            this.data = data_temp;
            this.initBrick();
        }
    }
    fall() {
        if (this.canFall()) {
            this.row_board++;
            this.dots.forEach(dot => {
                dot.fall();
            });
        } else {
            this.addBrickToBoard();
        }
    }
    draw() {
        this.dots.forEach(dot => {
            dot.draw();
        });
    }
    addBrickToBoard() {
        this.dots.forEach(dot => {
            this.game.board.addDot(dot.row, dot.col, dot.color);
        });
        this.dots = [];
    }
}