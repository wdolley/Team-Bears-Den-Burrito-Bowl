const { parse } = require('./CSVparse.js');

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('header1,header2\nvalue1,value2'),
  })
);

test('parse returns an array', async () => {
  // Ensure fetch is used correctly
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  
  await parse(); // Call the parse function
  
  expect(fetch).toHaveBeenCalledTimes(1); // Verify fetch was called
  expect(consoleSpy).toHaveBeenCalledWith([['header1', 'header2'], ['value1', 'value2']]); // Check logged output
  
  consoleSpy.mockRestore();
});
