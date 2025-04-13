const { handleClick } = require('./buttonHandler');

describe('Button click', () => {
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `<button id="myButton">Click Me</button>`;
    document.getElementById('myButton').addEventListener('click', handleClick);
  });

  it('calls handleClick on button click', () => {
    // Spy on handleClick
    const clickSpy = jest.spyOn(console, 'log');

    // Simulate the click
    document.getElementById('myButton').click();

    expect(clickSpy).toHaveBeenCalledWith('Button was clicked!');
    
    // Clean up
    clickSpy.mockRestore();
  });
});
