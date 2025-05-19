const container = document.getElementById("network");

async function fetchData() {
  const [nodes, edges] = await Promise.all([
    fetch("http://localhost:3000/api/nodes").then(res => res.json()),
    fetch("http://localhost:3000/api/edges").then(res => res.json())
  ]);

  const nodesData = new vis.DataSet(nodes);
  const edgesData = new vis.DataSet(edges);
  const data = { nodes: nodesData, edges: edgesData };
  const options = {
    nodes: {
      shape: "dot",
      size: 16,
      font: { color: "black", size: 16 },
      borderWidth: 2
    },
    edges: {
      color: "#ccc"
    },
    physics: {
      stabilization: false
    }
  };

  new vis.Network(container, data, options);
}

fetchData();
