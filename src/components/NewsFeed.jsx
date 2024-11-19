import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import { getNews, Local } from '../API';
import { useEffect, useState } from 'react';

export default function NewsFeed() {
  const token = Local.getToken();
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews(token).then(result => setNews([...result]));
  }, [news]);

  return (
    <div className="news_feed">
      {news.map(news => (<Link to={"./" + news.id} key={news.id}>
        <NewsCard title={news.title}
          content={news.content.length > 100
            ? news.content.substring(0, 100) + '...'
            : news.content}
          image={news.image} />
      </Link>))}
    </div>
  );
}