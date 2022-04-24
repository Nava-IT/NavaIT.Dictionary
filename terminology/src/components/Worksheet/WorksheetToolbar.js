import { Button, Card, CardContent, InputAdornment, SvgIcon, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { useNavigate } from 'react-router-dom';

const WorksheetToolbar = () => {
    const navigate = useNavigate();
    const handleOpenNewWorksheet = () => {
        // this.props.history.push('./worksheetdetail');
        navigate('/worksheet');
    }
    return (
        <Box>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1
                }}
            >
                <Typography
                    sx={{ m: 1 }}
                    variant="h4">
                    کاربرگه‌ها
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        startIcon={(<UploadIcon fontSize="small" />)}>
                        برون‌ریزی
                    </Button>
                    <Button
                        startIcon={(<DownloadIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        درون‌ریزی
                    </Button>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={handleOpenNewWorksheet}
                    >
                        افزودن کاربرگه
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{ mt: 1 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                placeholder='جستجوی کاربرگه'
                                variant='outlined'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                color="action"
                                                fontSize="small"
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default WorksheetToolbar;
