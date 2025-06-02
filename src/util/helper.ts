import type { AIResponse, Content } from '@/types'

export const generateHTML = (content: Content, code: AIResponse) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${content.headline}</title>
    <style>
      ${code.css}
    </style>
  </head>
  <body>
    ${code.html}
    <script>
      ${code.js}
    </script>
  </body>
  </html>
  `
