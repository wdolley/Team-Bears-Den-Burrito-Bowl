/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Circle Generator (from inline HTML)', () => {
  beforeEach(() => {
    // Load and inject the entire HTML file into jsdom
    const html = fs.readFileSync(path.resolve(__dirname, './circle_gen.html'), 'utf8');
    document.documentElement.innerHTML = html;

    // Extract and eval all <script> blocks in the HTML manually
    const scriptMatches = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);

    if (scriptMatches) {
      scriptMatches.forEach(scriptTag => {
        const scriptContent = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '');
        eval(scriptContent); // run the inline script
      });
    }

    // Trigger DOMContentLoaded manually so your script runs
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  test('generates correct circle for radius 1', () => {
    const radiusInput = document.getElementById('radius');
    radiusInput.value = 1;

    const generateBtn = document.getElementById('generate-btn');
    generateBtn.click();

    const output = document.getElementById('shape-output').textContent;

    console.log('Output:', JSON.stringify(output)); // helpful for debugging

    const expected =
      '  []  \n' +
      '[][][]\n' +
      '  []  \n';

    expect(output).toBe(expected);
  });
});