//ie 하위 버전 html5태그 생성
document.createElement('header');
document.createElement('hgroup');
document.createElement('nav');
document.createElement('section');
document.createElement('main');
document.createElement('article');
document.createElement('aside');

$(function(){
	selectList();	
});

//레이어 팝업 열기
function searchPop(vw,m){
	var popup = $('.layer_pop#'+ vw);
	var wrapper = $('#wrapper');
	var btn = $('.list li button.search');
	popup.fadeIn(400);	
	wrapper.css({'overflow':'hidden','height':$(window).height()});	
	$(m).addClass('selected');
	btn.not($(m)).removeClass('selected');
	loadBar_on()
	setTimeout(loadBar_off,2000);
}

//검색 레이어 팝업 닫기
$(document).on('click','.btn-closepop',function(){
	var wrapper = $('#wrapper');
	var btn = $('.list li button.search.selected');
	var li = btn.parents('li');
	var idx = $('.list li').index(li);
	var Pos = li.offset().top;
	var topArea = Pos - 90;
	var list = $('.itemList > li');

	$('.layer_pop').animate({scrollTop:0},10);
	$('.layer_pop').fadeOut(400);
	wrapper.css({'overflow':'visible','height':'auto'});
	
	if(idx == 0){
		$('body,html').animate({scrollTop:0},10);
	}else{
		$('body,html').animate({scrollTop:topArea +'px'},10);
	}
	
	list.removeClass('selected');
	listOff();
});

//리스트 상세 레이어 팝업 닫기
$(document).on('click','.btn-closepop2',function(){
	var wrapper = $('#wrapper');
	var li = $('.order_info.view .itemList > li.selected');
	var Pos = li.offset().top;
	//var topArea = Pos - 90;

	$('.layer_pop').animate({scrollTop:0},10);
	$('.layer_pop').fadeOut(400);
	wrapper.css({'overflow':'visible','height':'auto'});

	$('body,html').animate({scrollTop:Pos +'px'},10);
});

//자재 리스트 추가,삭제
function addList() { //리스트 추가
	var wrapper = $('#wrapper');
	var $listObj = $('.order_info  .obj');
	var m = "'material'";
	$listObj.append('<li>'+
			'<div class="delete_list">'+
				'<a href="javascript:void(0);" onclick="removeList(this);"><img src="img/common/delete_list.png" alt="삭제"/></a>'+
			'</div>'+							
			'<h2>자재명</h2>'+
			'<div class="insert">'+
				'<span class="ellipsis"></span>'+
				'<button type="button" class="search" onclick="searchPop('+m+',this);"></button>'+
			'</div>'+
			'<div class="today"><strong>납품요청일</strong><em class="f_lt"></em></div>'+
			'<dl>'+
				'<dt>요청수량</dt>'+
				'<dd>'+
					'<input type="number" value="" name="" maxlength="15" class="half">'+
					'<span>박스</span>'+
				'</dd>'+
			'</dl>'+
			'<dl>'+
				'<dt>비고</dt>'+
				'<dd class="etc">'+
					'<textarea maxlength="200"></textarea>'+
				'</dd>'+
			'</dl>'+								
		'</li>');
		wrapper.css('height','auto');
		$('body,html').stop().animate({scrollTop:$(document).height()});
}
function removeList(t) { //리스트 삭제
	var $leng = $('.order_info  .obj > li').length;
	var wrapper = $('#wrapper');
	$(t).closest('li').remove();
	if($leng > 2){
		wrapper.css('height','auto');	
	}else{
		wrapper.css('height','100%');
	}
}

//리스트 선택 (공통)
function selectList() {
	var list = $('.itemList > li');
	list.on('click',function(){
		//var $top = $(this).offset().top;
		//var $top_ = $top - 90;
		//$('body,html').animate({scrollTop:$top_ +'px'},500);
		$(this).addClass('selected').siblings().removeClass('selected');
	});	
}

//자재 리스트 목록 펼침,닫힘
function listOn(t) {
	var btn = $('.list_cont .itemList > li .btn_item a');
	var _btn = btn.not($(t));
	var $item = $('.list_cont .itemList > li .iteminfo > div');
	var $item_ch = $(t).closest('.btn_item').next('div');
	var _$item = $item.not($item_ch);
	
	if($(t).hasClass('on') == true){
		$item_ch.slideUp(300,function(){
			$(t).removeClass('on');
			$(t).find('em').text('자재 재고량 보기');
		});
	}else{
		$item_ch.slideDown(300,function(){
			$(t).addClass('on');
			$(t).find('em').text('닫기');
		});
		_$item.slideUp(300,function(){
			_btn.removeClass('on');
			_btn.find('em').text('자재 재고량 보기');
		});
	}
}
//팝업 닫혔을 때 리스트 클리어 
function listOff() {
	var btn = $('.list_cont .itemList > li .btn_item a');
	var $item = $('.list_cont .itemList > li .iteminfo > div');
	
	$item.slideUp(10,function(){
		btn.removeClass('on');
		btn.find('em').text('자재 재고량 보기');
	});
}

//로딩 이미지 출력
function loadBar_on() {//로딩 이미지 불러오기
	$('body').prepend('<div class="dark_bg"><div class="loadingBar"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>');	
}
function loadBar_off() {//로딩 이미지 제거
	$('.dark_bg, .loadingBar').remove();
}

//스크롤 이동 버튼
function moveScroll(el){
	if(el == 'top'){
		$('body, html').animate({scrollTop:0},500);	
	}else{
		var elTop = $('.anchor#'+ el).offset().top;
		var etcArea = 88;
		$('body, html').animate({scrollTop:elTop - 88 + 'px'},500);
	}
}




