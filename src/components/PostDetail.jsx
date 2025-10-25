import Container from './Container';
import styles from '../App.module.css';
import { POSTS } from '../data/posts';

export default function PostDetail() {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const id = (hash || '').replace('#post-', '');
  const post = POSTS.find((p) => p.id === id);

  if (!post) return null;

  const parseDate = (d) => {
    if (!d) return '';
    const iso = d.replace(' ', 'T');
    const dateObj = new Date(iso);
    if (Number.isNaN(dateObj.getTime())) return d;
    return dateObj.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  return (
    <div className={styles.detail}>
      <Container>
        <a className={styles.backLink} href="#">
          ← Volver
        </a>

        <h2>{post.titulo}</h2>

        <p className={styles.detailMeta}>
          {post.autor} • {parseDate(post.fecha_publicacion)} •{' '}
          {post.categoria ? post.categoria : 'Sin categoría'}
        </p>

        <img
          className={styles.detailImage}
          src={post.imagen}
          alt={post.titulo}
          onError={(e) => (e.target.src = '/media/media/posts/default.png')}
        />

        {/* Si no tenés campo "content" en tus posts, mostramos "descripcion" */}
        <div className={styles.detailContent}>
          {post.content ? post.content : post.descripcion}
        </div>
      </Container>
    </div>
  );
}
