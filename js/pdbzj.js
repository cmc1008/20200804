/*在线html运行演示js开始*/
if($('#runcode').length > 0){
(
  function()
  {
    window.onload = function()
    {
      var tips = "将HTML代码粘在此处，点击运行即可。";
      var codeinp = $('#codeinp')[0];
      var btclear = $('#btclear')[0];
      var btrun = $('#btrun')[0];
      codeinp.onfocus = function()
      {
        var code = codeinp.value;
        code == tips && (codeinp.value = "");
      };
      
      codeinp.onblur = function()
      {
        var code = codeinp.value;
        code == "" && (codeinp.value = tips);
      };
      
      btclear.onclick = function()
      {
        codeinp.value = "";
        codeinp.focus();
      };
      
      btrun.onclick = function()
      {
        var code = codeinp.value;
        if(code != tips)
        {
          var newwin = window.open('','','');
          newwin.opener = null;
          newwin.document.write(code);
          newwin.document.close();
        }
        else
        {
          layer.msg('请将需要运行的HTML填写到输入框后再运行', {
                   icon: 7
                   });
        }
      };
    }
  }
)();
}
/*在线html运行演示结束*/

/*放回顶部*/
var bigfa_scroll = {
    drawCircle: function(id, percentage, color) {
        var width = jQuery(id).width();
        var height = jQuery(id).height();
        var radius = parseInt(width / 2.20);
        var position = width;
        var positionBy2 = position / 2;
        var bg = jQuery(id)[0];
        id = id.split("#");
        var ctx = bg.getContext("2d");
        var imd = null;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineCap = "square";
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 3;
        imd = ctx.getImageData(0, 0, position, position);
        var draw = function(current, ctxPass) {
            ctxPass.putImageData(imd, 0, 0);
            ctxPass.beginPath();
            ctxPass.arc(positionBy2, positionBy2, radius, -(quart), ((circ) * current) - quart, false);
            ctxPass.stroke();
        }
        draw(percentage / 100, ctx);
    },
    backToTop: function($this) {
        $this.click(function() {
            jQuery("body,html").animate({
                scrollTop: 0
            },
            800);
            return false;
        });
    },
    scrollHook: function($this, color) {
        color = color ? color: "#000000";
        $this.scroll(function() {
            var docHeight = (jQuery(document).height() - jQuery(window).height()),
            $windowObj = $this,
            $per = jQuery(".per"),
            percentage = 0;
            defaultScroll = $windowObj.scrollTop();
            percentage = parseInt((defaultScroll / docHeight) * 100);
            var backToTop = jQuery("#backtoTop");
            if (backToTop.length > 0) {
                if ($windowObj.scrollTop() > 200) {
                    backToTop.addClass("button--show");
                } else {
                    backToTop.removeClass("button--show");
                }
                $per.attr("data-percent", percentage);
                bigfa_scroll.drawCircle("#backtoTopCanvas", percentage, color);
            }

        });
    }
}

jQuery(document).ready(function() {
    jQuery("body").append('<div id="backtoTop" data-action="gototop"><canvas id="backtoTopCanvas" width="48" height="48"></canvas><div class="per"></div></div>');
    var T = bigfa_scroll;
    T.backToTop(jQuery("#backtoTop"));
    T.scrollHook(jQuery(window), "#cc0000");
});
/*返回顶部js结束*/

/*梅花*/
function meihua() {
  var FallingLeaves = function(num, id) {
      this.body = document.body;
      this.support = false;
      this.container = id ? document.getElementById('id') : this.body;
      this.num = num ? num : 5;
      this.init()
    };
  FallingLeaves.prototype = {
    init: function() {
      this.supportNot();
      if (this.support != false) {
        for (var i = 0; i < this.num; i++) {
          this.container.appendChild(this.createLeaf())
        }
      }
    },
    supportNot: function() {
      var domPrefixes = 'Webkit Moz O ms a'.split(' ');
      for (var i = 0; i < domPrefixes.length; i++) {
        if (this.container.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          this.support = domPrefixes[i];
          break
        }
        if (domPrefixes[i] == "a") {
          if (this.container.style.animationName !== undefined) {
            this.support = domPrefixes[i];
            break
          }
        }
      }
    },
    randomInteger: function(low, high) {
      return low + Math.floor(Math.random() * (high - low))
    },
    randomFloat: function(low, high) {
      return low + Math.random() * (high - low)
    },
    pixelValue: function(value) {
      return value + 'px'
    },
    durationValue: function(value) {
      return value + 's'
    },
    createLeaf: function() {
      var self = this,
        leafDiv = document.createElement('div'),
        image = document.createElement('img'),
        spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip',
        fadeAndDropDuration = self.durationValue(self.randomFloat(5, 11)),
        spinDuration = self.durationValue(self.randomFloat(4, 8)),
        leafDelay = self.durationValue(self.randomFloat(0, 5));
      leafDiv.className = "leave";
      image.src = 'https://pdbn.top/uploads/2016/02/' + self.randomInteger(1, self.num) + '.png';
      leafDiv.style.top = self.pixelValue(30);
      leafDiv.style.right = self.pixelValue(self.randomInteger(0, 50));
      if (self.container.style[self.support + 'AnimationName'] !== undefined) {
        image.style[self.support + 'AnimationName'] = spinAnimationName;
        image.style[self.support + 'AnimationDuration'] = spinDuration;
        leafDiv.style[self.support + 'AnimationName'] = 'fade, drop';
        leafDiv.style[self.support + 'AnimationDelay'] = leafDelay + ', ' + leafDelay;
        leafDiv.style[self.support + 'AnimationDuration'] = fadeAndDropDuration + ', ' + fadeAndDropDuration
      }
      if (this.support == "a") {
        image.style.animationName = spinAnimationName;
        image.style.animationDuration = spinDuration;
        leafDiv.style.animationName = 'fade, drop';
        leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
        leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration
      }
      leafDiv.appendChild(image);
      return leafDiv
    }
  };
  new FallingLeaves();
}; 
if($(window).width() > 1040){
meihua();
}
/*梅花结束*/