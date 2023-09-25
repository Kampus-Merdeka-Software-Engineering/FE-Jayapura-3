let favorite = [] 

function toggleIcon()
{
  const favoriteInput = document.getElementById('card')
  const favoriteValue = favoriteInput.valeu();
  console.log(favoriteValue)
}

{
  const icon = document.getElementById(iconId);

  if (icon.classList.contains(currentClass)) {
      icon.classList.remove(currentClass);
      icon.classList.add(newClass);
      icon.style.color = newColor;
  } else {
      icon.classList.remove(newClass);
      icon.classList.add(currentClass);
      icon.style.color = "#ff0000"; 
  }
}