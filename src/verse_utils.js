export { getOsisList }; 

function getOsisList(s) {
    return s.split(',').map((s) => s.trim()).filter((s) => s !== '');
}
