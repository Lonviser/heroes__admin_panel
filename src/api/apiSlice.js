// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Heroes', 'Filters'], // 👈 Добавили тег для фильтров
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),
        getFilters: builder.query({ // 👈 НОВЫЙ ЭНДПОИНТ
            query: () => '/filters',
            providesTags: ['Filters']
        }),
        createHero: builder.mutation({
            query: (hero) => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: (id) => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })
    })
})

export const { 
    useGetHeroesQuery,
    useGetFiltersQuery,           // 👈 Экспортируем хук
    useCreateHeroMutation,
    useDeleteHeroMutation 
} = apiSlice;