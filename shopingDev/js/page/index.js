/********************
 * Date：2018/1/30
 * author：姜娟娟
 * info: 首页的js文件
 */

// 首页的header头，构造器
function HeadSearcnFn( _configObj ){
	// 全对象共享的初始值
	this.txtVal 		 = HeaderSearchValConfig;
	this._headerSearchId = _configObj.headerSearchId;
	this.init();
}

HeadSearcnFn.prototype = {
	// 初始化
	init:function(){
		var _self = this;

		_self.eventClick();
		_self.eventBlur();
	},
	// 点击，获得焦点
	eventClick:function(){
		var _self = this;

		_self._headerSearchId.on('click',function(){
			$(this).val('');
		});
	},
	// blue，失去焦点
	eventBlur:function(){
		var _self = this;

		_self._headerSearchId.on('blur',function(){
			$(this).val( HeaderSearchValConfig );
		});
	}
}

// 首页的左边产品导航
function ProductNav(_configObj){
	this.ulId = _configObj.ulId
	this.init();
}
ProductNav.prototype = {
	init:function(){
		var _self = this;
		var _lis  = _self.ulId.children();
		_self.eventMove(_lis);
		_self.eventOut(_lis);
	},
	eventMove:function(_lis){
		var _self = this;
		_lis.on('mouseenter',function(){
			$(this).children()
				.eq(1)
				.css('display','block');
		});
	},
	eventOut:function(_lis){
		var _self = this;
		_lis.on('mouseout',function(){
			$(this).children()
				.eq(1)
				.css('display','none');
		});
	}
}

// 首页的轮播图，构造器
function IndexSliderFn( _configObj ){
	this.imgListId 		= _configObj.imgListId;
	this.leftBtnId 		= _configObj.leftBtnId;
	this.rightBtnId 	= _configObj.rightBtnId;
	this.pointerUlId 	= _configObj.pointerUlId;

	this._tempI 		= 0;
	this._imgW 			= 992;

	this.init();
}
/*
	根据UI设计图，抽象出功能点，设计此功能模块
*/
IndexSliderFn.prototype = {
	init:function(){
		var _self = this;
		_self.getDate( sliderImgData.imglist );
	},
	// 获取数据
	getDate:function( _imglist ){
		var _self = this;

		// 生成轮播图
		_self.createDomFn( _imglist, _self.imgListId );

		// 生成小白点li
		_self.createPointer( _imglist, _self.pointerUlId )

		// 设置轮播图UL的宽度
		_self.ulWidth( _imglist.length );

		// 左边按钮
		_self.leftBtnFn( _imglist.length );

		// 右边按钮
		_self.rightBtnFn( _imglist.length );

		// 小白点按钮
		_self.pointerGroupFn()
	},
	// 设置轮播图UL的宽度
	ulWidth:function( _length ){
		var _self = this;
		_self.imgListId.css('width', _length * _self._imgW );
	},
	// 生成dom节点
	createDomFn:function( _d, _wrap ){
		var _self = this;
		// console.log( _d )
		for(var i=0; i<_d.length; i++){
			$('<li/>')
				.html(function(){
					$('<img />')
						.attr({
							'src': _d[i]
						})
						.appendTo( $(this) );
				})
				.appendTo( _wrap );
		}
	},
	// 生成小圆点
	createPointer:function( _d, _wrap ){
		var _self = this;
		for(var j=0; j<_d.length; j++){
			$('<li/>').appendTo( _wrap );
		}

		// 小白点默认第一个为红色，这是一个初始值，它只执行一次
		_wrap.children().eq(0).addClass('f00');
	},
	// 左边按钮
	leftBtnFn:function( _length ){
		var _self = this;
		_self.leftBtnId.on('click',function(){

			if( _self._tempI < (_length-1) ){
				_self._tempI++;
			} else {
				_self._tempI = 0;
			}

			// _self.imgListId.css('left', -( _self._imgW * _self._tempI ));
			_self.animateFn();
		});
	},
	// 右边按钮
	rightBtnFn:function( _length ){
		var _self = this;

		_self.rightBtnId.on('click',function(){
			if( _self._tempI > 0 ){
				_self._tempI--;
			} else {
				_self._tempI = (_length-1);
			}

			// _self.imgListId.css('left', -( _self._imgW * _self._tempI ));
			_self.animateFn();
		});
	},
	// 小圆点按钮
	pointerGroupFn:function(){
		var _self = this;

		// 小白点的集合
		var _pointerGroup = _self.pointerUlId.children();

		// 小白点的点击事件
		_pointerGroup.on('click',function(){
			$(this).addClass('f00').siblings().removeClass();
			_self._tempI = $(this).index();

			// _self.imgListId.css('left', -( _self._imgW * _self._tempI ));
			_self.animateFn();
		});
	},
	// 动画&特效方法(通用方法)
	animateFn:function(){
		var _self = this;

		_self.imgListId.stop().animate({
			left : -( _self._imgW * _self._tempI )
		},500);
	}
}