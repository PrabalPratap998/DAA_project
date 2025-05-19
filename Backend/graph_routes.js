const express = require('express');
const router = express.Router();
const fs = require('fs');
const { dijkstra, bfs, dfs } = require('./graph_logic');

const graphData = JSON.parse(fs.readFileSync('Backend/data.json', 'utf-8'));

// Get all nodes
router.get('/nodes', (req, res) => {
  res.json(graphData.nodes);
});

// Get all edges
router.get('/edges', (req, res) => {
  res.json(graphData.edges);
});

// Dijkstra algorithm
router.get('/dijkstra/:start/:end', (req, res) => {
  const { start, end } = req.params;
  const result = dijkstra(graphData, parseInt(start), parseInt(end));
  res.json(result);
});

// BFS traversal
router.get('/bfs/:start', (req, res) => {
  const { start } = req.params;
  const result = bfs(graphData, parseInt(start));
  res.json(result);
});

// DFS traversal
router.get('/dfs/:start', (req, res) => {
  const { start } = req.params;
  const result = dfs(graphData, parseInt(start));
  res.json(result);
});

module.exports = router;
