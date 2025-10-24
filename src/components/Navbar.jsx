import styles from '../App.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>Blog</div>
      <ul className={styles.navlist}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Categorías</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </nav>
  );
}