class Room{
    constructor(roomId, roomTitle, namespace, privateRoom = false, img){
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.privateRoom = privateRoom;
        this.history = [];
        this.img = img;
    }
    addMessage(message){
        this.history.push(message);
    }
    clearHistory(){
        this.history = [];
    }
}

module.exports = Room;