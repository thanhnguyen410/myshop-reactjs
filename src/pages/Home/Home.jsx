import React, { useState, useEffect } from 'react'
import FilterPanel from 'src/components/FilterPanel/FilterPanel'
import SearchItemResult from 'src/components/SearchItemResult/SearchItemResult'
import * as S from './home.style'
import { useDispatch } from 'react-redux'
import { getCategories, getProducts } from './home.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import useQuery from 'src/hooks/useQuery'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({})
  const [filters, setFilters] = useState({})

  const query = useQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .then(categories => {
        setCategories(categories?.data || [])
      })
  }, [dispatch])

  useEffect(() => {
    const _filters = {
      ...query,
      page: query.page || 1,
      limit: query.limit || 15
    }

    setFilters(_filters)
    const params = {
      page: _filters.page,
      limit: _filters.limit,
      category: _filters.category,
      exclude: _filters.exclude,
      rating_filter: _filters.rating,
      price_max: _filters.maxPrice,
      price_min: _filters.minPrice,
      sort_by: _filters.sortBy || 'view',
      order: _filters.order,
      name: _filters.name
    }

    dispatch(getProducts(params))
      .then(unwrapResult)
      .then(res => {
        setProducts(res?.data || [])
      })
  }, [dispatch, query])

  return (
    <div>
      <S.Container className="container">
        <S.Side>
          <FilterPanel categories={categories} filters={filters} />
        </S.Side>
        <S.Main>
          <SearchItemResult products={products} filters={filters} />
        </S.Main>
      </S.Container>
    </div>
  )
}
