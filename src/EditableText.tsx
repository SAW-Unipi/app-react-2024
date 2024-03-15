import { useRef, useState } from "react";

interface EditableTextProps {
    editing: boolean;
    defaultValue?: string;
    placeHolder?: string;
    onChange: (v: string) => void;
    onCancel: () => void;
    classes?: string;
}

export function EditableText({ classes, editing, defaultValue, placeHolder, onChange, onCancel }: EditableTextProps) {
    const text = useRef<HTMLInputElement>(null);

    const onKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && text.current!.value !== '') {
            onChange(text.current!.value);
            text.current!.value = '';
            return;
        }

        if (e.key === 'Escape') {
            onCancel();
            text.current!.value = '';
            return;
        }
    }

    return <>
        {editing
            ? <input ref={text}
                onKeyUp={onKeyUp}
                type="text"
                defaultValue={defaultValue}
                placeholder={placeHolder}
                className="text-input" />
            : <span className={classes ? `title ${classes}` : "title"}>{defaultValue}</span>
        }
    </>
}