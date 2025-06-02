import type { AIResponse } from '@/types'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export const generateLandingContent = async (productName: string, description: string) => {
	const prompt = `
    Bạn là chuyên gia viết content marketing.

    Hãy dựa trên tên sản phẩm "${productName}" và mô tả "${description}"
    để tạo ra nội dung sau:

    - Headline: Ngắn gọn, thu hút
    - Subheadline: Giải thích rõ hơn về sản phẩm
    - Features: 3 điểm nổi bật (mỗi mục dưới 10 từ)
    - CTA: Văn án nút hành động

    Định dạng kết quả dưới dạng JSON:
    {
      "headline": "string",
      "subheadline": "string",
      "features": ["string", "string", "string"],
      "cta": "string"
    }
  `

	try {
		const response = await axios.post(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
			{
				contents: [
					{
						parts: [{ text: prompt }],
					},
				],
			}
		)

		let cleanJson = response.data.candidates[0].content.parts[0].text.trim()

		if (cleanJson.startsWith('```json')) {
			cleanJson = cleanJson.slice(7) // xóa '```json'
		}
		if (cleanJson.endsWith('```')) {
			cleanJson = cleanJson.slice(0, -3) // xóa '```'
		}
		console.log(cleanJson)

		return JSON.parse(cleanJson)
	} catch (error) {
		console.error('Error calling Gemini API:', error)
		throw new Error('Không thể tạo nội dung từ AI')
	}
}

export const generateFullPage = async ({ productName, description }: { productName: string; description: string }) => {
	const prompt = `
    Bạn là một chuyên gia frontend giàu kinh nghiệm.
    Hãy tạo một trang landing page hoàn chỉnh cho sản phẩm có tên "${productName}" và mô tả sau:

    "${description}"

    Yêu cầu chi tiết:
    - Sử dụng HTML5 + CSS3 + JavaScript (nếu cần)
    - Layout theo kiểu SaaS hiện đại
    - Bố cục đầy đủ gồm:
      - Header / Navbar
      - Hero Section
      - Features Section
      - CTA Section
      - Footer
    - Responsive trên mọi kích thước màn hình
    - KHÔNG sử dụng selector theo tag (như div, p, h1,...)
    - THAY VÀO ĐÓ: dùng class/id rõ ràng, dễ bảo trì, không gây xung đột
    - CSS phải được viết riêng biệt cho từng phần, không override style toàn cục
    - Có thể tương tác và có một số hiệu ứng
    - HTML chỉ cần trả về phần trong thẻ body
    - Không sử dụng thư viện ngoài (không dùng Bootstrap, Tailwind)
    - Nếu có ảnh thì dùng link https://placehold.co/600x400
    
    chỉ cần trả về định dạng kết quả dưới dạng JSON:
    {
      "html": "<div>...</div>",
      "css": ".container { ... }",
      "js": "document.querySelector(...)"
    }
  `

	try {
		const response = await axios.post(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
			{
				contents: [
					{
						parts: [{ text: prompt }],
					},
				],
			}
		)

		let cleanJson = response.data.candidates[0].content.parts[0].text.trim()

		if (cleanJson.startsWith('```json')) {
			cleanJson = cleanJson.slice(7) // xóa '```json'
		}
		if (cleanJson.endsWith('```')) {
			cleanJson = cleanJson.slice(0, -3) // xóa '```'
		}
		return JSON.parse(cleanJson) as AIResponse
	} catch (error) {
		console.error('Error calling Gemini API:', error)
		throw new Error('Không thể tạo nội dung từ AI')
	}
}

export default generateLandingContent
