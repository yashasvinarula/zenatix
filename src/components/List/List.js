import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles.css';

import TextInput from '../TextInput';

import {addWord} from '../../actions';


class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            addvalue: '',
            words: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount(){
        this.setState({words: this.props.words});
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return ({words: nextProps.words});
    }

    handleChange = e => {
        this.setState({addvalue: e.target.value});
    }

    add = () => {
        this.props.addWord(this.state.addvalue.trim());
        this.setState({addvalue: ''});
    }

    clear = () => {
        this.setState({addvalue: ''})
    }

    render() {
        const {addvalue, words} = this.state;
        return (
            <div>
                <div className = 'search-container'>
                    <TextInput 
                        name = 'add' 
                        placeholder = 'Add a value to the list'
                        value = {addvalue}
                        onChange = {this.handleChange}
                        onSubmit = {this.add} 
                        onClear = {this.clear}
                        />
                </div>
                <center><h1>List of words</h1></center>
                <div className = 'list-component'>
                   {
                       words.reverse().map(word => (
                           <div className = 'list-item'>
                               {word.value}
                           </div>
                       ))
                   }     
                </div>   
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        words: state.words
    }
}

export default connect(mapStateToProps, {addWord})(List);