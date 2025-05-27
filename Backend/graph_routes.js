const express = require('express');
const { dijkstra, bfs } = require('./graph_logic');
const router = express.Router();

router.get('/shortest-path', (req, res) => {
    const { from, to, method } = req.query;
    if (!from || !to) {
        return res.status(400).json({ error: "Missing 'from' or 'to' query parameters" });
    }

    let path;
    if (method === 'bfs') {
        path = bfs(from, to);
    } else {
        path = dijkstra(from, to);
    }

    res.json({ path });
});

module.exports = router;
