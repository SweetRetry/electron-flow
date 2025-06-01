import { Button } from "@renderer/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@renderer/components/ui/dialog";
import { cn } from "@renderer/lib/utils";
import { Eye } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// 引入highlight.js样式
import "highlight.js/styles/github.css";

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  // 检查内容是否包含markdown语法
  const hasMarkdownSyntax = (text: string) => {
    if (!text) return false;
    const markdownPatterns = [
      /^#{1,6}\s/m, // 标题
      /\*\*.*\*\*/, // 粗体
      /\*.*\*/, // 斜体
      /`.*`/, // 行内代码
      /```[\s\S]*```/, // 代码块
      /^\s*[-*+]\s/m, // 列表
      /^\s*\d+\.\s/m, // 有序列表
      /\[.*\]\(.*\)/, // 链接
      /^\s*>/m, // 引用
    ];
    return markdownPatterns.some((pattern) => pattern.test(text));
  };

  const shouldShowMarkdown = hasMarkdownSyntax(content);

  if (!shouldShowMarkdown) {
    return null;
  }

  return (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-6 px-2 text-xs"
        >
          <Eye size={12} className="mr-1" />
          预览
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Markdown 预览</DialogTitle>
        </DialogHeader>
        <div className="max-h-[calc(80vh-120px)] overflow-auto">
          <div
            className={cn(
              "prose prose-sm max-w-none p-4",
              "prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground",
              "prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground",
              "prose-blockquote:text-muted-foreground prose-blockquote:border-border",
              "prose-a:text-primary hover:prose-a:text-primary/80",
              "prose-li:text-foreground prose-th:text-foreground prose-td:text-foreground",
              "prose-hr:border-border"
            )}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // 自定义标题样式
                h1: ({ children }) => (
                  <h1 className="text-foreground border-border mt-6 mb-4 border-b pb-2 text-2xl font-bold">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-foreground border-border mt-5 mb-3 border-b pb-1 text-xl font-bold">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-foreground mt-4 mb-2 text-lg font-semibold">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-foreground mt-3 mb-2 text-base font-semibold">{children}</h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-foreground mt-2 mb-1 text-sm font-semibold">{children}</h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-muted-foreground mt-2 mb-1 text-xs font-semibold">
                    {children}
                  </h6>
                ),
                // 自定义代码块样式
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match;
                  return isInline ? (
                    <code className="bg-muted rounded px-1 py-0.5 font-mono text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-muted overflow-x-auto rounded-md p-3">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
                // 自定义表格样式
                table: ({ children }) => (
                  <div className="overflow-x-auto">
                    <table className="border-border w-full border-collapse border">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border-border bg-muted border p-2 text-left font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => <td className="border-border border p-2">{children}</td>,
                // 自定义引用块样式
                blockquote: ({ children }) => (
                  <blockquote className="border-primary border-l-4 pl-4 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkdownPreview;
