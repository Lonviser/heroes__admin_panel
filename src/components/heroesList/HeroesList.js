// src/components/heroesList/HeroesList.js
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation(); 

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = heroes.filter(hero => {
        return activeFilter === 'all' ? true : hero.element === activeFilter;
    });

    const handleDelete = useCallback((id) => {
        deleteHero(id) 
            .unwrap()  
            .catch(err => {
                console.error("Ошибка удаления героя:", err);
            });
    }, [deleteHero]);

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => (
            <HeroesListItem
                key={id}
                id={id}
                {...props}
                onDelete={() => handleDelete(id)}
            />
        ));
    };

    const elements = renderHeroesList(filteredHeroes);

    return <ul>{elements}</ul>;
};

export default HeroesList;