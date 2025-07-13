import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
} from 'lucide-react'
import { Button } from './ui/button'

const RichTextEditor = ({ input, setInput }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: input.description || 'Enter course description...',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setInput(prev => ({
        ...prev,
        description: html,
      }))
    },
  })

  // Keep the editor in sync if `input.description` changes externally
  useEffect(() => {
    if (editor && input.description !== editor.getHTML()) {
      editor.commands.setContent(input.description || '')
    }
  }, [input.description, editor])

  if (!editor) return null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 border-none">
        <Button
          variant="outline"
          className={`bg-white text-white hover:text-white border rounded-md px-2 py-1 hover:bg-gray-100 ${
            editor.isActive('heading', { level: 1 }) ? 'border-black' : ''
          }`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          className={`bg-white text-white rounded-md px-2 py-1 hover:text-white ${
            editor.isActive('bold') ? 'border-black' : ''
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          className={`bg-white text-white hover:text-white border rounded-md px-2 py-1 hover:bg-gray-100 ${
            editor.isActive('italic') ? 'border-black' : ''
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          className={`bg-white text-white hover:text-white border rounded-md px-2 py-1 hover:bg-gray-100 ${
            editor.isActive('strike') ? 'border-black' : ''
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          className={`bg-white text-white hover:text-white border rounded-md px-2 py-1 hover:bg-gray-100 ${
            editor.isActive('bulletList') ? 'border-black' : ''
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          className={`bg-white text-white hover:text-white border rounded-md px-2 py-1 hover:bg-gray-100 ${
            editor.isActive('orderedList') ? 'border-black' : ''
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>

      <div className="w-full rounded-2xl">
        <EditorContent
          editor={editor}
          className="min-h-[250px] max-w-full p-4 bg-white"
        />
      </div>
    </div>
  )
}

export default RichTextEditor
