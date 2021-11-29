import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import { Button, Card, Divider, Rating, Tag } from '..';
import { declOfNum, priceRu } from '../../helpers/helpers';


export const Product = ({ className, product, ...props }:ProductProps):JSX.Element => {
	return (
		<Card className={styles.product} {...props}>
			<div className={styles.logo} >
				<img src={ process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} />
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
				{ product.reviewCount } {declOfNum(product.reviewCount, ['отзыв','отзыва','отзывов'])}
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
			<Divider className={styles.hr} />
			<div className={styles.actions} >
				<Button appearance="primary" >Узнать подробнее</Button>
				<Button appearance="ghost" arrow="down" className={styles.reviewButton} >Читать отзывы</Button>
			</div>
		</Card>
	);
};