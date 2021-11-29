import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';
import { P } from '../../components';
import cn from 'classnames';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }:FooterProps):JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<P className={styles.copy}>
				OwlTop © 2020 - { format(new Date(), 'yyyy') } Все права защищены
			</P>
			<a href="#" className={styles.userAgreement}>
				Пользовательское соглашение
			</a>
			<a href="#" className={styles.privacyPolicy}>
				Политика конфиденциальности
			</a>
		</footer>
	);
};