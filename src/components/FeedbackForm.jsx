import Card from "./shared/Card"
import { useState, useContext } from 'react';
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
    
    const[text, setText] = useState('')
    const[rating, setRating] = useState(10)
    const[btnDisabled, setBtnDisabled] = useState(true)
    const[message, setMessage] = useState('')
    const {addFeedback} = useContext(FeedbackContext)

    const handleTextChange = (e) => {
        if(e.target.value === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (e.target.value.trim() !== '' && e.target.value.trim().length < 10) {
            setBtnDisabled(true)
            setMessage(`Must be at least 10 characters, ${10 - e.target.value.trim().length} to go`)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }
            addFeedback(newFeedback)
            setText('')
            setBtnDisabled(true)
        }
    }
  return (

        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would your rate your service?</h2>
                {/* @todo - rating select componenet */}
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" value={text} placeholder='Write a review' />
                    <Button type='submit' isDisabled={btnDisabled}>Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>

  )
}
export default FeedbackForm