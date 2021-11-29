import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }:HomeProps): JSX.Element {
	const [counter, setCounter] = useState<number>(0);

	const [rating, setRating] = useState<number>(4);

	useEffect(() => {
		console.log(counter, 'counter');
		return () => {
			console.log('unmount');
		}
	});

  return (
    <>
      <Htag tag="h1">{counter}</Htag>
	  <Button arrow="right" appearance="primary" className="123" onClick={() => setCounter(x => x + 1)}>Кнопка</Button>
	  <Button appearance="ghost">Кнопка</Button>
	  <Button arrow="down" appearance="ghost">Кнопка</Button>
	  <P size="sm">
		  1
	  </P>
	  <P size="md">
		  1
	  </P>
	  <P size="xl">
		  1
	  </P>
	  <P>
		  2
	  </P>

	  <Tag color="gray" size="md" href="vk.com">123</Tag>
	  <Tag color="red" size="sm" href="vk.com">123</Tag>
	  <Tag color="primary" size="sm"  href="vk.com">123</Tag>
	  <Rating rating={rating} isEditable setRating={setRating}/>
	  <ul>
	  	{menu.map(m => (<li key={m._id.secondCategory} >{m._id.secondCategory}</li>))}
	  </ul>
	  
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0; 
	const { data: menu } =  await axios.post<MenuItem[]>( process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
