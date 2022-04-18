class Player {
    constructor(name, sock,id = '') {
        this.name = name;
        this.sock = sock;
        this.gameMode = 0;
        this.id = id;
        this.inGame = false;
    }
}
module.exports = Player;