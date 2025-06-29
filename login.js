document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // منع إعادة تحميل الصفحة عند إرسال النموذج

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // جلب المستخدمين من localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // التحقق من صحة اسم المستخدم وكلمة المرور
    const user = users.find(user => (user.username === username || user.email === username) && user.password === password);

    if (user) {
        // تخزين بيانات المستخدم المسجل دخوله في localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // توجيه المستخدم إلى الصفحة الرئيسية أو صفحة الألعاب
        window.location.href = "index.html";  // أو أي صفحة أخرى
    } else {
        alert("اسم المستخدم أو البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
});
