import { Fragment } from "react";

import HomeProcedureCard from "./home-procedure-card/home-procedure-card.component";

import './home-procedure.styles.scss';

const HomeProcedure = () => {
    return (
        <Fragment>
            <h2 className='home-title'>
                FEATURED PROCEDURE
            </h2>
            <hr className='home-divider'/>
            <div className='home-procedure-container container'>
                <div className='row'>
                    <div className='col-md-4 col-sm-12'>
                        <HomeProcedureCard title='facial' />
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <HomeProcedureCard title='breast' />
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <HomeProcedureCard title='body' />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default HomeProcedure;