import styles from './SearchForm.module.css';
import SearchIcon from './search.svg';
import Link from 'next/link';

export default function SearchForm() {
	return (
		<form action="#" className={styles.wrapper}>
			<input type="text" placeholder="Поиск..." className={styles.input} />
			<Link href="/search">
				<a className={styles.searchBtn} >
					<SearchIcon/>
				</a>
			</Link>
			
		</form>
	);
}