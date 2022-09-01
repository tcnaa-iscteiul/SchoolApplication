import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridPreProcessEditCellProps,
  GridCellEditStopParams,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useAppSelector } from '../../hooks/use-redux';
import { IClass } from '../../interfaces/IClass';
import Title from './Title';
import Modal from '../UI/Modal';
import useAxios from '../../hooks/use-axios';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Fragment, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert, { AlertProps } from '@mui/material/Alert';
import { getBackdropUtilityClass } from '@mui/material';

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
  const [id, setId] = useState<string>();

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const params = {
    method: '',
    url: '',
    data: {},
  };

  const { error, loading, sendData } = useAxios(params);

  const handleRowEditStop = (newCell: GridCellEditStopParams) => {
    console.log(newCell);
    const row = rows.find((r) => r.id === newCell.id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    processRowUpdate(rows.find((row) => row.id === newCell.id)!);
  };

  const handleEditClick = (id: GridRowId) => () => {
    console.log('clicked');
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    console.log('edit');

    params.method = 'Patch';
    params.url = 'class';
    const newRow = rows.find((row) => row.id === id);
    const today = new Date();
    const timeEnd = new Date(newRow?.endDate);
    const startDate = new Date(newRow?.startDate);
    const validationEndTime = timeEnd.getTime() <= today.getTime();
    const validationStartTime = startDate.getTime() <= today.getTime();

    let updatedRow = { name: '', description: '', startDate: '', endDate: '' };
    if (validationEndTime) {
      updatedRow = {
        name: newRow?.name,
        description: newRow?.description,
        startDate: newRow?.startDate,
        endDate: newRow?.endDate,
      };
    } else if (validationStartTime) {
      updatedRow = {
        name: newRow?.name,
        description: newRow?.description,
        startDate: newRow?.startDate,
        endDate: '',
      };
    } else {
      updatedRow = {
        name: newRow?.name,
        description: newRow?.description,
        startDate: '',
        endDate: '',
      };
    }

    const { name, description, sDate, endDate } = Object.fromEntries(
      Object.entries({
        name: updatedRow.name,
        description: updatedRow?.description,
        startDate: updatedRow?.startDate,
        endDate: updatedRow?.endDate,
      }).filter(([v]) => v != null && v !== ''),
    );

    params.data = {
      name: name,
      description: description,
      startDate: sDate,
      endDate: endDate,
    };
    //  sendData();
    //  setShowModal(true);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const name = rows.find((row) => {
      if (row.id === id) return row.name;
    });
    params.method = 'Delete';
    params.url = 'class';
    if (name) {
      params.data = { name: name.name };
      sendData();
      setShowModal(true);
      setSuccess('Class removed with success');
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const oldRow = rows.filter((row) => row.id === newRow.id);

    console.log();
    console.log(oldRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleErrorEvent: GridEventListener<'componentError'> = (
    params, // any
    event, // MuiEvent<{}>
    details, // GridCallbackDetails
  ) => {
    setSnackbar({ children: 'Field is not valid', severity: 'error' });
  };

  const renderConfirmDialog = () => {
    return (
      <Dialog maxWidth="xs" open={true}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>No</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const columns: GridColumns = [
    { field: 'name', headerName: 'Name', width: 180, editable: false },
    {
      field: 'description',
      headerName: 'Description',
      width: 180,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length < 5;
        console.log(hasError);
        hasError
          ? setSnackbar({ children: 'Field is not valid', severity: 'error' })
          : setSnackbar({
              children: 'User successfully saved',
              severity: 'success',
            });
        return { ...params.props, error: hasError };
      },
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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [pageSize, setPageSize] = useState<number>(5);

  const handleCloseSnackbar = () => setSnackbar(null);
  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || success || 'Something went wrong!'}
          title={error ? 'Error' : 'Success'}
        />
      )}
      <Title>All Classes</Title>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={rows.length === 0 ? true : false}
        editMode="cell"
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        onError={handleErrorEvent}
        onCellDoubleClick={(params) => {
          console.log(params);
        }}
        onCellEditStop={(params, event) => {
          console.log(event);
        }}
        onCellEditCommit={(params, event) => {
          console.log(params, event);
        }}
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
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Fragment>
  );
}
