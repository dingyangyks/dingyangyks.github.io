$(document).ready(function () {
    // 创建全部分类
    var display_link = '../html/com-display.html';
    createItem(classify_item, display_link);

    // 创建详细分类
    var detail_link = '../html/com-details.html';
    for (var i = 0; i < 5; i++) {
        createDatail(obj['detail_item' + (i + 1)], detail_link, i);
    }

    // 分类选项卡
    tabs();

    // 轮播图
    creatImg();

    // 置顶
    showSide();
    $(window).on('scroll', showSide);
    $('#to-top').on('click', toTop);
})


var classify_item = [['<strong>手机</strong>', '<strong>数码</strong>', '合约机', '荣耀', '单反', '智能手表'],
['<strong>电脑</strong>', '<strong>硬件外设</strong>', '装机宝', '笔记本', '台式机', '超极本'],
['<strong>大家电</strong>', '<strong>电视</strong>', '空调', '冰箱', '洗衣机'],
['<strong>厨房电器</strong>', '<strong>生活电器</strong>', '空气净化机', '微波炉', '通讯设备'],
['<strong>食品/饮料/生鲜</strong>', '粮油', '进口', '方便面', '零食']];

var obj = {
    detail_item1: [['装机配件', 'CPU', '硬盘', '内存', '显示', '智能显示器', '主板', '显卡', '机箱', '电源', '散热器', '声卡', '服务器配件', '拓展卡'],
    ['电脑整机', '笔记本', '超极本', '上网本', '平板电脑', '台式机'],
    ['音频设备', '音箱', '耳机/耳麦', '麦克风', '声卡', '音频附件', '录音笔'],
    ['整机配件', '电脑包', '电脑桌', '电源适配器', '贴膜', '清洁用品', '笔记本散热器', '平板配件', '插座网线/电话线', '影音线材', '散电脑线材', '特色组件'],
    ['网络设备', '路由器', '网卡', '3G无线上网', '交换机', '网络存储', '布线工具', '网络配件', '正版软件'],
    ['电脑外设', '鼠标', '键盘', '游戏外设', '移动硬盘', '摄像头', '高清播放器', '外置盒', '移动硬盘包', '手写板/绘画板'],
    ],
    detail_item2: [['装机配件', 'CPU', '硬盘', '内存', '显示', '智能显示器', '主板', '显卡', '机箱', '电源', '散热器', '声卡', '服务器配件', '拓展卡'],
    ['电脑整机', '笔记本', '超极本', '上网本', '平板电脑', '台式机'],
    ['整机配件', '电脑包', '电脑桌', '电源适配器', '贴膜', '清洁用品', '笔记本散热器', '平板配件', '插座网线/电话线', '影音线材', '散电脑线材', '特色组件'],
    ['网络设备', '路由器', '网卡', '3G无线上网', '交换机', '网络存储', '布线工具', '网络配件', '正版软件'],
    ['电脑外设', '鼠标', '键盘', '游戏外设', '移动硬盘', '摄像头', '高清播放器', '外置盒', '移动硬盘包', '手写板/绘画板'],
    ['音频设备', '音箱', '耳机/耳麦', '麦克风', '声卡', '音频附件', '录音笔']],
    detail_item3: [['装机配件', 'CPU', '硬盘', '内存', '显示', '智能显示器', '主板', '显卡', '机箱', '电源', '散热器', '声卡', '服务器配件', '拓展卡'],
    ['电脑整机', '笔记本', '超极本', '上网本', '平板电脑', '台式机'],
    ['整机配件', '电脑包', '电脑桌', '电源适配器', '贴膜', '清洁用品', '笔记本散热器', '平板配件', '插座网线/电话线', '影音线材', '散电脑线材', '特色组件'],
    ['电脑外设', '鼠标', '键盘', '游戏外设', '移动硬盘', '摄像头', '高清播放器', '外置盒', '移动硬盘包', '手写板/绘画板'],
    ['音频设备', '音箱', '耳机/耳麦', '麦克风', '声卡', '音频附件', '录音笔'],
    ['网络设备', '路由器', '网卡', '3G无线上网', '交换机', '网络存储', '布线工具', '网络配件', '正版软件'],],
    detail_item4: [['音频设备', '音箱', '耳机/耳麦', '麦克风', '声卡', '音频附件', '录音笔'],
    ['装机配件', 'CPU', '硬盘', '内存', '显示', '智能显示器', '主板', '显卡', '机箱', '电源', '散热器', '声卡', '服务器配件', '拓展卡'],
    ['电脑整机', '笔记本', '超极本', '上网本', '平板电脑', '台式机'],
    ['整机配件', '电脑包', '电脑桌', '电源适配器', '贴膜', '清洁用品', '笔记本散热器', '平板配件', '插座网线/电话线', '影音线材', '散电脑线材', '特色组件'],
    ['网络设备', '路由器', '网卡', '3G无线上网', '交换机', '网络存储', '布线工具', '网络配件', '正版软件'],
    ['电脑外设', '鼠标', '键盘', '游戏外设', '移动硬盘', '摄像头', '高清播放器', '外置盒', '移动硬盘包', '手写板/绘画板'],
    ],
    detail_item5: [['装机配件', 'CPU', '硬盘', '内存', '显示', '智能显示器', '主板', '显卡', '机箱', '电源', '散热器', '声卡', '服务器配件', '拓展卡'],
    ['整机配件', '电脑包', '电脑桌', '电源适配器', '贴膜', '清洁用品', '笔记本散热器', '平板配件', '插座网线/电话线', '影音线材', '散电脑线材', '特色组件'],
    ['网络设备', '路由器', '网卡', '3G无线上网', '交换机', '网络存储', '布线工具', '网络配件', '正版软件'],
    ['电脑外设', '鼠标', '键盘', '游戏外设', '移动硬盘', '摄像头', '高清播放器', '外置盒', '移动硬盘包', '手写板/绘画板'],
    ['电脑整机', '笔记本', '超极本', '上网本', '平板电脑', '台式机'],
    ['音频设备', '音箱', '耳机/耳麦', '麦克风', '声卡', '音频附件', '录音笔']]
};

