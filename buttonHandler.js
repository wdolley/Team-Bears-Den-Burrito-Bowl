function handleClick() {
  console.log("Button was clicked!");
}

// Setup function to attach the handler
function attachClickHandler() {
  const button = document.getElementById("generate-btn");
  if (button) {
    button.addEventListener("click", handleClick);
  }
}

module.exports = { handleClick, attachClickHandler };
