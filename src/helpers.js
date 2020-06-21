const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateVertices = num => {
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
      x: (Math.random() * (955 - 75) + 25).toFixed(2),
      y: (Math.random() * (600 - 75) + 25).toFixed(2)
    });
  }

  return vertices;
};

const generateLinks = vertices => {
  const randomNum = () => Math.floor(Math.random() * vertices.length);
  const links = {};

  for (let source = 0; source < vertices.length; source++) {
    if (!links[source]) {
      links[source] = {};
    }

    if (Object.keys(links[source]).length < 2) {
      const targets = [randomNum(), randomNum()];

      while (targets[0] === source && targets[1] === source) {
        targets[0] = randomNum();
      }

      targets.forEach(target => {
        if (source !== target && !links[source][target]) {
          if (!links[target]) {
            links[target] = {};
          }

          links[source][target] = true;
          links[target][source] = true;
        }
      });
    }
  }

  return links;
};

export const generateGraph = vertices => {
  const graph = [];
  const links = generateLinks(vertices);

  for (let i = 0; i < vertices.length; i++) {
    const arr = [];

    for (let j = 0, r; j < vertices.length; j++) {
      if (!links[i][j]) {
        r = 0;
      } else if (i > j) {
        r = graph[j][i];
      } else {
        const source = vertices[i];
        const target = vertices[j];
        r = Math.hypot(target.x - source.x, target.y - source.y).toFixed(2);
      }

      arr.push(r);
    }

    graph.push(arr);
  }

  return graph;
};
