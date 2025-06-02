import type { AIResponse, Content } from '@/types'
import { generateHTML } from '@/util/helper'
import { Loader, RefreshCwIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type PreviewPageProps = {
	content: Content
	isGenerating: boolean
	code?: AIResponse
}

const PreviewPage = ({ isGenerating, code, content }: PreviewPageProps) => {
	const [, setKeyReaload] = useState(0)
	const iframeRef = useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		if (!iframeRef.current || !code?.html || !code?.css) return

		const fullHTML = generateHTML(content, code)
		const blob = new Blob([fullHTML], { type: 'text/html' })
		const url = URL.createObjectURL(blob)

		iframeRef.current.src = url

		return () => URL.revokeObjectURL(url)
	}, [code, content])

	return (
		<div className='p-8 flex-1 overflow-y-auto'>
			<div className='flex flex-col border border-gray-200 h-full rounded-lg relative max-h-full'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center h-[40px] px-2 gap-1 border-b'>
						<span className='size-3 cursor-pointer rounded-full bg-red-500 block'></span>
						<span className='size-3 cursor-pointer rounded-full bg-yellow-500 block'></span>
						<span className='size-3 cursor-pointer rounded-full bg-green-500 block'></span>
					</div>
					<span
						onClick={() => setKeyReaload(Math.random())}
						className='block duration-200 rounded-lg p-2 cursor-pointer hover:bg-gray-200'
					>
						<RefreshCwIcon />
					</span>
				</div>
				<div className='relative w-full h-full flex flex-col flex-1 p-4 overflow-y-auto'>
					{isGenerating ? (
						<div className='absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[grba(0,0,0,0.05)] backdrop:blur-sm'>
							<span className='animate-spin'>
								<Loader size={30} />
							</span>
							<p className='text-gray-500'>Generating</p>
						</div>
					) : code ? (
						<iframe
							ref={iframeRef}
							title='Landing Page Preview'
							className='flex flex-1 flex-col overflow-auto'
							sandbox='allow-scripts allow-same-origin'
						/>
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
