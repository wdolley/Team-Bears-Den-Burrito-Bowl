import fs from 'fs';
import path from 'path';

describe('Circle Generator Page', () => {
  let container;

  beforeEach(() => {

    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
    
    jest.resetModules();
    require('../scripts.js');

    container = document.body;
  });

  test('generates a circle on button click with default radius', () => {
    const output = container.querySelector('#shape-output');
    const button = container.querySelector('#generate-btn');

    button.click();

    expect(output.textContent).toMatch(/\[\]/);
    expect(output.textContent.length).toBeGreaterThan(0);
  });

  test('generates an ellipse when ellipse radio is selected', () => {
    const ellipseRadio = container.querySelector('#ellipse');
    const generateBtn = container.querySelector('#generate-btn');
    const output = container.querySelector('#shape-output');

 
    ellipseRadio.checked = true;
    ellipseRadio.dispatchEvent(new Event('change'));

 
    container.querySelector('#width').value = 5;
    container.querySelector('#height').value = 3;

 
    generateBtn.click();

    expect(output.textContent).toMatch(/\[\]/);
    expect(output.textContent).toContain('\n');
  });
});
