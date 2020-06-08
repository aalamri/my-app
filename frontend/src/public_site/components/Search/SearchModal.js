import React from 'react'

import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default class SearchModal extends React.Component {

    state = {
        category: 'all',
        searchTerm: ''
    }

    componentDidMount() {
    }

    selectCategory = (category) => {
        this.setState({ category });
    }

    render() {
        const { show, handleClose } = this.props

        return (
            <Modal show={show} onHide={handleClose} className='search-modal'>
                <Modal.Header className={"justify-content-end"}>
                    <div onClick={handleClose}>
                        <i className="fa fa-times search-icon-modal" aria-hidden="true"></i>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-inline d-flex justify-content-center md-form form-sm active-pink-2 mt-2">
                        <input className="form-control form-control-sm mr-3 w-75 search-input" type="text" placeholder="Search" aria-label="Search" onChange={(e) => { this.setState({ searchTerm: e.target.value }) }} />
                        <Link to={{ pathname: "/search", state: this.state }} onClick={handleClose}><i className="fa fa-search search-icon-modal" aria-hidden="true"></i></Link>
                    </div>
                    <div className="row justify-content-center">
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
} 
