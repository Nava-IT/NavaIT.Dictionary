import {
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    Autocomplete,
    Box,
    Button,
    Radio,
    RadioGroup
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useParams } from "react-router-dom";
import { worksheetService } from '../../__services__/worksheet.Service';


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

const Worksheet = () => {
    const { id } = useParams();
    const isAddMode = !id;

    const [values, setValues] = useState({
        specializedGroupEquvalent: '',
        scope: '',
        selectionType: '',
        term: [],
        abbreviation: [],
        tradeName: [],
        scientificName: [],
        vulgarName: [],
        grammaticalCategory: '',
        construction: '',
        witness: '',
        etymology: '',
        synonyms: [],
        derivations: [],
        compounds: [],
        relatedTerms: [],
        definition: '',
        example: '',
        references: [],
        persianLanguageEquvalent: [],
        groupEquvalent: [],
        commonWord: [],
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
    // const handleAutoCompleteChange = (event, newValues) => {
    //     setValues({
    //         ...values,
    //         [event.target.name]: newValues
    //     })
    // }
    const handleSubmit = (event) => {
        event.preventDefault();
        const worksheet = {
            id: uuid(),
            worksheetData: values
        }
        worksheetService.create(worksheet);
    }
    // const handleClose = () => {
    //     navigate('/');
    // }

    useEffect(() => {
        if (!isAddMode) {
            //get worksheet and set form fields
            const worksheet = worksheetService.getById(id);
            worksheet.forEach()
            setValues(worksheet);
            console.log("result", worksheet)
        }
    }, []);
    return (
        <form
            onSubmit={handleSubmit}
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
                                        معادل پيشنهادي گروه تخصصي:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="specializedGroupEquvalent"
                                        onChange={handleChange}

                                        value={values.specializedGroupEquvalent}
                                        variant="outlined" />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    {/* <Typography
                                        color="textPrimary"
                                        gutterBottom
                                        variant='h6'
                                    >
                                        Selection Type:
                                    </Typography> */}
                                    <RadioGroup
                                        aria-labelledby="selectionType"
                                        row
                                        name="selectionType"
                                    >
                                        <FormControlLabel
                                            value="0"
                                            control={<Radio
                                                checked={values.selectionType === '0'}
                                                onChange={handleChange}
                                            />}
                                            label="برگزيده"
                                        />
                                        <FormControlLabel
                                            value="1"
                                            control={<Radio
                                                checked={values.selectionType === '1'}
                                                onChange={handleChange} />}
                                            label="نوگزيده"
                                        />
                                        <FormControlLabel
                                            value="2"
                                            control={<Radio
                                                checked={values.selectionType === '2'}
                                                onChange={handleChange}
                                            />}
                                            label="نوساخته"
                                        />
                                    </RadioGroup>
                                </Grid>

                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    <Divider />
                                    <Typography
                                        color='textPrimary'
                                        gutterBottom
                                        variant='h6'>
                                        ساخت‌واژه:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name='construction'
                                        onChange={handleChange}

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
                                        شاهد:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name='witness'
                                        onChange={handleChange}

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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        term: newValue
                                                    }
                                                    );
                                                }}
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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        abbreviation: newValue
                                                    }
                                                    );
                                                }}
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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        tradeName: newValue
                                                    }
                                                    );
                                                }}
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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        scientificName: newValue
                                                    }
                                                    );
                                                }}
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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        vulgarName: newValue
                                                    }
                                                    );
                                                }}
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
                                        تعريف:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="definition"
                                        onChange={handleChange}

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
                                        مثال:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="Example"
                                        onChange={handleChange}

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
                                        مراجع:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="references"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        onChange={(event, newValue) => {
                                            setValues({
                                                ...values,
                                                references: newValue
                                            }
                                            );
                                        }}
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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        synonyms: newValue
                                                    }
                                                    );
                                                }}
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
                                        معادل‌هاي موجود در زبان فارسي:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="persianLanguageEquvalent"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        onChange={(event, newValue) => {
                                            setValues({
                                                ...values,
                                                persianLanguageEquvalent: newValue
                                            }
                                            );
                                        }}
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
                                        معادل‌هاي مطرح‌شده در گروه:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="groupEquvalent"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        onChange={(event, newValue) => {
                                            setValues({
                                                ...values,
                                                groupEquvalent: newValue
                                            }
                                            );
                                        }}
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
                                        واژة رايج در زبان فارسي:
                                    </Typography>
                                    <Autocomplete
                                        multiple
                                        id="commonWord"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        onChange={(event, newValue) => {
                                            setValues({
                                                ...values,
                                                commonWord: newValue
                                            }
                                            );
                                        }}
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
                                        ملاحظات:
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="description"
                                        onChange={handleChange}

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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        derivations: newValue
                                                    }
                                                    );
                                                }}
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
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        compounds: newValue
                                                    }
                                                    );
                                                }}
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
                                                id="relatedTerms"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        relatedTerms: newValue
                                                    }
                                                    );
                                                }}
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
                                        <TextField
                                            fullWidth
                                            name="pattern1"
                                            onChange={handleChange}

                                            value={values.pattern1}
                                            variant="outlined"
                                            multiline
                                            rows={4} />
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
                                        <TextField
                                            fullWidth
                                            name="pattern2"
                                            onChange={handleChange}

                                            value={values.pattern2}
                                            variant="outlined"
                                            multiline
                                            rows={4} />
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
                                        <TextField
                                            fullWidth
                                            name="pattern3"
                                            onChange={handleChange}

                                            value={values.pattern3}
                                            variant="outlined"
                                            multiline
                                            rows={4} />
                                    </div>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"

                    >
                        ذخیره
                    </Button>
                    {/* <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                        onCahnge={handleClose}
                    >
                        بازگشت
                    </Button> */}
                </Box>
            </Card >
        </form >
    )
}

export default Worksheet;