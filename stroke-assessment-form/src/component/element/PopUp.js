import React from 'react'

export default function PopUp({title, description, modal}) {
    return (  
        <div class="modal" id='myModal'>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title border-bottom">{title}</h5>
                        <button className="btn-close" data-bs-dismiss={modal}></button>
                    </div>
                    <br />
                    <div className="modal-body">
                        <p>{description}</p>
                    </div>
                    <br />
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
