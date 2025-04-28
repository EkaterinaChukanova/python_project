document.getElementById("centerButton").addEventListener("click", function() {
    window.location.href = "booking.html"; // Укажите нужный URL
});
document.addEventListener("DOMContentLoaded", function () {
    const centerButton = document.getElementById("centerButton");
    if (centerButton) {
        centerButton.addEventListener("click", function () {
            window.location.href = "booking.html";
        });
    }

    const adminBtn = document.getElementById("adminBtn");
    const modal = document.getElementById("adminModal");
    const closeBtn = document.querySelector(".close");
    const adminForm = document.getElementById("adminForm");
    const passwordInput = document.getElementById("password");

    // Открытие модального окна
    if (adminBtn && modal) {
        adminBtn.addEventListener("click", function () {
            modal.style.display = "flex";
            passwordInput.classList.remove("error"); // Сбрасываем обводку при открытии
            passwordInput.value = ""; // Очищаем поле ввода
        });
    }

    // Закрытие модального окна через крестик
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
            passwordInput.classList.remove("error"); // Сбрасываем обводку
            passwordInput.value = ""; // Очищаем поле ввода
        });
    }

    // Закрытие при клике вне модального окна
    if (modal) {
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                passwordInput.classList.remove("error"); // Сбрасываем обводку
                passwordInput.value = ""; // Очищаем поле ввода
            }
        });
    }

    // Обработка отправки формы
    if (adminForm && passwordInput) {
        adminForm.addEventListener("submit", function (event) {
            event.preventDefault();
            passwordInput.classList.remove("error"); // Сбрасываем обводку перед проверкой
            void passwordInput.offsetWidth;
            const password = passwordInput.value;
            if (password === "admin123") {
                modal.style.display = "none";
                passwordInput.classList.remove("error"); // Сбрасываем обводку
                passwordInput.value = ""; // Очищаем поле ввода
                window.location.href = 'admin_red.html';
            } else {
                passwordInput.classList.add("error"); // Добавляем обводку при ошибке
            }
        });

        // Сбрасываем класс error при начале ввода
        passwordInput.addEventListener("input", function () {
            passwordInput.classList.remove("error");
        });
    }
});
