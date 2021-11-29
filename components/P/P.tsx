import styles from './P.module.css';
import { PProps } from './P.props';
import cn from 'classnames';


export const P = ({ size, children, className, ...props }:PProps):JSX.Element => {
	return (
		<p 
			className={cn(styles.p,{
				[styles.sm]: size == 'sm',
				[styles.md]: size == 'md',
				[styles.xl]: size == 'xl',
			})} 
		>
			{children}
		</p>
	);
};