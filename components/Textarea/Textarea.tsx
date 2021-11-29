import styles from './Textarea.module.css';
import { InputProps } from './Textarea.props';
import cn from 'classnames';


export const Textarea = ({ className, ...props }:InputProps):JSX.Element => {
	return (
		<textarea 
			className={cn(className, styles.ta)} 
			placeholder="Текст..."
			{...props} 
		>

		</textarea>
	);
};