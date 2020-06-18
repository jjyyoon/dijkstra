const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateVertices = (num, width, height) => {
  const vertices = [];
  const len = alphabet.length;

  for (let i = 0, label, firstChar; i < num; i++) {
    if (i < len) {
      label = alphabet[i];
    } else if (i % len === 0) {
      firstChar = alphabet[i / len - 1];
      label = firstChar + alphabet[0];
    } else {
      label = firstChar + alphabet[i % len];
    }

    vertices.push({
      label,
      x: (Math.random() * (width - 75) + 25).toFixed(2),
      y: (Math.random() * (height - 75) + 25).toFixed(2)
    });
  }

  return vertices;
};
