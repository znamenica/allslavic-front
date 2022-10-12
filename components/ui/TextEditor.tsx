import JoditEditor from "jodit-react";
import React, {useEffect, useMemo, useRef, useState} from "react";

const TextEditor = ({ onChange, defaultContent }) => {
    const editor = useRef(null)
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...'
    }), []);

    useEffect(() => {
        onChange(content)
    }, [content]);

    useEffect(() => {
        if (defaultContent) {
            setContent(defaultContent);
        }
    }, [defaultContent]);

    return <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => setContent(newContent)}
        onChange={newContent => {}}
    />;
}

export default TextEditor;
