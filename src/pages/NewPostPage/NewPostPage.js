import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPosts } from "../../WebAPI";
import { BASE_URL } from "../../WebAPI";
const NewPostContainer = styled.form``;
const PostTextArea = styled.textarea`
  width: 500px;
  height: 300px;
  display: block;
`;

const Title = styled.div``;
const PostButton = styled.button``;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postError, setPostError] = useState("");

  const navigate = useNavigate();

  const PostNew = () => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok !== 1) {
          setPostError(data.message);
        }
        console.log(data);
        navigate("/");
      });
  };
  const handlePost = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("尚未填寫標題");
      return;
    } else if (body === "") {
      alert("尚未填寫文章內容");
      return;
    }
    PostNew();
  };
  return (
    <NewPostContainer>
      <Title>
        標題:
        <input
          title={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Title>

      <PostTextArea
        body={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      ></PostTextArea>
      <PostButton onClick={handlePost}>發布文章</PostButton>
      {postError}
    </NewPostContainer>
  );
}
