/********************
 * Date：2018/1/29
 * author：姜娟娟
 * info: 全站的入口文件
 */

;
$(function(){

	// 首页的header头
	new HeadSearcnFn({
		headerSearchId : $('#headerSearchId')
	});

	// 首页的左边产品导航
	new ProductNav({
		ulId : $('#ulId')
	});

	// 首页的轮播图
	new IndexSliderFn({
		imgListId : $('#imgListId'),
		leftBtnId : $('#leftBtnId'),
		rightBtnId : $('#rightBtnId'),
		pointerUlId : $('#pointerUlId')
	});
});