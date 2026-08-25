const isProduction = true;
if (isProduction) {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
}

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyA6iPEJgUiZpRkt6YMaIk4Z2tglVF1MiBs",
  authDomain: "travellombokairport.firebaseapp.com",
  projectId: "travellombokairport",
  storageBucket: "travellombokairport.firebasestorage.app",
  messagingSenderId: "1091706966192",
  appId: "1:1091706966192:web:4eea0b5132e7c353c8ab75",
  measurementId: "G-GJF6K62P23"
};

let db;
let analytics;
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    if (typeof firebase.analytics === 'function') {
        analytics = firebase.analytics();
    }
}
if (typeof firebase !== 'undefined') {
    db = firebase.firestore();
}

const toggleBtn = document.getElementById('modeToggle');
let isManualOverride = false;
document.getElementById('year').textContent = new Date().getFullYear();

function applyMode(isLight) {
    document.documentElement.classList.toggle('light-mode', isLight);
    if (isLight) {
        toggleBtn.innerHTML = '<span class="icon">🌙</span> Dark Mode';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ebf0f7');
    } else {
        toggleBtn.innerHTML = '<span class="icon">☀️</span> Light Mode';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#070914');
    }
}

function toggleMode() {
    const currentlyLight = document.documentElement.classList.contains('light-mode');
    applyMode(!currentlyLight);
    isManualOverride = true;
}

function checkAutoMode() {
    if (isManualOverride) return;
    const hour = new Date().getHours();
    const isDayTime = (hour >= 6 && hour < 18);
    applyMode(isDayTime);
}

// Modal Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId || 'privacyModal');
    if (modal) modal.classList.add('active');
}
function closeModal(modalId) {
    if (typeof modalId === 'string') {
        const m = document.getElementById(modalId);
        if (m) m.classList.remove('active');
    } else {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
}
window.onclick = function(event) { 
    if (event.target.classList.contains('modal-overlay')) { 
        closeModal(); 
    } 
}

// Cookie Logic
const cookieBanner = document.getElementById('cookieBanner');
function checkCookieConsent() {
    const cookies = document.cookie.split(';');
    const isCookieConsented = cookies.some(item => item.trim().startsWith('freeWithRidhoCookieConsent='));
    let isLocalConsented = false;
    try {
        isLocalConsented = localStorage.getItem('freeWithRidhoCookieConsent') === 'accepted';
    } catch (e) { }
    
    if (isCookieConsented || isLocalConsented) {
        if(cookieBanner) {
            cookieBanner.style.display = 'none';
            cookieBanner.remove();
        }
    } else {
        setTimeout(() => {
            if(cookieBanner) cookieBanner.classList.add('show');
        }, 2500);
    }
}

function acceptCookies() {
    if(cookieBanner) {
        cookieBanner.style.display = 'none';
        cookieBanner.remove();
    }
    document.cookie = "freeWithRidhoCookieConsent=accepted; max-age=" + (60 * 60 * 24 * 365) + "; path=/; SameSite=Lax";
    try {
        localStorage.setItem('freeWithRidhoCookieConsent', 'accepted');
    } catch (e) {
        console.warn("LocalStorage tidak tersedia.");
    }
    if (db && typeof firebase !== 'undefined') {
        db.collection("cookie_consents").add({
            consentedAt: firebase.firestore.FieldValue.serverTimestamp(),
            userAgent: navigator.userAgent,
            platform: navigator.platform || "Unknown",
            language: navigator.language || "Unknown",
            status: "accepted"
        }).then(() => {}).catch((error) => {});
    }
}

// Initialization and Animation Logic
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const content = document.getElementById('mainContent');
    const logoWrap = document.getElementById('logoWrap');
    
    checkAutoMode();
    setInterval(checkAutoMode, 60000);
    checkCookieConsent();
    
    setTimeout(() => {
        loader.style.display = 'none';
        content.style.display = 'block';
        toggleBtn.classList.add('show');
        logoWrap.classList.add('fadeInUp');
        setTimeout(() => document.getElementById('title').classList.add('fadeInUp'), 150);
        setTimeout(() => document.getElementById('desc').classList.add('fadeInUp'), 300);
        setTimeout(() => document.getElementById('socials').classList.add('fadeInUp'), 450);
        setTimeout(() => document.getElementById('mainLink').classList.add('fadeInUp'), 600);
        setTimeout(() => document.getElementById('footer').classList.add('fadeIn'), 800);
        setTimeout(() => {
            logoWrap.style.opacity = '1';
            logoWrap.style.animation = 'float 4s ease-in-out infinite';
        }, 1000);
    }, 1500);
});

// Anti-Copypaste Security
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('selectstart', event => event.preventDefault());
document.addEventListener('dragstart', event => event.preventDefault());
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey) {
        if (e.key === 'u' || e.key === 'U' || e.keyCode === 85) { e.preventDefault(); return false; }
        if (e.key === 'c' || e.key === 'C' || e.keyCode === 67) { e.preventDefault(); return false; }
        if (e.key === 's' || e.key === 'S' || e.keyCode === 83) { e.preventDefault(); return false; }
        if (e.key === 'p' || e.key === 'P' || e.keyCode === 80) { e.preventDefault(); return false; }
        if (e.key === 'a' || e.key === 'A' || e.keyCode === 65) { e.preventDefault(); return false; }
        if (e.shiftKey && (e.key === 'i' || e.key === 'I' || e.keyCode === 73 || e.key === 'j' || e.key === 'J' || e.keyCode === 74)) { e.preventDefault(); return false; }
        if (e.shiftKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) { e.preventDefault(); return false; }
    }
});
