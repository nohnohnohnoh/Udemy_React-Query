import { useQuery, useMutation, useQueryClient } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["commnets", post.id],
    () => fetchComments(post.id)
  );

  const upDateMutation = useMutation(() => updatePost(post.id));

  const deleteMutation = useMutation(() => deletePost(post.id));

  if (isLoading) {
    return <h3>Comment Loading</h3>;
  }
  if (isError) {
    return <h3>Error, {error.toString()}</h3>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && <p>Error delete</p>}
      {deleteMutation.isLoading && <p>delete post...</p>}
      {deleteMutation.isSuccess && <p>Success post</p>}
      <button
        onClick={() =>
          upDateMutation.mutate({
            data: {
              title: "바꾸어라",
            },
          })
        }
      >
        Update title
      </button>
      {upDateMutation.isSuccess && <p>{data.title}</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
