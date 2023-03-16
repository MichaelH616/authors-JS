import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AuthorEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [author, setAuthor] = useState({})

    const [errors, setErrors] = useState([])

    const [authorNotFoundError, setAuthorNotFoundError] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                setAuthor(res.data);
            })
            .catch(err => {
                console.log(err);
                setAuthorNotFoundError("We're sorry, but we could not find the author you are looking for. Would you like to add an author to our database?");
            })
    }, [id]);

    const changeHandler = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value })
    }

    const formValidator = () => {
        const isValid = true
        if (author.name.length < 3) {
            return false
        }
        return isValid
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (formValidator()) {
            axios.put(`http://localhost:8000/api/authors/${id}`, author)
                .then(res => {
                    console.log(res);
                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            setErrors({
                name: "Author name must be at least 3 characters long."
            })
        }
    }

    return (
        <div className='container'>
            <h1>Favorite authors</h1>
            <div>
                <Link to='/'>Home</Link>
                <br />
                {!authorNotFoundError ?
                    <div>
                        <h4 className='text-center'>Edit this author:</h4>
                        {errors.name ? <p className='text-danger text-center'>{errors.name}</p> : ''}
                        <form action='' onSubmit={submitHandler} className='form col-4 offset-4'>
                            <div className='form-group'>
                                <label htmlFor="" className='form-label'>Author Name:</label>
                                <input type='text' name='name' className='form-control text-capitalize' value={author.name} onChange={changeHandler} />
                                <Link className='m-2 btn border btn-success' to={'/'}>Cancel</Link>
                                <button className='btn btn-success'>Submit</button>
                            </div>

                        </form>
                    </div>

                    : <h2 className='my-3 text-center'>{authorNotFoundError} <Link to='/new'>Add an author</Link></h2>
                }
            </div>

        </div>
    )
}

export default AuthorEdit