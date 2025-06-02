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

export default generateLandingContent
