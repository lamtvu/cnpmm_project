import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/editor.css';

const toolbarOption = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
}

const TextEditor = ({ onEditorStateChange, editorState }) => {
    return (
        <Editor
            wrapperClassName='border-2'
            editorClassName='px-4'
            editorStyle={{ minHeight: '300px' }}
            onEditorStateChange={onEditorStateChange}
            editorState={editorState}
            toolbar={toolbarOption}
        />
    )
}

export default React.memo(TextEditor);
