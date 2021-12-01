import styles from './Review.module.css';
import { ReviewProps } from './Review.props';
import cn from 'classnames';
import AvatarIcon from './avatar.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '..';


export const Review = ({ review ,className, ...props }:ReviewProps):JSX.Element => {
	const { name, title, description, createdAt, rating } = review;
	return (
		<div className={cn(styles.review, className)} {...props} >
			<AvatarIcon className={cn(styles.user)} />
			<div className={styles.title} >
				<span className={styles.name}> { name }: </span>&nbsp;
				<span> { title } </span>
			</div>
			<div className={styles.date} >
				{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
			</div>
			<div className={styles.rating} >
				<Rating rating={rating} />
			</div>
			<div className={styles.description} >
				{ description }
			</div>
		</div>
	);
};