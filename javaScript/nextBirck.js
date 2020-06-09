class nextBrick {
    constructor(menu_div) {
        this.menu_div = menu_div;
        this.width = NEXT_WIDTH;
        this.height = NEXT_HEIGHT;
        this.canvas = null;
        this.context = null;
        this.brick = new brick(this, 0, 0);
        this.next_brick = new brick(this, 0, 0);
        this.init();
    }
    initBrick() {
        this.brick = new brick(this, 2, 2);
    }
    SetCenterBrick() {
        var toLeft = [
            { left: 1.5, top: 0 },
            { left: 0.5, top: 1 },
            { left: 1, top: 1 },
            { left: 0.5, top: 1 },
            { left: 0.5, top: 1 },
            { left: 1, top: 0.5 },
            { left: 1, top: 0.5 },
        ]
        var num = this.next_brick.numData;
        var data = toLeft[num];
        this.next_brick.row_board = data.top;
        this.next_brick.col_board = data.left;
        this.next_brick.initBrick();

    }
    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.menu_div.appendChild(this.canvas);
    }
    update() {
        this.brick = this.next_brick;
        this.next_brick = new brick(this, 0, 0);
    }

    draw() {
        this.clear();
        this.SetCenterBrick();

        this.next_brick.draw();
    }
    clear() {
        this.context.fillStyle = "#CDC9C9";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
}