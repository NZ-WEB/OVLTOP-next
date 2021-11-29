import styles from './Advantage.module.css';
import { AdvantageProps } from './Advantage.props';
import cn from 'classnames';
import AdvantageIcon from './icon.svg';
import { Htag, P } from '..';


export const Advantage = ({ title, text, className, ...props }:AdvantageProps):JSX.Element => {
	return (
		<div className={styles.wrapper} {...props} >
			<AdvantageIcon className={styles.icon} />
			<Htag tag="h3" className={styles.title}>
				{ title }
			</Htag>
			<div className={styles.text} >
				<P size="xl"> { text } </P>
			</div>
		</div>
	);
};