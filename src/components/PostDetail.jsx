import Container from './Container';
import styles from '../App.module.css';

export default function PostDetail({ posts }) {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const id = (hash || '').replace('#post-', '');
  const post = posts.find(p => p.id === id);

  if (!post) return null;

  return (
    <div className={styles.detail}>
      <Container>
        <a className={styles.backLink} href="#">← Volver</a>
        <h2>{post.title}</h2>
        <p className={styles.detailMeta}>{post.author} • {new Date(post.date).toLocaleDateString()} • {post.category}</p>
        <img className={styles.detailImage} src={post.image} alt={post.title} />
        <p className={styles.detailContent}>{post.content}</p>
      </Container>
    </div>
  );
}
