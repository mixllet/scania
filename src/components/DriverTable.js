import React, { useMemo } from 'react';
import { useTable } from 'react-table';
//import DATASET from '../DataStorage/dataset.json';
import { COLUMNS } from './tableColumns';
import '../css/table.css'


export const DriverTable = (props) => {

  const tableInstance = useTable( 
    {
      columns: COLUMNS,
      data: props.data
    }
  );
  
  // use table instance to render 
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

  return (
    <table {...getTableProps()} id="driverTable">

      <thead>
        { headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map( (column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps}>
        {rows.map( (row) => {
          if(!row.original.filtered) { // actual filter
            prepareRow(row) 
            return (
              <tr className="scaniaTableRow" {...row.getRowProps()}>
                {
                  row.cells.map( cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
              </tr>
            )}
          }
        )}
      </tbody>
    </table>

  )
}
