import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

export default function GenericTable({ tableData, columns, pageSize, pagination }) {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [data, setData] = useState(tableData);
  const [range, setRange] = useState({ start: 0, end: 50 });
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // const handlePageChange = (e) => {
  //   console.log(e.target.id);
  //   const currentPage = e.target.id;
  //   setPage(e.target.id);
  //   if (page === 1) {
  //     setRange({ start: 0, end: 50 });
  //   } else {
  //     console.log('Start', range, range.end * currentPage, range.end * currentPage + pageSize);
  //     setRange((prev) => {
  //       const previous = { ...prev };
  //       return { ...previous, start: range.end * page, end: previous.end + 50 };
  //     });
  //   }
  // };

  // useEffect(() => {
  //   console.log('rangle', range);
  //   const paginatedData = tableData.slice(range.start, range.end);
  //   setData(paginatedData);
  // }, [range, page]);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  // Generic sort function based on column and direction
  const sortData = (key) => {
    const sortedData = [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (key === 'name') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      } else if (key === 'prep_time' || key === 'cook_time') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setData(sortedData);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    setSortColumn(key);
  };

  return (
    <div>
      <Table sortable arial-label="Default table" style={{ minWidth: '510px' }}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.key}
                onClick={column.sortable ? () => sortData(column.key) : undefined}
                style={{ cursor: column.sortable ? 'pointer' : 'default' }}
              >
                {column.label}
                {sortColumn === column.key && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} onClick={() => navigate(`/foods/${item.name}`, { state: { name: item.name } })}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.ingredients}</TableCell>
              <TableCell>{item.diet}</TableCell>
              <TableCell>{item.prep_time}</TableCell>
              <TableCell>{item.cook_time}</TableCell>
              <TableCell>{item.flavor_profile}</TableCell>
              <TableCell>{item.course}</TableCell>
              <TableCell>{item.state}</TableCell>
              <TableCell>{item.region}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pagination && <Pagination pageSize={pageSize} data={tableData} />}
    </div>
  );
}
