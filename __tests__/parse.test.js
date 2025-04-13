import { parse } from '../WebsiteStuff/CSVparse.js';

test('parse ruturns an array', () => {
    const data = await parse();
    expect(Array.isArray(data)).toBe(true);
});

test('parse returns an array of arrays', () => {
    const data = await parse();
    expect(data.length).toBeGreaterThan(0);
    data.forEach(row => {
        expect(Array.isArray(row)).toBe(true);
    });
}
);


