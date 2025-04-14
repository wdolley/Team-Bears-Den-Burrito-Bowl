/**
 * @jest-environment jsdom
 */
const { handleClick, attachClickHandler } = require('../buttonHandler');


describe('Button click', () => {
  beforeEach(() => {
    document.body.innerHTML = <button id="generate-btn">Generate</button>;
    attachClickHandler();
  });

  test('calls handleClick on button click', () => {
    const spy = jest.spyOn(console, 'log');

    document.getElementById('generate-btn').click();

    expect(spy).toHaveBeenCalledWith('Button was clicked!');

    spy.mockRestore();
  });
}); 
