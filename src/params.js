module.exports = {
  name: {
    error: 'A name for your project is required.',
    example: 'MySite',
    flag: 'n'
  },
  author: {
    error: 'An author of this project is required.',
    example: `'Antwon Barnabus <antwon@barnabus.net>'`,
    flag: 'a'
  },
  unknown (requiredParam = '') {
    return {
      error: `[unknown parameter "${requiredParam}" error]`,
      example: `[unknown parameter "${requiredParam}" example]`,
      flag: `[unknown parameter "${requiredParam}" flag]`
    }
  }
};
