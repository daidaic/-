//获取文章分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        console.log(res)
    }
})