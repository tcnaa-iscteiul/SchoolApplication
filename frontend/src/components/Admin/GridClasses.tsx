import * as React from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColumns,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { IClass } from '../../interfaces/IClass';
import Title from './Title';
import Modal from '../UI/Modal';
import useAxios from '../../hooks/use-axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Fragment, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import { fetchClassData } from '../../store/classesActions';
import { fetchUserClassData } from '../../store/menuActions';

export default function FullFeaturedCrudGrid() {
  const classes = useAppSelector((state) => state.classes.classes);
  const formatClasses: GridRowsProp = classes.map((item: IClass) => {
    return {
      id: randomId(),
      name: item.name,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
    };
  });
  const [rows, setRows] = useState(formatClasses);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [success, setSuccess] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [id, setId] = useState<string | number>();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const paramsAxios = {
    method: '',
    url: '',
    data: {},
  };

  const { error, loading, sendData } = useAxios(paramsAxios);

  const deleteClick = (id: GridRowId) => () => {
    setShowDialog(true);
    setId(id);
    const name = rows.find((row) => row.id === id);
    setSuccess(`Are you sure that you want to delete the class ${name?.name}?`);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const name = rows.find((row) => {
      if (row.id === id) return row.name;
    });
    paramsAxios.method = 'Delete';
    paramsAxios.url = 'class';
    if (name) {
      paramsAxios.data = { name: name.name };
      sendData();
      setShowModal(true);
      setSuccess('Class removed with success');
    }
    setShowDialog(false);
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    let updatedRow = { ...newRow, isNew: false };
    const oldRow = rows.filter((row) => row.id === newRow.id);
    let valid = false;
    const today = new Date();
    if (oldRow[0]?.description !== newRow.description) {
      const isValid =
        newRow.description !== '' &&
        newRow.description.length >= 15 &&
        newRow.description.length <= 100;
      valid = isValid;
    }
    if (oldRow[0]?.startDate !== newRow.startDate) {
      const startDate = new Date(newRow.startDate);
      const isValid =
        startDate.getTime() >= today.getTime() &&
        startDate.getTime() <= new Date(newRow.endDate).getTime();
      valid = isValid;
    }
    if (oldRow[0]?.endDate !== newRow.endDate) {
      const endDate = new Date(newRow.endDate);
      const isValid =
        endDate.getTime() >= today.getTime() &&
        endDate.getTime() >= new Date(newRow.startDate).getTime();
      valid = isValid;
    }

    if (valid) {
      //  setSnackbar({ children: 'Updated with success', severity: 'success' });
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      paramsAxios.data = {
        name: newRow.name,
        description: newRow.description,
        startDate: newRow.startDate,
        endDate: newRow.endDate,
      };
      paramsAxios.method = 'Patch';
      paramsAxios.url = 'class';
      sendData();
      setShowModal(true);
    } else {
      updatedRow = { ...oldRow, isNew: false };
    }
    return updatedRow;
  };

  const handleRowUpdateError = () => {
    setSnackbar({
      children: error !== '' ? error : 'Field is not valid',
      severity: 'error',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (error !== '') {
      dispatch(fetchClassData());
    }
  };

  const columns: GridColumns = [
    { field: 'name', headerName: 'Name', width: 180, editable: false },
    {
      field: 'description',
      headerName: 'Description',
      width: 180,
      editable: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      valueFormatter: ({ value }) => `${new Date(value).toDateString()}`,
      type: 'date',
      width: 220,
      editable: true,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      valueFormatter: ({ value }) => `${new Date(value).toDateString()}`,
      type: 'date',
      width: 220,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [pageSize, setPageSize] = useState<number>(5);

  const handleCloseSnackbar = () => {
    setSnackbar(null);
    if (snackbar?.severity === 'success' && error === '') {
      dispatch(fetchUserClassData());
    }
  };
  return (
    <Fragment>
      <Fragment>
        {loading && <LoadingSpinner />}
        {!loading && (
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            message={error || 'Updated with success'}
            title={error ? 'Error' : 'Success'}
          />
        )}
        {showDialog && (
          <Modal
            open={showDialog}
            onClose={() => {
              setShowDialog(false);
            }}
            message={success || ''}
            title={'Confirm'}
            button={true}
            onConfirm={
              id
                ? handleDeleteClick(id)
                : () => {
                    setShowDialog(false);
                  }
            }
          />
        )}{' '}
      </Fragment>
      <Title>All Classes</Title>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={10000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={rows.length === 0 ? true : false}
        editMode="cell"
        rowModesModel={rowModesModel}
        onProcessRowUpdateError={handleRowUpdateError}
        processRowUpdate={processRowUpdate}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        pagination={true}
        pageSize={pageSize}
        //autoPageSize={true}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        //rowsPerPageOptions={[5, 10, 15]}
        experimentalFeatures={{ newEditingApi: true }}
        isCellEditable={(params) => {
          const today = new Date();
          if (params.colDef.field === 'description') return true;
          else if (
            (params.colDef.field === 'startDate' ||
              params.colDef.field === 'endDate') &&
            new Date(
              params.getValue(params.id, params.colDef.field),
            ).getTime() > today.getTime()
          )
            return true;
          else return false;
        }}
      />
    </Fragment>
  );
}
