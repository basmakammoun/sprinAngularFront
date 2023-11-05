
function deleteAjax(cin) {
    console.log("mcha")
    jQuery('#delete-ajax').on('click', function () {
    console.log("mcha el click")

        /*var Status = $(this).val();
        $.ajax({
            url: "http://localhost:8080/clients/delete-ajax",
            type: "GET",
            data: { 'cin': cin },
            success: function () {
              swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  }).then(() => {
                    $("#" + cin).remove(); // Remove the element only after successful deletion
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
            }
          });*/
    });

}
   
       
