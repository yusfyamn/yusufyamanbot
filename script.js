document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const historyItems = document.querySelectorAll('.history-item');

    // Mesaj gönderme fonksiyonu
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Kullanıcı mesajını ekle
        addMessage('user', message);
        
        // Giriş alanını temizle
        userInput.value = '';
        
        // Doğrudan yapay zeka API'sine istek gönder
        generateBotResponse(message);
    }

    // Kullanıcı veya bot mesajı ekleme fonksiyonu
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(messageContent);
        chatContainer.appendChild(messageDiv);
        
        // Sohbeti en aşağı kaydır
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        return messageDiv;
    }
    
    // Google Gemini API bağlantısı
    async function generateBotResponse(userMessage) {
        // Yükleniyor mesajı ekle
        const loadingMessage = addMessage('bot', '<em>Yanıt yazılıyor...</em>');
        
        try {
            // Google Gemini API key - bu anahtarı güvenli bir şekilde saklamak önemlidir
            const API_KEY = 'AIzaSyACGPu6-JhefKb83HcDQ6h1zUdcLI_MgN4'; // Sizin API anahtarınız
            
            // Sistem talimatlarını ve kullanıcı mesajını birleştir
            const systemPrompt = `
                Sen Yusuf Yaman'ın resmi Dijital Satış ve Organik Büyüme eğitim asistanısın. Aşağıdaki konularda uzman bir eğitmensin:
                - Sosyal Medya Platformları (Instagram ve TikTok)
                - Organik Büyüme Stratejileri (algoritma, keşfet, hashtag, CTA)
                - Dijital Satış Temelleri (dijital ürünler, satış süreçleri)
                - Niş Seçimi ve İçerik Üretimi (motivasyon, ilişki, finans nişleri)
                - Yapay Zeka Kullanımı (ChatGPT, Grok, ElevenLabs, Midjourney, Canva)
                
                Yanıtların her zaman:
                - Ciddi, rehber ve motive edici tonda olmalı
                - Adım adım, net ve yapılandırılmış olmalı
                - Sabırlı ve teşvik edici olmalı
                
                Eğer sana eğitimin içeriği dışında bir soru sorulursa: "Bu konu Yusuf Yaman'ın Dijital Satış eğitiminin dışında kalıyor. Algoritma, içerik üretimi veya dijital ürün satışı hakkında bir soru sormak ister misin?" diye yanıtla.
            `;
            
            // Gemini API'ye istek gönder
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: systemPrompt + "\n\nKullanıcı sorusu: " + userMessage }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                    }
                })
            });
            
            const data = await response.json();
            
            // Yükleniyor mesajını kaldır
            loadingMessage.remove();
            
            // API yanıtını kontrol et ve ekle
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                addMessage('bot', aiResponse);
            } else {
                addMessage('bot', 'Üzgünüm, şu anda yanıt oluşturmada bir sorun yaşıyorum. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('API Hatası:', error);
            
            // Yükleniyor mesajını kaldır
            loadingMessage.remove();
            
            // Hata mesajını göster
            addMessage('bot', 'Üzgünüm, bir teknik sorun oluştu. Lütfen tekrar deneyin.');
        }
    }

    // Enter tuşuna basınca mesajı gönder
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Gönder butonuna tıklayınca mesajı gönder
    sendButton.addEventListener('click', sendMessage);
    
    // Textarea otomatik büyüme
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        // Maksimum yükseklik
        if (this.scrollHeight > 200) {
            this.style.height = '200px';
            this.style.overflowY = 'auto';
        }
    });
    
    // Yeni sohbet başlatma
    newChatBtn.addEventListener('click', function() {
        // Sohbet geçmişini temizle
        chatContainer.innerHTML = '';
        
        // Başlangıç mesajını göster
        addMessage('bot', `
            <p>Merhaba, ben Yusuf Yaman'ın Dijital Satış Asistanıyım! Size nasıl yardımcı olabilirim?</p>
            <p>Aşağıdaki konularda sorularınızı yanıtlayabilirim:</p>
            <ul>
                <li>Instagram ve TikTok'ta organik büyüme</li>
                <li>Algoritma optimizasyonu ve keşfete çıkma</li>
                <li>Dijital ürün oluşturma ve satış teknikleri</li>
                <li>İçerik üretimi ve niş seçimi</li>
                <li>Yapay zeka araçlarıyla içerik oluşturma</li>
            </ul>
        `);
    });
    
    // Sohbet geçmişi seçme
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aktif sınıfını kaldır
            document.querySelector('.history-item.active').classList.remove('active');
            // Tıklanan öğeye aktif sınıfı ekle
            this.classList.add('active');
        });
    });
    
    // Sayfa yüklendiğinde hoş geldin mesajını göster
    // Başlangıç mesajı zaten HTML'de var, ancak dinamik olarak da ekleyebilirsiniz
    // Sayfayı temiz tutmak için HTML içinde yazılması daha iyidir
});