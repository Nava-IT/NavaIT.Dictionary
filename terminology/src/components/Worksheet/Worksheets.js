import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import WorksheetToolbar from './WorksheetToolbar';
import Grid from '../UI/Grid/Grid';
import { worksheets } from '../../__mocks__/worksheet';
import { useNavigate } from 'react-router-dom';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'term',
        headerName: 'مدخل',
        width: 150,
        editable: true,
    },
    {
        field: 'scope',
        headerName: 'حوزه',
        width: 150,
        editable: true,
    },
    {
        field: 'specializedGroupEquvalent',
        headerName: 'معادل پیشنهادی گروه تخصصی',
        width: 160,
        editable: true,
    },
    {
        field: 'selectionType',
        headerName: 'نوع گزینش',
        sortable: false,
        width: 160,
    },
    {
        field: 'definition',
        headerName: 'تعریف',
        sortable: false,
        width: 160,
        editable: true,
    },
];


const Worksheet = () => {
    const navigate = useNavigate();
    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        navigate(`./worksheet/${param.id}`);
    };
    return (
        <Box
            sx={{
                flexGrow: 1,
                py: 8
            }}>
            <Container maxWidth={false}>
                <WorksheetToolbar />
                <Box sx={{ mt: 3 }}>
                    <Grid
                        columns={columns}
                        rows={worksheets}
                        rowDoubleClicked={handleRowClick} />
                </Box>
            </Container>

        </Box>
    );
}

export default Worksheet;