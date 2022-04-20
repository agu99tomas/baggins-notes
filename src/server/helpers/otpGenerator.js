exports.generate = (length = 4) => {
  let text = '';
  const possible = '123456789';
  for (let i = 0; i < length; i += 1) {
    const sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup === i ? '0' : possible.charAt(sup);
  }
  return Number(text);
};
