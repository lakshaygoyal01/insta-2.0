import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

// const posts = [
//   {
//     id: "123",
//     username: "pikachu",
//     userImg: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png",
//     img: "https://wallpaperaccess.com/full/20999.jpg",
//     caption:
//       "SUBSCRIBE AND DESTORY THE LIKE BUTTON FOR THE YOUTUBE ALGORITHM, YOU GUYS ARE SICK...! ",
//   },
//   {
//     id: "123",
//     username: "pikachu",
//     userImg: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png",
//     img: "https://feeds.abplive.com/onecms/images/uploaded-images/2022/12/17/41e1d20510ab520fdd6d9e7cdacd654a1671267668610557_original.png?impolicy=abp_cdn&imwidth=650",
//     caption:
//       "SUBSCRIBE AND DESTORY THE LIKE BUTTON FOR THE YOUTUBE ALGORITHM, YOU GUYS ARE SICK...! ",
//   },
// ];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  // console.log(posts);
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setPosts(snapshot.docs);
  //     }
  //   );

  // return () => {
  //   unsubscribe();
  // };

  // return onSnapshot(
  //   query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //   (snapshot) => {
  //     setPosts(snapshot.docs);
  //   }
  // );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
