import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {

  // Ensure post.likes is an array before mapping over it.
  // This handles cases where 'likes' might be null, undefined, or not an array initially.
  const likesList = post.likes && Array.isArray(post.likes) 
                    ? post.likes.map((user: Models.Document) => user.$id)
                    : []; // Default to empty array if 'likes' is not valid

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  // The primary fix: Add optional chaining at all points where a property
  // might be accessed on a potentially null or undefined object.
  // Specifically:
  // 1. currentUser?.save (as done before)
  // 2. record.post?.$id (new addition, as 'record.post' might be null within 'save' array)
  // 3. post?.$id (new addition, as 'post' prop itself could technically be null/undefined on initial render)
  const savedPostRecord = currentUser?.save?.find((record: Models.Document) => 
    record.post?.$id === post?.$id
  );

  useEffect(() => {
    // !!savedPostRecord correctly converts savedPostRecord (object or undefined) to boolean
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]); // Dependency array: Re-run if currentUser or savedPostRecord changes

  const checkIsLiked = (likesArray: string[], userId: string) => {
    return likesArray.includes(userId);
  };
  
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);
    
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    // Ensure post.$id is accessed safely here too, though 'post' is a prop
    // and expected to be present, adding '?' is defensive coding.
    if (post?.$id) { 
        likePost({ postId: post.$id, likesArray: newLikes });
    } else {
        console.warn("Post ID is missing for like action.");
    }
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      // Ensure savedPostRecord.$id is accessed safely
      if (savedPostRecord.$id) {
          deleteSavedPost(savedPostRecord.$id);
      } else {
          console.warn("Saved post record ID is missing for delete action.");
      }
    } else {
      // Ensure post.$id is accessed safely
      if (post?.$id && userId) { // Also check userId for completeness
          savePost({ postId: post.$id, userId });
          setIsSaved(true);
      } else {
          console.warn("Post ID or User ID is missing for save action.");
      }
    }
  };
  
  // Early return or loading state if 'post' is not yet available.
  // This is a common pattern for components that rely on props that might be
  // asynchronously loaded.
  if (!post) {
      return <div>Loading post stats...</div>; // Or null, or a skeleton loader
  }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={checkIsLiked(likes, userId) 
            ? "/assets/icons/liked.svg"
            : "/assets/icons/like.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved
            ? "/assets/icons/saved.svg"
            : "/assets/icons/save.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;