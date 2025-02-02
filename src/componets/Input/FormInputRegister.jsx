import React from "react";
import PropTypes from "prop-types";

class FormInputRegister extends React.Component {
    state = {
        name: "",
        email: "",
        password: ""
    };

    onChangeInputHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onSubmitRegisterHandler = (e) => {
        e.preventDefault();
        this.props.register(this.state);
    };

    render() {
        return (
            <form onSubmit={this.onSubmitRegisterHandler}>
                <label htmlFor="name">Name (*)</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeInputHandler}
                    placeholder="Masukan name....."
                    required
                />

                <label htmlFor="email">Email (*)</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeInputHandler}
                    placeholder="Masukan email....."
                    required
                />

                <label htmlFor="password">Password (*)</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    autoComplete="current-password"
                    onChange={this.onChangeInputHandler}
                    placeholder="Masukan password"
                    required
                />

                <button type="submit">Register</button>
            </form>
        );
    }
}

FormInputRegister.propTypes = {
    register: PropTypes.func.isRequired,
};

export default FormInputRegister;