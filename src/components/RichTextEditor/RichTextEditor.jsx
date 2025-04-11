import React, { useState, useEffect } from "react";

// draft.js
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const RichTextEditor = ({
	mainClassName,
	wrapperClassName,
	editorClassName,
	toolbarClassName,
	readOnly,
	label,
	toolbar,
	defaultValue,
	onChange,
}) => {
	const [editorState, setEditorState] = useState(() =>
		!defaultValue
			? EditorState.createEmpty()
			: EditorState.createWithContent(convertFromRaw(defaultValue))
	);

	// console.log(editorState);

	useEffect(() => {
		let raw = convertToRaw(editorState.getCurrentContent());
		onChange({ payload: raw, name: "info" });
	}, [editorState]);

	return (
		<div className={`${mainClassName}`}>
			{label && (
				<label className="label">
					<span className="label-text">Blog</span>
				</label>
			)}
			<div name="info">
				<Editor
					editorState={editorState}
					onEditorStateChange={setEditorState}
					wrapperClassName={wrapperClassName}
					editorClassName={editorClassName}
					toolbarClassName={toolbarClassName}
					placeholder="Blog info..."
					toolbar={toolbar}
					readOnly={readOnly}
					// options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
				/>
			</div>
		</div>
	);
};

export default RichTextEditor;
