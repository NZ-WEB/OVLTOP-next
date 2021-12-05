import styles from './Input.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';
import { forwardRef, ForwardedRef } from 'react';


// eslint-disable-next-line react/display-name
export const Input = forwardRef(({ className, error, ...props }:InputProps, ref: ForwardedRef<HTMLInputElement>):JSX.Element => {
	return (
		<div className={cn(className, styles.inputWrapper)}>
			<input
				className={cn(className, styles.input, {
					[styles.error]: error
				})}
				type="text"
				placeholder="Текст..."
				ref={ref}
				{...props}
			/>
			{error &&  <span role="alert" className={styles.errorMessage}>{error.message}</span> }
		</div>
	);
});
