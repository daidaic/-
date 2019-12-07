$('#addto').on('submit',function(){
    //获取表单内容
    let formData = $(this).serialize();
    //xiangfuwuqi
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
})

//发送ajax请求  向服务器所有分类列表数据

$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        //console.log(res);
        let html = template('tl',{data:res});
        $('#tbody').html(html);
    }
})

//添加编辑功能
$('tbody').on('click','.bj',function(){
    let id = $(this).attr('data-id');
    //根据id获取分类数据的详细信息
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
            //console.log(res)
            let html = template('tt',res);
            //console.log(html)
            $('#big').html(html)
        }
    })
})

//修改提交事件

$('#big').on('submit','#xgto',function(){
    let formData = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
})


//实现删除功能

$('#tbody').on('click','.del',function(){
    if(confirm('确定要删除此元素嘛?')){
        let id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})