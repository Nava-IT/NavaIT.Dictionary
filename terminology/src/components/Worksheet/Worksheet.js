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
import { useForm } from "react-hook-form";


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

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, getValues, watch, errors, formState } = useForm();

    // worksheet state for form
    const [values, setValues] = useState({});

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
    const onSubmit = (data) => {
        //data.preventDefault();
        return isAddMode
            ? createWorksheet(data)
            : updateWorksheet(id, data)
    }
    const createWorksheet = (data) => {
        const worksheet = {
            id: uuid(),
            worksheetData: values
        }
        worksheetService.create(worksheet);
    }
    const updateWorksheet = (id, data) => {
        return worksheetService.update(id, data)
    }

    // const handleClose = () => {
    //     navigate('/');
    // }

    // effect runs on component mount
    useEffect(() => {
        if (!isAddMode) {
            // simulate async api call with set timeout
            setTimeout(() => {
                //get worksheet and set form fields
                const worksheet = worksheetService.getById(id);

                const fields = [
                    'specializedGroupEquvalent',
                    'scope',
                    'selectionType',
                    'term',
                    'abbreviation',
                    'tradeName',
                    'scientificName',
                    'vulgarName',
                    'grammaticalCategory',
                    'construction',
                    'witness',
                    'etymology',
                    'synonyms',
                    'derivations',
                    'compounds',
                    'relatedTerms',
                    'definition',
                    'example',
                    'references',
                    'persianLanguageEquvalent',
                    'groupEquvalent',
                    'commonWord',
                    'description',
                    'pattern1',
                    'pattern2',
                    'pattern3'
                ];
                fields.forEach(field => {
                    setValue(field, worksheet[field])
                });

            }, 1000);
        }
    }, []);
    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
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
                                        // onChange={handleChange}
                                        {...register("specializedGroupEquvalent", { required: true })}
                                        // value={values.specializedGroupEquvalent}
                                        variant="outlined" />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}>
                                    <RadioGroup
                                        aria-labelledby="selectionType"
                                        row
                                        name="selectionType"
                                        
                                    >
                                        <FormControlLabel
                                            value="0"
                                            {...register('selectionType')}
                                                                                        control={<Radio
                                                checked={0 === '0'}
                                                onChange={handleChange}
                                            />}
                                            label="برگزيده"
                                        />
                                        <FormControlLabel
                                            value="1"
                                            {...register('selectionType')}
                                            control={<Radio
                                                checked={0 === '1'}
                                                onChange={handleChange} />}
                                            label="نوگزيده"
                                        />
                                        <FormControlLabel
                                            value="2"
                                            {...register('selectionType')}
                                            control={<Radio
                                                checked={0 === '2'}
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
                                        {...register('construction')}
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
                                        {...register('witness')}
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
                                                name="term"
                                                id="term"
                                                dir="ltr"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('term')}
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
                                                name="abbreviation"
                                                id="abbreviation"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('abbreviation')}
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
                                                name="tradeName"
                                                id="tradeName"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('tradeName')}
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
                                                name="scientificName"
                                                id="scientificName"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('scientificName')}
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
                                                name="vulgareName"
                                                id="vulgarName"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('vulgarName')}
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
                                        {...register('definition')}
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
                                        name="example"
                                        onChange={handleChange}
                                        {...register('example')}
                                        value={values.example}
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
                                        name="references"
                                        id="references"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        {...register('references')}
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
                                                {...register('grammaticalCategory')}
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
                                                {...register('etymology')}
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
                                                name="synonyms"
                                                id="synonyms"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('synonyms')}
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
                                        name="persianLanguageEquvalent"
                                        id="persianLanguageEquvalent"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        {...register('persianLanguageEquvalent')}
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
                                        name="groupEquvalent"
                                        id="groupEquvalent"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        {...register('groupEquvalent')}
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
                                        name="commonWord"
                                        id="commonWord"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        {...register('commonWord')}
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
                                        {...register('description')}
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
                                                name="derivations"
                                                id="derivations"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('derivations')}
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
                                                name="compounds"
                                                id="compounds"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('compounds')}
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
                                                name="relatedTerms"
                                                id="relatedTerms"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                {...register('relatedTerms')}
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
                                            {...register('pattern1')}
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
                                            {...register('pattern2')}
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
                                            {...register('pattern3')}
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
                        disabled={formState.isSubmitting}
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