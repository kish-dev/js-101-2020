import React, {FunctionComponent, FormEvent, useRef} from 'react';

type MainControlsProps = {
    addNewTodo: (text: string) => void,
    markAllReady: () => void,
}


export const MainControls: FunctionComponent<MainControlsProps> = (props: MainControlsProps) => {
    const inputRef: React.RefObject<HTMLInputElement> = useRef < HTMLInputElement > (null);
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputRef) {

            const input: HTMLInputElement = inputRef.current
            as
            HTMLInputElement;
            const itemAddToNewTodo = input.value.trim();
            input.value = ''
            props.addNewTodo(itemAddToNewTodo)

        }
    }

    return (
        <section className="todo-app__main-controls main-controls">
            <div className="main-controls__select-all">
                <button
                    className="main-controls__select-all-button"
                    title="Select all tasks"
                    onClick={props.markAllAsReady}
                >
                    Select all tasks
                </button>
            </div>
            <form
                className="main-controls__create-new"
                onSubmit={onSubmit}
            >
                <input
                    ref={_inputRef}
                    type="text"
                    className="main-controls__create-new-input"
                    placeholder="What needs to be done?"
                    aria-label="Add new item"
                    autoFocus={true}
                />
            </form>
        </section>
    );
};
