import './css/animate.min.css'
import './css/index.css'
import './css/indexless.less'
const axios = require('axios');
import layer from 'layui-layer'
// import myvideos from './images/video/1.mp4'
import iosin from './images/body/iosin.png'
import iosout from './images/body/iosout.png'
import andin from './images/body/Androidin.png'
import andout from './images/body/androidout.png'

$('.gotoTask').on('click',function(){
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
//
//
$.get('https://admin.gamemorefun.net/game/getFinishTaskTotal', function (res) {
       if (res.success) {
         set_task_num(res.data)

       } else {
            set_task_num(0)
       }
}, 'json');
function set_task_num(num){
    if(num==0){
        return
    }else{
        var s = (num*3/10000).toFixed(2);
        console.log(Number(s)+.6)
        $('.line_dom').width(Number(s)+.6+'rem');
        if(s>3){
            $('.small_gift_').css('left',"3.3rem")
        }else{
            $('.small_gift_').css('left',Number(s)+.3+"rem")
        }
        
    }
    
}
function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

$.get('https://admin.gamemorefun.net/game/get_appointment_number', function (res) {
       if (res.success) {
         var list = PrefixInteger(res.data,5).split('');
         spanList(list)
       } else {
         spanList([0,0,0,0,0])
       }
}, 'json');
function spanList(list){
    for(var i =0; i<list.length;i++){
        $('.number span').eq(i).html(list[i]);
    }
}
function getPeople(){
    $.get('https://admin.gamemorefun.net/game/get_appointment_number', function (res) {
       if (res.success) {
         var list = PrefixInteger(res.data,5).split('');
         spanList(list)
       } else {
         spanList([0,0,0,0,0])
       }
}, 'json');
}
var equipment = '';//设备选择
var successApp = '';
var checks = false;//未勾选状态
$(".appbtn").on('click',function(){
     $('html, body').animate({scrollTop: $('#advance_show').offset().top}, 1000)
})
  $(".adv_check").on('click', function () {
    checks = !checks;
    if (checks) {
      $('.checkno').removeClass('active');
      $('.checkin').addClass('active')
    } else {
      $('.checkin').removeClass('active');
      $('.checkno').addClass('active')
    }

  })
  //点击红色按钮
  $(".adv_btn").on('click', function () {
   
     if(equipment==''){
       layer.msg('전화 번호를 입력하고 휴대폰  기종을 선택하십시오.');
       return false;
     }
     var tel = $('.adv_input').val();
     if(!(/^\d{11}$/.test(tel))) {
       layer.msg('전화번호 양식이 잘못되었습니다.');
       return false;
     }
     if (!tel) {
       layer.msg('전화번호 양식이 잘못되었습니다.');
       return false;
     }
     tel = '82'+$('.adv_input').val();
     
   if (checks) {  
       $.post('https://admin.gamemorefun.net/game/appointment', {phone: tel,device_type:equipment}, function (res) {
           if (res.success) {
             layer.msg(res.msg);
             $(".task_paly_nomal").prev().show();
             successApp='success'
             getPeople()
           } else {
            if(res.msg=='이미 등록을 진행하셨습니다.'){
                successApp='success'
                $(".task_paly_nomal").prev().show();
            }
            layer.msg(res.msg);
             
           }
           $('.adv_normal').show()
           $('.adv_error').hide()
         }, 'json');  
   } else {
     $('.adv_normal').hide()
     $('.adv_error').show()
   }

  });

 var equipment = '';
  $(".task_paly_nomal").on("click",function(){
        if($(this).prev().is(":visible")){

        }else{
          $('html, body').animate({scrollTop: $('#advance_show').offset().top}, 1000)
        }
        
  })
  $(".task_play_forum").on("click",function(){
     if(successApp==''){
      layer.msg('먼저 사전등록을 진행하시기 바랍니다!')
    }else{
      $(this).prev().show();
      if(equipment=='iOS'){
        layer.msg('Coming soon!')
        //暂时还未有地址
        //window.open("https://apps.apple.com/kr/app/%EC%82%BC%EA%B5%AD%EC%A7%80-%EB%94%94%ED%8E%9C%EC%8A%A4m/id1300090151"); 
      }else if(equipment=='Android'){
        window.open("https://play.google.com/store/apps/details?id=com.epc.tfsgzhw "); 
      }
    }
      
      
  })
  $(".task_play_fans").on("click",function(){
    if(successApp==''){
      layer.msg('먼저 사전등록을 진행하시기 바랍니다!')
    }else{
      $(this).prev().show();
      window.open("https://cafe.naver.com/yyns001"); 
    }
      
  })


$(".adv_radio_btn").on("click",function(e){
    if($(this).index()==0){
        equipment = 'iOS';
        $(this).attr('src',iosin);
        $(this).next().attr('src',andout);
    }else{
        equipment = 'Android';
        $(this).attr('src',andin);
        $(this).prev().attr('src',iosout)
    }
})
$(".adv_input").on('click',function(){
    if(equipment==''){
        layer.msg('디바이스 종류를 선택해 주세요.')
    }else{
        $(this).attr("readonly",false)
    }
})
$(".closeL").on('click',function(){
    layer.closeAll();
})
$(".alert_dom").on('click',function(){
    layer.open({
        type: 1,
        area: ['8.17rem', '4.52rem'],
        title: false,
        scrollbar: false,
        closeBtn: 0,
        autoClose: true,
        content: $("#attention")
    });
})
