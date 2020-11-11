import React, { Component } from 'react';
import './styles.css';
import { FaSearch, FaTrash, FaPlus } from 'react-icons/fa';


class TextInput extends React.PureComponent {
    
    constructor(props){
        super(props);
        this.state = {
            value: '',
            name: '',
            placeholder: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.inputRef = React.createRef()
    }

    componentDidMount(){
        const {name, active} = this.props;
        this.setState({name, active});
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        return ({
            name: nextProps.name,
            value: nextProps.value,
            placeholder: nextProps.placeholder
        })
    }

    handleChange = e => {
        const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890, .';
        let flag = true;
        for(let i=0;i<e.target.value.length;i++){
            flag = allowed.includes(e.target.value[i]);
        }
        flag && this.props.onChange(e);
    }

    onSubmit = () => {
        this.state.value.trim().length > 0 && this.props.onSubmit();
    }

    handleKey = e => {
        if(e.keyCode === 13){
            this.onSubmit();
        }
        if(e.keyCode === 27){
            this.onClear();
        }
    }
   
    onClear = () => {
        this.props.onClear();
        this.inputRef.current.focus();
    }
 
    render() {
        const {name, value, placeholder} = this.state;
        return (
            <div className = 'input-container'>
                <input 
                    name = {name}
                    value = {value}
                    placeholder = {placeholder}
                    autoFocus = {true}
                    onChange = {this.handleChange}
                    onKeyUp = {this.handleKey}
                    ref = {this.inputRef}
                />
                <span 
                    className = 'input-icon'
                >
                    <FaTrash 
                        size = '1em'
                        onClick = {this.onClear}
                    />
                    {'\u00A0'}
                    {'\u00A0'}
                    {
                        name === 'add' ? (
                            <FaPlus 
                                size = '1em'
                                onClick = {this.onSubmit}
                            />
                        ) : (
                            <FaSearch 
                                size = '1em'
                                onClick = {this.onSubmit}
                            />
                        )
                    }
                    
                </span>
            </div>
        )
    }
}

export default TextInput;