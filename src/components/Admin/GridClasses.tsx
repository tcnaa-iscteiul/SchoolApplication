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
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useAppSelector } from '../../hooks/use-redux';
import { IClass } from '../../interfaces/IClass';
import Title from './Title';
import Modal from '../UI/Modal';
import useAxios from '../../hooks/use-axios';
import LoadingSpinner from '../UI/LoadingSpinner';

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
  const [rows, setRows] = React.useState(formatClasses);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );
  const [success, setSuccess] = React.useState<string>();
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const params = {
    method: '',
    url: '',
    data: {},
  };

  const { error, loading, sendData } = useAxios(params);

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
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
      setSuccess('Class removes with success');
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log(newRow);

    params.method = 'Patch';
    params.url = 'class';
    if (newRow) {
      params.data = {
        name: newRow.name,
        description: newRow.description,
        startDate: newRow.startDate,
        endDate: newRow.endDate,
      };
    }
    sendData();
    setShowModal(true);
    return updatedRow;
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
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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

  return (
    <React.Fragment>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || success || 'Something went wrong!'}
          title={error ? 'error' : 'Success'}
        />
      )}
      <Title>All Classes</Title>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </React.Fragment>
  );
}
