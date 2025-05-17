import { useNodeDataDebounceUpdate } from '@flow/core/hooks/useNodeDataDebounceUpdate'
import { Textarea } from '@renderer/components/ui/textarea'
import { Node, useReactFlow } from '@xyflow/react'

const TextNode = (node: Node) => {
  const { updateNodeData } = useReactFlow()

  const { internalValue, handleChange } = useNodeDataDebounceUpdate(
    node.data.text,
    (value) => {
      updateNodeData(node.id, { text: value })
    }
  )

  return (
    <div className="relative w-full h-full">
      <Textarea
        className="text-xs nodrag nowheel p-2 w-full h-full outline-none border-none shadow-none bg-red-600 pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-auto"
        placeholder="在这里输入文本..."
        value={internalValue as string}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export default TextNode