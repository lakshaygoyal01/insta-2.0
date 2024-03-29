import {
  BookmarkIcon,
  ChatIcon,
  TrashIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session }: { data: any } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [popUp, setPopUp] = useState(false);

  console.log("session", session);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", id));
  };

  const deleteComment = async (commentId) => {
    await deleteDoc(doc(db, "posts", id, "comments", commentId));
    console.log("Comment deleted successfully");
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  return (
    <div className='bg-white my-7 border rounded-sm'>
      {/* Header */}
      <div className='flex items-center p-5 border-b'>
        <img
          src={userImg}
          className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
          alt=''
        />
        <p className='flex-1 font-bold'>{username}</p>

        <div
          onClick={handlePopUp}
          style={{ cursor: "pointer", display: "flex", position: "relative" }}
        >
          <DotsHorizontalIcon className='h-5' />{" "}
          {popUp && session?.user?.username === username && (
            <div className={`absolute top-4 right-0 bg-white w-20 shadow-lg py-2 rounded-xl transition duration-100 ease-in `}>
              <button
                onClick={deletePost}
                className=' flex  text-red-400 justify-center text-sm hover:bg-gray-100 w-full'
              >
                <p>Delete</p> <TrashIcon className='h-5 ml-2 ' />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* img */}
      <img src={img} className='object-cover w-full border-b' alt='' />

      {/* Buttons */}
      <div className='flex justify-between px-4 pt-4'>
        <div className='flex space-x-4'>
          {hasLiked ? (
            <HeartIconFilled onClick={likePost} className='btn text-red-600' />
          ) : (
            <HeartIcon onClick={likePost} className='btn' />
          )}

          <ChatIcon className='btn' />
          <PaperAirplaneIcon className='btn rotate-45' />
        </div>
        <BookmarkIcon className='btn' />
      </div>

      {/* captions */}
      <p className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-1'>{likes.length} likes</p>
        )}
        <span className='font-bold mr-1'>{username}</span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex items-center space-x-2 mb-3'>
              <img
                className='h-7 rounded-full'
                src={comment.data().userImage}
                alt=''
              />
              <p className='text-sm flex-1'>
                <span className='font-bold'>{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment fromNow className='text-xs pr-2'>
                {comment.data().timestamp?.toDate()}
              </Moment>
              {session?.user?.username === comment.data().username && (
                <button
                  onClick={() => deleteComment(comment.id)}
                  value={comment.id}
                  className='text-red-400 pr-1'
                >
                  <TrashIcon className='h-5' />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* input box */}

      <form className='flex items-center p-4'>
        <EmojiHappyIcon className='h-7' />
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Add a comment...'
          className='border-none flex-1 outline-none focus:ring-0'
        />
        <button
          type='submit'
          disabled={!comment.trim()}
          onClick={sendComment}
          className='font-semibold text-blue-400'
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
