import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button, Input, Textarea } from '../ui'

type InputFormProps = {
	onGenerate: (data: FormData) => Promise<void>
}

export type FormData = {
	productName: string
	description: string
}

export function InputForm({ onGenerate }: InputFormProps) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<FormData>()

	const onSubmit = async (data: FormData) => {
		await onGenerate(data)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col flex-1 gap-4 pb-4'
		>
			<div className='flex flex-col gap-2 pt-8'>
				<label>Tên sản phẩm / Startup</label>
				<Input
					placeholder='Tên sản phẩm hoặc dịch vụ của bạn'
					type='text'
					required
					disabled={isSubmitting}
					{...register('productName', { required: true })}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label>Mô tả ngắn (~2 câu)</label>
				<Textarea
					disabled={isSubmitting}
					placeholder='Mô tả ngắn về sản phẩm hoặc dịch vụ của bạn'
					rows={4}
					required
					{...register('description', { required: true })}
				/>
			</div>
			<Button
				className='mt-auto'
				size={'lg'}
				type='submit'
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<span className='animate-spin'>
						<Loader />
					</span>
				) : null}
				Tạo Landing Page
			</Button>
		</form>
	)
}
