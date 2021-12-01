import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from './close.svg'
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';


export const ReviewForm = ({ productId ,className, ...props }:ReviewFormProps):JSX.Element => {
	const { register, control, handleSubmit } = useForm<IReviewForm>();
	
	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div 
				className={cn(styles.reviewForm, className)} 
				{...props}
			>
				<Input defaultValue="test" {...register('name')} placeholder="Имя" />
				<Input defaultValue="test" {...register('title')} placeholder="Заголовок отзыва" className={styles.title} />
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name="rating"
						render={({ field }) => {
							return <Rating isEditable setRating={field.onChange} rating={field.value} />
						}}
					/>
				</div>
				 <input defaultValue="test" {...register("name")} />
				<Textarea {...register('description')} placeholder="Текст отзыва" className={styles.description} />
				<div className={styles.submit} >
					<Button appearance="primary">
						Отправить
					</Button>
					<span>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div className={styles.successDescription} >
					Спасибо за ваш отзыв! После проверки модератора, он разместится здесь.
				</div>
				<CloseIcon className={styles.close} />
			</div>
		</form>
	);
};