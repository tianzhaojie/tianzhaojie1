const form = layui.form


form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    nickname: (val) => {
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        }
    },
    email: [
        /@/
        ,'邮箱输入错误'
      ] 
});
const layer = layui.layer;
// 初始化用户信息
const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: (res) => {
        const {message,status,data} = res
      if (res.status !== 0) return layer.msg("获取用户信息失败！");
      console.log(res);
      form.val("formUserInfo",data)
    },
  });
};

initUserInfo();

$('#reserBtn').click(function (e) {
    e.preventDefault();
    initUserInfo()
} )

$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'/my/userinfo',
        data:form.val('formUserInfo'),
        success:res => {
            const {message,status,data} = res
            if (status !== 0) return layer.msg(message)
             // 调用父页面渲染函数
             window.parent.getUserInfo();
        }
    })
})