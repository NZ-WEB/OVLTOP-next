import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import { Button, Card, Divider, Rating, ReviewForm, Tag, Review } from '..';
import { declOfNum, priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const Product = ({ className, product, ...props }:ProductProps):JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	return (
		<div  {...props}>
			<Card className={styles.product} {...props}>
				<div className={styles.logo} >
					<Image 
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title} > 
					{ product.title }
				</div>
				<div className={styles.price} > 
					{ priceRu(product.price)}
					{ product.oldPrice && <Tag className={styles.oldPrice} size="sm" color="green" >{ priceRu(product.price - product.oldPrice)} </Tag> }
				</div>
				<div className={styles.credit} > 
					{ priceRu(product.credit) }
					/ 
					<span className={styles.month} >мес</span>
				</div>
				<div className={styles.rating} > 
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags} > 
					{ product.categories.map(c => (<Tag className={styles.tag} key={c} color="ghost" > { c } </Tag>)) }
				</div>
				<div className={styles.priceTitle} > 
					цена
				</div>
				<div className={styles.creditTitle} > 
					кредит
				</div>
				<div className={styles.reviewCount} > 
					<a href="#ref" onClick={() => scrollToReview()}>
						{ product.reviewCount } {declOfNum(product.reviewCount, ['отзыв','отзыва','отзывов'])}
					</a>
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description} > 
					{ product.description }
				</div>
				<div className={styles.features} > 
					{product.characteristics.map(c => (
						<div key={c.name} className={styles.characteristic} >
							<span className={styles.characteristicName}> { c.name } </span>
							<span className={styles.characteristicDots}> </span>
							<span className={styles.characteristicValue}> { c.value } </span>
						</div>
					))}
				</div>
				<div className={styles.advBlock} > 
					<div className={styles.advantages}> 
						<div className={styles.advTitle} >Преимущества</div>
						<div>{ product.advantages }</div> 
					</div>
					{ product.disadvantages && (
					<div className={styles.disAdvantages}>
						Недостатки
						{ product.disadvantages }
					</div>)}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions} >
					<Button appearance="primary" >Узнать подробнее</Button>
					<Button disabled={product.reviews.length === 0 ? true : false} appearance="ghost" arrow={isReviewOpened ? 'down' : 'right'} className={styles.reviewButton} onClick={() => setIsReviewOpened(!isReviewOpened)} >Читать отзывы</Button>
				</div>
			</Card>
			<Card color='blue' className={cn(styles.reviews, {
				[styles.opened]: isReviewOpened,
				[styles.closed]: !isReviewOpened,
			})} ref={reviewRef} >
				{
					product.reviews && product.reviews.map(r => (
						<div key={ r._id }>
							<Review  review={ r } />
							<Divider />
						</div>
					))
				}
				<ReviewForm productId={product._id} />
			</Card>
		</div>
	);
};