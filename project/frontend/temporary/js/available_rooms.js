// Данные университетов и аудиторий
const universities = [
    { id: "msu", name: "МГУ им. Ломоносова", address: "Москва, Ленинские горы, 1" },
    { id: "spbu", name: "СПбГУ", address: "Санкт-Петербург, Университетская наб., 7-9" },
    { id: "nsu", name: "НГУ", address: "Новосибирск, ул. Пирогова, 1" }
];

const roomsData = {
    msu: [
        {
            number: '101',
            capacity: 30,
            equipment: '15 компьютеров',
            building: 'Корпус 1',
            bookings: [
                { date: '2023-06-15', time: ['9:00-10:30', '14:45-16:15'] },
                { date: '2023-06-16', time: ['10:45-12:15', '16:30-18:00'] }
            ]
        },
        {
            number: '205',
            capacity: 25,
            equipment: 'Проектор',
            building: 'Корпус 2',
            bookings: [
                { date: '2023-06-15', time: ['10:45-12:15', '16:30-18:00'] },
                { date: '2023-06-17', time: ['9:00-10:30', '13:00-14:30'] }
            ]
        }
    ],
    spbu: [
        {
            number: '201',
            capacity: 20,
            equipment: '10 компьютеров',
            building: 'Главный корпус',
            bookings: [
                { date: '2023-06-16', time: ['9:00-10:30', '13:00-14:30'] },
                { date: '2023-06-18', time: ['16:30-18:00'] }
            ]
        }
    ],
    nsu: [
        {
            number: '105',
            capacity: 50,
            equipment: '25 компьютеров',
            building: 'Основной корпус',
            bookings: [
                { date: '2023-06-19', time: ['10:45-12:15', '14:45-16:15'] },
                { date: '2023-06-20', time: ['9:00-10:30'] }
            ]
        }
    ]
};

// Глобальные переменные
let selectedRoom = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const allTimeSlots = ['9:00-10:30', '10:45-12:15', '13:00-14:30', '14:45-16:15', '16:30-18:00', '18:15-19:45'];
const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    initUniversities();

    // Кнопка назад
    document.getElementById('backButton').addEventListener('click', function () {
        document.getElementById('roomsScreen').style.display = 'none';
        document.getElementById('universitySelection').style.display = 'block';
    });

    // Закрытие модальных окон
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Кнопка входа
    document.getElementById('loginButton').addEventListener('click', function () {
        alert('Функция входа будет реализована позже');
        document.getElementById('authModal').style.display = 'none';
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});

// Инициализация списка университетов
function initUniversities() {
    const container = document.getElementById('universitiesContainer');
    container.innerHTML = '';

    universities.forEach(university => {
        const card = document.createElement('div');
        card.className = 'university-card';
        card.dataset.university = university.id;
        card.innerHTML = `
            <h2>${university.name}</h2>
            <p>${university.address}</p>
        `;
        card.addEventListener('click', function () {
            showRooms(this.dataset.university);
        });
        container.appendChild(card);
    });
}

// Показать аудитории университета
function showRooms(universityId) {
    const university = universities.find(u => u.id === universityId);
    if (!university) return;

    const rooms = roomsData[universityId] || [];
    const container = document.getElementById('roomsContainer');
    container.innerHTML = '';

    rooms.forEach(room => {
        const card = document.createElement('div');
        card.className = 'room-card';
        card.dataset.roomId = room.number;
        card.dataset.universityId = universityId;

        card.innerHTML = `
            <div class="room-number">
                <span>Аудитория</span>
                <strong>${room.number}</strong>
            </div>
            <div class="room-details">
                <div class="detail">
                    <span class="detail-marker capacity"></span>
                    <span>Вместимость: ${room.capacity} чел.</span>
                </div>
                <div class="detail">
                    <span class="detail-marker equipment"></span>
                    <span>Оборудование: ${room.equipment}</span>
                </div>
                <div class="detail">
                    <span class="detail-marker building"></span>
                    <span>Корпус: ${room.building}</span>
                </div>
            </div>
            <button class="book-button">Забронировать</button>
        `;

        card.querySelector('.book-button').addEventListener('click', function () {
            selectedRoom = {
                universityId: universityId,
                roomId: room.number,
                roomData: room
            };
            showCalendarModal(selectedRoom);
        });

        container.appendChild(card);
    });

    document.getElementById('universitySelection').style.display = 'none';
    document.getElementById('roomsScreen').style.display = 'block';
}

