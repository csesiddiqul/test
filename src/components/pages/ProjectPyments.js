import React from 'react';
import { MDBDataTable } from 'mdbreact';

const ProjectPayments = () => {
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Position',
        field: 'position',
        sort: 'asc',
        width: 270
      },
     
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
      },
      
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      larage
      data={data}
    />
  );
}

export default ProjectPayments;