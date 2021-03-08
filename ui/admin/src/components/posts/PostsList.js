import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import PageWrapper from '../../common/PageWrapper';
import Loading from '../../common/Loading';
import GenericTable from '../../common/GenericTable';
import { POSTS_QUERY } from './model';

const PostsList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [orderByField, setOrderByField] = useState('post.id');
  const [orderByDirection, setOrderByDirection] = useState('desc');

  const { data, loading, error } = useQuery(POSTS_QUERY, {
    variables: {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
      orderBy: { field: orderByField, direction: orderByDirection },
    },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log({ error });
  }

  const posts = data.posts || [];
  const totalRows = data.posts_count || posts.length;
  const fields = [
    {
      systemName: 'id',
      displayName: 'ID',
      isKey: true,
      link: '/posts',
      type: 'number',
    },
    {
      systemName: 'title_en',
      displayName: 'English Title',
      type: 'string',
    },
    {
      systemName: 'title_gr',
      displayName: 'Greek Title',
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
    <PageWrapper title="Posts" newPath="/posts/new">
      <GenericTable
        entity="post"
        fields={fields}
        rows={posts}
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

export default PostsList;
