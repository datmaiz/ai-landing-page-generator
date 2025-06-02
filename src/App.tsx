import { useState } from 'react'

import './App.css'
import { ExportButtons } from './components/common/export-buttons'
import { type FormData, InputForm } from './components/common/input-form'
import { PreviewPage } from './components/common/preview-page'
import { type AIResponse, type Content } from './types'
import generateLandingContent, { generateFullPage } from './util/api'
import { AxiosError } from 'axios'

function App() {
	const [content, setContent] = useState<Content>({ cta: '', features: [], headline: '', subheadline: '' })
	const [isGenerating, setIsGenerating] = useState(false)
	const [code, setCode] = useState<AIResponse>()

	const handleGenerate = async (data: FormData) => {
		setIsGenerating(true)
		try {
			const content = await generateLandingContent(data.productName, data.description)
			const code = await generateFullPage(data)
			setContent(content)
			setCode(code)
			addStyle(code.css)
			addJS(code.js)
			console.log(code)
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response?.data.error.message || String(error))
			}
		}
		setIsGenerating(false)
	}

	const addStyle = (css: string) => {
		const exisingStyle = document.querySelector('style#generated-style')
		if (exisingStyle) {
			exisingStyle.remove()
		}
		const style = document.createElement('style')
		style.textContent = css
		style.id = 'generated-style'
		document.head.appendChild(style)
	}

	const addJS = (js: string) => {
		const existingScript = document.querySelector('script#generated-script')
		if (existingScript) {
			existingScript.remove()
		}
		const script = document.createElement('script')
		script.defer = true
		script.textContent = js
		script.id = 'generated-script'
		document.head.appendChild(script)
	}

	return (
		<div className='sm:h-dvh sm:bg-background sm:px-4 sm:pt-10 md:px-6 lg:px-8 lg:flex xl:px-12'>
			<div className='content-group flex flex-col flex-1 px-4'>
				<h1 className='text-text text-center text-5xl font-bold'>AI Landing Page Generator</h1>
				<InputForm
					content={content}
					onGenerate={handleGenerate}
				/>
			</div>

			<div className='resize-x flex flex-col flex-2 border border-gray-200 rounded-lg min-w-[320px]'>
				<ExportButtons
					content={content}
					code={code}
				/>
				<PreviewPage
					content={content}
					isGenerating={isGenerating}
					code={code}
				/>
			</div>
		</div>
	)
}

export default App
