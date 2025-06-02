import DownloadIcon from '@/assets/download-icon.svg'
import LinkIcon from '@/assets/link-circle.svg'
import type { AIResponse, Content } from '@/types'
import { generateHTML } from '@/util/helper'

interface ExportButtonProps {
	content: Content
	code?: AIResponse
}

export const ExportButtons = ({ content, code }: ExportButtonProps) => {
	const downloadHTML = () => {
		if (!code) return
		const html = generateHTML(content, code)
		const blob = new Blob([html], { type: 'text/html' })
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = `${content.headline.replace(/\s+/g, '_')}.html`
		link.click()
	}

	const handleOpenNewTab = () => {
		if (!code) return
		const htmlContent = generateHTML(content, code)
		const blob = new Blob([htmlContent], { type: 'text/html' })
		const url = URL.createObjectURL(blob)
		window.open(url, '_blank')
	}

	return (
		<div className='flex items-center justify-end gap-2 border-b border-gray-200 p-2'>
			<button
				className='size-10 p-2 rounded-lg duration-200 hover:bg-gray-300'
				onClick={downloadHTML}
			>
				<img
					className='w-full h-full'
					src={DownloadIcon}
				/>
			</button>
			<button
				className='size-10 p-2 rounded-lg duration-200 hover:bg-gray-300'
				onClick={handleOpenNewTab}
			>
				<img
					className='w-full h-full'
					src={LinkIcon}
				/>
			</button>
		</div>
	)
}
