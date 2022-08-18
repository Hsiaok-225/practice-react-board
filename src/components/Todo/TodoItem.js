import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space=between;
  padding: 8px 16px;
  border: 1px solid black;
  & + & {
    margin-top: 12px;
  }
`;

const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.primary_300};
  font-size: ${(props) => (props.size === "XL" ? "30px" : "10px")};

  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

const Button = styled.button`
  color: black;
  padding: 3px;
  font-size: 20px;

  :hover {
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`;

const TodoBtnWapper = styled.div``;

export default function TodoItem({
  className,
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  return (
    <Wrapper className={className} data-id={todo.id}>
      <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      <TodoBtnWapper>
        <Button
          onClick={() => {
            handleToggleIsDone(todo.id);
          }}
        >
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <Button
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          刪除
        </Button>
      </TodoBtnWapper>
    </Wrapper>
  );
}
