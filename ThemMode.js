
export function enableDarkMode(){
    document.body.classList.add('dark');
}
export function disableDarkMode(){
    document.documentElement.classList.remove('dark');
}
export function toggleDarkMode(){
    document.documentElement.classList.toggle('dark');
}
