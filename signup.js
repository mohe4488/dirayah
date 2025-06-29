document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();  // منع إعادة تحميل الصفحة عند إرسال النموذج

    const newUsername = document.getElementById("newUsername").value;
    const newEmail = document.getElementById("newEmail").value;  // إضافة البريد الإلكتروني
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // التحقق من تطابق كلمات المرور
    if (newPassword !== confirmPassword) {
        alert("كلمات المرور غير متطابقة!");
        return;
    }

    // جلب المستخدمين من localStorage (إذا كانوا موجودين)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // التحقق إذا كان اسم المستخدم أو البريد الإلكتروني موجودًا بالفعل
    const existingUser = users.find(user => user.username === newUsername || user.email === newEmail);
    if (existingUser) {
        alert("اسم المستخدم أو البريد الإلكتروني موجود بالفعل!");
        return;
    }

    // إضافة المستخدم الجديد إلى localStorage
    users.push({ username: newUsername, email: newEmail, password: newPassword });
    localStorage.setItem("users", JSON.stringify(users));

    // إعادة التوجيه إلى صفحة تسجيل الدخول بعد إنشاء الحساب
    window.location.href = "login.html";
});
