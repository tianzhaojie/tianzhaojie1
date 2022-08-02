
$('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
})


$('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
})

const form = layui.form


const layer = layui.layer

// 通过 form.verify() 方法自定义校验规则
form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: (val) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        const pwd = $(".reg-box [name=password").val();
        if(pwd !== val) return "两次密码不一致"
    },
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位,且不能出现空格'
      ] 
});


$('#form_reg').on('submit',function(e) {
    e.preventDefault()
    const data =$(this).serialize()
    console.log(data);


    $.ajax({
        type:'POST',
        url: "/api/reguser",
        data,
        success:(res) => {
            console.log(res);
            const {message,status} = res
            if(status !== 0) return layer.msg(message)
            $('#link_login').click()
        }
    })
})


$('#form_login').on('submit',function(e) {
    e.preventDefault()
    
    const data =$(this).serialize()
    $.ajax({
        type:'POST',
        url: '/api/login',
        data,
        success:res =>{

            const {message,status,token} = res
            if(status !== 0) return layer.msg(message)
            localStorage.setItem("token",token);

            // 跳转到主页
            location.href = "/index.html";
        }
    })
})


    
 