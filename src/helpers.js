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
  const result = { [source]: { path: [source], dist: 0 } };

  while (source !== target && source !== undefined) {
    result[source].visited = true;

    const dists = edges[source];
    let next;

    for (let i = 0; i < dists.length; i++) {
      if ((result[i] && result[i].visited) || (!dists[i] && !result[i])) {
        continue;
      }

      if (dists[i]) {
        const totalDist = result[source].dist + dists[i];

        if (!result[i] || result[i].dist > totalDist) {
          result[i] = { path: [...result[source].path, i], dist: totalDist };
        }
      }

      if (next === undefined || result[next].dist > result[i].dist) {
        next = i;
      }
    }

    source = next;
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
