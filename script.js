
// 1. INICIALIZAR AOS
AOS.init({ duration: 1000, once: true });

// 2. INICIALIZAR SWIPER
new Swiper(".mySwiper", {
    effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto",
    coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
    pagination: { el: ".swiper-pagination" },
    autoplay: { delay: 2500 }
});

// 3. AUDIO & BIENVENIDA
const enterBtn = document.getElementById('enter-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
const musicIcon = musicBtn.querySelector('i');

enterBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    audio.play();
    musicIcon.classList.add('spinning');
});

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicIcon.classList.add('spinning');
    } else {
        audio.pause();
        musicIcon.classList.remove('spinning');
    }
});

// 4. CONTADOR
const weddingDate = new Date("Nov 25, 2025 16:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    if (diff > 0) {
        document.getElementById("d").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("h").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("m").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("s").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
}, 1000);

// 5. MODAL REGALOS & COPIA INTELIGENTE (MEJORA #5)
function showBankInfo() {
    Swal.fire({
        title: '<span class="script" style="font-size: 2rem; color: #B79968;">Lluvia de Sobres</span>',
        html: `
            <p style="font-family: 'Montserrat'; font-size: 0.9rem; margin-bottom: 15px;">Datos para transferencia:</p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; text-align: left; font-size: 0.9rem; color: #333;">
                <strong>Banco:</strong> BAC Credomatic<br>
                <strong>Cuenta:</strong> <span id="bank-account">1234567890</span><br>
                <strong>Nombre:</strong> Ana Pérez
            </div>
            <button id="copy-btn" onclick="copyAccount()" class="btn" style="width: 100%; margin-top: 15px;">
                <i class="fas fa-copy"></i> Copiar Cuenta
            </button>
        `,
        showConfirmButton: false,
        showCloseButton: true
    });
}

// Función auxiliar para copiar y cambiar estado del botón
function copyAccount() {
    const number = document.getElementById('bank-account').innerText;
    navigator.clipboard.writeText(number).then(() => {
        const btn = document.getElementById('copy-btn');
        const originalText = '<i class="fas fa-copy"></i> Copiar Cuenta';
        
        // Feedback visual
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        btn.style.backgroundColor = '#25D366'; // Verde éxito
        btn.style.border = 'none';
        
        // Regresar a la normalidad
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '#6B705C'; // Color original
        }, 2000);
    });
}
