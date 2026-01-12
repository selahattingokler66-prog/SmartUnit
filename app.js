let currentCategory = 'length';

const units = {
    length: {
        label: "Uzunluk (Metre)", icon: "fa-ruler",
        conversions: [
            { name: "Santimetre", key: "cm", factor: 100, icon: "CM", type: "text" },
            { name: "Kilometre", key: "km", factor: 0.001, icon: "fa-road", type: "icon" },
            { name: "İnç (Inch)", key: "inch", factor: 39.3701, icon: "fa-ruler-vertical", type: "icon" },
            { name: "Mil (Mile)", key: "mile", factor: 0.000621371, icon: "fa-map-marked-alt", type: "icon" }
        ]
    },
    weight: {
        label: "Ağırlık (Kilogram)", icon: "fa-weight-hanging",
        conversions: [
            { name: "Gram", key: "g", factor: 1000, icon: "G", type: "text" },
            { name: "Pound (Lbs)", key: "lb", factor: 2.20462, icon: "fa-balance-scale", type: "icon" },
            { name: "Ons (Ounce)", key: "oz", factor: 35.274, icon: "fa-gem", type: "icon" },
            { name: "Ton", key: "ton", factor: 0.001, icon: "fa-truck-moving", type: "icon" }
        ]
    },
    temp: {
        label: "Sıcaklık (Celsius)", icon: "fa-thermometer-half",
        conversions: [
            { name: "Fahrenheit", key: "f", calc: (v) => (v * 9/5) + 32, icon: "°F", type: "text" },
            { name: "Kelvin", key: "k", calc: (v) => v + 273.15, icon: "K", type: "text" }
        ]
    },
    volume: {
        label: "Sıvı (Litre)", icon: "fa-tint",
        conversions: [
            { name: "Mililitre", key: "ml", factor: 1000, icon: "ML", type: "text" },
            { name: "Bardak (Cup)", key: "cup", factor: 4.22675, icon: "fa-glass-whiskey", type: "icon" },
            { name: "Galon (US)", key: "gal", factor: 0.264172, icon: "fa-fill-drip", type: "icon" }
        ]
    }
};

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    }
}

function changeCategory(cat, el) {
    if(currentCategory === cat) return;
    currentCategory = cat;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('current-category-label').innerHTML = `<i class="fas ${units[cat].icon}"></i> <span>${units[cat].label}</span>`;
    renderCards();
    convertAll();
}

function renderCards() {
    const container = document.getElementById('results-display');
    container.innerHTML = "";
    const colorClasses = ['cyan', 'purple', 'gold', 'pink'];
    
    units[currentCategory].conversions.forEach((unit, index) => {
        const iconHTML = unit.type === 'text' ? `<span>${unit.icon}</span>` : `<i class="fas ${unit.icon}"></i>`;
        const capsule = document.createElement('div');
        capsule.className = `unit-capsule ${colorClasses[index % 4]}`;
        capsule.innerHTML = `<div class="unit-info"><span>${unit.name}</span><h2 id="res-${unit.key}">0</h2></div><div class="unit-icon">${iconHTML}</div>`;
        container.appendChild(capsule);
        setTimeout(() => capsule.classList.add('show'), index * 100);
    });
}

function convertAll() {
    let val = parseFloat(document.getElementById('main-input').value);
    if (isNaN(val)) val = 0;
    units[currentCategory].conversions.forEach(unit => {
        const result = unit.calc ? unit.calc(val) : val * unit.factor;
        const el = document.getElementById(`res-${unit.key}`);
        if (el) el.innerText = result.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
    });
}

window.onload = () => {
    renderCards();
    convertAll();
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        document.getElementById('splash-screen').style.visibility = 'hidden';
        document.getElementById('app-container').classList.add('ready');
    }, 2000);
};
