const labels = [
  "Bakery",
  "City Hall",
  "Dry Cleaner",
  "Home",
  "Library",
  "Museum",
  "Pub",
  "Supermarket",
  "University"
];

export const generateNodes = (num, maxX, maxY) => {
  const nodes = [];

  for (let i = 0; i < num; i++) {
    nodes.push({
      label: labels[i],
      x: Math.random() * (maxX * 0.75),
      y: Math.random() * (maxY * 0.75)
    });
  }

  return nodes;
};

const randomNum = maxValue => Math.floor(Math.random() * maxValue);

const generateLinks = nodesCount => {
  const links = {};

  for (let source = 0; source < nodesCount; source++) {
    if (!links[source]) {
      links[source] = {};
    }

    if (Object.keys(links[source]).length < 2) {
      const targets = [randomNum(nodesCount), randomNum(nodesCount)];

      while (targets[0] === source && targets[1] === source) {
        targets[0] = randomNum(nodesCount);
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

export const generateEdges = (nodes, useRealDist, edges) => {
  const newEdges = [];

  if (!edges) {
    edges = generateLinks(nodes.length);
  }

  const setCost = (i, j) => {
    if (!edges[i][j]) {
      return 0;
    }

    if (i > j) {
      return newEdges[j][i];
    }

    if (!useRealDist) {
      return 1 + randomNum(20);
    }

    const source = nodes[i];
    const target = nodes[j];
    return Math.hypot(target.x - source.x, target.y - source.y);
  };

  for (let i = 0; i < nodes.length; i++) {
    const arr = [];

    for (let j = 0; j < nodes.length; j++) {
      arr.push(setCost(i, j));
    }

    newEdges.push(arr);
  }

  return newEdges;
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
