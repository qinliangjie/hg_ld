import './css/animate.min.css'
import './css/index.css'
import './css/indexless.less'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import layer from 'layui-layer'
// import myvideos from './images/video/1.mp4'

let g = document.getElementsByClassName("gotoTask")[0];
let k = document.getElementsByClassName("dom1")[0];
let d = document.getElementsByClassName("dom2")[0];
let l = document.getElementsByClassName("left")[0];

$('.gotoTask').on('click',function(){
    console.log(1)
    $('.dom1').css('left','-100%');
    $('.dom2').css('left','50%');
})
$('.left').on('click',function(){
    $('.dom1').css('left','0');
    $('.dom2').css('left','150%');
})
function showOverlay(classname) {
    if (classname) {
        $(".overlay." + classname).removeClass("hide");
    } else {
        $(".overlay").removeClass("hide");
    }
    $("main").addClass("de-emphasized");
    $("body,html").addClass("overflow");
}
function testAnim(x) {
    x.removeClass('fadeInRight animated').addClass('fadeInRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass('fadeInRight animated');
    });
};
$('.hero_n_s').on('click', function() {
    if ($(this).hasClass('thor')) {
        $('.hero_n_s').removeClass('odin_active loki_active hela_active');
        if ($(this).hasClass('thor_active')) {

        } else {
            $('.hreo_img').removeClass('active');
            $(this).addClass('thor_active')
            $('.thor_img').addClass('active');
            testAnim($('.thor_img'))
        }
    }
    if ($(this).hasClass('odin')) {
        $('.hero_n_s').removeClass('thor_active loki_active hela_active');

        if ($(this).hasClass('odin_active')) {

        } else {
            $('.hreo_img').removeClass('active');
            $(this).addClass('odin_active');
            $('.odin_img').addClass('active');
            testAnim($('.odin_img'))
        }
    }
    if ($(this).hasClass('loki')) {
        $('.hero_n_s').removeClass('odin_active thor_active hela_active');
        if ($(this).hasClass('loki_active')) {

        } else {
            $('.hreo_img').removeClass('active');
            $(this).addClass('loki_active');
            $('.loki_img').addClass('active');
            testAnim($('.loki_img'))
        }
    }
    if ($(this).hasClass('hela')) {
        $('.hero_n_s').removeClass('odin_active thor_active loki_active');
        if ($(this).hasClass('hela_active')) {

        } else {
            $('.hreo_img').removeClass('active');
            $(this).addClass('hela_active');
            $('.hela_img').addClass('active');
            testAnim($('.hela_img'))
        }
    }
})
function hideOverlay(classname) {
    if (classname) {
        $(".overlay." + classname).addClass("hide");
    } else {
        $(".overlay").addClass("hide");
    }
    $("main").removeClass("de-emphasized");
    $("body,html").removeClass("overflow");
}

$(".close").on("click", function() {
    var myVideo = document.getElementById("gamevideo");
    myVideo.pause();
    myVideo.currentTime = 0;
    hideOverlay();
});
$(".play").click(function() {
    var myVideo = document.getElementById("gamevideo");
    
    myVideo.play();
    showOverlay("videoSection");
});
//$("#gamevideo").attr('src',myvideos)