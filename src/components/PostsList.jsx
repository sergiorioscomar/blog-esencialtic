import PostCard from './PostCard';
import styles from '../App.module.css';

export default function PostsList({ posts }) {
  return (
    <div className={styles.grid}>
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}