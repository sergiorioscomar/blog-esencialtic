import Navbar from './components/Navbar';
import Container from './components/Container';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import { POSTS } from './data/posts';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Container className={styles.hero}>
          <h1 className={styles.headline}>Últimas Publicaciones</h1>
          <p className={styles.lead}>Artículos técnicos, guías y tutoriales.</p>
        </Container>

        <Container>
          <PostsList posts={POSTS} />
        </Container>

        <PostDetail posts={POSTS} />
      </main>

      <footer className={styles.footer}>
        <Container>
          <small>© {new Date().getFullYear()} Blog EsencialTIC</small>
        </Container>
      </footer>
    </div>
  );
}
