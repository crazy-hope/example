$(document).ready(function () {
  // DOM，宽，高
  var container = document.getElementById("container");
  var width = container.scrollWidth;
  var height = container.scrollHeight || 900;

  var lastNodeId = 0;
  var defaultData = {
    nodes: [
      {
        id: "0",
        label: "0",
      },
    ],
  };

  var colors = ["#e96565", "#66b7d5"];
  var colorsDark = ["#bf4242", "#39a6cf"];
  let defaultFill = colors[0];
  let defaultStoke = colorsDark[0];
  let defaultLineWidth = 5;
  let defaultSize = 100;

  let defaultEdgeColor = "#999999";
  let defaultEdgeLineWidth = 1;

  // 基本配置
  var G6_CONFIG = {
    container: "container",
    width: width,
    height: height,
    linkCenter: true, // 使边连入节点的中心
    layout: {
      type: "force",
      linkDistance: 100,
      nodeSpacing: 5,
      preventOverlap: true, // 可选，必须配合 nodeSize 防止重叠
      nodeSize: 150,
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

    render(defaultData);
  }
  getData();

  // 创建随机颜色
  function getColorsIndex(colors) {
    return Math.floor(Math.random() * colors.length);
  }

  // 创建Nodes
  function createNode(nodeId) {
    return {
      id: nodeId.toString(),
      label: nodeId.toString(),
      size: Math.floor(Math.random() * 50) + 30,
      type: "avatar",
      image: "http://127.0.0.1:5500/images/1.jpeg",
      text: "名字名字名字名字名字",
      anime: "background-animate",
    };
  }
  // 创建Edges
  function createEdge(source, target) {
    return {
      source: source.toString(),
      target: target.toString(),
      label: source + ">>" + target,
    };
  }
  // 创建数据
  function createData(source) {
    let len = 3;
    let nodes = [];
    let edges = [];
    for (let i = 0; i < len; i++) {
      lastNodeId = lastNodeId + 1;
      let node = createNode(lastNodeId);
      let edge = createEdge(source, lastNodeId);

      let colorsIndex = getColorsIndex(colors);
      let nodeFill = colors[colorsIndex];
      let nodeStrokeFill = colorsDark[colorsIndex];
      let style = Object.assign(createStyles(1), {
        stroke: nodeStrokeFill,
        fill: nodeFill,
      });

      node = Object.assign(node, {
        style: style,
      });
      nodes.push(node);
      edges.push(edge);
    }
    return {
      nodes: nodes,
      edges: edges,
    };
  }

  // 创建不同的Node样式
  function createStyles(type) {
    switch (type) {
      case 1:
        return {
          stroke: defaultStoke,
          lineWidth: defaultLineWidth,
          fill: defaultFill,
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

    console.log(model);

    // 如果没有子节点
    if (!model.hasChildren) {
      // 获取新数据
      let datas = createData(nodeId);
      // 添加数据
      datas.nodes.forEach((item) => {
        graph.addItem("node", item, true);
      });
      datas.edges.forEach((item) => {
        graph.addItem("edge", item, true);
      });

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
    refreshDragedNodePosition(e);
  });
});
