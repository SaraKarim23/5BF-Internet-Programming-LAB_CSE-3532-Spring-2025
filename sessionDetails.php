<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once $path."/attendanceapp/database/database.php";
class SessionDetails
{
    public function getSessions($dbo)
        //this database connection will be 
        //received as an argument
        {
        $rv=[];
        $c="select * from session_details order by id desc";   
        $s=$dbo->conn->prepare($c);
        try{
            $s->execute();
            $rv=$s->fetchAll(PDO::FETCH_ASSOC);//get the result in the form of an associative array

        }
        catch(Exception $e)
        {

        }
        return $rv;
        }
}
?>