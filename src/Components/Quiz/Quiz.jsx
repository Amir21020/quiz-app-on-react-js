import { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

function Quiz() {
    
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState(data[index])
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)
    
    const option1 = useRef(null)
    const option2 = useRef(null)
    const option3 = useRef(null)
    const option4 = useRef(null)

    const optionArray = [option1, option2, option3, option4]

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct")
                setLock(true)
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong")
                setLock(true)
                // Показываем правильный ответ
                optionArray[question.ans - 1].current.classList.add("correct")
            }
        }
    }

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                // Если это последний вопрос, показываем результаты
                setResult(true)
            } else {
                // Переходим к следующему вопросу
                setIndex(prevIndex => prevIndex + 1)
                setQuestion(data[index + 1])
                setLock(false)
                // Сбрасываем стили вариантов ответов
                optionArray.forEach(option => {
                    option.current.classList.remove("wrong")
                    option.current.classList.remove("correct")
                })
            }
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
        // Сбрасываем стили вариантов ответов
        optionArray.forEach(option => {
            if (option.current) {
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
            }
        })
    }

    return (
        <div className='container'>
            <h1>Викторина</h1>
            <hr />
            {result ? (
                <div className="result">
                    <h2>Результаты</h2>
                    <h3>Вы набрали {score} из {data.length} баллов</h3>
                    <p>Процент правильных ответов: {Math.round((score / data.length) * 100)}%</p>
                    <button onClick={reset}>Начать заново</button>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={next} disabled={!lock}>
                        {index === data.length - 1 ? 'Завершить' : 'Далее'}
                    </button>
                    <div className="index">{index + 1} из {data.length} вопросов</div>
                </>
            )}
        </div>
    )
}

export default Quiz