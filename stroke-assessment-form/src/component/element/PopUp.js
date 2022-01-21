import React from 'react'

export default function PopUp({title, description, modal}) {
    return (  
        <div className="modal" id='myModal'>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-blue-50 p-2">
                    <div className="modal-header">
                        <h5 className="modal-title border-bottom sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-700">{title}</h5>
                        <button className="btn-close" data-bs-dismiss={modal}></button>
                    </div>
                    <br />
                    <div className="modal-body leading-loose font-semibold sm:text-md md:text-lg lg:text-xl capitalize ">
                        <p>{description}</p>
                    </div>
                    <br />
                    <div className="modal-footer text-blue-50">
                        <button className="btn bg-blue-500 hover:bg-blue-700 text-blue-50 hover:text-blue-50 sm:w-full md:w-1/2 lg:w-1/3" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
