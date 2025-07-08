// تابع اصلی برای شروع ضبط صدا
function startVoiceRecognition() {
    console.log('شروع ضبط صدا با کلید میانبر');
    // کد شروع ضبط صدا
}

// گوش دادن به رویداد کلید
document.addEventListener('keydown', function(event) {
    // بررسی دقیق کلیدهای کنترل و اسپیس
    if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        event.stopPropagation(); // توقف انتشار رویداد
        startVoiceRecognition(); // اجرای تابع ضبط
    }
});

// دکمه نیز همین عملکرد را داشته باشد
const recordButton = document.getElementById('startRecording');
if (recordButton) {
    recordButton.addEventListener('click', startVoiceRecognition);
}
