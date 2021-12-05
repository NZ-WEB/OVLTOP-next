import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopPageModel } from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interface';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from "next/head";

const firstCategory = 0;

function TopPage({ firstCategory, page, products }:TopPageProps): JSX.Element {

	return (
		<>
			<Head>
				<title>{page.metaTitle}</title>
				<meta name="description" content={page.metaDescription}/>
				<meta property="og:title" content={page.metaTitle}/>
				<meta property="og:description" content={page.metaDescription}/>
				<meta property="og:type" content="article"/>
			</Head>
			<TopPageComponent
				firstCategory={firstCategory}
				page={page}
				products={products}
			/>
		</>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	const { data: menu } =  await axios.post<MenuItem[]>( process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});

	return {
		paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
		fallback: true
	}
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }:GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		}
	}

	const { data: menu } =  await axios.post<MenuItem[]>( API.topPage.find, {
		firstCategory
	});

	const { data: page } =  await axios.get<TopPageModel>( API.topPage.byAlias + params.alias);

	const { data: products } =  await axios.post<ProductModel[]>( API.product.find, {
		category: page.category,
		limit:10
	});

	return {
		props: {
			menu,
			firstCategory,
			page,
			products
		}
	};
}

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
	page: TopPageModel;
	products: ProductModel[];
}
