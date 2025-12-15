// Get the card element
const card = document.getElementById('profileCard');

// Function to flip the card
function flipCard() {
    card.classList.toggle('flipped');
}

// Function to change theme color
function changeTheme(theme) {
    const root = document.documentElement;

    const themes = {
        blue: '#4A90E2',
        purple: '#9B59B6',
        green: '#27AE60'
    };

    const color = themes[theme];
    root.style.setProperty('--theme-color', color);

    // Add a small animation feedback
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });
}

// Add keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement === card) {
            flipCard();
        }
    }
});

// Add click event to the card itself
card.addEventListener('click', (e) => {
    // Don't flip if clicking on buttons
    if (!e.target.classList.contains('flip-btn')) {
        flipCard();
    }
});

// Initialize with blue theme
changeTheme('blue');

// Add a welcome message to console
console.log('🎨 Interactive Profile Card Demo loaded successfully!');
console.log('💡 Try clicking the card or using the theme buttons!');
