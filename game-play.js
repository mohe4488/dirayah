document.addEventListener('DOMContentLoaded', function() {
    // قراءة بيانات اللعبة من localStorage
    const gameDetails = JSON.parse(localStorage.getItem('gameDetails'));

    if (gameDetails) {
        // عرض اسم اللعبة واسم الفريقين
        const gameDetailsDiv = document.getElementById('gameDetails');
        gameDetailsDiv.innerHTML = `
            <p><strong>اسم اللعبة:</strong> ${gameDetails.gameName}</p>
            <p><strong>الفريق الأول:</strong> ${gameDetails.team1}</p>
            <p><strong>الفريق الثاني:</strong> ${gameDetails.team2}</p>
        `;

        // عرض الفئات المختارة
        const categoriesDiv = document.getElementById('selectedCategories');
        categoriesDiv.innerHTML = gameDetails.categories.map(category => `<p>${category}</p>`).join('');

        // عرض الأسئلة بناءً على الفئات المختارة
        const questionsArea = document.getElementById('questionsArea');
        gameDetails.categories.forEach(category => {
            // إنشاء مربع لكل فئة
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-box');

            // إضافة صورة الفئة
            categoryDiv.innerHTML = `
                <div class="category-image">
                    <img src="path/to/your/image.jpg" alt="${category}"> <!-- ضع الرابط الخاص بالصورة هنا -->
                </div>
                <h3>${category}</h3>
            `;

            // إضافة الأسئلة 200
            const questionsDiv = document.createElement('div');
            questionsDiv.classList.add('questions');
            questionsDiv.innerHTML += `
                <div class="question-box" onclick="showQuestion(this)">
                    <p><strong>200</strong></p>
                    <p class="hidden-question">تفاصيل سؤال 200 في فئة ${category}</p>
                </div>
            `;

            // إضافة الأسئلة 400
            questionsDiv.innerHTML += `
                <div class="question-box" onclick="showQuestion(this)">
                    <p><strong>400</strong></p>
                    <p class="hidden-question">تفاصيل سؤال 400 في فئة ${category}</p>
                </div>
            `;

            // إضافة الأسئلة 600
            questionsDiv.innerHTML += `
                <div class="question-box" onclick="showQuestion(this)">
                    <p><strong>600</strong></p>
                    <p class="hidden-question">تفاصيل سؤال 600 في فئة ${category}</p>
                </div>
            `;

            // إضافة الأسئلة إلى الفئة
            categoryDiv.appendChild(questionsDiv);
            questionsArea.appendChild(categoryDiv);
        });
    } else {
        alert('لم يتم العثور على تفاصيل اللعبة.');
    }
});

// دالة لعرض السؤال بشكل كبير عند النقر على المربع
function showQuestion(questionBox) {
    const questionDetails = questionBox.querySelector('.hidden-question');
    questionDetails.classList.toggle('show');  // إظهار أو إخفاء السؤال عند النقر

    // تعطيل التفاعل مع المربع الذي تم النقر عليه
    questionBox.style.pointerEvents = 'none'; // تعطيل التفاعل مع نفس المربع بعد النقر

    // إخفاء هذا السؤال فقط
    questionBox.style.display = 'none'; // إخفاء المربع الذي تم النقر عليه

    // إظهار السؤال الكبير في الجزء العلوي من الصفحة
    const bigQuestionDiv = document.createElement('div');
    bigQuestionDiv.classList.add('big-question');
    bigQuestionDiv.innerHTML = `
        <h2>السؤال ${questionBox.querySelector('strong').textContent}</h2>
        <p>${questionDetails.textContent}</p>
    `;

    // إظهار السؤال الكبير في أعلى الصفحة
    const gamePlaySection = document.getElementById('game-play');
    gamePlaySection.insertBefore(bigQuestionDiv, gamePlaySection.firstChild);
}
