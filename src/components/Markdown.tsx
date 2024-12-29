'use client'

import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
)

interface MarkdownProps {
  content: string
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <div data-color-mode="dark" className="w-full">
      <MDPreview 
        source={content}
        className="!bg-transparent !text-[#E4E4E7]"
        style={{
          fontSize: '0.9375rem',
          lineHeight: '1.625',
        }}
      />
    </div>
  )
} 