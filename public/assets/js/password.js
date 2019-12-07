//绑定事件

// function serializeObj(form){
//     let arr = form.serializeArray();
//     let obj = {};
//     arr.forEach((item)=>{
//         obj[item.name]=item.value;
//     })
//     return obj;
// }

$('#newPassword').on('submit',function(e){
   
    let obj = $(this).serialize();
    //todo加上密码长度校验,首字母大写

    $.ajax({
        url:'/users/password',
        type:'put',
        data:obj,
        success:function(data){
            location.href='/admin/login.html';
        },
        error:function(err){
            console.log(err.message);
        }
    })
    return false;
})