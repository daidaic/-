$('#loginOut').on('click',function(){
    //做一个二次确认
    let isConfirm = confirm('你确认要退出吗');
    if(isConfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(){
          location.href='/admin/login.html'
        },
        error:function(){
          alert('退出失败');
        }
      })
    }
  })