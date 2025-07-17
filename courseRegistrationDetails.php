<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once $path."/attendanceapp/database/database.php";
class CourseRegistrationDetails
{
    public function getRegisteredStudents($dbo,$sessionid,$courseid)
    {
        $rv=[];
         $c="select sd.id,sd.roll_no,sd.name from student_details
          as sd,
         course_registration as crg
          where crg.student_id=sd.id and 
          crg.session_id=:sessionid and 
          crg.course_id=:courseid";
        $s=$dbo->conn->prepare($c);
        try{
        $s->execute([":sessionid"=>$sessionid,":courseid"=>$courseid]);
        $rv=$s->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(Exception $e)
        {

        }
        return $rv;
    }
}
?>