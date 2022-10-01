// common script
$(document).ready(function() {
  preventDefaultAnchor();
  setGNB();
  setFooterNav();
});



function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function navPc() {
  if ($(window).width() < 1024) return false;
  document.querySelectorAll('#nav > ul > li > a').forEach(function (el, i) {

    // event: mouseover
    el.addEventListener('mouseover', function () {
      // 변수 선언
      var index = Array.from(document.querySelectorAll('#nav > ul > li > a')).indexOf(this);
      console.log(index);

      // 이벤트1 : 해당하는 box보여주기
      document.querySelectorAll('#nav > ul > li').forEach(function (el, i) {
        el.classList.remove('on');
      });
      document.querySelector('#nav > ul > li:nth-child(' + (index + 1) + ')').classList.add('on');
      // header의 높이 줄이기
      document.querySelector('header#header').classList.add('open');
    });

    // // event: mouseleave :: 마우스가 nav tag밖으로 나가면 취소
    document.querySelector('#nav').addEventListener('mouseleave', function () {
      document.querySelectorAll('#nav > ul > li').forEach(function (el, i) {
        el.classList.remove('on');
      });
      // header 그대로
      document.querySelector('header#header').classList.remove('open');
    });
  });
}

function setGNB() {
  var timerIdFocus = '';

  // // 이벤트 동작(접근성 고려)
  $('#gnb > ul > li').on('mouseenter focusin', function() {
    if ($(window).width() < 1024) return false;
    var index = $('#gnb > ul > li').index($(this));
    clearTimeout(timerIdFocus);
    showSub(index + 1);
  }).on('mouseleave focusout', function() {
    if ($(window).width() < 1024) return false;
    timerIdFocus = setTimeout(function() {removeAll();}, 100);
  });

  // // 해당 Sub 메뉴 표시 (1, 2, ..., n)
  function showSub(n) {
    var $target = $('#gnb > ul > li:eq(' + (n - 1) + ')');
    var heightNew = 0;
    $target.find('div.sub > *').each(function() {
      heightNew += $(this).outerHeight(true);
    });

  //   // 주변 GNB 닫은 후 표시
    $target.siblings().removeClass('open');
    $target.siblings().find('div.sub').css({'transition': 'none', 'height': 0});
    $target.addClass('open');
    $target.find('div.sub').css({'transition': 'height 0.3s', 'height': heightNew + 'px'});
  }

  // 모든 서브메뉴 제거
  function removeAll() {
    $('#gnb div.sub').css({'transition': 'none', 'height': 0});
    $('#gnb > ul > li').removeClass('open');
  }




  // 모바일용 UI
  $('#header a.menu').on('click', function() {
    $(this).toggleClass('close');
    $('#gnb').toggleClass('open');
  });

  // 서브메뉴 유무표시(모바일용)
  $('#gnb > ul > li').each(function() {
    var numSub = $(this).find('div.content-box > ul').length;
    if (numSub > 0) {
      $(this).find('> a').append('<i class="fas fa-chevron-down mobile"><span>서브메뉴있음</span></li>')
    }
  });
  $('#gnb div.content-box > ul > li').each(function() {
    var numSub = $(this).find('ul').length;
    if (numSub > 0) {
      $(this).find('> a').append('<i class="fas fa-chevron-down mobile"><span>서브메뉴있음</span></li>')
    }
  });

  // 모바일 GNB 동작
  $('#gnb > ul > li > a').on('click', function(e) {
    if ($(window).width() < 1024 && $(this).find('i').length > 0) {  // 모바일 + 서브메뉴 있는 경우
      e.preventDefault();
      $(this).parent().addClass('open');
      $(this).next().find('div.content-box > ul > li').css({'height': '50px'});
      $(this).parent().siblings().removeClass('open');
      $(this).parent().siblings().find('li').css({'height': '0px'});
    }
  });

  $('#gnb div.content-box > ul > li > a').on('click', function(e) {
    if ($(window).width() < 1024 && $(this).find('i').length > 0) {  // 모바일 + 서브메뉴 있는 경우
      e.preventDefault();
      $(this).parent().addClass('open').css({'height': 'auto'});
      $(this).next().find('> li').css({'height': '50px'});
      $(this).parent().siblings().removeClass('open');
      $(this).parent().siblings().find('ul > li').css({'height': '0px'});
    }
  });
}

// 푸터 navigation
function setFooterNav() {
  // 서브메뉴 식별
  $('#footer nav > ul > li').each(function() {
    if ($(this).find('ul').length > 0) {
      $(this).find('> a').append('<i class="fas fa-chevron-down mobile"><span>서브메뉴있음</span></i>');
    }
  });

  $('#footer nav > ul > li > a').on('click', function(e) {
    if ($(window).width() < 1024 && $(this).parent().find('ul').length > 0) {
      e.preventDefault();
      var height = 0;
      $(this).next().find('> li').each(function() {
        height += $(this).outerHeight(true);
      });
      if ($(this).parent().hasClass('open') === true) {
        $(this).next().css({'height': '0px'});
        $(this).parent().removeClass('open');
      } else {
        $(this).next().css({'height': height + 'px'});
        $(this).parent().addClass('open');
        $(this).parent().siblings().find('> ul').css({'height': '0px'});
        $(this).parent().siblings().removeClass('open');
      }
    }
  });
}







