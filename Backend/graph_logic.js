function buildAdjacencyList(graphData) {
  const adj = {};
  graphData.nodes.forEach(n => adj[n.id] = []);
  graphData.edges.forEach(e => {
    adj[e.from].push(e.to);
    adj[e.to].push(e.from);
  });
  return adj;
}

function dijkstra(graphData, start, end) {
  const adj = buildAdjacencyList(graphData);
  const dist = {};
  const visited = {};
  const prev = {};
  graphData.nodes.forEach(n => dist[n.id] = Infinity);
  dist[start] = 0;

  while (true) {
    let closest = null;
    for (const node in dist) {
      if (!visited[node] && (closest === null || dist[node] < dist[closest])) {
        closest = node;
      }
    }

    if (closest === null) break;
    visited[closest] = true;

    for (const neighbor of adj[closest]) {
      const alt = dist[closest] + 1;
      if (alt < dist[neighbor]) {
        dist[neighbor] = alt;
        prev[neighbor] = closest;
      }
    }
  }

  const path = [];
  let current = end;
  while (current !== undefined) {
    path.unshift(current);
    current = prev[current];
  }

  return { path, distance: dist[end] };
}

function bfs(graphData, start) {
  const adj = buildAdjacencyList(graphData);
  const visited = new Set();
  const queue = [start];
  const result = [];

  while (queue.length) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      queue.push(...adj[node]);
    }
  }
  return result;
}

function dfs(graphData, start) {
  const adj = buildAdjacencyList(graphData);
  const visited = new Set();
  const result = [];

  function dfsHelper(node) {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);
    adj[node].forEach(dfsHelper);
  }

  dfsHelper(start);
  return result;
}

module.exports = { dijkstra, bfs, dfs };
