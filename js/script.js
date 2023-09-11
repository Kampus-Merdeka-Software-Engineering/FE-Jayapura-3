function toggleIcon(iconId, currentClass, newClass, newColor) {
    const icon = document.getElementById(iconId);

    if (icon.classList.contains(currentClass)) {
        icon.classList.remove(currentClass);
        icon.classList.add(newClass);
        icon.style.color = newColor;
    } else {
        icon.classList.remove(newClass);
        icon.classList.add(currentClass);
        // Anda dapat menghapus pengaturan warna ini jika ingin mempertahankan warna asli
        icon.style.color = "#ff0000"; 
    }
}
