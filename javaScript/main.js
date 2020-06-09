class main {
    constructor() {
        this.game = new game();
        this.menu = new menu();
        this.run = true;
        this.initBrick();
        this.loop();
    }
    initBrick() {
        let brick_menu = this.menu.nextBrick.brick;
        this.game.setBrick(brick_menu.data, brick_menu.color);
    }
    NextBrick() {
        this.menu.next = this.game.next;

        if (this.menu.next) {
            this.update();
            this.initBrick();
            this.game.next = false;
        }
    }
    update() {
        this.menu.update();
    }
    loop() {
        setInterval(() => {
            if (this.game.run) {
                this.NextBrick();
            } else {
                this.game.board.resetBoard();
                this.game.run = true;

                this.initBrick();
            }
        }, 20);
    }
}
var main_game = new main();