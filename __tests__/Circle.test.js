/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom');
const { fireEvent, screen } = require('@testing-library/dom');

describe('Circle Generator HTML Integration', () => {
  beforeEach(() => {
    // Load the HTML file into jsdom
    const html = fs.readFileSync(path.resolve(__dirname, './circle_gen.html'), 'utf8');
    document.documentElement.innerHTML = html;

    // Manually run the script since <script defer> won’t work in jsdom
    const script = fs.readFileSync(path.resolve(__dirname, './scripts.js'), 'utf8');
    eval(script); // Load and run JS in the same test environment
  });

  test('generates correct circle output when button is clicked', () => {
    // Set radius to 1 for a simple output
    const radiusInput = document.getElementById('radius');
    radiusInput.value = 1;

    // Trigger click
    const button = document.getElementById('generate-btn');
    fireEvent.click(button);

    const output = document.getElementById('shape-output').textContent;

    const expected =
      '  []  \n' +
      '[][][]\n' +
      '  []  \n';

    expect(output).toBe(expected);
  });

  test('shows alert on invalid radius', () => {
    const radiusInput = document.getElementById('radius');
    radiusInput.value = -5;

    window.alert = jest.fn(); // mock alert

    fireEvent.click(document.getElementById('generate-btn'));

    expect(window.alert).toHaveBeenCalledWith('Please enter a valid radius');
  });
});