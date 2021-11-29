import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Card, HhData, Htag, Tag } from '../../components';
import React from 'react';
import { TopLevelCategory } from '../../interfaces/page.interface';

export const TopPageComponent = ({ page, products, firstCategory, ...props }:TopPageComponentProps):JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1" >{ page.title }</Htag>
				{ products && <Tag color="gray" size="md" >{ products.length }</Tag> }
				<span>Сортировка</span>
			</div>
			<div>
				<Card color="blue">
				{products && products.map(p => (<div key={p._id} >{ p.title }</div>))}
					
				</Card>
			</div>
			<div className={styles.hhTitle}>
				<Htag tag="h2" >Вакансии — { page.category }</Htag>
				<Tag color="red" size="md" >hh.ru</Tag>
			</div>
			{ firstCategory == TopLevelCategory.Courses && <HhData {...page.hh} /> }
		</div>
	);
};