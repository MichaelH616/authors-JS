import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuthorMainPage = (props) => {

    const { allAuthors, setAllAuthors } = props;

    const removeFromDOM = id => {
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then((res) => {
                console.log(res.data)
                setAllAuthors(allAuthors.filter(product => product._id !== id));
            })
            .catch((err) => {
                console.log(err);
            })
        
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then((res) => {
                setAllAuthors(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className='container'>
            <h1>Favorite authors</h1>
            <div>
                <Link to='/new'>Add an author</Link>
                <h4>We have quotes by:</h4>
                <table className='table table-striped table-dark'>
                    <thead>
                        <tr>
                            <th scope='col'>Author</th>
                            <th scope='col'>Actions Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allAuthors.map((author) => {
                                return (
                                    <tr key={author._id}>
                                        <td className='text-capitalize'>{author.name}</td>
                                        <td>
                                            <Link className='mx-2 btn border btn-info' to={`/authors/edit/${author._id}`}>Edit</Link>
                                            <button className='btn border btn-danger' onClick={(e)=>{removeFromDOM(author._id)}}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuthorMainPage