<?php
session_start();
    if(isset($_SESSION["current_user"]))
        {
          $facid=$_SESSION["current_user"];
        }
    else{
        header("location:"."/attendanceapp/login.php");
        die();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/attendance.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <title>AttendanceApp</title>
</head>
<body>
    <!--<h1>Hello</h1>     
    <button id="btnLogout">LOGOUT</button>-->
     <div class="page">
        <div class="header-area">
            <div class="logo-area"> <h2 class="logo">ATTENDANCE APP</h2></div>
            <div class="logout-area"><button class="button" id="btnLogout">LOGOUT</button></div>
        </div>
        <div class="session-area">
              <div class="label-area"><label>SESSION</label></div>
              <div class="dropdown-area">
                <select class="ddlclass" id="ddlclass">
                   <!-- <option>SELECT ONE</option>
                    <option>2023 AUTUMN</option>
                    <option>2023 SPRING</option>-->
                </select>
              </div>
        </div>

        <div class="classlist-area" id="classlistarea">
          <!--<div class="classcard">CS101</div>
          <div class="classcard">CS101</div>
          <div class="classcard">CS101</div>
          <div class="classcard">CS101</div>
          <div class="classcard">CS101</div>
          <div class="classcard">CS101</div>
          <div class="classcard">CS101</div>-->
        </div>

        <div class="classdetails-area" id="classdetailsarea">
            <!--<div class="classdetails">
                <div class="code-area">CS101</div>
                <div class="title-area">INTRODUCTION TO SCIENTIFIC COMPUTING</div>
                <div class="ondate-area">
                    <input type="date">
                </div>
            </div>-->
        </div>
        
        <div class="studentlist-area" id="studentlistarea">
            <!--<div class="studenttlist"><label>STUDENT LIST</label></div>
            <div class="studentdetails">
                <div class="slno-area">001</div>
                <div class="rollno-area">CSB21001</div>
                <div class="name-area">PRAKASH KUMAR CHAUHAN</div>
                <div class="checkbox-area">
                    <input type="checkbox">
                </div>
            </div>

            <div class="studentdetails">
                <div class="slno-area">001</div>
                <div class="rollno-area">CSB21001</div>
                <div class="name-area">PRAKASH KUMAR CHAUHAN</div>
                <div class="checkbox-area">
                    <input type="checkbox">
                </div>
            </div>

            <div class="studentdetails">
                <div class="slno-area">001</div>
                <div class="rollno-area">CSB21001</div>
                <div class="name-area">PRAKASH KUMAR CHAUHAN</div>
                <div class="checkbox-area">
                    <input type="checkbox">
                </div>
            </div>

            <div class="studentdetails">
                <div class="slno-area">001</div>
                <div class="rollno-area">CSB21001</div>
                <div class="name-area">PRAKASH KUMAR CHAUHAN</div>
                <div class="checkbox-area">
                    <input type="checkbox">
                </div>
            </div>

            <div class="studentdetails">
                <div class="slno-area">001</div>
                <div class="rollno-area">CSB21001</div>
                <div class="name-area">PRAKASH KUMAR CHAUHAN</div>
                <div class="checkbox-area">
                    <input type="checkbox">
                </div>
            </div>

            <div class="studentdetails">
                <div class="slno-area">001</div>
                <div class="rollno-area">CSB21001</div>
                <div class="name-area">PRAKASH KUMAR CHAUHAN</div>
                <div class="checkbox-area">
                    <input type="checkbox">
                </div>
            </div>

            <div class="studentdetails">
                <div class="slno-area">001</div>
                <div class="rollno-area">CSB21001</div>
                <div class="name-area">PRAKASH KUMAR CHAUHAN</div>
                <div class="checkbox-area">
                    <input type="checkbox">
                </div>
            </div>
           -->
           
        </div>

       

     </div>
     <div id="overlay" style="display:none;">
        <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;"></div>
        <br />
        Please wait...
     </div>

     <input type="hidden" id="hiddenFacId" value=<?php echo($facid) ?>>
     <input type="hidden" id="hiddenSelectedCourseID" value=-1>

    <script src="js/jquery.js"></script>
    <script src="js/attendance.js"></script>
    <!--renamed the files just to keep the filenames
    similar, nothing more than that-->
</body>
</html>