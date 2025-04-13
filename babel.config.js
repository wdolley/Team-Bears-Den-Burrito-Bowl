module.exports = presets: [
    [
      '@babel/preset-env --experimental-require-module ',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
