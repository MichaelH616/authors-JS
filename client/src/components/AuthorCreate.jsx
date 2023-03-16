import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AuthorCreate = (props) => {
    const navigate = useNavigate();
    const { allAuthors, setAllAuthors } = props;

    const [author, setAuthor] = useState({
        name: '',
    })

    const [ errors, setErrors ] = useState([])

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
            axios.post('http://localhost:8000/api/authors', author)
                .then(res => {
                    setAllAuthors([...allAuthors], res.data);
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
                <h4 className='text-center'>Add a new author:</h4>
                {errors.name ? <p className='text-danger text-center'>{errors.name}</p> : ''}
                <form action='' onSubmit={submitHandler} className='form col-4 offset-4'>
                    <div className='form-group'>
                        <label htmlFor="" className='form-label'>Author Name:</label>
                        <input type='text' name='name' className='form-control' onChange={changeHandler}/>
                        <Link className='m-2 btn border btn-success' to={'/'}>Cancel</Link>
                        <button className='btn btn-success'>Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AuthorCreate