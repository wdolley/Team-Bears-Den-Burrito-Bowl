const { parse } = require('./parse.js');

test('parse ruturns an array', () => {
    const data = parse();
    expect(Array.isArray(data)).toBe(true);
});
test('1+1 = 2', () => {
    const one = 1;
    const two = 1;
    expect(one+two).toBe(2);
});
