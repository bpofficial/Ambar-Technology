import React from 'react';
import { Link } from 'react-router-dom'

export default ({title, parent}) => { 
    return (
        <div className="breadcrumb-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="page-title">
                            <h2>{title}</h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb" className="theme-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={`${process.env.PUBLIC_URL}`}>Home</Link>
                                </li>
                                { parent ? <li className="breadcrumb-item" aria-current="page">{ parent }</li> : '' }
                                { 
                                    typeof title == 'string' ? <li className="breadcrumb-item active" aria-current="page">{ title }</li> :
                                    typeof title == 'object' ? title.map((name, i) => {
                                        return <li key={i} className="breadcrumb-item active" aria-current="page">{ name }</li>
                                    }) : <></>
                                }
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}