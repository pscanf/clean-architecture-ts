import React from "react";

interface IProps {
    onCreateTodo(title: string): void;
}
interface IState {
    title: string;
}
export default class NewTodoInput extends React.Component<IProps, IState> {
    state = { title: "" };
    render() {
        const { title } = this.state;
        const { onCreateTodo } = this.props;
        return (
            <section>
                <input
                    value={title}
                    onChange={evt => this.setState({ title: evt.target.value })}
                />
                &nbsp;
                <button
                    onClick={() => {
                        onCreateTodo(title);
                        this.setState({ title: "" });
                    }}
                >
                    {"Create Todo"}
                </button>
            </section>
        );
    }
}
