const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateNodes = (num, maxX, maxY) => {
  const nodes = [];
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

    nodes.push({
      label,
      x: Math.random() * (maxX * 0.75),
      y: Math.random() * (maxY * 0.75)
    });
  }

  return nodes;
};

const generateLinks = nodes => {
  const randomNum = () => Math.floor(Math.random() * nodes.length);
  const links = {};

  for (let source = 0; source < nodes.length; source++) {
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

export const generateEdges = nodes => {
  const edges = [];
  const links = generateLinks(nodes);

  for (let i = 0; i < nodes.length; i++) {
    const arr = [];

    for (let j = 0, r; j < nodes.length; j++) {
      if (!links[i][j]) {
        r = 0;
      } else if (i > j) {
        r = edges[j][i];
      } else {
        const source = nodes[i];
        const target = nodes[j];
        r = Math.hypot(target.x - source.x, target.y - source.y);
      }

      arr.push(r);
    }

    edges.push(arr);
  }

  return edges;
};

export const findTheShortestPath = (edges, source, target) => {
  const nodes = [];
  const result = {};

  let i = 0;

  while (edges.length !== nodes.length) {
    nodes.push(alphabet[i]);
    i = i + 1;
  }

  result[source] = { path: [source], cost: 0 };
  let current = source;

  while (current !== target) {
    result[current].visited = true;

    let next = null;
    const index = nodes.indexOf(current);

    edges[index].forEach((cost, idx) => {
      const node = nodes[idx];

      if (cost && (!result[node] || !result[node].visited)) {
        const totalCost = result[current].cost + edges[index][idx];

        if (!result[node] || result[node].cost > totalCost) {
          result[node] = { path: [...result[current].path, node], cost: totalCost };
        }
      }

      if (
        result[node] &&
        !result[node].visited &&
        (!next || result[next].cost > result[node].cost)
      ) {
        next = node;
      }
    });

    current = next;
  }

  return result;
};

export const checkBoundary = (x, y, maxX, maxY) => {
  if (x < 0) {
    x = 0;
  } else if (x > maxX) {
    x = maxX;
  }

  if (y < 0) {
    y = 0;
  } else if (y > maxY) {
    y = maxY;
  }

  return { x, y };
};
