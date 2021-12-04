import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Card, HhData, Htag, P, Product, Sort, Tag } from '../../components';
import React, { useEffect, useReducer } from 'react';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { Advantage } from '../../components/Advantages/Advantage';
import pages from '../../pages';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import { useScrollY } from '../../hooks/useScrollY';

export const TopPageComponent = ({ page, products, firstCategory, ...props }:TopPageComponentProps):JSX.Element => {
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });	
	const y = useScrollY()
	
	const setSort = (sort: SortEnum) => {
		dispathSort({ type: sort });
	};

	useEffect(() => {
		dispathSort({ type: 'reset', initialState: products });
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1" >{ page.title }</Htag>
				{ products && <Tag color="gray" size="md" >{ products.length }</Tag> }
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				<Card color="blue">
				{sortedProducts && sortedProducts.map(p => (<Product layout key={p._id} product={p} /> ))}
				</Card>
			</div>
			<div className={styles.hhTitle}>
				<Htag tag="h2" >Вакансии — { page.category }</Htag>
				<Tag color="red" size="md" >hh.ru</Tag>
			</div>
			{ firstCategory == TopLevelCategory.Courses && page.hh  && <HhData {...page.hh} /> }
			<div className={ styles.advantages } >
				<Htag tag="h2" >
					Преимущества
				</Htag>
				{page.advantages && page.advantages.length > 0 && page.advantages.map(i => {
					<Advantage key={i._id} title={i.title} text={i.description} />
				})}
				{ page.seoText  && (
					<div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} >

					</div>
				)}
			</div>
			<div className={styles.skills}>
				<Htag tag="h2" className={styles.skillsTitle} >
					Получаемые навыки
				</Htag>
				<div className={styles.skillsWrapper}>
					{ 
						page.tags && page.tags.map(t => (
							<Tag className={styles.skillsItem} key={t} size="sm" color="primary">
								{ t }
							</Tag>
						)) 
					}
				</div>
				
			</div>
		</div>
	);
};