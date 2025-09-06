import './Quiz.css'

const Quiz = () => {
    return (
        <div className='container'>
            <h1>Викторина</h1>
            <hr />
            <h2>1. Какое устройство является основным для создания домашней Wi-Fi сети?</h2>
            <ul>
                <li>Монитор</li>
                <li>Маршрутизатор</li>
                <li>Клавиатура</li>
                <li>Принтер</li>
            </ul>
            <button>Далее</button>
            <div className="index">1 из 5 вопросов</div>
        </div>
    )
}

export default Quiz