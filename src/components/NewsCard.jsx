export default function NewsCard(props) {
  return (
    <div className="news_card centered">
      <img src={props.image} alt={props.title} />
      <h3 className="news_title">{props.title}</h3>
      <p className="news_text">{props.content}</p>
    </div>
  );
}