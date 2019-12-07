
function serializeObj(form){
    let arr = form.serializeArray();
    let obj = {};
    arr.forEach((item)=>{
        obj[item.name]=item.value;
    })
    return obj;
}

$('#userForm').on('submit',function(){
    let obj = serializeObj($(this));
    if(obj.id){
        
    }
    $.ajax({
        type: 'post',
        url: '/users',
        data: obj,
        success: function(result) {
            // console.log(result);
            location.reload();
        },
        error:function(){
            alert('新增用户失败了')
        }
    })
    // console.log(obj)
    return false;
})

/*
*文件上传代码
*/
$('#avatar').on('change',function(){
    let formData = new FormData();
    //console.log(this.files[0])
    formData.append('avatar',this.files[0]);
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res);
            let url = res[0].avatar;
            $('#preview').attr('src',url);
            //设置隐藏域
            $('#hiddenInput').val(url);
        }
    })
})

//获取用户数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(data){
        //console.log(data);
        let html = template('tpl',{user:data});
        $('#tbody').append(html)
    }
})

//用户编辑功能

$('#tbody').on('click','.bianji',function(){
    let id = $(this).attr('data-id')
    $.ajax({
        type:'PUT',
        url:'/users/'+id ,
        success:function(res){
            console.log(res);
            let html = template('tpt',res);
            $('#modifyBox').html(html)
        }
    })
})

//用户删除功能
$('#tbody').on('click','.delete',function(){
    let id = $(this).attr('data-id');
    if(confirm('你确认要删除吗')){
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})

//全选相关

$('#quanxuan').on('change',function(){
    let isQuanxuan = this.checked;//全选框状态
    //alert(isQuanxuan)
    if(isQuanxuan){
        $('#sc').show(100);
    }else{
        $('#sc').hide(100);
    }
    $('.xs').prop('checked',isQuanxuan);
})

//单选变全选

$('#tbody').on('change','.xs',function(){
    //获取所有用户
    let inputs = $('#tbody').find('.xs');
    if(inputs.length==inputs.filter(':checked').length){
        $('#quanxuan').prop('checked',true);
    }else {
        $('#quanxuan').prop('checked',false);
    }
    //如果选中的复选框数量大于0 说明有选中的复选框
    if(inputs.filter(':checked').length>0){
        $('#sc').show(100);
    }else {
        $('#sc').hide(100);
    }
});


//实现批量删除
$('#sc').on('click',function(){
    let ids =[];
    let checkUser = $('#tbody').find('input').filter(':checked');
    //循环复选框
    checkUser.each(function(idx,ele){
       ids.push($(ele).attr('data-id'));
    })
    if(confirm('您真的确认执行批量删除操作吗?')){
        $.ajax({
            type:'DELETE',
            url:'/users/'+ ids.join('-'),
            success:function(){
                location.reload();
            }
        })
    }
})