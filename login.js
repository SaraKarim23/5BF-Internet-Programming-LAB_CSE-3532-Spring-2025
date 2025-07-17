
function tryLogin()
{
    let un=$("#txtUsername").val();
    let pw=$("#txtPassword").val();
    if(un.trim()!=="" && pw.trim()!="")
    {
       //make an ajax call
       $.ajax({
        url:"ajaxhandler/loginAjax.php",
        type:"POST",
        dataType:"json",
        data:{user_name:un,password:pw,action:"verifyUser"},
        beforeSend:function(){
            //if you want to do something just 
            //before making the call
            //alert("about to make an ajax call");
            $("#diverror").removeClass("applyerrordiv");
            $("#lockscreen").addClass("applylockscreen");
            
            //$("#errormessage").text("");
        },
        success:function(rv){
            //if the ajax call was successful, 
            //result will be in rv
            //alert(JSON.stringify(rv));
            $("#lockscreen").removeClass("applylockscreen");
            if(rv['status']=="ALL OK")
            {
                document.location.replace("attendance.php");
            }
            else{
                //alert(rv['status']);
                $("#diverror").addClass("applyerrordiv");
                $("#errormessage").text(rv['status']);
            }
        },
        error:function(){
            //if for some reason the call was unsuccessful
            alert("oops something went wrong");
        },
       });
    }
}
//do everything only when the document is loaded
$(function(e){
    //capture the keyup event
    $(document).on("keyup","input",function(e){
        $("#diverror").removeClass("applyerrordiv");
        //$("#errormessage").text("");
        let un=$("#txtUsername").val();
        let pw=$("#txtPassword").val();
        if(un.trim()!=="" && pw.trim()!=="")
        {
          $("#btnLogin").removeClass("inactivecolor");
          $("#btnLogin").addClass("activecolor");
        }
        else{
            $("#btnLogin").removeClass("activecolor");
            $("#btnLogin").addClass("inactivecolor");
        }
    }); 
    $(document).on("click","#btnLogin",function(e){
        tryLogin();
    });
});