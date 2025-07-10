<?php

include '../components/connect.php';

if(isset($_COOKIE['tutor_id'])){
   $tutor_id = $_COOKIE['tutor_id'];
}else{
   $tutor_id = '';
   header('location:login.php');
}


function convertToEmbed($url){
   if(strpos($url, 'watch?v=') !== false){
      return str_replace("watch?v=", "embed/", $url);
   } elseif(strpos($url, 'youtu.be/') !== false){
      return str_replace("youtu.be/", "www.youtube.com/embed/", $url);
   }
   return $url;
}

if(isset($_POST['submit'])){

   $id = unique_id();
   $status = filter_var($_POST['status'], FILTER_SANITIZE_STRING);
   $title = filter_var($_POST['title'], FILTER_SANITIZE_STRING);
   $description = filter_var($_POST['description'], FILTER_SANITIZE_STRING);
   $playlist = filter_var($_POST['playlist'], FILTER_SANITIZE_STRING);

   $youtube_link = $_POST['youtube_link'] ?? '';
   $youtube_link = filter_var($youtube_link, FILTER_SANITIZE_URL);

   $thumb = $_FILES['thumb']['name'];
   $thumb = filter_var($thumb, FILTER_SANITIZE_STRING);
   $thumb_ext = pathinfo($thumb, PATHINFO_EXTENSION);
   $rename_thumb = unique_id().'.'.$thumb_ext;
   $thumb_size = $_FILES['thumb']['size']; 
   $thumb_tmp_name = $_FILES['thumb']['tmp_name'];
   $thumb_folder = '../uploaded_files/'.$rename_thumb;

   $video_type = 'file';
   $rename_video = '';

   if(!empty($youtube_link)){
      $rename_video = convertToEmbed($youtube_link);  
      $video_type = 'youtube';
   }else{
      $video = $_FILES['video']['name'];
      $video = filter_var($video, FILTER_SANITIZE_STRING);
      $video_ext = pathinfo($video, PATHINFO_EXTENSION);
      $rename_video = unique_id().'.'.$video_ext;
      $video_tmp_name = $_FILES['video']['tmp_name'];
      $video_folder = '../uploaded_files/'.$rename_video;
   }

   if($thumb_size > 2000000){
      $message[] = 'image size is too large!';
   }else{

      $add_content = $conn->prepare("INSERT INTO `content`(id, tutor_id, playlist_id, title, description, video, thumb, status, video_type) VALUES(?,?,?,?,?,?,?,?,?)");
      $add_content->execute([$id, $tutor_id, $playlist, $title, $description, $rename_video, $rename_thumb, $status, $video_type]);

      move_uploaded_file($thumb_tmp_name, $thumb_folder);

      if($video_type == 'file'){
         move_uploaded_file($video_tmp_name, $video_folder);
      }

      $message[] = 'new content uploaded!';
   }

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Upload Content</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
   <link rel="stylesheet" href="admin_style.css">
</head>
<body> 

<?php include '../components/admin_header.php'; ?> 

<section class="video-form">

   <h1 class="heading">Upload Content</h1>

   <form action="" method="post" enctype="multipart/form-data">
      <p>Video status <span>*</span></p>
      <select name="status" class="box" required>
         <option value="" selected disabled>-- Select status --</option>
         <option value="active">Active</option>
         <option value="deactive">Deactive</option>
      </select>

      <p>Video title <span>*</span></p>
      <input type="text" name="title" maxlength="100" required placeholder="Enter video title" class="box">

      <p>Video description <span>*</span></p>
      <textarea name="description" class="box" required placeholder="Write description" maxlength="1000" cols="30" rows="10"></textarea>

      <p>Video playlist <span>*</span></p>
      <select name="playlist" class="box" required>
         <option value="" disabled selected>-- Select playlist --</option>
         <?php
         $select_playlists = $conn->prepare("SELECT * FROM `playlist` WHERE tutor_id = ?");
         $select_playlists->execute([$tutor_id]);
         if($select_playlists->rowCount() > 0){
            while($fetch_playlist = $select_playlists->fetch(PDO::FETCH_ASSOC)){
               echo '<option value="'.$fetch_playlist['id'].'">'.$fetch_playlist['title'].'</option>';
            }
         }else{
            echo '<option value="" disabled>No playlist created yet!</option>';
         }
         ?>
      </select>

      <p>Thumbnail image <span>*</span></p>
      <input type="file" name="thumb" accept="image/*" required class="box">

      <p>Upload video file (optional)</p>
      <input type="file" name="video" accept="video/*" class="box">

      <p>OR YouTube video link</p>
      <input type="url" name="youtube_link" placeholder="https://youtu.be/yourvideoid" class="box">

      <input type="submit" value="Upload Video" name="submit" class="btn">
   </form>

</section>

<script src="admin_script.js"></script>
</body>
</html>
