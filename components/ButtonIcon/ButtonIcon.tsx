import { ButtonIconProps } from './ButtonIcon.props';
import styles from './ButtonIcon.module.css';
import cn from 'classnames';



export const ButtonIcon = ({ appearance, icon, disabled, arrow = 'none', className, ...props }:ButtonIconProps):JSX.Element => {
	return (
		<button
			disabled={ disabled ? true : false }
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
				[styles.white]: appearance == 'white',
				[styles.disabled]: disabled
			})}
			{...props}
		>
			{icon}
		</button>
	);
}
