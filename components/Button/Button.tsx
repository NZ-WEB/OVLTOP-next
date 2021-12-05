import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';
import { spawn } from 'child_process';
import ArrowIcon from './Vector.svg';
import { motion } from 'framer-motion';


export const Button = ({ appearance, disabled, arrow = 'none', children, className, ...props }:ButtonProps):JSX.Element => {
	return (
		<motion.button
			whileHover={{ scale: 1.03 }}
			disabled={ disabled ? true : false }
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
				[styles.disabled]: disabled
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && <span className={cn(styles.arrow, {
				[styles.down]: arrow == 'down'
			})}>
				<ArrowIcon />
			</span>}
		</motion.button>
	);
}
