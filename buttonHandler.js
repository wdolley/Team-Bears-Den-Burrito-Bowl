function handleClick() {
  console.log("Button was clicked!");
}

document.getElementById("generate-btn").addEventListener("click", handleClick);

module.exports = { handleClick };
