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
        <div>
            <Editor
                wrapperClassName='h-96'
                editorClassName='px-4 border-2'
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
                toolbar={toolbarOption}
            />
        </div>
    )
}

export default React.memo(TextEditor);
