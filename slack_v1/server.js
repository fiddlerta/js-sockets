/* ---------------- СЕРВЕРНА ЛОГІКА ----------------------- */

// Під'єднуємо необхідні модулі
const express = require('express');
const socketio = require('socket.io')
let namespaces = require('./data/namespaces');

const app = express();
/*
код для обслуговування статичних файлів (зображень, 
файлів CSS і файлів JavaScript) у каталозі під назвою public:
*/
app.use(express.static(__dirname + '/public'));

// Розгоратємо expressServer на порті 9000
const expressServer = app.listen(9000);
// Прослуховуємо сокети на сервері expressServer
const io = socketio(expressServer);


// Подія відбувається коли клієнт під'єднується на сервер - йому присвоюється унікальний сокет
io.on('connection',(socket)=>{
    // Повертаємо параметри всіх доступних груп (namespaces), і зберігаємо їх у масив
    let nsData = namespaces.map((ns)=>{
        return {
            img: ns.img,
            endpoint: ns.endpoint,
            icon: ns.class_icon
        }
    })
    // Надсилаємо масив з даними про групи клієнту (використовуючи адресу його сокета)
    socket.emit('nsList',nsData);
})


// Цикл для прослуховування з'єднань кожної з груп
namespaces.forEach((namespace)=>{
    // При з'єднанні клієнта з групою виконуємо блок коду
    io.of(namespace.endpoint).on('connection',(nsSocket)=>{
        //console.log(nsSocket.handshake)
        // Зберігаємо отримане ім'я користувача на сервері 
        const username = nsSocket.handshake.query.username;
        // Надсилаємо дані про доступні кімнати в даній групі клієнту
        nsSocket.emit('nsRoomLoad',namespace.rooms)
        // Прослуховуємо подію з'єднання клієнта з кімнатою
        nsSocket.on('joinRoom',(roomToJoin,numberOfUsersCallback)=>{
            //console.log(nsSocket.rooms);
            // Повертаємо назву кімнати в якій наразі знаходиться клієнт
            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            // Покидаємо кімнату
            nsSocket.leave(roomToLeave);
            // Оновлюємо дані к-сті користувачів у кімнаті
            updateUsersInRoom(namespace, roomToLeave)
            // Приєднуємося до (нової) кімнати, яка вказана в запиті
            nsSocket.join(roomToJoin)
            // Здійснюємо пошук об'єкта кімнати за назвою (кімнати)
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomToJoin;
            })
            // Надсилаємо подію з історією повідомлень (в даній кімнаті)
            nsSocket.emit('historyCatchUp', nsRoom.history)
            updateUsersInRoom(namespace, roomToJoin);
        })
        /* Подія очікування повідомлення. 
        При надходженні повідомлення створюємо новий об'єкт з даними для відображення
        */
        nsSocket.on('newMessageToServer',(msg)=>{
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: username,
                avatar: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
            }
           // Здійснюємо пошук об'єкта кімнати за назвою (кімнати)
            const roomTitle = Object.keys(nsSocket.rooms)[1];
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomTitle;
            })
            // Додаємо повідомлення в історію повідомлень кімнати
            nsRoom.addMessage(fullMsg);
            /* Надсилаємо повідомлення всім активним сокетам в даній кімнаті 
               Подія messageToClients. 
            */ 
            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients',fullMsg)
        })
    })
})

// Реалізація функції, яка оновлює к-сть користувачів у кімнаті
function updateUsersInRoom(namespace, roomToJoin){
    // Надсилаємо інформацію про е-сть користувачів у даній кімнаті всім активним сокетам (у кімнаті)
    io.of(namespace.endpoint).in(roomToJoin).clients((error,clients)=>{
        io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers',clients.length)
    })
}
