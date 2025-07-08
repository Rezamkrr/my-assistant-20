class VoiceAssistant {
    constructor() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.recognition.lang = 'fa-IR';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.categories = {
            shopping: { name: '🛒 خریدها', keywords: ['خرید', 'سوپر'], items: [] },
            tasks: { name: '📋 کارها', keywords: ['کار', 'وظیفه'], items: [] },
            inventory: { name: '📦 موجودی', keywords: ['انبار', 'موجودی'], items: [] },
            reminders: { name: '⏰ یادآوری‌ها', keywords: ['یادآوری'], items: [] }
        };

        this.initializeApp();
    }

    initializeApp() {
        this.loadData();
        this.setupEventListeners();
        this.renderCategories();
    }

    setupEventListeners() {
        document.getElementById('startRecording').addEventListener('click', () => this.startRecording());
    }

    startRecording() {
        this.recognition.start();
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            this.processTranscript(transcript);
        };
    }

    processTranscript(text) {
        const categoryKey = this.detectCategory(text);
        this.saveItem(categoryKey, text);
        this.renderCategories();
    }

    detectCategory(text) {
        for (const [key, category] of Object.entries(this.categories)) {
            if (category.keywords.some(keyword => text.includes(keyword))) {
                return key;
            }
        }
        return 'tasks'; // پیش‌فرض
    }

    saveItem(categoryKey, text) {
        const newItem = {
            id: Date.now(),
            text: text
        };
        this.categories[categoryKey].items.push(newItem);
        this.saveData();
    }

    saveData() {
        localStorage.setItem('voiceAssistantData', JSON.stringify(this.categories));
    }

    loadData() {
        const savedData = JSON.parse(localStorage.getItem('voiceAssistantData') || '{}');
        Object.keys(this.categories).forEach(key => {
            this.categories[key].items = savedData[key]?.items || [];
        });
    }

    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        container.innerHTML = '';

        Object.entries(this.categories).forEach(([key, category]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
                <h2>${category.name}</h2>
                <ul>
                    ${category.items.map(item => `
                        <li>
                            ${item.text}
                            <button onclick="app.deleteItem('${key}', ${item.id})">حذف</button>
                        </li>
                    `).join('')}
                </ul>
            `;
            container.appendChild(categoryDiv);
        });
    }

    deleteItem(categoryKey, itemId) {
        this.categories[categoryKey].items = 
            this.categories[categoryKey].items.filter(item => item.id !== itemId);
        this.saveData();
        this.renderCategories();
    }
}

const app = new VoiceAssistant();