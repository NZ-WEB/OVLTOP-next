import styles from './Menu.module.css';
import { P } from '../../components';
import cn from 'classnames';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { firstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers'
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Menu = ():JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();

	const openScondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				m.isOpend = !m.isOpend;
			}
			
			return m;
		}));
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={ m.route }>
						<Link href={`/${ m.route }`}> 
							<a>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory
								})} >
									{ m.icon }
									<span>{ m.name }</span>
								</div>
							</a>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};
	
	const buildSecondLevel = (menuItem: firstLevelMenuItem) => {
		return (
			<div className={ styles.secondBlock }>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpend = true
					}

					return (
						<div key={ m._id.secondCategory }>
							<div className={styles.secondLevel} onClick={() => openScondLevel(m._id.secondCategory)} >{ m._id.secondCategory }</div>
							<div className={cn(styles.secondLevelBlock, {
								[styles.secondLevelBlockOpened]: m.isOpend
							})} >
								{buildThirdLevel(m.pages, menuItem.route)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};
	
	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(p => (
				<Link key={p._id} href={`/${route}/${p.alias}`} >
					<a className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
					})} >
						{ p.category }
					</a>
				</Link>
			))
		);
	};

	return (
		<div className={styles.menu} >
			{buildFirstLevel()}
		</div>
	);
};