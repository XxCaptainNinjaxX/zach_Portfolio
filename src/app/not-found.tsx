import Link from "next/link";
import { Flourish } from "@/components/ui/Flourish";
import styles from "@/app/not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Flourish className={styles.flourish} />

      <h1 className={`tracked-caps ${styles.heading}`}>Page not found</h1>

      <p className={styles.body}>That page does not exist, or it has moved.</p>

      <Link href="/" className={`tracked-caps-tight ${styles.homeLink}`}>
        Return home
      </Link>
    </div>
  );
}
