

import React from 'react';
import {useLocation} from "react-router-dom";
import {Recipy} from "../model/recipies.model";




const RecipyDetails = ()=> {


    const location = useLocation();

    const item: Recipy = location.state;
    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Detail Product</h1>
            </div>
            {/* End Page Title */}
            <section className="section contact">
                <div className="row gy-4">
                    <div className="row gy-4">
                        <div className="row">
                            <div className="card mb-3">

                                <img src="https://kreconcept.fr/wp-content/uploads/2022/11/KRE_bg_espace_cuisine.jpg" className="full-width-image " alt={item.name} />

                                <div>
                                    <h5 className="card-title">{item.name}
                                        <h6 > (Can be booked only by 4  people)</h6>
                                        <div className="button-container">
                                            <button type="button" className="right-button" data-bs-toggle="modal"
                                                    data-bs-target="#fullscreenModal" style={{ textAlign: 'right' }}>
                                                Open calendar
                                            </button>
                                        </div></h5>

                                </div>

                                <p className="card-text">
                                    {item.ingredients[0]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default RecipyDetails;