// 轮播图片
var img_item = ['../img/banner/5995829aN84f0e71b.jpg',
    '../img/banner/599fcc82N9ff1002f.jpg',
    '../img/banner/598abe88N80fb9275.jpg',
    '../img/banner/59954e1dNb2e1cfb5.jpg',
    '../img/banner/599a868aNf83ce587.jpg'];


// 创建分类
function createItem(classify_item, display_link) {
    var item_html = '';
    $.each(classify_item, function (index, item) {
        item_html += '<li class="first-tittle">';
        $.each(item, function (subindex, subitem) {
            item_html += '<a href =' + display_link + '>' + subitem + '</a>';
        })
        item_html += '</li>';
    })
    $('.classify ul').html(item_html);
}

// 创建详细分类
function createDatail(detail_item, detail_link, index) {
    var detail_html = '';
    $.each(detail_item, function (index, item) {
        detail_html += '<li> ';
        $.each(item, function (subindex, subitem) {
            detail_html += '<a href =' + detail_link + '>' + subitem + '</a>';
        })
        detail_html += '</li>';
    })
    $('.first-tittle').eq(index).append('<div class="details"><ul>' + detail_html + '</ul></div>');
}

// 分类选项卡
function tabs() {
    $('#classify-ul').delegate('.first-tittle', 'mouseover', function () {
        $(this).children('.details').show();
    })
    $('#classify-ul').delegate('.first-tittle', 'mouseout', function () {
        $(this).children('.details').hide();
    })
}

// 轮播图
var imgNum = 1;
var moveEnd = true;
var imgTimer = null;

// 插入轮播图片
function creatImg() {
    var img_html = '';
    img_html = '<li><img class="holder" data-src=' + img_item[img_item.length - 1] + '></li>';
    $.each(img_item, function (index, item) {
        img_html += '<li><img class="holder" data-src=' + item + '></li>';
    })
    img_html += '<li><img class="holder" data-src=' + img_item[0] + '></li>';
    $('.slideshow>ul').html(img_html);
    loadImage(createSlideshow);
}

// 创建轮播
function createSlideshow() {
    $('.slideshow ul').attr('width', function () {
        // 设置ul的宽度
        var actualWidth = $('.slideshow li').length * $('.slideshow li:first').width();
        var initLeft = -$('.slideshow li:first').width();
        $('.slideshow ul').css('width', actualWidth);
        $('.slideshow ul').css('left', initLeft);
    })

    // 按钮绑定事件
    $('#slideshow-left-btn').on('click', function () {
        imgMove(-1);//向左移动图片下标减1
    })
    $('#slideshow-right-btn').on('click', function () {
        imgMove(1);
    })

    $('.slideshow').on('mouseover', imgStop).on('mouseout', imgAuto);

    imgAuto();
    pointerEvent();
}

