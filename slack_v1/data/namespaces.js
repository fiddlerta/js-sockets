const Namespace =  require('../classes/Namespace');
const Room =  require('../classes/Room');

// масив груп
let namespaces = [];

// ініціалізація об'єктів групи
let wikiNs = new Namespace(0,'groupa','','/groupa', 'fa fa-book');
let mozNs = new Namespace(1,'groupb','','/groupb', 'fa fa-calendar');
let linuxNs = new Namespace(2,'groupc','','/groupc', 'fa fa-code');

// додаємо об'єкти в масив
namespaces.push(wikiNs,mozNs,linuxNs);

// створюємо об'єкти кімнат, додаємо їх у відповідну групу (категорія: Навчальні предмети)
wikiNs.addRoom(new Room(0,'Історія','groupa',"",'https://images.unsplash.com/photo-1496564203457-11bb12075d90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=950&q=80'));
wikiNs.addRoom(new Room(1,'Економіка','groupa',"",'https://images.unsplash.com/photo-1494948141550-221698c089c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80'));
wikiNs.addRoom(new Room(2,'Фізика','groupa',"",'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'));

// створюємо об'єкти кімнат, додаємо їх у відповідну групу (категорія: Навчальні зустрічі)
mozNs.addRoom(new Room(0,'Воркшоп: JS meetup','groupb',"",'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'));
mozNs.addRoom(new Room(1,'Тренінг: Soft-skills','groupb',"",'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80'));
mozNs.addRoom(new Room(2,'Codecamp: Java','groupb',"",'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'));
mozNs.addRoom(new Room(3,'Thursday Yoga Club','groupb',"",'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80'));

// створюємо об'єкти кімнат, додаємо їх у відповідну групу (категорія: Мови)
linuxNs.addRoom(new Room(0,'Java','groupc',"",'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'));
linuxNs.addRoom(new Room(1,'C++','groupc',"",'https://images.unsplash.com/photo-1526385159909-196a9ac0ef64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=452&q=80'));
linuxNs.addRoom(new Room(2,'JavaScript','groupc',"",'https://images.unsplash.com/photo-1586953208412-bdc0a0e76230?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'));
linuxNs.addRoom(new Room(3,'Everyday English!','groupc',"",'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'));

module.exports = namespaces;