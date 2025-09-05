// src/components/heroesFilters/HeroesFilters.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters, setActiveFilter } from '../../actions';

const HeroesFilters = () => {
    // Обновленные селекторы для работы с разделенным состоянием
    const { filters } = useSelector(state => state.filters);
    const { activeFilter } = useSelector(state => state.filters);
    
    const dispatch = useDispatch();

    useEffect(() => {
        // Загружаем фильтры при монтировании компонента
        dispatch(fetchFilters());
    }, [dispatch]);

    // Обработчик смены активного фильтра
    const onFilterSelect = (filter) => {
        dispatch(setActiveFilter(filter));
    };

    // Функция для рендеринга кнопок фильтров
    const renderFilters = (filters) => {
        if (filters.length === 0) {
            return <h5>Фильтры не найдены</h5>;
        }

        // Маппинг фильтров на русские названия
        const filterNames = {
            'all': 'Все',
            'fire': 'Огонь',
            'water': 'Вода',
            'wind': 'Ветер',
            'earth': 'Земля'
        };

        // Маппинг классов кнопок
        const filterClasses = {
            'all': 'btn-outline-dark',
            'fire': 'btn-danger',
            'water': 'btn-primary',
            'wind': 'btn-success',
            'earth': 'btn-secondary'
        };

        return filters.map(filter => {
            const btnClass = `btn ${filterClasses[filter]} ${activeFilter === filter ? 'active' : ''}`;
            return (
                <button 
                    key={filter}
                    className={btnClass}
                    onClick={() => onFilterSelect(filter)}
                >
                    {filterNames[filter]}
                </button>
            );
        });
    };

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    );
};

export default HeroesFilters;