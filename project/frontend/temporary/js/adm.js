document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM полностью загружен');

    // Первое модальное окно (добавление аудитории)
    const modal = document.getElementById('modal');
    const openModalBtn = document.querySelector('.admin-button');
    const closeModalBtn = document.querySelector('#modal .close');
    const roomForm = document.getElementById('roomForm');

    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (modal && event.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (roomForm) {
        roomForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const institution = document.getElementById('institution')?.value || '';
            const buildingNumber = document.getElementById('buildingNumber')?.value || '';
            const roomNumber = document.getElementById('roomNumber')?.value || '';
            const capacity = document.getElementById('capacity')?.value || '';
            const equipment = document.getElementById('equipment')?.value || '';

            console.log({
                institution,
                buildingNumber,
                roomNumber,
                capacity,
                equipment
            });

            roomForm.reset();
            modal.style.display = 'none';
        });
    }

    // Второе модальное окно (ограничение аудиторий)
    const modal2 = document.getElementById('modal2');
    const openModalBtn2 = document.querySelectorAll('.admin-button')[1];
    const closeModalBtn2 = document.querySelector('#modal2 .close');
    const teacherRoomForm = document.getElementById('teacherRoomForm');

    if (openModalBtn2 && modal2) {
        openModalBtn2.addEventListener('click', () => {
            modal2.style.display = 'block';
        });
    }

    if (closeModalBtn2 && modal2) {
        closeModalBtn2.addEventListener('click', () => {
            modal2.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (modal2 && event.target === modal2) {
            modal2.style.display = 'none';
        }
    });

    if (teacherRoomForm) {
        const buildingSelect = document.getElementById('buildingSelect');
        const customSelect = document.querySelector('.custom-select');
        const selectHeader = customSelect?.querySelector('.select-header');
        const selectOptions = customSelect?.querySelector('.select-options');

        if (!customSelect || !selectHeader || !selectOptions) {
            console.error('Ошибка: Не найдены элементы .custom-select, .select-header или .select-options');
            return;
        }

        const roomsByBuilding = {
            building1: ["101", "102", "103"],
            building2: ["201", "202"],
            building3: ["301", "302", "303"]
        };

        // Инициализация: делаем поле некликабельным, пока не выбран корпус
        selectHeader.style.cursor = 'not-allowed';
        selectHeader.style.color = '#999';
        selectHeader.textContent = 'Сначала выберите корпус';
        selectOptions.innerHTML = '<label style="padding: 10px; color: #666;">Сначала выберите корпус</label>';

        // Обновление списка аудиторий при выборе корпуса
        if (buildingSelect) {
            buildingSelect.addEventListener('change', () => {
                const selectedBuilding = buildingSelect.value;
                const rooms = roomsByBuilding[selectedBuilding] || [];
                selectOptions.innerHTML = '';

                if (rooms.length === 0) {
                    selectHeader.style.cursor = 'not-allowed';
                    selectHeader.style.color = '#999';
                    selectHeader.textContent = 'Сначала выберите корпус';
                    selectOptions.innerHTML = '<label style="padding: 10px; color: #666;">Сначала выберите корпус</label>';
                } else {
                    selectHeader.style.cursor = 'pointer';
                    selectHeader.style.color = 'rgb(26, 47, 94)';
                    selectHeader.textContent = 'Выберите аудитории';

                    rooms.forEach(room => {
                        const label = document.createElement('label');
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.name = 'allowedRooms';
                        checkbox.value = room;
                        label.appendChild(checkbox);
                        label.appendChild(document.createTextNode(` ${room}`));
                        selectOptions.appendChild(label);
                    });
                }
            });
        }

        // Открытие/закрытие выпадающего списка
        selectHeader.addEventListener('click', (event) => {
            if (selectHeader.style.cursor === 'not-allowed') return;
            customSelect.classList.toggle('open');
            event.stopPropagation();
        });

        // Закрытие при клике вне компонента
        document.addEventListener('click', (event) => {
            if (!customSelect.contains(event.target)) {
                customSelect.classList.remove('open');
            }
        });

        // Обновление заголовка при выборе аудиторий
        selectOptions.addEventListener('change', () => {
            const selectedRooms = Array.from(teacherRoomForm.querySelectorAll('input[name="allowedRooms"]:checked'))
                .map(checkbox => checkbox.value)
                .join(', ');
            selectHeader.textContent = selectedRooms || 'Выберите аудитории';
        });

        // Обработка отправки формы
        teacherRoomForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const selectedTeacher = document.getElementById('teacherSelect').value;
            const selectedInstitution = document.getElementById('institutionSelect').value;
            const selectedBuilding = document.getElementById('buildingSelect').value;
            const selectedRooms = Array.from(teacherRoomForm.querySelectorAll('input[name="allowedRooms"]:checked'))
                .map(checkbox => checkbox.value);

            console.log({
                selectedTeacher,
                selectedInstitution,
                selectedBuilding,
                selectedRooms
            });

            teacherRoomForm.reset();
            selectHeader.style.cursor = 'not-allowed';
            selectHeader.style.color = '#999';
            selectHeader.textContent = 'Сначала выберите корпус';
            selectOptions.innerHTML = '<label style="padding: 10px; color: #666;">Сначала выберите корпус</label>';
            customSelect.classList.remove('open');
            modal2.style.display = 'none';
        });
    }

    // Третье модальное окно (ограничение часов)
    const modal3 = document.getElementById('modal3');
    const openModalBtn3 = document.querySelectorAll('.admin-button')[2];
    const closeModalBtn3 = document.querySelector('#modal3 .close');
    const hoursLimitForm = document.getElementById('hoursLimitForm');

    if (openModalBtn3 && modal3) {
        openModalBtn3.addEventListener('click', () => {
            modal3.style.display = 'block';
        });
    }

    if (closeModalBtn3 && modal3) {
        closeModalBtn3.addEventListener('click', () => {
            modal3.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (modal3 && event.target === modal3) {
            modal3.style.display = 'none';
        }
    });

    if (hoursLimitForm) {
        hoursLimitForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const selectedTeacher = document.getElementById('teacherSelectHours')?.value || '';
            const maxHours = document.getElementById('maxHours')?.value || '';

            console.log({
                selectedTeacher,
                maxHours
            });

            hoursLimitForm.reset();
            modal3.style.display = 'none';
        });
    }
});
