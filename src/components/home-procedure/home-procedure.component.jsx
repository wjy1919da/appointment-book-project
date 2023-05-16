import { Fragment } from "react";

import HomeProcedureCard from "./home-procedure-card/home-procedure-card.component";

import './home-procedure.styles.scss';
// feature grid 需要改, container 和 procedure 外层的一样
// container 能否 抽离出来？？？
const HomeProcedure = () => {
    return (
        <Fragment>
            <h2 className='home-title'>
                FEATURED PROCEDURE
            </h2>
            <hr className='home-divider'/>
            <div className='home-procedure-container container'>
                <div className='colum'>
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