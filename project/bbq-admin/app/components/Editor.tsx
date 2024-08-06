'use client';

import { useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { isAxiosError } from 'axios';
import QuillEditor from 'quill';
import { styled } from 'styled-components';

import { getAxios } from '../lib/Axios';

export interface EditorProps {
  placeholder?: string;
  htmlStr: string;
  setHtmlStr?: (v: string) => void;
  uploadUrl?: string;
}

export type QuillRef = ReactQuill & { editor: QuillEditor };

const CustomLink = QuillEditor.import('formats/link');
CustomLink.sanitize = function(url: string) {
  const protocol = url.slice(0, url.indexOf('://')).toLowerCase();
  if (['http', 'https', 'bbqapp'].includes(protocol)) {
    return url;
  }
  return 'about:blank';
};
QuillEditor.register(CustomLink, true);

const Editor = ({ placeholder, htmlStr: value, setHtmlStr: onChange, uploadUrl }: EditorProps) => {
  const editorRef = useRef<QuillRef>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (!editorRef.current) {
        return;
      }

      const file = input.files?.[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('imageFile', file);

      try {
        const res = await getAxios().post(uploadUrl || '/api/upload?type=notice', formData);
        const url = res.data.imageUrl;

        const editor = editorRef.current.getEditor();

        const range = editor.getSelection();

        editor.insertEmbed(range?.index ?? 0, 'image', url);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 413) {
          alert('파일 용량이 너무 큽니다.');
        }
      }
    };
  }, [editorRef]);

  useEffect(() => {
    const editor = editorRef.current?.editor;
    editor?.root.setAttribute('spellcheck', 'false');
  }, []);

  return (
    <EditorWrapper>
      <ReactQuill
        ref={editorRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              ['link', 'image', 'video'],
              [{ align: [] }, { color: [] }, { background: [] }],
              ['code-block', 'blockquote'],
              ['clean'],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'indent',
          'link',
          'image',
          'video',
          'align',
          'color',
          'background',
          'code-block',
          'font',
          'blockquote',
        ]}
      />
    </EditorWrapper>
  );
};

export default Editor;

const EditorWrapper = styled.div`
  height: 100%;
  .quill {
    height: calc(100% - 2.5rem);
  }
`;
