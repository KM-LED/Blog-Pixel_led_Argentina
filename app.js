const articles = [
    {
        title: "Guía de iniciación: ¿Qué es el Pixel Led?",
        tag: "Fundamentos",
        desc: "Descubre la diferencia entre las tiras RGB normales y los sistemas inteligentes.",
        img: "💡",
        url: "articulos/fundamentos.html"
    },
    {
        title: "Enciclopedia de Chips: WS2812B vs WS2811",
        tag: "Chips",
        desc: "Comparamos los protocolos más usados en Argentina: tensiones y redundancia.",
        img: "🔋",
        url: "articulos/chips.html"
    },
    {
        title: "Inyección de Poder: Caída de tensión",
        tag: "Energía",
        desc: "Aprende el arte de alimentar tus tiras desde ambos extremos correctamente.",
        img: "⚡",
        url: "articulos/caida-tension.html"
    },
    {
        title: "Señal y Datos: Distancias y Boosters",
        tag: "Señal",
        desc: "Cómo mantener la señal de datos estable en tramos largos de cableado.",
        img: "📡",
        url: "articulos/distancias.html"
    },
    {
        title: "Troubleshooting: Problemas Típicos",
        tag: "Soporte",
        desc: "¿Tus LEDs parpadean? Aquí tienes la guía de soluciones rápidas.",
        img: "🛠️",
        url: "articulos/problemas.html"
    },
    {
        title: "WLED: El Rey de los Controladores",
        tag: "Controladores",
        desc: "Tutorial paso a paso para configurar tu ESP32 con WLED y controlarlo todo por WiFi.",
        img: "📱",
        url: "articulos/wled.html"
    }
];

function renderArticles() {
    const container = document.getElementById('articles-container');
    container.innerHTML = articles.map(art => `
        <a href="${art.url || '#'}" class="article-card-link">
            <article class="article-card">
                <div class="article-img">
                    <span style="font-size: 80px">${art.img}</span>
                </div>
                <div class="article-content">
                    <span class="article-tag">${art.tag}</span>
                    <h3>${art.title}</h3>
                    <p>${art.desc}</p>
                    <div class="btn btn-secondary" style="padding: 8px 20px; font-size: 14px; display: inline-block;">Leer más</div>
                </div>
            </article>
        </a>
    `).join('');
}

// Calculator Logic
function setupCalculator() {
    const ledCount = document.getElementById('led-count');
    const ledType = document.getElementById('led-type');
    
    const resAmps = document.getElementById('res-amps');
    const resWatts = document.getElementById('res-watts');
    const resPsu = document.getElementById('res-psu');

    function updateCalculations() {
        const count = parseInt(ledCount.value) || 0;
        const currentPerLed = parseFloat(ledType.value);
        
        // Corriente total en Amperios (Siempre al 100% de brillo)
        const totalAmps = count * currentPerLed;
        
        // Watts = Amps * Voltage
        // Getting voltage from select text (e.g. "5V" or "12V")
        const voltageMatch = ledType.options[ledType.selectedIndex].text.match(/(\d+)V/);
        const voltage = voltageMatch ? parseInt(voltageMatch[1]) : 5;
        
        const totalWatts = totalAmps * voltage;

        // Results
        resAmps.textContent = `${totalAmps.toFixed(2)} A`;
        resWatts.textContent = `${totalWatts.toFixed(2)} W`;
        
        // Recommended PSU (Total Amps + 20% safety margin)
        const recommendedAmps = Math.ceil(totalAmps * 1.2);
        resPsu.textContent = `${voltage}V - ${recommendedAmps}A`;
    };

    [ledCount, ledType].forEach(el => {
        el.addEventListener('input', updateCalculations);
    });

    updateCalculations();
}

document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    setupCalculator();
});
