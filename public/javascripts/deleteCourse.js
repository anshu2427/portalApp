$(document).ready(function(){
  $('.delete-course').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/coursedetails1/'+id,
      success: function(response){
        alert('Deleting Course ');
        window.location.href='/showcourse';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

