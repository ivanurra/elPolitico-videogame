// CHANGE WINDOWS
function changeWindows(id, id2){
    if(document.getElementById){
        let element = document.getElementById(id)
        element.style.display = (element.style.display == 'none') ? 'flex' : 'none';

        let element2 = document.getElementById(id2)
        element2.style.display = (element2.style.display == 'flex') ? 'none' : 'flex';
    }
}