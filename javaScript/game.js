class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.brick = null;
        this.next = false;
        this.score = 0;
        this.run = true;
        this.init();
    }
    setBrick(brick_data, brick_color) {
        this.brick = new brick(this, 0, 4);
        this.brick.setBrick(brick_data, brick_color);
        this.brick.initBrick();

    }
    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        var game = document.getElementById('game');
        game.appendChild(this.canvas);

        // init board
        this.board = new board(this);

        //start game loop
        this.loop();
        this.startGame();
        this.GameListening();


    }
    nextGame() {
        return this.next;
    }
    setNext(next) {
        this.next = next;
    }
    startGame() {
        if (this.run) {
            setInterval(() => {
                if (!this.brick.canFall()) {
                    this.next = true;
                }
                this.brick.fall();
                if (this.board.checkFullHeight()) {

                    this.run = false;
                }
                this.board.checkFullRow();
            }, 500);
        }
    }

    loop() {
        if (this.run) {
            // this.update();
            setInterval(() => {
                this.draw();
            }, 30);
        }
    }
    update() {

    }
    draw() {
        this.clearScreen();
        this.brick.draw();
        this.board.draw();
    }
    clearScreen() {
        this.context.fillStyle = "#CDC9C9";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }


    GameListening() {
        if (this.run) {
            document.body.addEventListener('keydown', (event) => {
                switch (event.code) {
                    case 'ArrowLeft':
                        this.brick.moveLeft(1);
                        break;
                    case 'ArrowRight':
                        this.brick.moveRight(1)
                        break;
                    case 'ArrowUp':
                        this.brick.rotate();
                        break;
                    case 'ArrowDown':
                        this.brick.moveDown();
                        break;
                }
            })
        }
    }
}