export const generateHTML = (content: { headline: string; subheadline: string; features: string[]; cta: string }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${content.headline}</title>
    <style>
      :root {
        --color-primary: #4F46E5;
        --color-seconday: #10B981;
        --color-background: #F9FAFB;
        --color-text: #111827;
        --ring: oklch(0.708 0 0);
      }
      body {
        font-family: Roboto, sans-serif;
      }
      button {
        cursor: pointer;
        border: none;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100dvh;
      }
      .subheadline {
        text-align: center;
        padding-top: 8px;
      }
      .features-container {
        display: flex;
        justify-content: center;
        padding-top: 12px;
      }
      .preview-container button {
        margin-top: 20px;
        padding: 12px 24px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        font-size: 1rem;
        background-color: #3498db;
      }
      .button.default {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        white-space: nowrap;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        user-select: none;
        position: relative;
        overflow: hidden;
      }
      .button.default svg {
        pointer-events: none;
      }
      .button.default:disabled {
        pointer-events: none;
        opacity: 0.5;
      }
      .button.default:focus-visible {
        outline: none;
        border-color: var(--ring-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
      }
      .button.default.size-default {
        height: 2.25rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .button.default.size-default svg+span,
      .button.default.size-default span+svg {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }
      .button.default:hover {
        opacity: 0.9;
      }
      .button.default {
        background-color: var(--color-primary);
        color: #ffffff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="headline">${content.headline}</h1>
      <p class="subheadline">${content.subheadline}</p>
      <div class="features-container">
        <ul class="features">
          ${content.features.map(f => `<li>✅ ${f}</li>`).join('\n')}
        </ul>
      </div>
      <button class="button default size-default">${content.cta}</button>
    </div>

    <script>
      const style = document.createElement('style')
      style.innerText = 
      document.head.appendChild(style)
    </script>
  </body>
  </html>
  `
