/* ---------------- КЛІЄНТСЬКА ЛОГІКА ПІДКЛЮЧЕННЯ ДО КІМНАТИ ----------------------- */

function joinRoom(roomName){
    /*При підключенні до кімнати надсилаємо на сервер інформацію про ім'я кімнати 
    та к-сть користувачів у ній */
    nsSocket.emit('joinRoom', roomName,(newNumberOfMembers)=>{
        // Оновлюємо інформацію в DOM про кількість користувачів у кімнаті 
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers}`
    })
    // Оновлюємо DOM повідомленнями з історії чату
    nsSocket.on('historyCatchUp',(history)=>{
        // console.log(history)
        const messagesUl = document.querySelector('.messages-chat');
        messagesUl.innerHTML = "";
        history.forEach((msg)=>{
            const newMsg = buildHTML(msg)
            messagesUl.innerHTML += newMsg;
        })
        messagesUl.scrollTo(0,messagesUl.scrollHeight);
    })
    // Отримуємо інформацію з сервера про ім'я кімнати та к-сть користувачів у ній, онволюємо HTML
    nsSocket.on('updateMembers',(numMembers)=>{
        document.querySelector('.curr-room-num-users').innerHTML = `${numMembers}`
        document.querySelector('.room-name').innerHTML = `${roomName}`
    })

    /* Логіка роботи елемента пошуку. Знаходимо елемент на сторінці та підключаємо до нього 
    обробник прослуховування користувацького вводу. У змінну messages зберігаємо масив повідомлень 
    чату (даної кімнати). Порівнюємо текст кожного з повідомлень із текстом, який ввів користувач 
    у поле пошуку. При збігу - залишаємо повідомлення видимим, у іншому випадку - робимо невидимим*/
    let searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('input',(e)=>{
        console.log(e.target.value)
        let messages = Array.from(document.getElementsByClassName('message-text'));
        console.log(messages);
        messages.forEach((msg)=>{
            if(msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
                msg.style.display = "none";
            }else{
                msg.style.display = "block"
            }
        })
    })

};