/**
 * @jest-environment jsdom
 */

const { handleClick, attachClickHandler } = require('../buttonHandler');

describe('Button click', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="generate-btn">Generate</button>
      <button id="submit">Login</button>
    `;
    attachClickHandler();
  });

  test('calls handleClick on generate button click', () => {
    const spy = jest.spyOn(console, 'log');
    document.getElementById('generate-btn').click();
    expect(spy).toHaveBeenCalledWith('generate-btn was clicked!');
    spy.mockRestore();
  });

  test('calls handleClick on submit button click', () => {
    const spy = jest.spyOn(console, 'log');
    document.getElementById('submit-btn').click();
    expect(spy).toHaveBeenCalledWith('submit-btn was clicked!');
    spy.mockRestore();
  });

});

