function onYouTubeIframeAPIReady(){player=new YT.Player("player",{height:"100%",width:"100%",videoId:"E4JeIt67jMA",host:"https://www.youtube.com",playerVars:{controls:0},events:{onStateChange:stateChange}})}function stateChange(e){switch(e.data){case-1:$("header .bg_image").css({opacity:1}),$(".box-button-players .button").removeClass("play stop ").addClass("load");break;case 1:$("header .bg_image").css({opacity:0}),$(".box-button-players .button").removeClass(" play load").addClass("stop"),firstload=0;break;case 0:case 2:$("header .bg_image").css({opacity:1}),$(".box-button-players .button").removeClass("stop load ").addClass("play");break;case 3:firstload?$(".box-button-players .button").removeClass("play stop ").addClass("load"):$("header .bg_image").css({opacity:1})}}$(function(){function e(){$(window).width()<=1200?$(".slider-2").slick({slidesToShow:1,slidesToScroll:1,arrows:!1}):$(".slider-2").slick({slidesToShow:2,slidesToScroll:1,arrows:!1})}$(".slider").slick({arrows:!1,dots:!0,autoplay:!0,autoplaySpeed:3e3});var a=$(".navigation #arrow"),o=$(".navigation #next");$(".slider-3").slick({arrows:!1,fade:!0,speed:800}),a.on("click",function(e){$(".slider-3").slick("slickPrev"),$(".slider-2").slick("slickPrev")}),o.on("click",function(e){$(".slider-2").slick("slickNext"),$(".slider-3").slick("slickNext")}),$(".box-button-players .button").on("click",function(e){var a=player.getPlayerState();1===a||3===a?player.pauseVideo():2!==a&&0!==a&&5!==a&&-1!==a||player.playVideo()}),$("header h1, header p, .box-button, header a, footer p, footer a, .section-options .box-link").css({opacity:0}).animateScroll(function(){$(this).animate({opacity:1},1e3)}),$(".section-download, .section-info, .section-options").find(".inner-wrapper  h2, .inner-wrapper p, .box-button, .slider-2, .box-1, .box-3  ").addClass("hidden").animateScroll({classToAdd:"animated fadeInLeft"}),$(".section-download, .section-info, .section-options").find("img, .slider-3, .box-2, .box-4").addClass("hidden").animateScroll({classToAdd:"animated fadeInRight"}),$(window).resize(e),e()});var player,firstload=1;