import styles from '../App.module.css';

export default function PostCard({ post }) {
  // Formateo fecha
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
    <article className={styles.card} aria-labelledby={`post-title-${post.id}`}>
      <a href={`#post-${post.id}`} className={styles.cardImageWrap}>
        <img
          className={styles.cardImage}
          src={post.imagen}
          alt={post.titulo}
          onError={(e) => (e.target.src = '/media/media/posts/default.png')}
        />
      </a>

      <div className={styles.cardBody}>
        <h3 id={`post-title-${post.id}`} className={styles.cardTitle}>
          {post.titulo}
        </h3>

        <p className={styles.cardDesc}>{post.descripcion}</p>

        <div className={styles.cardMeta}>
          <span>{post.autor}</span>
          <span>•</span>
          <span>{parseDate(post.fecha_publicacion)}</span>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.category}>
            {post.categoria ? post.categoria : 'Sin categoría'} {/* Condicional Ternario */ }
          </span>

          <a className={styles.readMore} href={`${post.url}`}>
            Leer
          </a>
        </div>
      </div>
    </article>
  );
}
