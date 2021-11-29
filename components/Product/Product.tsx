import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';


export const Product = ({ className, product, ...props }:ProductProps):JSX.Element => {
	return (
		<div className={cn(className, styles.product)} {...props}>
			{ product.title }
		</div>
	);
};