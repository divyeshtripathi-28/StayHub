const themeSelect = document.querySelector(".theme-open");
const themeOption = document.querySelector(".theme-options");
const lightMode = document.querySelector("#light");
const darkMode = document.querySelector("#dark");


let selectedTheme = localStorage.getItem('theme');

if(selectedTheme) {
    document.body.setAttribute('data-bs-theme', selectedTheme);
    if(selectedTheme === 'dark') {
        darkMode.checked = true;
    } else {
        lightMode.checked = true;
    }
}

themeSelect.addEventListener('click', (e) => {
    e.stopPropagation();
    if(themeOption.style.display === 'none') {
        themeOption.style.display = 'block';
    } else {
        themeOption.style.display = 'none';
    }
});

darkMode.addEventListener('click', (e) => {
    e.stopPropagation();
});

lightMode.addEventListener('click', (e) => {
    e.stopPropagation();
});

darkMode.addEventListener('change', (e) => {
    if(darkMode.checked) {
        document.body.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

lightMode.addEventListener('change', (e) => {
    e.stopPropagation();
    if(lightMode.checked) {
        document.body.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

body.addEventListener('click', (e) => {
    if(themeOption.style.display === 'block') {
        themeOption.style.display = 'none';
    }
});