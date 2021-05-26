import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import PageWrapper from '../../common/PageWrapper';
import Loading from '../../common/Loading';
import GenericTable from '../../common/GenericTable';
import { CATEGORIES_QUERY } from './model';

const CategoriesList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [orderByField, setOrderByField] = useState('category.id');
  const [orderByDirection, setOrderByDirection] = useState('desc');

  const { data, loading, error } = useQuery(CATEGORIES_QUERY, {
    variables: {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
      orderBy: { field: orderByField, direction: orderByDirection },
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log({ error });
  }

  const categories = data.categories || [];
  const totalRows = data.categories_count || categories.length;
  const fields = [
    {
      systemName: 'id',
      displayName: 'ID',
      isKey: true,
      link: '/categories',
      type: 'number',
    },
    {
      systemName: 'name_en',
      displayName: 'English Name',
      type: 'string',
    },
    {
      systemName: 'name_gr',
      displayName: 'Greek Name',
      type: 'string',
    },
    {
      systemName: 'created_at',
      displayName: 'Created At',
      type: 'datetime',
    },
    {
      systemName: 'updated_at',
      displayName: 'Updated At',
      type: 'datetime',
    },
    {
      systemName: 'author',
      displayName: 'Author',
      type: 'ref',
      field: 'username',
    },
  ];

  return (
    <PageWrapper title="Categories" newPath="/categories/new">
      <GenericTable
        entity="category"
        fields={fields}
        rows={categories}
        totalRows={totalRows}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        orderByField={orderByField}
        setOrderByField={setOrderByField}
        orderByDirection={orderByDirection}
        setOrderByDirection={setOrderByDirection}
      />
    </PageWrapper>
  );
};

export default CategoriesList;