// Показать модальное окно с календарем
function showCalendarModal(roomInfo) {
    // Скрываем кнопку "Домой" при открытии календаря
    document.querySelector('.home-link').style.display = 'none';

    const timeSlotsContainer = document.getElementById('timeSlotsContainer');
    timeSlotsContainer.innerHTML = `
        <div class="calendar-header">
            <h3>Выберите дату и время</h3>
            <p>Аудитория ${roomInfo.roomId}</p>
        </div>
        <div class="month-navigation">
            <button class="nav-button prev-month">❮</button>
            <div class="month-title" id="monthTitle"></div>
            <button class="nav-button next-month">❯</button>
        </div>
        <div class="calendar-grid" id="calendarGrid"></div>
        <div class="time-slots-container" id="timeSlotsSection" style="display:none">
            <div class="time-slots-header">Доступное время</div>
            <div class="time-slots-grid" id="timeSlotsGrid"></div>
        </div>
    `;

    renderCalendar(roomInfo);
    document.getElementById('timeModal').style.display = 'flex';

    // Навигация по месяцам
    document.querySelector('.prev-month').addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(roomInfo);
    });

    // Показываем кнопку "Домой" при закрытии модального окна
    document.querySelector('.close-modal').addEventListener('click', function () {
        document.querySelector('.home-link').style.display = 'flex';
    });

    document.querySelector('.next-month').addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(roomInfo);
    });

    // Также показываем при клике вне модального окна
    document.getElementById('timeModal').addEventListener('click', function (e) {
        if (e.target === this) {
            document.querySelector('.home-link').style.display = 'flex';
        }
    });
}

// Отобразить календарь
function renderCalendar(roomInfo) {
    const monthTitle = document.getElementById('monthTitle');
    const calendarGrid = document.getElementById('calendarGrid');
    const timeSlotsSection = document.getElementById('timeSlotsSection');

    monthTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    calendarGrid.innerHTML = '';
    timeSlotsSection.style.display = 'none';

    // Заголовки дней недели
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Первый день месяца
    const firstDay = new Date(currentYear, currentMonth, 1);
    // Последний день месяца
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    // День недели первого дня месяца (0 - воскресенье, 1 - понедельник и т.д.)
    const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    // Пустые ячейки перед первым днем месяца
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyDay);
    }

    // Дни месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = formatDate(date);

        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        dayElement.dataset.date = dateStr;

        // Проверяем, есть ли брони на эту дату
        const hasBookings = roomInfo.roomData.bookings.some(b => b.date === dateStr);
        if (hasBookings) {
            dayElement.classList.add('has-bookings');
        }

        dayElement.addEventListener('click', function () {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            showTimeSlots(roomInfo, dateStr);
        });

        calendarGrid.appendChild(dayElement);
    }
}

// Показать временные слоты для выбранной даты
function showTimeSlots(roomInfo, dateStr) {
    const timeSlotsSection = document.getElementById('timeSlotsSection');
    const timeSlotsGrid = document.getElementById('timeSlotsGrid');

    timeSlotsSection.style.display = 'block';
    timeSlotsGrid.innerHTML = '';

    // Получаем брони на эту дату
    const bookingsForDate = roomInfo.roomData.bookings.find(b => b.date === dateStr);
    const bookedSlots = bookingsForDate ? bookingsForDate.time : [];

    // Фильтруем доступные слоты
    const freeSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));

    if (freeSlots.length > 0) {
        freeSlots.forEach(slot => {
            const [start, end] = slot.split('-');
            const slotElement = document.createElement('button');
            slotElement.className = 'time-slot';
            slotElement.textContent = `${start} - ${end}`;
            slotElement.dataset.time = slot;
            slotElement.addEventListener('click', function () {
                bookRoom(roomInfo, dateStr, this.dataset.time);
            });
            timeSlotsGrid.appendChild(slotElement);
        });
    } else {
        timeSlotsGrid.innerHTML = '<div class="no-slots">Нет свободных слотов</div>';
    }
}

// Забронировать аудиторию
function bookRoom(roomInfo, date, time) {
    document.getElementById('timeModal').style.display = 'none';
    document.querySelector('.home-link').style.display = 'flex';

    const isAuthenticated = false; // Заглушка для проверки авторизации

    if (isAuthenticated) {
        const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            weekday: 'long'
        });
        alert(`Вы забронировали аудиторию ${roomInfo.roomId} на ${formattedDate} с ${time.replace('-', ' - ')}`);
    } else {
        document.getElementById('authModal').style.display = 'flex';
    }
}

// Вспомогательная функция для форматирования даты
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
