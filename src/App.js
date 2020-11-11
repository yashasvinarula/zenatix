import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'

import {Provider, connect} from 'react-redux';
import storeConfig from './store';

import SearchBox from './components/SearchBox';
import List from './components/List';

import {setWords} from './actions';

const { store, persistor } = storeConfig();

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: true,
        };
    }

    componentWillMount(){
        store.dispatch(setWords());
    }

    changeVisibility = () => {
        const {visible} = this.state;
        this.setState({visible: !visible});
    }

    render() {
        const {visible} = this.state;
        return (
            <Provider store = {store}>
                <PersistGate loading={null} persistor={persistor}>
                    <div>
                        <button className = 'toggle' onClick = {this.changeVisibility}>
                            {visible ? 'Add a word' : 'Search for a word'}
                        </button>
                        {
                            visible ? <SearchBox /> : <List />
                        }
                    </div>
                </PersistGate>
            </Provider>
        )
    }
}

export default App;