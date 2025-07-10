import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
  useGetPosts,
} from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { data: post, isPending } = useGetPostById(id!);
  const { data: allPosts, isPending: isPostsLoading } = useGetPosts();

  // const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  
  const { mutate: deletePost } = useDeletePost({
  onSuccess: () => {
    navigate("/"); 
  },
});


  const handleDeletePost = () => {
    if (!post) return;
    deletePost({ postId: post.$id, imageId: post.imageId });
  };

  // ✅ Filter related posts (excluding current)
  // useEffect(() => {
  //   if (allPosts?.documents && post) {
  //     const filtered = allPosts.documents.filter((p) => p.$id !== post.$id);
  //     setRelatedPosts(filtered);
  //   }
  // }, [allPosts, post]);

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3 subtle-semibold lg:small-regular">
                    <p>{timeAgo(post?.$createdAt!)}</p>-<p>{post?.location}</p>
                  </div>
                </div>
              </Link>
              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post!} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      {/* <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />
        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
        {isPending || isPostsLoading ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div> */}
    </div>
  );
};

export default PostDetails;


// const PostDetails = () => {
//   return (
//     <div>PostDetails</div>
//   )
// }

// export default PostDetails