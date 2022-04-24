import {
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
}
    from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { worksheets } from '../../__mocks__/worksheet';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    direction: 'ltr', // Both here and <body dir="rtl">
});

const Worksheetlist = () => {
    const [selectedWorksheetIds, setSelectedWorksheetIds] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    const handlePageChange = (even, newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    const handleSelectAll = (event) => {
        let newSelectedWorksheetIds = [];
        if (event.target.checked) {
            newSelectedWorksheetIds = worksheets.map((worksheet) => worksheet.id)
        }
        setSelectedWorksheetIds(newSelectedWorksheetIds);
    }
    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedWorksheetIds.indexOf(id);
        let newSelectedWorksheetIds = [];

        if (selectedIndex === -1) {
            newSelectedWorksheetIds = newSelectedWorksheetIds.concat(selectedWorksheetIds, id);
        } else if (selectedIndex === 0) {
            newSelectedWorksheetIds = newSelectedWorksheetIds.concat(selectedWorksheetIds.slice(1));
        } else if (selectedIndex === (selectedWorksheetIds.length - 1)) {
            newSelectedWorksheetIds = newSelectedWorksheetIds.concat(selectedWorksheetIds.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelectedWorksheetIds = newSelectedWorksheetIds.concat(
                selectedWorksheetIds.slice(0, selectedIndex),
                selectedWorksheetIds.slice(selectedIndex + 1)
            );
        }

        setSelectedWorksheetIds(newSelectedWorksheetIds);
    };
    const handleEditIconClick = (e, id) => {
        navigate(`./worksheet/${id}`);
    }
    const handleDeleteIconClick = (e) => {
        
    }
    const handleStarIconClick = (e) => {
        
    }
    return (
        <Card>
            <Box sx={{ minWidth: 1050 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedWorksheetIds.length === worksheets.length}
                                    color="primary"
                                    onChange={handleSelectAll}
                                    indeterminate={selectedWorksheetIds.length > 0 &&
                                        selectedWorksheetIds.length !== worksheets.length} />
                            </TableCell>
                            <TableCell>
                                مدخل
                            </TableCell>
                            <TableCell>
                                حوزه
                            </TableCell>
                            <TableCell>
                                معادل پيشنهادي گروه تخصصي
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {worksheets.slice((page * rowsPerPage), ((page + 1) * rowsPerPage)).map((worksheet) => (
                            <TableRow
                                hover
                                key={worksheet.id}
                            >
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        checked={selectedWorksheetIds.indexOf(worksheet.id) !== -1}
                                        onChange={(event) => handleSelectOne(event, worksheet.id)}
                                        value="true" />

                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textprimary"
                                        variant="body1">
                                        {worksheet.term}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textprimary"
                                        variant="body1">
                                        {worksheet.scope}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color="textprimary"
                                        variant="body1">
                                        {worksheet.specializedGroupEquvalent}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton name="edit" onClick={(e)=>handleEditIconClick(e, worksheet.id)}>
                                        <EditIcon color="disabled" fontSize="small" />
                                    </IconButton>
                                    <IconButton name="delete" onClick={handleDeleteIconClick('delete')}>
                                        <DeleteIcon color="disabled" fontSize="small" />
                                    </IconButton>
                                    <IconButton name="star" onClick={handleStarIconClick('star')}>
                                        <StarOutlineOutlinedIcon color="disabled" fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <ThemeProvider theme={theme}>
                    <div dir="ltr">
                        <TablePagination

                            component="div"
                            count={worksheets.length}
                            page={page}
                            onPageChange={handlePageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage} />
                    </div>
                </ThemeProvider>
            </Box>
        </Card>

    );
}

export default Worksheetlist;