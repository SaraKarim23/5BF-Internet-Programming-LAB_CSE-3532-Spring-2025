<?php
include '../components/connect.php';

if(isset($_COOKIE['user_id'])){
   $user_id = $_COOKIE['user_id'];
}else{
   $user_id = '';
}

if(isset($_GET['get_id'])){
   $get_id = $_GET['get_id'];
}else{
   header('location:online_home.php');
   exit;
}

if(isset($_POST['like_content']) && $user_id != ''){
   $content_id = filter_var($_POST['content_id'], FILTER_SANITIZE_STRING);
   $check_like = $conn->prepare("SELECT * FROM likes WHERE user_id = ? AND content_id = ?");
   $check_like->execute([$user_id, $content_id]);

   if($check_like->rowCount() > 0){
      $conn->prepare("DELETE FROM likes WHERE user_id = ? AND content_id = ?")->execute([$user_id, $content_id]);
      $message[] = 'Like removed.';
   } else {
      $get_tutor = $conn->prepare("SELECT tutor_id FROM content WHERE id = ?");
      $get_tutor->execute([$content_id]);
      $tutor_id = $get_tutor->fetchColumn();
      $conn->prepare("INSERT INTO likes(user_id, tutor_id, content_id) VALUES(?,?,?)")->execute([$user_id, $tutor_id, $content_id]);
      $message[] = 'Liked!';
   }
}


if(isset($_POST['add_comment']) && $user_id != ''){
   $id = unique_id();
   $comment = filter_var($_POST['comment_box'], FILTER_SANITIZE_STRING);
   $content_id = filter_var($_POST['content_id'], FILTER_SANITIZE_STRING);

   $get_tutor = $conn->prepare("SELECT tutor_id FROM content WHERE id = ?");
   $get_tutor->execute([$content_id]);
   $tutor_id = $get_tutor->fetchColumn();

   $duplicate = $conn->prepare("SELECT * FROM comments WHERE content_id = ? AND user_id = ? AND comment = ?");
   $duplicate->execute([$content_id, $user_id, $comment]);

   if($duplicate->rowCount() > 0){
      $message[] = 'Comment already exists!';
   } else {
      $conn->prepare("INSERT INTO comments(id, content_id, user_id, tutor_id, comment) VALUES(?,?,?,?,?)")->execute([$id, $content_id, $user_id, $tutor_id, $comment]);
      $message[] = 'Comment added!';
   }
}

if(isset($_POST['delete_comment'])){
   $comment_id = filter_var($_POST['comment_id'], FILTER_SANITIZE_STRING);
   $conn->prepare("DELETE FROM comments WHERE id = ?")->execute([$comment_id]);
   $message[] = 'Comment deleted.';
}

