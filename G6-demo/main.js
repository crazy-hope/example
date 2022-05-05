$(document).ready(function () {
  // DOM，宽，高
  var container = document.getElementById("container");
  var width = container.scrollWidth;
  var height = container.scrollHeight || 900;

  var lastNodeId = 0;

  var colors = ["#66b7d5", "#e96565"];
  var colorsDark = ["#39a6cf", "#bf4242"];
  let defaultFill = colors[0];
  let defaultStoke = colorsDark[0];
  let defaultLineWidth = 2;
  let defaultSize = 100;

  let defaultEdgeColor = "#999999";
  let defaultEdgeLineWidth = 1;

  // 基本配置
  var G6_CONFIG = {
    container: "container",
    width: width,
    height: height,
    linkCenter: false, // 使边连入节点的中心
    layout: {
      type: "force",
      linkDistance: 250,
      nodeSpacing: 10,
      preventOverlap: true, // 可选，必须配合 nodeSize 防止重叠
      nodeSize: 100,
    },
    // 默认节点
    defaultNode: {
      size: defaultSize,
      style: {
        stroke: defaultStoke,
        lineWidth: defaultLineWidth,
        fill: defaultFill,
      },
      labelCfg: {
        style: {
          fill: "white",
          fontSize: 16,
          lineHeight: 16,
          textAlign: "center",
          textBaseline: "middle",
        },
      },
      styles: {
        default: {},
        hover: {},
        select: {},
      },
    },
    defaultEdge: {
      style: {
        stroke: defaultEdgeColor,
        lineWidth: defaultEdgeLineWidth,
      },
    },
    modes: {
      default: ["zoom-canvas", "drag-canvas", "drag-node"],
    },
  };

  // 创建Graph
  var graph = new G6.Graph(G6_CONFIG);

  // 调用本地JSON
  function getData(callback) {
    // $.ajax({
    //     type: 'get',
    //     url: './dataSimple.json',
    //     success: function (res) {
    //         console.log(res)
    //         render(res)
    //     }
    // })
    let data = localData();
    render(data.defaultData);
    createData(0, data.nodesOthers);
    graph.layout();
  }
  getData();

  function localData() {
    let nodes = getDefaultData();
    let nodesFirst = nodes[0];
    let nodesOthers = nodes.splice(1, nodes.length);
    let defaultData = {
      nodes: [createNode(0, nodesFirst)],
    };
    return {
      defaultData: defaultData,
      nodesOthers: nodesOthers,
    };
  }

  // 创建随机颜色
  function getColorsIndex(colors) {
    return Math.floor(Math.random() * colors.length);
  }

  // 创建Nodes
  function createNode(nodeId, nodeData) {
    console.log(nodeData);
    return {
      id: nodeId.toString(),
      size: nodeData.size || defaultSize,
      type: nodeData.image ? "avatar" : "text",
      image: nodeData.image || "",
      text: nodeData.text || "",
      anime: nodeData.image ? "background-animate" : "",
      style: createStyles(nodeData.type),
      disabledHide: !!nodeData.disabledHide,
    };
  }
  // 创建Edges
  function createEdge(source, target, label) {
    return {
      source: source.toString(),
      target: target.toString(),
      label: label,
    };
  }
  // 创建数据
  function createData(source, data) {
    let nodes = [];
    let edges = [];
    if (!data) {
      data = localData().nodesOthers;
    }
    for (let i = 0; i < data.length; i++) {
      lastNodeId = lastNodeId + 1;
      let node = createNode(lastNodeId, data[i]);
      let edge = createEdge(source, lastNodeId, data[i].label || "");
      nodes.push(node);
      edges.push(edge);
    }

    // 添加数据
    nodes.forEach((item) => {
      graph.addItem("node", item, true);
    });
    edges.forEach((item) => {
      graph.addItem("edge", item, true);
    });
  }

  // 创建不同的Node样式
  function createStyles(type) {
    let nodeFill = colors[0];
    let nodeStrokeFill = colorsDark[0];

    switch (type) {
      case "default":
        return {
          stroke: nodeStrokeFill,
          lineWidth: defaultLineWidth,
          fill: nodeFill,
        };
    }
  }

  // 渲染
  function render(data) {
    graph.data(data);
    graph.render();

    // 自适应
    if (typeof window !== "undefined") {
      window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
    }
  }

  // 点击
  graph.on("node:click", function (evt) {
    // 获取当前节点
    const item = evt.item;
    const nodeId = item.get("id");
    const model = item.getModel();

    if (model.disabledHide) {
      return false;
    }

    // 如果没有子节点
    if (!model.hasChildren) {
      // 获取新数据
      createData(nodeId);

      model.hasChildren = true;
    } else {
      // 获取到所有数据
      let data = graph.save();
      // 对数据进行算法处理，获取所有的子节点，进行删除
      G6.Algorithm.breadthFirstSearch(data, nodeId, {
        leave: ({ current, previous }) => {
          if (current !== nodeId) {
            graph.removeItem(current);
          }
        },
      });
      model.hasChildren = false;
    }

    // 增删节点后刷新
    graph.layout();
  });

  // 移入
  graph.on("node:mouseenter", function (evt) {
    let node = evt.item;
    graph.setItemState(node, "scale", true);
  });
  // 移出
  graph.on("node:mouseleave", function (evt) {
    let node = evt.item;
    graph.setItemState(node, "scale", false);
  });

  // 拖动
  function refreshDragedNodePosition(e) {
    const model = e.item.get("model");
    model.fx = e.x;
    model.fy = e.y;
  }
  graph.on("node:dragstart", (e) => {
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on("node:drag", (e) => {
    const forceLayout = graph.get("layoutController").layoutMethods[0];
    forceLayout.execute();
    refreshDragedNodePosition(e);
  });
  graph.on("node:dragend", function (e) {
    e.item.get("model").fx = null;
    e.item.get("model").fy = null;
  });
});
