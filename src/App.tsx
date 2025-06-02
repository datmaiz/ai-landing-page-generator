import { useState } from 'react'
import './App.css'
import { ExportButtons } from './components/common/export-buttons'
import { type FormData, InputForm } from './components/common/input-form'
import { PreviewPage } from './components/common/preview-page'
import generateLandingContent from './util/api'
import type { Content } from './types'

function App() {
	const [content, setContent] = useState<Content>({ cta: '', features: [], headline: '', subheadline: '' })
	const [isGenerating, setIsGenerating] = useState(false)

	const handleGenerate = async (data: FormData) => {
		setIsGenerating(true)
		try {
			const result = await generateLandingContent(data.productName, data.description)
			setContent(result)
			console.log(result)
		} catch (error) {
			alert(`Có lỗi xảy ra khi tạo nội dung! ${String(error)}`)
		}
		setIsGenerating(false)
	}

	return (
		<div className='sm:h-dvh sm:bg-background sm:px-4 sm:pt-10 md:px-6 lg:px-8 lg:flex xl:px-12'>
			<div className='content-group flex flex-col flex-1 px-4'>
				<h1 className='text-text text-center text-5xl font-bold'>AI Landing Page Generator</h1>
				<InputForm onGenerate={handleGenerate} />
			</div>

			<div className='resize-x flex flex-col flex-2 border border-gray-200 rounded-lg min-w-[320px]'>
				<ExportButtons content={content} />
				<PreviewPage
					isGenerating={isGenerating}
					content={content}
				/>
			</div>
		</div>
	)
}

export default App
