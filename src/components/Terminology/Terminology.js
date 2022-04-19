import {
    Card,
    CardContent,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    Autocomplete,
    Box,
    Table,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

const theme = createTheme({
    direction: 'ltr', // Both here and <body dir="rtl">
});
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 }
]

const Terminology = (peops) => {
    const [values, setValues] = React.useState({
        specializedGroupEquvalent: '',
        term: '',
        abbreviation: '',
        tradeName: '',
        scientificName: '',
        vulgarName: '',
        grammaticalCategory: '',
        construction: '',
        witness: '',
        etymology: '',
        synonyms: '',
        derivations: '',
        compounds: '',
        relatedTerms: '',
        definition: '',
        example: '',
        references: '',
        persianLanguageEquvalent: '',
        groupEquvalent: '',
        commomWord: '',
        description: '',
        pattern1: '',
        pattern2: '',
        pattern3: ''

    });
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    return (
        <form
            autoComplete='off'
        >
            <Card>
                <CardContent>
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <Grid
                            container

                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                                sx={{ p: 2, border: '1px solid grey' }}

                            >
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        The suggested equivalent of a specialized group:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="specializedGroupEquvalent"
                                        onChange={handleChange}
                                        required
                                        value={values.specializedGroupEquvalent}
                                        variant="outlined" />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Selection Type:
                                    </Typography>
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                color='primary'
                                            />
                                        )}
                                        label="selected"
                                    />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                color='primary'
                                            />
                                        )}
                                        label="Newly selected"
                                    />
                                    <FormControlLabel
                                        control={(
                                            <Checkbox
                                                color='primary'
                                            />
                                        )}
                                        label="Newly made"
                                    />
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    <Divider sx={{ borderColor: '#2D3748' }} />
                                    <Typography
                                        color='textPrimary'
                                        gutterBottom
                                        variant='h6'>
                                        Construction:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name='construction'
                                        onChange={handleChange}
                                        required
                                        value={values.construction}
                                        variant="outlined" />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    <Typography
                                        color='textPrimary'
                                        gutterBottom
                                        variant='h6'>
                                        Witness:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name='witness'
                                        onChange={handleChange}
                                        required
                                        value={values.witness}
                                        variant="outlined" />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                sx={{ p: 2, border: '1px solid grey' }}
                            >
                                <ThemeProvider theme={theme}>
                                    <div dir="ltr">
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>

                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'>
                                                term(en):
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="term"
                                                dir="ltr"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'>
                                                abbreviation:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="abbreviation"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'>
                                                trade name:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="tradeName"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'>
                                                scientific name:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="scientificName"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'>
                                                vulgar name:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="vulgarName"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                    </div>
                                </ThemeProvider>
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                                sx={{ p: 2, border: '1px solid grey' }}
                                mt={2}
                            >
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Definition:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="definition"
                                        onChange={handleChange}
                                        required
                                        value={values.definition}
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Example:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="Example"
                                        onChange={handleChange}
                                        required
                                        value={values.Example}
                                        variant="outlined"
                                        multiline
                                        rows={4} />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        References:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="references"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                            />
                                        )}
                                    />
                                </Grid>

                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                                sx={{ p: 2, border: '1px solid grey' }}
                                mt={2}
                            >
                                <ThemeProvider theme={theme}>
                                    <div dir="ltr">
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'
                                            >
                                                grammatical category:
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                name="grammaticalCategory"
                                                onChange={handleChange}
                                                required
                                                value={values.grammaticalCategory}
                                                variant="outlined"
                                            />

                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'
                                            >

                                                etymology:
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                name="etymology"
                                                onChange={handleChange}
                                                required
                                                value={values.etymology}
                                                variant="outlined"
                                                multiline
                                                rows={4} />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'
                                            >
                                                synonyms:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="synonyms"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </div>
                                </ThemeProvider>
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                                sx={{ p: 2, border: '1px solid grey' }}
                                mt={2}
                            >
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Persian Language Equvalent:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="persianLanguageEquvalent"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Group Equvalent:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="groupEquvalent"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Commom Word:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="commomWord"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Description:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="description"
                                        onChange={handleChange}
                                        required
                                        value={values.description}
                                        variant="outlined"
                                        multiline
                                        rows={4} />
                                </Grid>

                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                                sx={{ p: 2, border: '1px solid grey' }}
                                mt={2}
                            >
                                <ThemeProvider theme={theme}>
                                    <div dir="ltr">
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'
                                            >
                                                derivations:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="derivations"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}
                                        >
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'
                                            >
                                                compounds:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="compounds"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}>
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant='h6'
                                            >
                                                related terms:
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                id="related terms"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </div>
                                </ThemeProvider>
                            </Grid>

                            <Grid
                                item
                                md={12}
                                xs={12}
                                mt={3}>
                                <ThemeProvider theme={theme}>
                                    <div dir="ltr">
                                        <Typography
                                            color="textPrimary"
                                            gutterBottom
                                            variant='h6'
                                        >
                                            POINT-PATTERN ANALYSIS
                                        </Typography>
                                    </div>
                                </ThemeProvider>
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <ThemeProvider theme={theme}>
                                    <div dir="ltr">
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            name="pattern1"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.pattern1}
                                                            variant="outlined"
                                                            multiline
                                                            rows={3} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            name="pattern2"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.pattern2}
                                                            variant="outlined"
                                                            multiline
                                                            rows={3} />

                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            name="pattern3"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.pattern3}
                                                            variant="outlined"
                                                            multiline
                                                            rows={3} />

                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card >
        </form >
    )
}

export default Terminology;