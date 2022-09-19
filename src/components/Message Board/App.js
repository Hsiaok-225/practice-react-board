import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const API_ENDPOINT = "https://student-json-api.lidemy.me/comments";

const Page = styled.div`
  width: 350px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
`;

const MessageForm = styled.form`
  margin-top: 16px;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
`;

const MessageTextArea = styled.textarea`
  width: 350px;
  display: block;
`;

const MessageList = styled.div`
  margin-top: 16px;
`;

const MessageContainer = styled.div`
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;

  & + & {
    margin-top: 8px;
  }
`;

const MessageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const MessageBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageContent = styled.div`
  margin-top: 12px;
  font-size: 16px;
`;

const MessageDeleteButton = styled.button`
  background-color: orange;
  color: white;
  border: 0px;
  border-radius: 4px;
  margin-top: 12px;
  cursor: pointer;
`;

const MessageAuthor = styled.div`
  color: rgba(50, 20, 70, 0.6);
  font-size: 16px;
`;

const MessageTime = styled.div`
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  margin-top: 16px;
`;

const IsLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Message({ author, time, handleDeleteMessage, message, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>
        <MessageContent>{children}</MessageContent>
        <MessageDeleteButton
          onClick={() => {
            handleDeleteMessage(message.id);
          }}
        >
          刪除
        </MessageDeleteButton>
      </MessageBody>
    </MessageContainer>
  );
}

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node,
  handleDeleteMessage: PropTypes.func,
  message: PropTypes.object,
};

/*  
    -新增留言-
      -handleFormSubmit
        1. submit > e.preventDefult
        2. fetch("POST") > 
            -success-
        3. setMessages < fetch("data")
        4. setValue('')
        5. re-render

      -useEffect
        1. fetch data > setMessages(gata)
        2. setMessageApiError

    -刪除留言-
      -handleDeleteMessage-
        *Q* fetch DELETE method 送過去後 > 就會直接刪掉(整個頁面)內容 ?

        1. fetch(url+id, {DELETE}method)
            -success-
        2. setMessage

    -錯誤處理-
      1. 載入時 > 如 fetchMessages 為空, 顯示 No message
      2. fetch API失敗, 顯示Something went wrong. return apiError err.message
      3. fetch POST失敗, return postError.message
      4. onFocus, 取消 postError.message
      5. 送出表單後(回傳結果前)連續送出會 return, 不會再次送出

 */

function App() {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState();

  const [messageApiError, setMessageApiError] = useState(null);
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);

  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };

  const handleTextareaFocus = (e) => {
    setPostMessageError(null);
  };

  const handleDeleteMessage = (id) => {
    //利用網址來刪除指定 id
    fetch(API_ENDPOINT + "/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        //更新本地 Messages
        setMessages(messages.filter((message) => message.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        console.log(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isLoadingPostMessage) {
      return;
    }
    setIsLoadingPostMessage(true);
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "hsi",
        body: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPostMessage(false);
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        fetchMessages();
        setValue("");
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Page>
      {isLoadingPostMessage && <IsLoading>Loading...</IsLoading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea
          value={value}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
          rows={8}
        />
        <SubmitButton>新增留言</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      <MessageList>
        {messages && messages.length === 0 && "No message"}
        {messages &&
          messages.map((message) => (
            <Message
              key={message.id}
              author={message.nickname}
              time={new Date(message.createdAt).toLocaleString()}
              handleDeleteMessage={handleDeleteMessage}
              message={message}
            >
              {message.body}
            </Message>
          ))}
      </MessageList>
    </Page>
  );
}

export default App;
