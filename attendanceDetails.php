<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once $path."/attendanceapp/database/database.php";

class attendanceDetails
{
     public function saveAttendance($dbo,$session,$course,$fac,$student,$ondate,$status)
     {
        $rv=[-1];
        $c="insert into attendance_details
        (session_id,course_id,faculty_id,student_id,on_date,status)
        values
        (:session_id,:course_id,:faculty_id,:student_id,:on_date,:status)";
        $s=$dbo->conn->prepare($c);
        try{
              $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac,":student_id"=>$student,":on_date"=>$ondate,":status"=>$status]);
              $s->execute();
              $rv=[1];
        }
        catch(Exception $e)
        {
             //$rv=[$e->getMessage()];
             //it might happen that the entry is there, we just have to set reset the status
             $c="update attendance_details set status=:status
                where 
                session_id=:session_id and course_id=:course_id and faculty_id=:faculty_id
                and student_id=:student_id and on_date=:on_date";
                $s=$dbo->conn->prepare($c);
                try{
                    $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac,":student_id"=>$student,":on_date"=>$ondate,":status"=>$status]);
                    $s->execute();
                    $rv=[1];
                }
                catch(Exception $ee)
                {
                    $rv=[$e->getMessage()];
                }

        }
        return $rv;
     }
     public function getPresentListOfAClassByAFacOnADate($dbo,$session,$course,$fac,$ondate)
     {
        $rv=[];
        $c="select student_id from attendance_details 
        where session_id=:session_id and course_id=:course_id
        and faculty_id=:faculty_id and on_date=:on_date
        and status='YES'";
        $s=$dbo->conn->prepare($c);
        try
        {
            $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac,":on_date"=>$ondate]);
            $rv=$s->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(Exception $e)
        {

        }
        return $rv;
     }

     public function getAttenDanceReport($dbo,$session,$course,$fac)
     {
        $report=[];
        $sessionName='';
        $facname='';
        $courseName='';
        //get session fac and course names
        $c="select * from session_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$session]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $sessionName=$sd['year']." ".$sd['term'];
        }
        catch(Exception $e)
        {

        }

        $c="select * from faculty_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$fac]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $facname=$sd['name'];
        }
        catch(Exception $e)
        {

        }


        $c="select * from course_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$course]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $courseName=$sd['code']."-".$sd['title'];
        }
        catch(Exception $e)
        {

        }

        array_push($report,["Session:",$sessionName]);
        array_push($report,["Course:",$courseName]);
        array_push($report,["Faculty:",$facname]);

        //first get the total number of classses by the fac
        $total=0;
        $start='';
        $end='';
        $c="select distinct on_date from attendance_details where 
        session_id=:session_id and course_id=:course_id and faculty_id=:faculty_id
        order by on_date";
        $s=$dbo->conn->prepare($c);
        try{
          $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac]);
          $rv=$s->fetchAll(PDO::FETCH_ASSOC);
          $total=count($rv);
          if($total>0)
          {
            $start=$rv[0]['on_date'];
            $end=$rv[$total-1]['on_date'];
          }

        }
        catch(Exception $ee)
        {

        }
        
        array_push($report,["total",$total]);
        array_push($report,["start",$start]);
        array_push($report,["end",$end]);
        //get the number of attended classes for each registered student
        /*
        
        */
        $rv=[];
        $c="select rsd.id,rsd.roll_no,rsd.name,count(ad.on_date) as attended from 
        (
           select sd.id,sd.roll_no,sd.name,crd.session_id,
           crd.course_id from student_details as sd,course_registration as crd
           where sd.id=crd.student_id and crd.session_id=:session_id and 
           crd.course_id=:course_id
        ) as rsd left join attendance_details as ad 
        on rsd.id=ad.student_id AND
        rsd.session_id=ad.session_id and 
        rsd.course_id =ad.course_id
        and status='YES'
        and 
        ad.faculty_id=:faculty_id
        group by rsd.id;";
        $s=$dbo->conn->prepare($c);
        try{
          $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac]);
          $rv=$s->fetchAll(PDO::FETCH_ASSOC);
          
        }
        catch(Exception $ee)
        {

        }
         //compute the precent
        for($i=0;$i<count($rv);$i++)
        {
         $rv[$i]['percent']=0.00;
         if($total>0)
         {
            $rv[$i]['percent']=round($rv[$i]['attended']/$total*100.0,2);
         }
         $rv[$i]['id']=$i+1;
        }
        array_push($report,["slno","rollno","name","attended","percent"]);
        $report=array_merge($report,$rv);
        

        //return the result
        return $report;
     }

     public function getPresentDays($dbo,$session,$course,$fac,$sid)
     {
      $pd=[];
      $c="SELECT on_date FROM `attendance_details` WHERE session_id=:session and course_id=:course and faculty_id=:fac
      and student_id =:sid";
      $s=$dbo->conn->prepare($c);
      try{
       $s->execute([":session"=>$session,":course"=>$course,":fac"=>$fac,":sid"=>$sid]);
       $pd=$s->fetchAll(PDO::FETCH_ASSOC);       
      }
      catch(Exception $e)
      {

      }
      return $pd;
     }

     public function getDetailedAttenDanceReport($dbo,$session,$course,$fac)
     {
        $report=[];
        $boolAd=[];
        $sessionName='';
        $facname='';
        $courseName='';
        //get session fac and course names
        $c="select * from session_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$session]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $sessionName=$sd['year']." ".$sd['term'];
        }
        catch(Exception $e)
        {

        }

        $c="select * from faculty_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$fac]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $facname=$sd['name'];
        }
        catch(Exception $e)
        {

        }


        $c="select * from course_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$course]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $courseName=$sd['code']."-".$sd['title'];
        }
        catch(Exception $e)
        {

        }

        array_push($report,["Session:",$sessionName]);
        array_push($report,["Course:",$courseName]);
        array_push($report,["Faculty:",$facname]);
        
        $days=[];
        $students=[];
        $register=[];
        //Get dates on which classes were conducted
        $total=0;
        $start='';
        $end='';
        $c="select distinct on_date from attendance_details where 
        session_id=:session_id and course_id=:course_id and faculty_id=:faculty_id
        order by on_date";
        $s=$dbo->conn->prepare($c);
        try{
          $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac]);
          $days=$s->fetchAll(PDO::FETCH_ASSOC);
          $total=count($days);
          if($total>0)
          {
            $start=$days[0]['on_date'];
            $end=$days[$total-1]['on_date'];
          }

        }
        catch(Exception $ee)
        {

        }
        
        array_push($report,["total",$total]);
        array_push($report,["start",$start]);
        array_push($report,["end",$end]);
        
        //get the studentlist in the class
        $c='select sd.id,sd.roll_no,sd.name,crd.session_id,
        crd.course_id from student_details as sd,course_registration as crd
        where sd.id=crd.student_id and crd.session_id=:session_id and 
        crd.course_id=:course_id order by sd.roll_no';

        $s=$dbo->conn->prepare($c);
        try{
          $s->execute([":session_id"=>$session,":course_id"=>$course]);
          $students=$s->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(Exception $ee)
        {

        }
        
        //get attendance row for each student and pusgh to register
       
        //$boolAd=[];
        //array_push($boolAd,$days);
        $td=['slno','roll_no','name'];
        for($i=0;$i<count($days);$i++)
         { 
            array_push($td,$days[$i]['on_date']);
         }
         array_push($td,'attended','percent');
         array_push($boolAd,$td) ;
        for($si=0;$si<count($students);$si++)
        {
         $pd=$this->getPresentDays($dbo,$session,$course,$fac,$students[$si]['id']);
         $bpd=[($si+1),$students[$si]['roll_no'],$students[$si]['name']];

         $attended=0;
         for($i=0;$i<count($days);$i++)
         {
              for($j=0;$j<count($pd);$j++)
               {
                  if($days[$i]['on_date']==$pd[$j]['on_date'])
                  {
                     array_push($bpd,'P');
                     $attended++;
                     break;
                  }
               }
               if($j==count($pd))
               {
                  array_push($bpd,'A');
               }
               
         }
         $total=count($days);
         $percent=0;
         if ($total!=0)
         {
            $percent=round($attended/$total*100,2);
         }
         array_push($bpd,$attended,$percent);
         array_push($boolAd,$bpd);
      }
      //return $report;
      //$report=$boolAd;
      $report=array_merge($report,$boolAd);  
        //return the result
      return $report;
     }

     public function getJSONAttenDanceReport($dbo,$session,$course,$fac,$cuttoff=101)
     {
        $rjo=[];
        //get session fac and course names
        $c="select * from session_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$session]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $sessionName=$sd['year']." ".$sd['term'];
        }
        catch(Exception $e)
        {

        }

        $c="select * from faculty_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$fac]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $facname=$sd['name'];
        }
        catch(Exception $e)
        {

        }


        $c="select * from course_details where id=:id";
        $s=$dbo->conn->prepare($c);
        try{
         $s->execute([":id"=>$course]);
         $sd=$s->fetchAll(PDO::FETCH_ASSOC)[0];
         $courseName=$sd['code']."-".$sd['title'];
        }
        catch(Exception $e)
        {

        }

        //first get the total number of classses by the fac
        $total=0;
        $start='';
        $end='';
        $c="select distinct on_date from attendance_details where 
        session_id=:session_id and course_id=:course_id and faculty_id=:faculty_id
        order by on_date";
        $s=$dbo->conn->prepare($c);
        try{
          $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac]);
          $rv=$s->fetchAll(PDO::FETCH_ASSOC);
          $total=count($rv);
          if($total>0)
          {
            $start=$rv[0]['on_date'];
            $end=$rv[$total-1]['on_date'];
          }

        }
        catch(Exception $ee)
        {

        }
        $rjo["total"]=$total;
        $rjo["start"]=$start;
        $rjo["end"]=$end;

        //get the number of attended classes for each registered student
        /*
        
        */
        $rv=[];
        $c="select rsd.id,rsd.roll_no,rsd.name,rsd.email_id,count(ad.on_date) as attended from 
        (
           select sd.id,sd.roll_no,sd.name,sd.email_id,crd.session_id,
           crd.course_id from student_details as sd,course_registration as crd
           where sd.id=crd.student_id and crd.session_id=:session_id and 
           crd.course_id=:course_id
        ) as rsd left join attendance_details as ad 
        on rsd.id=ad.student_id AND
        rsd.session_id=ad.session_id and 
        rsd.course_id =ad.course_id
        and status='YES'
        and 
        ad.faculty_id=:faculty_id
        group by rsd.id;";
        $s=$dbo->conn->prepare($c);
        try{
          $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac]);
          $rv=$s->fetchAll(PDO::FETCH_ASSOC);
          
        }
        catch(Exception $ee)
        {

        }
         //compute the precent and filter based on it
         $trv=[];
         $j=0;
        for($i=0;$i<count($rv);$i++)
        {
         $rv[$i]['percent']=0.00;
         if($total>0)
         {
            $rv[$i]['percent']=round($rv[$i]['attended']/$total*100.0,2);
         }
         if($rv[$i]['percent']<$cuttoff)
         {
            $trv[$j]=$rv[$i];
            $trv[$j]['sent_count']=$this->getSentCount($dbo,$session,$course,$fac,$rv[$i]['id']);
            $j++;
         }
        }

        $rjo['studentlist']=$trv;

        //return the result
        return $rjo;
     }
     public function logSentEmail($dbo,$session,$course,$fac,$studentid,$message,$ondate,$to_email)
     {
      /*
      faculty_id int,
      course_id int,
      session_id int,
      student_id int,
      on_date date,
      id int auto_increment primary key,
      message varchar(200)
         */
      $rv=[-1];
      $c="insert into sent_email_details
      (session_id,course_id,faculty_id,student_id,on_date,message,to_email)
      values
      (:session_id,:course_id,:faculty_id,:student_id,:on_date,:message,:to_email)";
      $s=$dbo->conn->prepare($c);
      try{
            $s->execute([":session_id"=>$session,":course_id"=>$course,":faculty_id"=>$fac,":student_id"=>$studentid,":on_date"=>$ondate,":message"=>$message,"to_email"=>$to_email]);
            //$s->execute();
            $rv=[1];
      }
      catch(Exception $e)
      {
         
      }


     }

     public function getCourseName($dbo,$cid)
     {
      $name='';
      $c="select title from course_details where id=:id";
          $s=$dbo->conn->prepare($c);
          try{
             $s->execute([":id"=>$cid]);
             if($s->rowCount()>0)
             {
                 $result=$s->fetchAll(PDO::FETCH_ASSOC)[0];
                 $name=$result['title'];
             }
             else{
              //user name does not exists
              $name='';
             }
          }
          catch(PDOException $e)
          {

          }
          return $name;
     }

     public function getSentCount($dbo,$session,$course,$fac,$studentid)
     {
         /*
      faculty_id int,
      course_id int,
      session_id int,
      student_id int,
      on_date date,
      id int auto_increment primary key,
      message varchar(200)
         */
          $count=0;
          $c="select count(*) as count from sent_email_details where faculty_id=:fid and session_id=:sessionid and course_id=:courseid and student_id=:studentid ";
          $s=$dbo->conn->prepare($c);
          try{
            //$session,$course,$fac,$studentid
             $s->execute([":fid"=>$fac,":sessionid"=>$session,":courseid"=>$course,":studentid"=>$studentid]);
             if($s->rowCount()>0)
             {
                 $result=$s->fetchAll(PDO::FETCH_ASSOC)[0];
                 $count=$result['count'];
             }
             else{
              //user name does not exists
              $count=0;
             }
          }
          catch(PDOException $e)
          {

          }
          return $count;
     }
   }
?>