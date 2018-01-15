$(document).ready(function(){
  $('.delete-showresult').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/showresults/'+id,
      success: function(response){
        alert('Deleting Upload Result ');
        window.location.href='/user/showuploadresulta';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

