import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button, Input, Textarea } from '../ui'
import type { Content } from '@/types'
import { useMemo } from 'react'

type InputFormProps = {
	onGenerate: (data: FormData) => Promise<void>
	content: Content
}

export type FormData = {
	productName: string
	description: string
}

export function InputForm({ onGenerate, content }: InputFormProps) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<FormData>()

	const onSubmit = async (data: FormData) => {
		await onGenerate(data)
	}

	const hasContent = useMemo(
		() => content.cta || content.features.length || content.headline || content.subheadline,
		[content]
	)

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

			{hasContent && (
				<div className='flex flex-col gap-2'>
					<label>Thông tin đã tạo</label>
					<div className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
						<h3 className='text-lg font-semibold'>Headline</h3>
						<p className='text-gray-700'>{content.headline}</p>

						<h3 className='text-lg font-semibold mt-2'>Subheadline</h3>
						<p className='text-gray-700'>{content.subheadline}</p>

						<h3 className='text-lg font-semibold mt-2'>Features</h3>
						<ul className='list-disc pl-5 text-gray-700'>
							{content.features.map((feature, index) => (
								<li key={index}>{feature}</li>
							))}
						</ul>

						<h3 className='text-lg font-semibold mt-2'>CTA</h3>
						<p className='text-gray-700'>{content.cta}</p>
					</div>
				</div>
			)}

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
