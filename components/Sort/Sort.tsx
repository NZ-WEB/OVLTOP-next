import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import SortIcon from './sort.svg';
import cn from 'classnames';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div
				id="rating"
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby="sort rating"
			>
				<SortIcon className={styles.sortIcon} />По&nbsp;рейтингу
			</div>
			<div
				id="price"
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
				aria-selected={sort == SortEnum.Price}
				aria-labelledby="sort price"
			>
				<SortIcon className={styles.sortIcon} />По&nbsp;цене
			</div>
		</div>
	);
};