if(isset($_POST['update_now'])){
   $comment_id = filter_var($_POST['update_id'], FILTER_SANITIZE_STRING);
   $new_comment = filter_var($_POST['update_box'], FILTER_SANITIZE_STRING);

   $check = $conn->prepare("SELECT * FROM comments WHERE id = ? AND comment = ?");
   $check->execute([$comment_id, $new_comment]);

   if($check->rowCount() > 0){
      $message[] = 'No change made.';
   } else {
      $conn->prepare("UPDATE comments SET comment = ? WHERE id = ?")->execute([$new_comment, $comment_id]);
      $message[] = 'Comment updated!';
   }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Watch Video</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
   <link rel="stylesheet" href="style.css">
</head>
<body>

<?php include '../components/user_header.php'; ?>

<?php

if(isset($_POST['edit_comment'])){
   $comment_id = filter_var($_POST['comment_id'], FILTER_SANITIZE_STRING);
   $stmt = $conn->prepare("SELECT * FROM comments WHERE id = ? LIMIT 1");
   $stmt->execute([$comment_id]);
   if($stmt->rowCount() > 0){
      $comment_data = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<section class="edit-comment">
   <h1 class="heading">Edit Comment</h1>
   <form method="post">
      <input type="hidden" name="update_id" value="<?= $comment_data['id']; ?>">
      <textarea name="update_box" class="box" required maxlength="1000"><?= $comment_data['comment']; ?></textarea>
      <div class="flex">
         <a href="watch_video.php?get_id=<?= $get_id; ?>" class="inline-option-btn">Cancel</a>
         <input type="submit" name="update_now" value="Update" class="inline-btn">
      </div>
   </form>
</section>
<?php
   }
}
?>

<section class="watch-video">
<?php
$video_q = $conn->prepare("SELECT * FROM content WHERE id = ? AND status = 'active'");
$video_q->execute([$get_id]);

if($video_q->rowCount() > 0){
   $video = $video_q->fetch(PDO::FETCH_ASSOC);

   $content_id = $video['id'];
   $likes = $conn->prepare("SELECT COUNT(*) FROM likes WHERE content_id = ?");
   $likes->execute([$content_id]);
   $total_likes = $likes->fetchColumn();

   $is_liked = $conn->prepare("SELECT * FROM likes WHERE user_id = ? AND content_id = ?");
   $is_liked->execute([$user_id, $content_id]);

   $tutor_q = $conn->prepare("SELECT * FROM tutors WHERE id = ? LIMIT 1");
   $tutor_q->execute([$video['tutor_id']]);
   $tutor = $tutor_q->fetch(PDO::FETCH_ASSOC);
?>
   <div class="video-details">
      <?php if($video['video_type'] == 'youtube'): ?>
         <iframe width="100%" height="500" class="video" src="<?= $video['video']; ?>" frameborder="0" allowfullscreen></iframe>
      <?php else: ?>
         <video src="../uploaded_files/<?= $video['video']; ?>" class="video" poster="../uploaded_files/<?= $video['thumb']; ?>" controls autoplay></video>
      <?php endif; ?>

      <h3 class="title"><?= $video['title']; ?></h3>
      <div class="info">
         <p><i class="fas fa-calendar"></i><span><?= $video['date']; ?></span></p>
         <p><i class="fas fa-heart"></i><span><?= $total_likes; ?> likes</span></p>
      </div>
      <div class="tutor">
         <img src="../uploaded_files/<?= $tutor['image']; ?>" alt="">
         <div>
            <h3><?= $tutor['name']; ?></h3>
            <span><?= $tutor['profession']; ?></span>
         </div>
      </div>
      <form method="post" class="flex">
         <input type="hidden" name="content_id" value="<?= $content_id; ?>">
         <a href="playlist.php?get_id=<?= $video['playlist_id']; ?>" class="inline-btn">View Playlist</a>
         <button type="submit" name="like_content">
            <?php if($is_liked->rowCount() > 0): ?>
               <i class="fas fa-heart"></i><span>Liked</span>
            <?php else: ?>
               <i class="far fa-heart"></i><span>Like</span>
            <?php endif; ?>
         </button>
      </form>
      <div class="description"><p><?= $video['description']; ?></p></div>
   </div>
<?php } else {
   echo '<p class="empty">Video not found!</p>';
} ?>
</section>

<section class="comments">
   <h1 class="heading">Add a comment</h1>
   <form method="post" class="add-comment">
      <input type="hidden" name="content_id" value="<?= $get_id; ?>">
      <textarea name="comment_box" required placeholder="Write your comment..." maxlength="1000" cols="30" rows="10"></textarea>
      <input type="submit" value="Add Comment" name="add_comment" class="inline-btn">
   </form>

   <h1 class="heading">User comments</h1>
   <div class="show-comments">
<?php
$comments_q = $conn->prepare("SELECT * FROM comments WHERE content_id = ?");
$comments_q->execute([$get_id]);
if($comments_q->rowCount() > 0){
   while($comment = $comments_q->fetch(PDO::FETCH_ASSOC)){
      $user_q = $conn->prepare("SELECT * FROM users WHERE id = ?");
      $user_q->execute([$comment['user_id']]);
      $commentor = $user_q->fetch(PDO::FETCH_ASSOC);
?>
      <div class="box" style="<?= ($comment['user_id'] == $user_id) ? 'order:-1;' : ''; ?>">
         <div class="user">
            <img src="../uploaded_files/<?= $commentor['image']; ?>" alt="">
            <div>
               <h3><?= $commentor['name']; ?></h3>
               <span><?= $comment['date']; ?></span>
            </div>
         </div>
         <p class="text"><?= $comment['comment']; ?></p>
         <?php if($comment['user_id'] == $user_id): ?>
         <form method="post" class="flex-btn">
            <input type="hidden" name="comment_id" value="<?= $comment['id']; ?>">
            <button type="submit" name="edit_comment" class="inline-option-btn">Edit</button>
            <button type="submit" name="delete_comment" class="inline-delete-btn" onclick="return confirm('Delete this comment?');">Delete</button>
         </form>
         <?php endif; ?>
      </div>
<?php }} else {
   echo '<p class="empty">No comments yet!</p>';
} ?>
   </div>
</section>

<script src="script.js"></script>
</body>
</html>
