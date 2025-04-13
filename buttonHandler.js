function handleClick() {
  console.log("Button was clicked!");
}

document.getElementById("myButton").addEventListener("click", handleClick);

module.exports = { handleClick };
