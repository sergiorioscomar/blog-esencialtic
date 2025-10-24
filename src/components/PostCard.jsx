import styles from '../App.module.css';

export default function PostCard({ post }) {
  return (
    <article className={styles.card} aria-labelledby={`post-title-${post.id}`}>
      <a href={`#post-${post.id}`} className={styles.cardImageWrap}>
        <img className={styles.cardImage} src={post.image} alt={post.title} />
      </a>
      <div className={styles.cardBody}>
        <h3 id={`post-title-${post.id}`} className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardDesc}>{post.description}</p>
        <div className={styles.cardMeta}>
          <span>{post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.category}>
            {post.category ? post.category : "Sin categoría"} { /*Condicional (ternario)*/ }
            </span>
          <a className={styles.readMore} href={`#post-${post.id}`}>Leer</a>
        </div>
      </div>
    </article>
  );
}
