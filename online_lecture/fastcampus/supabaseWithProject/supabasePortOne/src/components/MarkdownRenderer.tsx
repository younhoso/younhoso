import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-medium">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-medium">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-sm font-medium">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-xs font-medium">{children}</h6>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-600 dark:text-gray-300">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4">{children}</ul>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
