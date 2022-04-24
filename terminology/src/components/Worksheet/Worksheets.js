import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Worksheetlist from './WorksheetList';
import WorksheetToolbar from './WorksheetToolbar';
const Worksheet = () => {
    return ( 
        <Box
        sx={{
            flexGrow:1,
            py: 8
        }}>
            <Container maxWidth={false}>
                <WorksheetToolbar/>
                <Box sx={{mt: 3}}>
                    <Worksheetlist/>
                </Box>
            </Container>

        </Box>
     );
}
 
export default Worksheet;