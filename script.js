document.addEventListener('DOMContentLoaded', function() {
    // DOM Elementleri
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const historyItems = document.querySelectorAll('.history-item');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const themeSwitch = document.getElementById('themeSwitch');

    // Tema ve Sohbet Geçmişi Yönetimi
    initTheme();
    loadChatHistory();

    // Tema Değiştirme
    function initTheme() {
        // Daha önce kaydedilmiş temayı kontrol et
        const savedTheme = localStorage.getItem('yusufYamanTheme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
        }
    }

    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('yusufYamanTheme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('yusufYamanTheme', 'light');
        }
    });

    // Sohbet Geçmişini Kaydetme ve Yükleme
    function saveChatHistory() {
        localStorage.setItem('yusufYamanChatHistory', chatContainer.innerHTML);
    }

    function loadChatHistory() {
        const savedChat = localStorage.getItem('yusufYamanChatHistory');
        if (savedChat && savedChat.trim() !== '') {
            chatContainer.innerHTML = savedChat;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    // Sohbeti Temizleme
    clearChatBtn.addEventListener('click', function() {
        if (confirm('Sohbet geçmişini temizlemek istediğinize emin misiniz?')) {
            chatContainer.innerHTML = '';
            localStorage.removeItem('yusufYamanChatHistory');
            
            // Hoş geldin mesajını yeniden göster
            showWelcomeMessage();
        }
    });

    // Hoş Geldin Mesajı
    function showWelcomeMessage() {
        const welcomeMessage = `
            <div class="message bot-message">
                <div class="avatar">
                    <img src="https://raw.githubusercontent.com/huzaifi0604/Favicon/main/favicon.png" alt="Bot Avatar">
                </div>
                <div class="message-content">
                    <p>Merhaba, ben Yusuf Yaman'ın Dijital Satış Asistanıyım! Size nasıl yardımcı olabilirim?</p>
                    <p>Aşağıdaki konularda sorularınızı yanıtlayabilirim:</p>
                    <ul>
                        <li>Instagram ve TikTok'ta organik büyüme</li>
                        <li>Algoritma optimizasyonu ve keşfete çıkma</li>
                        <li>Dijital ürün oluşturma ve satış teknikleri</li>
                        <li>İçerik üretimi ve niş seçimi</li>
                        <li>Yapay zeka araçlarıyla içerik oluşturma</li>
                    </ul>
                </div>
            </div>
        `;
        chatContainer.innerHTML = welcomeMessage;
        saveChatHistory();
    }

    // Mesaj Gönderme İşlevi
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Kullanıcı mesajını ekle
        addMessage('user', message);
        
        // Giriş alanını temizle
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Botun cevap vermesini sağla
        generateBotResponse(message);
    }

    // Kullanıcı veya Bot Mesajı Ekleme
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        let html = '';
        
        if (type === 'bot') {
            html += `
                <div class="avatar">
                    <img src="https://raw.githubusercontent.com/huzaifi0604/Favicon/main/favicon.png" alt="Bot Avatar">
                </div>
            `;
        }
        
        html += `<div class="message-content">${content}</div>`;
        
        messageDiv.innerHTML = html;
        chatContainer.appendChild(messageDiv);
        
        // Sohbeti en aşağı kaydır
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Sohbet geçmişini kaydet
        saveChatHistory();
        
        return messageDiv;
    }
    
    // Bot Yanıtı Oluşturma (Yerel Olarak)
    function generateBotResponse(userMessage) {
        // Yükleniyor mesajı ekle
        const loadingMessage = addMessage('bot', '<p><em>Yanıt yazılıyor...</em></p>');
        
        // Kullanıcı mesajını küçük harfe çevir (daha kolay eşleştirme için)
        const lowerCaseMessage = userMessage.toLowerCase();
        
        // Yanıt oluştur - akıllı önceden tanımlanmış yanıtlar
        let response = '';
        
        // Kullanıcı mesajını analiz ederek uygun yanıt seç
        if (lowerCaseMessage.includes('instagram') && (lowerCaseMessage.includes('keşfet') || lowerCaseMessage.includes('kesfet'))) {
            response = `
                <p>Instagram'da keşfete çıkmak için şu stratejileri uygulamalısınız:</p>
                <ol>
                    <li><strong>İlk 3 saniye kuralı:</strong> Videonuzun ilk 3 saniyesi çok dikkat çekici olmalı. Bu sürede izleyiciyi yakalayamazsanız, algoritma videonuzu daha az kişiye gösterir.</li>
                    <li><strong>Etkileşim sinyalleri:</strong> Instagram, videoların "Kaydedilme" ve "Paylaşılma" oranlarına çok değer verir. İzleyicileri videonuzu kaydetmeye ve paylaşmaya teşvik eden içerikler oluşturun.</li>
                    <li><strong>Tutarlı içerik:</strong> Algoritma, düzenli ve tutarlı içerik üreten hesapları ödüllendirir. Her gün belirli saatlerde içerik paylaşmaya çalışın.</li>
                    <li><strong>Doğru etiketler:</strong> Niş etiketleri kullanın ve en fazla 5-7 etiket ekleyin. Çok genel etiketler rekabeti artırırken, çok spesifik etiketler erişimi sınırlayabilir.</li>
                    <li><strong>CTA kullanın:</strong> "Profilimdeki linke tıklayın", "Bu videoyu kaydedin" gibi çağrılar ekleyin. Bu, izleyici etkileşimini artırır.</li>
                </ol>
                <p>Yusuf Yaman'ın eğitimlerinde bu stratejileri daha detaylı öğrenebilirsiniz!</p>
            `;
        } else if (lowerCaseMessage.includes('tiktok')) {
            response = `
                <p>TikTok'ta başarılı olmak için şu stratejileri deneyebilirsiniz:</p>
                <ul>
                    <li><strong>Trend müzikleri kullanın:</strong> TikTok algoritması trend müzikleri kullanan videoları öne çıkarır. Keşfet sayfasında popüler müzikleri takip edin.</li>
                    <li><strong>Kısa ve öz videolar:</strong> 15 saniyeden kısa videolar daha fazla izlenir ve algoritma tarafından daha çok kişiye gösterilir.</li>
                    <li><strong>Hook cümlesi:</strong> İlk saniyede izleyiciyi yakalayan bir "hook" cümlesi söyleyin. Örneğin: "Bu ipucu hayatınızı değiştirecek!" veya "Bunu denemeden TikTok'ta büyüyemezsiniz!"</li>
                    <li><strong>Işık kalitesi:</strong> Doğal ışık kullanan videolar daha profesyonel görünür ve daha fazla etkileşim alır. Pencere kenarında çekim yapmayı deneyin.</li>
                    <li><strong>Tutarlı niş:</strong> Belirli bir konuda uzmanlaşın ve hep o konuda içerik üretin. TikTok algoritması tematik içerikleri daha kolay öne çıkarır.</li>
                </ul>
                <p>Bu stratejileri uyguladığınızda organik büyüme hızlanacaktır!</p>
            `;
        } else if (lowerCaseMessage.includes('dijital ürün') || lowerCaseMessage.includes('ebook') || lowerCaseMessage.includes('e-book')) {
            response = `
                <p>Dijital ürün oluşturmak için adımlar:</p>
                <ol>
                    <li><strong>Bir niş belirleyin:</strong> Motivasyon, ilişki, finans veya sağlık gibi niş bir alan seçin. Kendi deneyimlerinizden veya öğrendiğiniz bilgilerden yola çıkabilirsiniz.</li>
                    <li><strong>Hedef kitlenin sorunlarını araştırın:</strong> Seçtiğiniz nişteki insanların en çok zorlandığı konuları belirleyin. Reddit, Quora veya sosyal medya gruplarında araştırma yapabilirsiniz.</li>
                    <li><strong>5-7 bölümden oluşan bir e-book taslağı hazırlayın:</strong> Her bölüm bir sorunu ele almalı ve çözüm sunmalı.</li>
                    <li><strong>Her bölümde pratik, uygulanabilir bilgiler sunun:</strong> Teorik bilgilerden ziyade, "bunu yapın, şunu yapın" şeklinde adım adım talimatlar verin.</li>
                    <li><strong>ChatGPT veya diğer yapay zeka araçlarıyla içeriği zenginleştirin:</strong> "Motivasyon e-book'u için 10 pratik egzersiz öner" gibi promptlar kullanabilirsiniz.</li>
                    <li><strong>Canva ile profesyonel bir kapak tasarımı yapın:</strong> Dikkat çekici ve profesyonel bir kapak, satışlarınızı artıracaktır.</li>
                    <li><strong>Gumroad veya Shopier üzerinden satışa sunun:</strong> Bu platformlar komisyon alır ancak ödeme sistemini sizin için halleder.</li>
                </ol>
                <p>Yusuf Yaman'ın eğitimindeki dijital ürün modülü bu konuda daha detaylı bilgiler içeriyor. İlk e-book'unuzla bile iyi bir gelir elde edebilirsiniz!</p>
            `;
        } else if (lowerCaseMessage.includes('chat') && lowerCaseMessage.includes('gpt')) {
            response = `
                <p>ChatGPT'yi dijital içerik üretimi için şu şekilde kullanabilirsiniz:</p>
                <ol>
                    <li><strong>E-book içeriği oluşturma:</strong> "Finansal özgürlük konusunda 7 bölümlük bir e-book taslağı oluştur" gibi promptlar kullanabilirsiniz.</li>
                    <li><strong>Video script yazma:</strong> "Instagram için 60 saniyelik bir motivasyon video senaryosu yaz" diyerek video içeriklerinizi planlayabilirsiniz.</li>
                    <li><strong>Hedef kitle analizi:</strong> "İlişki tavsiyesi nişindeki potansiyel müşterilerin ağrı noktaları nelerdir?" sorarak hedef kitlenizi daha iyi anlayabilirsiniz.</li>
                    <li><strong>Caption yazımı:</strong> "Bu video için 3 farklı Instagram caption'ı yaz ve hashtag önerileri ekle" diyerek sosyal medya içeriklerinizi zenginleştirebilirsiniz.</li>
                    <li><strong>İçerik takvimi oluşturma:</strong> "Fitness nişi için 30 günlük TikTok içerik planı oluştur" diyerek içerik stratejinizi planlayabilirsiniz.</li>
                </ol>
                <p>Önemli not: ChatGPT'nin çıktılarını doğrudan kullanmak yerine, kendi bakış açınızı ve deneyimlerinizi katarak içerikleri kişiselleştirin!</p>
            `;
        } else if (lowerCaseMessage.includes('algoritma')) {
            response = `
                <p>Sosyal medya algoritmalarının temel çalışma prensipleri:</p>
                <ul>
                    <li><strong>Etkileşim oranı:</strong> Algoritma, içeriğinizin aldığı beğeni, yorum, kaydetme ve paylaşım sayılarına göre daha fazla kişiye gösterilmesine karar verir.</li>
                    <li><strong>İzlenme süresi:</strong> İçeriğinizin baştan sona izlenme oranı yüksekse, algoritma bunu kaliteli içerik olarak değerlendirir ve daha fazla kişiye gösterir.</li>
                    <li><strong>Tutarlılık:</strong> Düzenli içerik paylaşan hesaplar algoritma tarafından ödüllendirilir. İdeal olarak günde en az bir içerik paylaşmaya çalışın.</li>
                    <li><strong>Trend konulara uyum:</strong> Güncel trend'lere ve hashtag'lere uygun içerikler üreten hesaplar daha hızlı büyür.</li>
                    <li><strong>Niş tutarlılığı:</strong> Algoritma, belirli bir konuda uzmanlaşmış ve o konuda sürekli içerik üreten hesapları daha hızlı büyütür.</li>
                </ul>
                <p>Algoritmaların değiştiğini unutmayın! Düzenli olarak analitik verilerinizi inceleyerek stratejinizi güncelleyin.</p>
            `;
        } else if (lowerCaseMessage.includes('midjourney') || lowerCaseMessage.includes('yapay zeka') || lowerCaseMessage.includes('ai')) {
            response = `
                <p>Dijital satış için kullanabileceğiniz temel yapay zeka araçları:</p>
                <ul>
                    <li><strong>ChatGPT:</strong> İçerik yazımı, fikir üretimi, e-book taslakları oluşturma</li>
                    <li><strong>Midjourney:</strong> E-book kapakları, sosyal medya görselleri, infografikler oluşturma</li>
                    <li><strong>ElevenLabs:</strong> E-booklar ve videolar için profesyonel seslendirme</li>
                    <li><strong>Canva + Magic Write/Design:</strong> Görsel içerikler ve sunumlar için yapay zeka destekli tasarım</li>
                    <li><strong>Descript:</strong> Video düzenleme ve otomatik alt yazı oluşturma</li>
                </ul>
                <p>Bu araçları kombinleyerek, geleneksel olarak günler alacak işleri dakikalar içinde tamamlayabilirsiniz. Böylece daha fazla içerik üretip, daha geniş bir kitleye ulaşabilirsiniz.</p>
            `;
        } else if (lowerCaseMessage.includes('niş') || lowerCaseMessage.includes('nis')) {
            response = `
                <p>Dijital satış için kârlı niş seçimi stratejileri:</p>
                <ol>
                    <li><strong>Evrensel problemlere odaklanın:</strong> İlişkiler, finans, sağlık, kendini geliştirme gibi herkesin ilgilendiği konular seçin.</li>
                    <li><strong>Rekabet-talep dengesini analiz edin:</strong> Çok rekabetçi nişlerden kaçının, ancak yeterli talep olduğundan emin olun.</li>
                    <li><strong>Kârlı alt-nişler bulun:</strong> Örneğin, genel "sağlık" yerine "30 yaş üstü kadınlar için evde fitness" gibi daha spesifik bir alan seçin.</li>
                    <li><strong>Trend nişleri araştırın:</strong> Google Trends, AnswerThePublic gibi araçlarla yükselen nişleri belirleyin.</li>
                    <li><strong>Tutkulu olduğunuz konuları seçin:</strong> Hakkında sürekli içerik üretebileceğiniz ve öğrenmeye istekli olduğunuz konular, uzun vadede en başarılı olacağınız alanlardır.</li>
                </ol>
                <p>Kârlı nişler 2023-2024 için: Yapay zeka kullanımı, pasif gelir, dijital minimalizm, sürdürülebilir yaşam, finansal okuryazarlık, uzaktan çalışma becerileri.</p>
            `;
        } else {
            response = `
                <p>Teşekkürler! Size dijital satış ve organik büyüme konularında yardımcı olabilirim.</p>
                <p>Şu konularda sorular sorabilirsiniz:</p>
                <ul>
                    <li>Instagram ve TikTok büyüme stratejileri</li>
                    <li>Algoritma ve keşfete çıkma taktikleri</li>
                    <li>Dijital ürün oluşturma ve satış</li>
                    <li>İçerik üretimi ve niş seçimi</li>
                    <li>ChatGPT, Midjourney gibi yapay zeka araçları ile içerik oluşturma</li>
                </ul>
                <p>Lütfen dijital satış ve organik büyüme ile ilgili spesifik sorularınızı sorun!</p>
            `;
        }
        
        // Yükleniyor mesajını kaldır
        setTimeout(() => {
            loadingMessage.remove();
            // Oluşturulan yanıtı ekle
            addMessage('bot', response);
        }, 1000); // 1 saniye bekleme efekti
    }

    // Yeni Sohbet Başlatma
    newChatBtn.addEventListener('click', function() {
        if (confirm('Yeni bir sohbet başlatmak istediğinize emin misiniz? Mevcut sohbet geçmişi silinecektir.')) {
            chatContainer.innerHTML = '';
            localStorage.removeItem('yusufYamanChatHistory');
            showWelcomeMessage();
        }
    });

    // Sohbet Geçmişi Öğesi Seçme
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.history-item.active').classList.remove('active');
            this.classList.add('active');
        });
    });

    // Enter Tuşu ile Gönderme
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Gönder Butonuna Tıklanınca
    sendButton.addEventListener('click', sendMessage);
    
    // Textarea Yükseklik Ayarlama
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        // Maksimum yükseklik
        if (this.scrollHeight > 150) {
            this.style.height = '150px';
            this.style.overflowY = 'auto';
        }
    });

    // Sayfayı önbelleğe alma (cache) önleme
    window.onbeforeunload = function() {
        saveChatHistory();
    };
});
