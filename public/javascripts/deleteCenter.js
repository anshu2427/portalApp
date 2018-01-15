// deleting script

$(document).ready(function(){
  $('.delete-center').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/centerdetails1/'+id,
      success: function(response){
        alert('Deleting Center/Branch');
        window.location.href='/showcenters';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
