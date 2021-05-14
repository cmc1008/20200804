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
    T.scrollHook(jQuery(window), "#008080");
  /*返回顶部js结束*/
  
  /*Animsition 为页面切换添加动画*/
    $(".animsition").animsition(
    inClass               :   'fade-in-up',
    //outClass              :   'fade-in-up',
    inDuration            :    1500,
    outDuration           :    800,
    linkElement           :   'a',
    // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
    loading               :    true,
    loadingParentElement  :   'body', //animsition wrapper element
    loadingClass          :   'animsition-loading',
    unSupportCss          : [ 'animation-duration',
                              '-webkit-animation-duration',
                              '-o-animation-duration'
                            ],
    //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".   
    overlay               :   false,
    overlayClass          :   'animsition-overlay-slide',
    overlayParentElement  :   'body'
  });
});
