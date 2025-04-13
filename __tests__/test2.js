import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('./index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

describe('HTML Structure', () => {
  it('should have a header with navigation links', () => {
    const header = document.querySelector('header');
    expect(header).not.toBeNull();
    const navLinks = header.querySelectorAll('a');
    expect(navLinks.length).toBeGreaterThanOrEqual(3); // Check if key links exist
  });

  it('should have a main content area', () => {
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
  });

  it('should have a footer', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
  });
});
import fs from 'fs';

describe('Security Checks', () => {
  it('should not have a .env file in the repository', () => {
    const files = fs.readdirSync('./');
    expect(files).not.toContain('.env');
  });

  it('should not expose API keys in the JavaScript code', () => {
    const jsCode = fs.readFileSync('./scripts.js', 'utf8');
    expect(jsCode).not.toMatch(/API_KEY|SECRET_KEY/);
  });
});
import fs from 'fs';

describe('Critical Files Integrity', () => {
  const criticalFiles = ['index.html', 'styles.css', 'scripts.js'];

  criticalFiles.forEach((file) => {
    it(should have ${file} intact, () => {
      expect(fs.existsSync(./${file})).toBe(true);
    });
  });
});
import fs from 'fs';

describe('CSS Validation', () => {
  it('should include styles for header and nav', () => {
    const css = fs.readFileSync('./styles.css', 'utf8');
    expect(css).toMatch(/header\s{/);
    expect(css).toMatch(/nav\s{/);
  });

  it('should include responsive styles', () => {
    const css = fs.readFileSync('./styles.css', 'utf8');
    expect(css).toMatch(/@media/); // Ensure responsive design is considered
  });
});
import { ESLint } from 'eslint';

describe('JavaScript Syntax Validation', () => {
  it('should have no syntax errors in scripts.js', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['scripts.js']);
    results.forEach((result) => {
      expect(result.errorCount).toBe(0);
    });
  });
});
