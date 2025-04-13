export function parse() {
    fetch('./WebsiteStuff/blocks.csv') // Must be hosted in the same folder or publicly accessible
      .then(response => response.text())
      .then(text => {
        const rows = text.trim().split('\n');
        const data = rows.map(row => row.split(','));
        console.log(data); // Array of arrays
      })
      .catch(error => {
        console.error('Error loading blocks.csv:', error);
      });
}
