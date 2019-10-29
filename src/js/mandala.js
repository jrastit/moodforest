Mandala = {
  ctx: null,
  imageData: null,
  data: null,

  draw: function(ctx, width, height, img, colors) {

    ctx.drawImage(img, 0, 0, width, height);
    //img.style.display = 'none';
    console.log("canvas:" + width + "::" + height);
    imageData = ctx.getImageData(0, 0, width, height);
    Mandala.color(ctx, imageData, width, height, colors);
  },

  drawMood: function(ctx, width, height, mood_img) {
    ctx.drawImage(mood_img, width * 80 / 100, height * 80 / 100, width * 20 / 100, height * 20 / 100);
  },

  init: function(image_url, destination_id, colors, mood_url) {
    let canvas = $("#mandala_canvas").get(0)
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    var img = new Image();
    img.onload = function() {
      Mandala.draw(ctx, width, height, img, colors);
      if (mood_url) {
        var mood_img = new Image();
        mood_img.src = mood_url; //'images/manadala/tiger-mandala-coloring-page.png';
        mood_img.onload = function() {
          Mandala.drawMood(ctx, width, height, mood_img);
          $("#" + destination_id).css("background-image", "url(" + canvas.toDataURL() + ")");
        };
      } else {
        $("#" + destination_id).css("background-image", "url(" + canvas.toDataURL() + ")");
      }
    };
    img.src = image_url;




  },

  colorFieldAdd: function(data2, i, next) {
    ret = 0;
    if (i > 0 && i < data2.length) {
      if (data2[i] == 1) {
        next.push(i);
      }
    }
  },

  colorField: function(data, data2, width, height, i, color_r, color_g, color_b, color_a) {
    next = [i];
    /*
    if (i == 0) {
      Mandala.colorFieldAdd(data2, i + (width - 1), next);
      Mandala.colorFieldAdd(data2, data2.length - 1, next);
      Mandala.colorFieldAdd(data2, data2.length - 1 - (width - 1), next);
    }
    */
    let j = 0;
    while (j < next.length) {
      i = next[j];
      if (data2[i] == 1) {
        data2[i] = 0;
        data[i * 4] = color_r;
        data[(i * 4) + 1] = color_g;
        data[(i * 4) + 2] = color_b;
        data[(i * 4) + 3] = color_a;
        Mandala.colorFieldAdd(data2, i - width, next);
        Mandala.colorFieldAdd(data2, i + width, next);
        if ((i + 1) % width != 0) {
          Mandala.colorFieldAdd(data2, i + 1, next);
        }
        if (i % width != 0) {
          Mandala.colorFieldAdd(data2, i - 1, next);
        }
      }
      j++;
    }
  },

  color: function(ctx, imageData, width, height, colors) {
    let data = imageData.data;
    let data2 = Array(data.length / 4);
    for (var i = 0; i < data2.length; i += 1) {
      if (data[i * 4] < 128 && data[i * 4 + 1] < 128 && data[i * 4 + 2] < 128) {
        data2[i] = 0;
        data[i * 4] = 0;
        data[i * 4 + 1] = 0;
        data[i * 4 + 2] = 0;
      } else {
        data2[i] = 1;
      }
    }
    for (var i = 0; i < data2.length; i += 1) {
      if (data2[i] == 1) {
        let color_r = 255;
        let color_g = 255;
        let color_b = 255;
        if (colors.length) {
          color = 0;

          color = Math.floor(Math.random() * colors.length);
          color_r = colors[color][0] + 20 - Math.floor(Math.random() * 40);
          color_g = colors[color][1] + 20 - Math.floor(Math.random() * 40);
          color_b = colors[color][2] + 20 - Math.floor(Math.random() * 40);
          if (color_r > 255) color_r = 255;
          if (color_g > 255) color_g = 255;
          if (color_b > 255) color_b = 255;
          if (color_r < 0) color_r = 0;
          if (color_g < 0) color_g = 0;
          if (color_b < 0) color_b = 0;

        } else {
          color_r = Math.floor(Math.random() * 255);
          color_g = Math.floor(Math.random() * 255);
          color_b = Math.floor(Math.random() * 255);
        }
        //transparent background
        let color_a = 255;
        /*
        if (i == 0) {
          color_a = 0;
        }
        */
        Mandala.colorField(data, data2, width, height, i, color_r, color_g, color_b, color_a);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  },

}
