import './css/index.css'
import './css/indexless.less'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import layer from 'layui-layer'
// import myvideos from './images/video/1.mp4'
new Swiper('.swiper-container4', {
    effect: 'coverflow',
    grabCursor: true,
    initialSlide: 1,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 20,
        stretch: 20,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination4',
        clickable: true,
    }
});
let g = document.getElementsByClassName("gotoTask")[0];
let k = document.getElementsByClassName("dom1")[0];
let d = document.getElementsByClassName("dom2")[0];
let l = document.getElementsByClassName("left")[0];
g.addEventListener('click',function(){
    k.style.left = '-100%';
    d.style.left = '50%'
})
l.addEventListener('click',function(){
    d.style = '100%';
    k.style.left = '50%'
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