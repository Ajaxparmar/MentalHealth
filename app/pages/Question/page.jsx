"use client"
import { useEffect,useState } from "react"
export default function Question() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetch("http://localhost:3000/api/Question");
            const data = await response.json();
            setQuestions(data.questions);

        };

        getQuestions();
        
    }, [])

        console.log(questions)


    return (
        <>
           {questions.map((index,value)=>{
            return(
                <div className="question-container" key={value}>
                <h1 className="question-title">{index.question}</h1>
                <p className="question-description">
                   <input type="radio" /> {index.optionA}
                    </p>
                <p className="question-description">
                    <input type="radio" />  {index.optionB}
                    </p>
                <p className="question-description">
                    <input type="radio" />  {index.optionC}</p>
                <p className="question-description">
                    <input type="radio" /> {index.optionD}
                </p>

                </div>
            
            )
           })}
        </>
    )
}