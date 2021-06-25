import React from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {

    let history = useHistory();

    // const goTo = (path) => {

    //     history.push(path);

    // }

    if(props.credentials.user?.name){

        return(
            <div className="homeContainer">

                <h1>SOY HOME</h1>
            </div>
        )
    }

    else {

        return(
            <div>PRUEBA</div>
        )
    }

}

export default connect((state) => ({

    credentials:state.credentials

    }))(Home);