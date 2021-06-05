import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import PageWrapper from '../../common/PageWrapper';
import Loading from '../../common/Loading';
import GenericTable from '../../common/GenericTable';
import { SERVICES_QUERY } from './model';

const ServicesList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [orderByField, setOrderByField] = useState('service.id');
  const [orderByDirection, setOrderByDirection] = useState('desc');

  const { data, loading, error } = useQuery(SERVICES_QUERY, {
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

  const services = data.services || [];
  const totalRows = data.services_count || services.length;
  const fields = [
    {
      systemName: 'id',
      displayName: 'ID',
      isKey: true,
      link: '/services',
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
      systemName: 'price',
      displayName: 'Price',
      type: 'number',
    },
    {
      systemName: 'category',
      displayName: 'Category',
      type: 'ref',
      field: 'name_en',
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
    <PageWrapper title="Services" newPath="/services/new">
      <GenericTable
        entity="service"
        fields={fields}
        rows={services}
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

export default ServicesList;
