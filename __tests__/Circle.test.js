/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Cirle Generate test', () => {
    beforeEach(() => {
        // Load HTML
        const html = fs.readFileSync(path.resolve(__dirname, '../WebsiteStuff/circle_gen.html'), 'utf8');
        document.documentElement.innerHTML = html;
      
        // Load and run script
        const script = fs.readFileSync(path.resolve(__dirname, '../WebsiteStuff/scripts.js'), 'utf8');
        eval(script);
      
        // ✅ Manually dispatch the DOMContentLoaded event
        document.dispatchEvent(new Event('DOMContentLoaded'));
      });

  test('generates a correct circle for radius 1', () => {
    // Set the radius
    const radiusInput = document.getElementById('radius');
    radiusInput.value = 1;

    // Click the generate button
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.click();

    // Check output
    const output = document.getElementById('shape-output').textContent;

    const expected =
      '  []  \n' +
      '[][][]\n' +
      '  []  \n';

    expect(output).toBe(expected);
  });

  test('alerts when given invalid radius', () => {
    const radiusInput = document.getElementById('radius');
    radiusInput.value = 0;

    // Mock the alert
    global.alert = jest.fn();

    // Click the button
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.click();

    expect(global.alert).toHaveBeenCalledWith('Please enter a valid radius');
  });
});
