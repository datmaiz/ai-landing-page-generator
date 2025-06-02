import type { Content } from '@/types'
import { Loader } from 'lucide-react'

type PreviewPageProps = {
	content: Content
	isGenerating: boolean
}

const PreviewPage = ({ content, isGenerating }: PreviewPageProps) => {
	return (
		<div className='p-8 flex-1'>
			<div className='flex flex-col border border-gray-200 h-full rounded-lg relative'>
				<div className='flex items-center h-[40px] px-2 gap-1 border-b'>
					<span className='size-3 cursor-pointer rounded-full bg-red-500 block'></span>
					<span className='size-3 cursor-pointer rounded-full bg-yellow-500 block'></span>
					<span className='size-3 cursor-pointer rounded-full bg-green-500 block'></span>
				</div>
				<div className='relative w-full h-full flex flex-col flex-1 p-4 overflow-y-auto'>
					{isGenerating ? (
						<div className='absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[grba(0,0,0,0.05)] backdrop:blur-sm'>
							<span className='animate-spin'>
								<Loader size={30} />
							</span>
							<p className='text-gray-500'>Generating</p>
						</div>
					) : content.cta ? (
						<div className='flex flex-col'>
							<h1 className='headline'>{content.headline}</h1>
							<p className='subheadline'>{content.subheadline}</p>
							<div className='features-container'>
								<ul className='features'>
									{content.features.map((feature, i) => (
										<li key={i}>✅ {feature}</li>
									))}
								</ul>
							</div>
							<button className='button default size-default mt-4 self-center'>{content.cta}</button>
						</div>
					) : (
						<div className='flex-1 flex items-center justify-center'>
							<p className='text-gray-500 text-center'>No content available. Please generate content first.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export { PreviewPage }
