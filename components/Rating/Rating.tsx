/* eslint-disable react/display-name */
import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import StarIcon from './star.svg';


export const Rating = forwardRef(({ isEditable = false, error, rating, setRating, ...props }:RatingProps, ref: ForwardedRef<HTMLDivElement>):JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	
	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (<>
					<span
						className={cn(styles.star, {
							[styles.filed]: i < currentRating,
							[styles.editable]: isEditable
						})} 
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i + 1)}
						tabIndex={isEditable ? 0 : -1}
					>
						<StarIcon/>
					</span>
				</>
			);
		});
		setRatingArray(updatedArray);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const onClick = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};

	const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
		if (e.code != 'Space' || !setRating) {
			return;
		}

		setRating(i);
	};

	return (
		<div
			className={cn(styles.ratingWrapper, {
				[styles.error]: error
			})} 
			{...props}
		>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
			{ error && <span className={styles.errorMessage}>{ error.message }</span> }
		</div>
	);
});