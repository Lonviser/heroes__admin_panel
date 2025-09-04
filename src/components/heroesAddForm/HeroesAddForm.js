

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { heroAdded } from "../../actions";

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [heroName, setHeroName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            const hero = {
                id: uuidv4(),
                name: heroName,
                description,
                element
            }

            dispatch(heroAdded(hero));

            setHeroName('');
            setDescription('');
            setElement('');
        }

    return (
        <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4" >Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                        onChange={(e) => setElement(e.target.value)}
                    >
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary" >Создать</button>
        </form>
    )
}

export default HeroesAddForm;