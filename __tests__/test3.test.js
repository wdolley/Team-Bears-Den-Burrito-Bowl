const { handleClick } = require('../buttonHandler');

describe('Button click', () => {
  beforeEach(() => {
    // Set up the DOM
    document.body.innerHTML = `<button id="myButton">Click Me</button>`;
    document.getElementById('myButton').addEventListener('click', handleClick);
  });

  test('calls handleClick on button click', () => {
    const clickSpy = jest.spyOn(console, 'log');

    document.getElementById('myButton').click();

    expect(clickSpy).toHaveBeenCalledWith('Button was clicked!');
    
    clickSpy.mockRestore();
  });
});
