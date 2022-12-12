/* ---------------- КЛІЄНТСЬКА ЛОГІКА ПІДКЛЮЧЕННЯ ДО ГРУПИ ----------------------- */

function joinNs(endpoint){
    if(nsSocket){
        // Закриваємо з'єднання з попередньою групою, якщо елемент nsSocket є сокетом
        nsSocket.close();
        /* При під'єднанні до новї групи видаляємо попередній обробник подій з 
        кнопки відправлення повідомлень. Виправлення помилки.*/
        document.querySelector('#user-input').removeEventListener('submit',formSubmission)
    }
    // Присвоюємо змінній новий сокет при підключенні до іншої групи
    nsSocket = io(`http://localhost:9000${endpoint}`)

    /* Обробник події nsRoomLoad. Працює таким же чином як і обробник події nsList, 
    оновлює DOM інформацією про кімнати в даній групі */
    nsSocket.on('nsRoomLoad',(nsRooms)=>{
        //console.log(nsRooms)
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = "";
        nsRooms.forEach((room)=>{
            roomList.innerHTML += `<div class="discussion room">
            <div class="photo" style="background-image: url(${room.img});">
            </div>
            <div class="desc-contact">
              <p class="name">${room.roomTitle}</p>
            </div>
          </div>`
        })

        /* Додаємо обробник подій до кожного елемента кімнати. 
        При натисканні входимо у відповідну кімнату */
        let roomNodes = document.getElementsByClassName('room');
        Array.from(roomNodes).forEach((elem)=>{
            elem.addEventListener('click',(e)=>{
                // console.log("Somone clicked on ",e.target.innerText);
                joinRoom(e.target.innerText)
            })
        })
        // За замовчквання, при першому вході під'єднуємося до першої (згори) в списку кімнати
        const topRoom = document.querySelector('.room')
        const topRoomName = topRoom.innerText;
        // console.log(topRoomName);
        joinRoom(topRoomName)
        
    })    
    // При отриманні повідомлення з сервера оновлюємо DOM, додаємо повідомлення у вікні чату
    nsSocket.on('messageToClients',(msg)=>{
        console.log(msg)
        const newMsg = buildHTML(msg);
        document.querySelector('.messages-chat').innerHTML += newMsg
    })
    // Додаємо обробник події (натискання на кнопку Enter) на поле для введення повідомлень 
    document.querySelector('.message-form').addEventListener('submit',formSubmission)
}

// Зчитуємо повідомлення з поля для введення, і відправляємо його на сервер
function formSubmission(event){
    // Вимикаємо автоматичне оновлення сторінки при відправленні повідомлення
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    nsSocket.emit('newMessageToServer',{text: newMessage})
}

/* Функція для динамічної побудови HTML розмітки повідомлення для 
подальшого використання у вікні чату (історія повідомлень) */ 
function buildHTML(msg){
    const convertedDate = new Date(msg.time).toLocaleString();
    const newHTML = `
    <div class="message">
    <div class="username"> ${msg.username} </div>
            <div class="photo" style="background-image: url(${msg.avatar});">
              <div class="online"></div>
            </div>
            <p class="text message-text"> ${msg.text} </p>
            <p class="time"> ${convertedDate}</p>
          </div>  
    `
    return newHTML;
}