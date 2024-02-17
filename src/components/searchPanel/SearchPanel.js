import './SearchPanel.scss'
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import {useState } from 'react'
import {Link} from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import * as Yup from 'yup'
import ErrorMessage from '../error/Error';

const SearchPanel = () => {
    const [character,setCharacter] = useState(null)
    
    const {loading,error,getCharacterByName,clearError} = useMarvelService()


    const updateCharacter = (name) => {
        clearError()
         getCharacterByName(name)
         .then(res => setCharacter(res))
    }

    const ErrorMessages = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null;
    const results = !character ? null : character.length > 0 ? 
        <div className='result'>
          <div  className='result-message'>
             <p>{`There is! Visit ${character[0].name} page?`}</p>
          </div>
          <Link to = {`/characters/${character[0].id}`} className="button button__secondary">
            <div className='inner'>To page</div>
            </Link>
          </div> : 
          <div className='error-messages'>The character was not found.
          Check the name and try again</div>
        
    
        
    return (
        <Formik
         initialValues={{
            Charname:'',
         }}
         validationSchema={Yup.object({
            Charname:Yup.string()
            .required('This field is required')
         })}
         onSubmit={ ({Charname}) => {
             updateCharacter(Charname)
         }}
         >
        <div className="search-panel">
            <div className="container-panel">
                <div className="search-panel-label">
                    <h3>Or find a character by name:</h3>
                </div>
                <Form className = 'input-button__search'>
                    <Field 
                    className="input-search"
                    type='text'
                    placeholder='Enter name'
                    name='Charname'/>
                    <button
                     type = 'submit'
                     disabled = {loading}
                    className="button button__main">
                        <div className='inner'>Find</div>
                    </button>
               <FormikErrorMessage component='div' className='char__search-error' name = 'charName'/>
                </Form>
            </div>
            {ErrorMessages}
            {results}
        </div>
        </Formik>
    )
}

export default SearchPanel;