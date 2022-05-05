$(document).ready(function () {
  // 创建原型裁剪
  function setClipCicle(model, x, y, r) {
    model.setClip({
      type: "circle",
      attrs: {
        show: true,
        x: x,
        y: y,
        r: r,
      },
    });
  }
  // 创建头像图片
  function createAvatar(cfg, width, height) {
    return {
      name: "avatar",
      attrs: {
        width: width,
        height: height,
        x: -width / 2,
        y: -height / 2,
        cursor: "pointer",
        img: cfg.image,
      },
    };
  }
  // 创建圆
  function createCircle(cfg, width) {
    return {
      name: "circle",
      attrs: {
        x: 0,
        y: 0,
        r: width / 2,
        stroke: cfg.style.stroke,
        lineWidth: 5,
      },
    };
  }
  // 创建文本
  function createText(cfg, height) {
    return {
      name: "text",
      attrs: {
        x: 0,
        y: height / 2 + 30,
        zIndex: 2,
        text: cfg.text,
        fill: cfg.style.stroke,
        fontSize: 16,
        lineHeight: 16,
        textAlign: "center",
        textBaseline: "top ",
      },
    };
  }
  // 创建文本背景
  function createTextBg(cfg, boxParams) {
    return {
      name: "rect",
      attrs: {
        x: boxParams.x - 5,
        y: boxParams.y - 5,
        zIndex: -1,
        width: boxParams.width + 10 + 4,
        height: boxParams.height + 10 + 4,
        lineWidth: 2,
        stroke: cfg.style.stroke,
        fill: cfg.style.fill,
        fillOpacity: 0.5,
        radius: 10,
      },
    };
  }

  // 注册头像
  G6.registerNode(
    "avatar",
    {
      draw: function (cfg, group) {
        console.log("cfg", cfg);
        let avatar = group.addShape(
          "image",
          createAvatar(cfg, cfg.size, cfg.size)
        );
        setClipCicle(avatar, 0, 0, cfg.size / 2);

        let circle = group.addShape(
          "circle",
          createCircle(cfg, cfg.size, cfg.size)
        );
        let text = group.addShape("text", createText(cfg, cfg.size));
        let textBoxParams = text.getBBox();
        let textBox = group.addShape("rect", createTextBg(cfg, textBoxParams));
        return avatar;
      },

      setState: function (name, value, item) {
        console.log(name, value, item);
        const model = item.getModel();
        const group = item.getContainer();
        const shape = group.get("children")[0];

        if (name == "scale") {
          if (value) {
            // 该图形的动画
            shape.animate(
              (ratio) => {
                // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                // 先变大、再变小
                const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
                let w = model.size;
                if (isNaN(w)) w = w[0];
                // 返回这一帧需要变化的参数集，这里只包含了半径
                return {
                  x: -(w + diff) / 2,
                  y: -(w + diff) / 2,
                  width: w + diff,
                  height: w + diff,
                };
              },
              {
                // 动画重复
                repeat: true,
                duration: 3000,
                easing: "easeCubic",
              }
            );
          } else {
            shape.stopAnimate();
          }
        }
      },
    },
    "circle"
  );
});
