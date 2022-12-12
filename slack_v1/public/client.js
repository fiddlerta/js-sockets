/* ---------------- КЛІЄНТСЬКА ЛОГІКА ----------------------- */

// Користувацький ввід імені
const username = prompt("What is your username?")

/* Створюення нового менеджера з'єднань для вказаної URL-адреси. 
Виклик методу io() повертає Socket. В Options: query передаємо ім'я користувача на сервер */
const socket = io('http://localhost:9000',{
    query: {
        username
    }
});
let nsSocket = "";
/* Обробник події nsList. При отриманні повідомлення з інформацією про Групи (namespaces) 
оновлюємо DOM. Знаходимо елемент за його атрибутом class і оновлюємо HTML розмітку */
socket.on('nsList',(nsData)=>{
    let namespacesDiv = document.querySelector('.items');
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML += `
    <li class="item">
        <i class="${ns.icon}" id="ns-item" ns=${ns.endpoint} aria-hidden="true"></i>
    </li>`
    })

   /* До кожного елемента групи ns-item (з атрибутом id="ns-item") додаємо обробник події натискання.
   При left-click на елемент групи відбуваєть виклик відповідної функції, після чого користувач переходить 
   у відповідну групу */
    console.log(document.querySelectorAll('#ns-item'))
    Array.from(document.querySelectorAll('#ns-item')).forEach((elem)=>{
        elem.addEventListener('click',(e)=>{
            const nsEndpoint = elem.getAttribute('ns');
            joinNs(nsEndpoint)
        })
    })

    // За замовчування, при першому вході користувач потрапляє в групу /groupa
    joinNs('/groupa');
})


