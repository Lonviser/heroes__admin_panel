// src/components/heroesList/HeroesList.js
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Создаем мемоизированный селектор вне компонента
const filteredHeroesSelector = createSelector(
    [
        (state) => state.heroes.heroes,     // heroes
        (state) => state.filters.activeFilter  // activeFilter
    ],
    (heroes, activeFilter) => {
        if (activeFilter === 'all') {
            return heroes;
        } else {
            return heroes.filter(hero => hero.element === activeFilter);
        }
    }
);

const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const filteredHeroes = useSelector(filteredHeroesSelector);
    
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, []);

    const handleDelete = (id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE").then(() => {
            dispatch(heroDeleted(id));
        })
        .catch(err => {
            console.error("Ошибка удаления, ", err);
        });
    };

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem 
                key={id}
                id={id}
                {...props}
                onDelete={() => handleDelete(id)} />
        });
    };

    const elements = renderHeroesList(filteredHeroes);
    
    return (
        <ul>
            {elements}
        </ul>
    );
};

export default HeroesList;