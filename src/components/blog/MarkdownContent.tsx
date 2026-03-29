import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-medium mt-4 mb-2 text-foreground" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="text-muted-foreground leading-relaxed mb-4" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="ml-4" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-cyan-600 pl-4 py-2 my-4 bg-cyan-600/10 rounded-r-lg text-muted-foreground italic"
            {...props}
          />
        ),
        a: ({ node, ...props }) => (
          <a
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        img: ({ node, ...props }) => (
          <img
            className="rounded-lg my-4 max-w-full h-auto"
            {...props}
          />
        ),
        hr: ({ node, ...props }) => (
          <hr className="border-border my-8" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-border" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th
            className="border border-border bg-card px-4 py-2 text-left font-semibold"
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            className="border border-border px-4 py-2 text-muted-foreground"
            {...props}
          />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '')
          
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg my-4 !bg-zinc-900 !bg-opacity-50"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            )
          }
          
          return (
            <code
              className="bg-cyan-600/10 text-cyan-400 px-1.5 py-0.5 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
