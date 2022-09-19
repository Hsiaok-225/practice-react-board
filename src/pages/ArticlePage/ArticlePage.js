import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getPosts } from "../../WebAPI";

import { useParams } from "react-router-dom";

const Root = styled.div``;
const ArticleContainer = styled.div``;

Article.propTypes = {
  article: PropTypes.object,
};

function Article({ article }) {
  return <ArticleContainer>{article.body}</ArticleContainer>;
}

export default function ArticlePage() {
  const params = useParams();
  const [articles, setArticle] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) =>
        data.filter((element) => element.id === Number(params.userId))
      )
      .then((data) => setArticle(data));
  }, [params.userId]);

  return (
    <Root>
      {articles.map((article) => (
        <Article key={article.id} article={article}></Article>
      ))}
    </Root>
  );
}
