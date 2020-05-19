import React from 'react'

import { Modal, } from 'react-bootstrap';
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
                        <i class="fa fa-times search-icon-modal" aria-hidden="true"></i>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-inline d-flex justify-content-center md-form form-sm active-pink-2 mt-2">
                        <input class="form-control form-control-sm mr-3 w-75 search-input" type="text" placeholder="Search" aria-label="Search" onChange={(e) => { this.setState({ searchTerm: e.target.value }) }} />
                        <Link to={{ pathname: "/search", state: this.state }} onClick={handleClose}><i class="fa fa-search search-icon-modal" aria-hidden="true"></i></Link>
                    </div>
                    <div class="row justify-content-center">
                        <div class="post-footer text-right pt-5">
                            <button className={"search-btn search-all mx-2 " + (this.state.category === "all" ? "selected" : "")} onClick={() => { this.selectCategory('all') }}>All</button>
                            <button className={"search-btn search-article mx-2 " + (this.state.category === "articles" ? "selected" : "")} onClick={() => { this.selectCategory('articles') }}>Article</button>
                            <button className={"search-btn search-cards mx-2 " + (this.state.category === "cards" ? "selected" : "")} onClick={() => { this.selectCategory('cards') }}>Cards</button>
                            <button className={"search-btn search-tests mx-2 " + (this.state.category === "tests" ? "selected" : "")} onClick={() => { this.selectCategory('tests') }}>Tests</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}