import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Grid(props) {

  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}