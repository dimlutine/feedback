import Card from "./shared/Card"
import { useState } from 'react';
import Button from "./shared/Button";

function FeedbackForm() {
    const[text, setText] = useState('')
    const handleTextChange = (e) => {
        setText(e.target.value)
    }
  return (

        <Card>
            <form action="">
                <h2>How would your rate your service?</h2>
                {/* @todo - rating select componenet */}
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" value={text} placeholder='Write a review' />
                    <Button type='submit'>Send</Button>
                </div>
            </form>
        </Card>

  )
}
export default FeedbackForm