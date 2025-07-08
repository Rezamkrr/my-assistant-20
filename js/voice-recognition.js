// پشتیبانی از تشخیص گفتار در مرورگرهای مختلف
window.SpeechRecognition = 
    window.SpeechRecognition || 
    window.webkitSpeechRecognition || 
    window.mozSpeechRecognition;

if (!window.SpeechRecognition) {
    alert('مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند');
}