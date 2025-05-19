const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { dijkstra, bfs, dfs } = require('./graph_logic');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const graphData = JSON.parse(fs.readFileSync('Backend/data.json', 'utf-8'));

app.get('/api/nodes', (req, res) => {
  res.json(graphData.nodes);
});

app.get('/api/edges', (req, res) => {
  res.json(graphData.edges);
});

app.get('/api/dijkstra/:start/:end', (req, res) => {
  const { start, end } = req.params;
  const result = dijkstra(graphData, parseInt(start), parseInt(end));
  res.json(result);
});

app.get('/api/bfs/:start', (req, res) => {
  const { start } = req.params;
  const result = bfs(graphData, parseInt(start));
  res.json(result);
});

app.get('/api/dfs/:start', (req, res) => {
  const { start } = req.params;
  const result = dfs(graphData, parseInt(start));
  res.json(result);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
