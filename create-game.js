const checkboxes = document.querySelectorAll('.category'); // جميع مربعات الفئات
const addGameButton = document.getElementById('addGameButton'); // زر "ابدأ اللعبة"
let selectedCategories = []; // لتخزين الفئات المختارة

// تابع لتحديث حالة الزر بناءً على عدد الفئات المختارة ووجود الحقول المدخلة
function updateButtonState() {
    const gameName = document.getElementById('gameName').value;
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;

    // تمكين الزر فقط إذا تم إدخال اسم اللعبة، الفريقين، واختيار 6 فئات
    if (selectedCategories.length === 6 && gameName && team1 && team2) {
        addGameButton.disabled = false;
    } else {
        addGameButton.disabled = true;
    }
}

// إضافة حدث لكل خانة اختيار
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const categoryCard = checkbox.closest('.category-card');
        const categoryName = categoryCard.querySelector('p').textContent;

        if (checkbox.checked) {
            // إضافة الفئة إلى الفئات المحددة
            if (selectedCategories.length < 6) {
                selectedCategories.push(categoryName);
                categoryCard.classList.add('selected'); // تغيير شكل الفئة عند تحديدها
            } else {
                checkbox.checked = false; // إلغاء تحديد الفئة إذا تم اختيار 6 فئات
            }
        } else {
            // إزالة الفئة من الفئات المحددة
            selectedCategories = selectedCategories.filter(item => item !== categoryName);
            categoryCard.classList.remove('selected'); // إزالة الشكل المحدد
        }

        // تحديث حالة الزر بناءً على عدد الفئات المختارة ووجود الحقول المدخلة
        updateButtonState();
    });
});

// عند الضغط على "ابدأ اللعبة" تخزين جميع البيانات في localStorage
addGameButton.addEventListener('click', function() {
    const gameName = document.getElementById('gameName').value;
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;

    // تخزين البيانات في localStorage
    localStorage.setItem('gameDetails', JSON.stringify({
        gameName: gameName,
        team1: team1,
        team2: team2,
        categories: selectedCategories
    }));

    // الانتقال مباشرة إلى صفحة "اللعب"
    window.location.href = 'game-play.html'; // الانتقال إلى صفحة اللعبة
});

// عند تحميل الصفحة للتأكد من حالة الزر عند بداية العمل
document.addEventListener('DOMContentLoaded', updateButtonState);
