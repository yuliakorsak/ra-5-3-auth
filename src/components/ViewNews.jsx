import { useParams } from 'react-router-dom';
import NewsCard from './NewsCard';
import { useState } from 'react';
import { getNews, Local } from '../API';
import Page404 from './Page404';

export default function ViewNews() {
  const [contents, setContents] = useState(null);
  const [NotFound, setNotFound] = useState(false);
  const { id } = useParams();

  if (NotFound) {
    return <Page404 />
  }

  if (contents) {
    return (
      <div className="view_card">
        <NewsCard title={contents.title} content={contents.content} image={contents.image} />
      </div>
    );
  }
  else {
    const token = Local.getToken();
    getNews(token).then(result => {
      const news = result.find(item => item.id === id);
      if (news === undefined) {
        setNotFound(true)
      }
      else {
        setContents(news);
      }
    });
    return null;
  }
}