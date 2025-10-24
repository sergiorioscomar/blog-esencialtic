import styles from '../App.module.css';

export default function Container({ children, className = '' }) {
  return <div className={`${styles.container} ${className}`.trim()}>{children}</div>;
}