// 图片懒加载
function loadImage(callback) {
    var list = $('.holder');
    var len = list.length;
    if (!len) return;
    list.each(function (index, item) {
        var img = new Image();
        var url = $(item).data('src');
        img.onload = function () {
            img.onload = null;
            // console.log(url)
            $(item).attr('src', url).removeClass('holder');
            --len == 0 && callback();
        }
        img.onerror = function () {
            len--;
            // console.log(url + '图片加载错误时,发生调用');
        };
        img.src = url;
    })
}

// 图片移动
function imgMove(index) {
    if (!moveEnd) {//在点击一开始就要判断是否正在移动
        return;
    }
    imgNum = index + imgNum;
    pointColor();

    var intervalTime = 10;
    var perDistance = 100;
    var distance = -$('.slideshow li:first').width() * index;
    var speed = distance / (perDistance / intervalTime);
    var imgBox = $('.slideshow ul');
    var leftAim = imgBox.position().left + distance;

    moveEnd = false;//移动开始之前把状态标记为正在移动
    function imgGO() {
        if ((speed > 0 && imgBox.position().left < leftAim) || (speed < 0 && imgBox.position().left > leftAim)) {
            imgBox.css('left', function () {
                return imgBox.position().left + speed;
            })
            setTimeout(imgGO, 50);
            return;
        }
        resetPosition();
    }
    // 智障写法
    // function resetPosition() {
    //     var imgBox = $('.slideshow ul');
    //     var lenIndex = $('.slideshow li').length;
    //     var reSecondLeft = -$('.slideshow li:eq(' + (lenIndex - 2 )+ ')').position().left;
    //     var reFirstLeft = -$('.slideshow li:eq(' + (lenIndex - 1 )+ ')').position().left;
    //     var initLeft = -$('.slideshow li:first').width(); 
    //     console.log($('.slideshow li:eq(0)'));
    //     console.log($('.slideshow li').eq(0))
    //     console.log($('.slideshow li').eq(0))

    //     if (imgBox.position().left === 0) {
    //         imgBox.css('left',reSecondLeft);
    //     } else if(imgBox.position().left === reFirstLeft) {
    //         imgBox.css('left',initLeft);
    //     }
    // }

    function resetPosition() {
        moveEnd = true;//到到目标 停止移动 状态改为true 意为停止

        var $imgBox = $('.slideshow ul');
        var lenIndex = $('.slideshow li').length;
        var initLeft = -$('.slideshow li:first').width();
        var reSecondLeft = -$('.slideshow li:first').width() * (lenIndex - 2);

        if (imgNum === 0) {
            $imgBox.css('left', reSecondLeft);
            imgNum = 5;
        } else if (imgNum === 6) {
            $imgBox.css('left', initLeft);
            imgNum = 1
        }
    }
    imgGO();

}

// 焦点改变颜色
function pointColor() {
    $('.img-point').children().removeClass('select');
    newImgNum = imgNum == 0 ? 4 : (imgNum == 6 ? 0 : imgNum - 1)
    $('.img-point').children().eq(newImgNum).addClass('select');
    // console.log($('.img-point').children().eq(imgNum));
}

// 焦点点击事件
function pointerEvent() {
    $('.img-point').delegate('i', 'click', function (event) {
        var target = event.target;
        imgMove(target.dataset.index - imgNum);
    })
}

// 自动播放
function imgAuto() {
    imgTimer = setInterval(function () {
        imgMove(-1);
    }, 5000);
}

// 停止自动播放
function imgStop() {
    clearInterval(imgTimer);
}

// 显示侧边栏
function showSide() {
    var scrTop = $(window).scrollTop();
    scrTop > 30 ? $('.sidebar').show() : $('.sidebar').hide();
}

// 点击置顶
var timer = null;
function toTop() {
    clearInterval(timer);
    timer = setInterval(function () {
        var scrTop = $(window).scrollTop();
        var speed = scrTop / 10;
        if (scrTop > 30) {
            $(window).scrollTop(function () {
                 
                 return scrTop - speed;
            });
        } else {
            $(window).scrollTop(0);
            clearInterval(timer);
        }
    }, 10)
}