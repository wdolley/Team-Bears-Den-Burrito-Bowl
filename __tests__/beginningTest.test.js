const parse = require('../path/to/parse.js'); // Ensure correct path

test('parse returns an array', () => {
    const data = parse();
    expect(Array.isArray(data)).toBe(true); // Should return true
});

test('parse returns an array of arrays', () => {
    const data = parse();
    expect(data.length).toBeGreaterThan(0); // Ensure array has length
    data.forEach(row => {
        expect(Array.isArray(row)).toBe(true); // Each element should be an array
    });
});
