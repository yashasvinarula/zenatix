import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles.css';
import TextInput from '../TextInput';

class SearchBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchvalue: '',
            results: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleChange = e => {
        if(e.keycode === 13){
            this.search();
        }else{
            this.setState({searchvalue: e.target.value}, () => this.search());
        }
    }

    search = () => {
        const {searchvalue} = this.state;
        const {words} = this.props;
        const keywords = searchvalue.trim().split(' ');
        const results = [];
        if(searchvalue.trim().length > 0){
            for(let word of words){
                let temp = [];
                let highlights = [];
                let flag = false;
                for(let keyword of keywords){
                    let temphighlight = []
                    const pattern = word.value.trim().toLowerCase().match(keyword.trim().toLowerCase());
                    if(pattern){
                        temphighlight = [pattern.index, pattern.index + keyword.length]
                        flag = true;
                    }
                    temphighlight.length > 0 && highlights.push(temphighlight);
                }
                let finalValue = '';
                let j = 0;
                flag && highlights.forEach(hl => {
                    while(j<hl[0]){
                        finalValue += word.value[j];
                        j += 1
                    }
                    finalValue += '<mark>'
                    while(j<hl[1]){
                        finalValue += word.value[j];
                        j += 1
                    }
                    finalValue += '</mark>'
                });
                while(flag && j<word.value.length){
                    finalValue += word.value[j];
                    j += 1;
                }
                flag && temp.push({...word, highlights: highlights, finalValue: finalValue});
                temp.length > 0 && results.push(...temp);
            }
            this.setState({results});
        }
    }

    clear = () => {
        this.setState({searchvalue: ''});
    }

    render() {
        const {results, searchvalue} = this.state;
        return (
            <div className = 'search-container'>
                <TextInput 
                    name = 'search' 
                    placeholder = 'Search for a value'
                    value = {searchvalue}
                    onChange = {this.handleChange}
                    onSubmit = {this.search} 
                    onClear = {this.clear}
                />           
                {
                    searchvalue.trim().length > 0 && results.length > 0 && (
                        <ul className = 'search-results'>
                            {
                                results.map(result => (
                                    <li key = {result.id} className = 'result'>
                                        {
                                            <div dangerouslySetInnerHTML={{ __html: result.finalValue }}></div>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }     
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {...state}
}

export default connect(mapStateToProps, null)(SearchBox);