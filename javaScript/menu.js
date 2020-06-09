class menu {
    constructor() {
        this.width = MENU_WIDTH;
        this.height = MENU_HEIGHT;
        this.menu_div = null;
        this.score = null;
        this.nextBrick = null;
        this.next = false;
        this.init();
        this.loop();
    }
    init() {
        this.menu_div = document.createElement('div');
        this.menu_div.className = "menu";
        this.nextBrick = new nextBrick(this.menu_div);
        var game = document.getElementById('game');
        game.appendChild(this.menu_div);

    }
    update() {
        this.nextBrick.update();
    }
    setNext(next) {

    }
    loop() {
        setInterval(() => {
            this.draw();
        }, 100);
    }
    draw() {
        this.nextBrick.draw();
    }
    clear() {}
}