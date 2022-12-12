class Namespace{
    constructor(id, nsTitle, img, endpoint, class_icon){
        this.id = id;
        this.img = img;
        this.class_icon = class_icon;
        this.nsTitle = nsTitle;
        this.endpoint = endpoint;
        this.rooms = [];
    }

    addRoom(roomObj){
        this.rooms.push(roomObj);
    }

}

module.exports = Namespace;