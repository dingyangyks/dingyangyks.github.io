// 注册表单验证
$(document).ready(function () {
    // 验证密码
    $('#set-key').on('focus', showAlert).on('input', checkPassword);

    // 验证再次输入
    $('#re-key').on('focus', showAlert);

    // 验证邮箱
    $('#email-input').on('focus',showAlert).on('input', checkEmail);
})
// 显示提醒
function showAlert() {
    $(this).siblings('p').show();
}

// 验证密码
function checkPassword() {
    // console.log($('#set-key').val());
    var inputContent = $('#set-key').val();
    var alertContent = $('#set-key-alert');
    var key_reg = /[\d]+/gi;
    var key_reg1 = /[a-z]+/gi;

    if (key_reg.test(inputContent) && key_reg1.test(inputContent) && inputContent.length >= 6) {
        alertContent.text('密码格式正确');
        alertContent.css('color', '#34b306');
        // 再次输入密码
        $('#re-key').on('input', reCheck);
    } else if (inputContent.length < 6) {
        alertContent.text('请设置长度大于6的密码');
        alertContent.css('color', '#ff0000');
    }
    else {
        alertContent.text('请不要使用纯数字或纯字母作为密码');
        alertContent.css('color', '#ff0000');

    }
}

function reCheck() {
    var inputContent = $('#set-key').val();
    var reInput = $('#re-key').val();
    var reAlert = $('#re-key-alert');
    reInput.length === 0 && reAlert.text('请再次输入密码')
    if (reInput === inputContent) {
        reAlert.text('输入正确');
        reAlert.css('color', '#34b306');
    } else if (reInput.length === 0) {
        reAlert.text('请再次输入密码');
        reAlert.css('color', '#ff0000');
    } else {
        reAlert.text('两次输入密码不一致');
        reAlert.css('color', '#ff0000');
    }
}

function checkEmail() {
    var email_reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var email_content = $('#email-input').val();
    var email_alert = $('#email-alert');
    if (email_reg.test(email_content)) {
        email_alert.text('输入正确');
        email_alert.css('color','#34b306');
    } else if (email_content.length === 0) {
        email_alert.text('请再次输入密码');
        email_alert.css('color', '#ff0000');
    } else {
        email_alert.text('输入格式不正确');
        email_alert.css('color','#ff0000');
    }
}
