import React from 'react';
import PropTypes from 'prop-types';
import fromUnixTime from 'date-fns/fromUnixTime';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import RouterLink from './RouterLink';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bold: {
    fontWeight: 'bold',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

const GenericTable = ({
  entity,
  fields,
  rows,
  totalRows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  orderByField,
  setOrderByField,
  orderByDirection,
  setOrderByDirection,
}) => {
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOrderingChange = (event) => {
    if (!event.target.id) return;

    if (orderByField === event.target.id) {
      setOrderByField(event.target.id);
      setOrderByDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setOrderByField(event.target.id);
      setOrderByDirection('desc');
    }
  };

  const renderCell = (field, index, row) => {
    if (field.isKey) {
      return (
        <TableCell key={index} component="th" scope="row">
          <RouterLink to={`${field.link}/${row[`${field.systemName}`]}`}>
            {row[`${field.systemName}`]}
          </RouterLink>
        </TableCell>
      );
    }
    switch (field.type) {
      case 'ref':
        return (
          <TableCell key={index}>
            {row[`${field.systemName}`][`${field.field}`]}
          </TableCell>
        );
      case 'date': {
        return (
          <TableCell key={index}>
            {row[`${field.systemName}`]
              ? format(
                  fromUnixTime(row[`${field.systemName}`] / 1000),
                  'dd/MM/yyyy'
                )
              : '-'}
          </TableCell>
        );
      }
      case 'datetime': {
        return (
          <TableCell key={index}>
            {row[`${field.systemName}`]
              ? format(
                  fromUnixTime(row[`${field.systemName}`] / 1000),
                  'dd/MM/yyyy HH:mm:ss'
                )
              : '-'}
          </TableCell>
        );
      }
      default:
        return <TableCell key={index}>{row[`${field.systemName}`]}</TableCell>;
    }
  };

  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {fields.map((field, index) => (
                <TableCell
                  key={index}
                  className={classes.bold}
                  sortDirection={
                    orderByField === `${entity}.${field.systemName}`
                      ? orderByDirection
                      : false
                  }
                >
                  <TableSortLabel
                    id={`${entity}.${field.systemName}`}
                    active={orderByField === `${entity}.${field.systemName}`}
                    direction={
                      orderByField === `${entity}.${field.systemName}`
                        ? orderByDirection
                        : 'desc'
                    }
                    onClick={handleOrderingChange}
                  >
                    {field.displayName}
                    {orderByField === field.systemName ? (
                      <span className={classes.visuallyHidden} />
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row[`${fields.find((field) => field.isKey).systemName}`]}
              >
                {fields.map((field, index) => renderCell(field, index, row))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

GenericTable.propTypes = {
  entity: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  orderByField: PropTypes.string.isRequired,
  setOrderByField: PropTypes.func.isRequired,
  orderByDirection: PropTypes.string.isRequired,
  setOrderByDirection: PropTypes.func.isRequired,
};

export default GenericTable;
