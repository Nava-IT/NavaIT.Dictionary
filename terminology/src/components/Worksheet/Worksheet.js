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
    RadioGroup,
    Toolbar,
    AppBar
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useParams } from "react-router-dom";
import { worksheetService } from '../../__services__/worksheet.Service';
import { useForm } from "react-hook-form";
import FileUpload from '../FileUpload/file-upload.component';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    direction: 'ltr', // Both here and <body dir="rtl">
});
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];
const filter = createFilterOptions();


const Worksheet = () => {
    const { id } = useParams();
    const isAddMode = !id;

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, getValues, watch, errors, formState } = useForm();

    // worksheet state for form
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({
            [event.target.name]: event.target.value
        })
    }
    const handleAutocompleteChange = (event, newValues, title) => {
        // if (typeof newValue === 'string') {
        //     setValue("specializedGroupEquvalent", newValue);
        // }
        // else if (newValue && newValue.inputValue) {
        //     // Create a new value from the user input
        //     setValue("specializedGroupEquvalent", newValue.inputValue);
        // }
    }
    const onSubmit = (data) => {
        return isAddMode
            ? createWorksheet(data)
            : updateWorksheet(id, data)
    }
    const createWorksheet = (data) => {
        const worksheet = {
            id: uuid(),
            worksheetData: data
        }
        worksheetService.create(worksheet);
    }
    const updateWorksheet = (id, data) => {
        return worksheetService.update(id, data)
    }

    const updateUploadedFiles = (files) => {
        //setNewUserInfo({ ...newUserInfo, profileImages: files });
    }

    const handleClose = () => {
        navigate('/');
    }

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
        <Box sx={{ pb: 7 }} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        top: {
                            lg: 64,
                            md: 55,
                            xs: 48
                        },
                        width: {
                            lg: 'calc(100% - 240px)'
                        },
                        bgcolor: '#f1f4f7'

                    }}>
                    <Toolbar>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                m: -1,
                                flexGrow: 1
                            }}
                        >
                            <Box sx={{
                                m: 1
                            }}>
                                <Tooltip title={
                                    <React.Fragment>
                                        <Typography color="inherit">ذخیره</Typography>
                                        <br />
                                        {"ذخیره این کاربرگه."}
                                    </React.Fragment>
                                }>
                                    <Button
                                        type="submit"
                                        size="large"
                                        startIcon={(<SaveIcon />)}
                                    >
                                        ذخیره
                                    </Button>
                                </Tooltip>
                                <Tooltip title={
                                    <React.Fragment>
                                        <Typography color="inherit">جدید</Typography>
                                        <br />
                                        {"ایجاد کاربرگه جدید."}
                                    </React.Fragment>
                                }>
                                    <Button
                                        size="large"
                                        startIcon={(<AddIcon />)}
                                    >
                                        جدید
                                    </Button>
                                </Tooltip>
                                <Tooltip title={
                                    <React.Fragment>
                                        <Typography color="inherit">حذف</Typography>
                                        <br />
                                        {"حذف این کاربرگه."}
                                    </React.Fragment>
                                }>
                                    <Button
                                        size="large"
                                        startIcon={(<DeleteIcon />)}
                                    >
                                        حذف
                                    </Button>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title="قبلی">
                                    <IconButton aria-label="previous-record">
                                        <ArrowUpwardIcon color='primary' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="بعدی">
                                    <IconButton aria-label="Next-record">
                                        <ArrowDownwardIcon color='primary' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="خروج">
                                    <IconButton aria-label="close" onClick={handleClose}>
                                        <CloseIcon color='primary' />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Typography
                        color="textPrimary"
                        variant='h4'
                        sx={{ mb: 1, mt: 7 }}>
                        {isAddMode ? 'کاربرگه جدید' : 'ویرایش کاربرگه'}
                    </Typography>
                </Box>


                <Card
                    sx={{ mb: 2 }}>
                    <CardContent>
                        <Grid
                            container
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant='h6'
                                >
                                    حوزه:
                                </Typography>
                                <Autocomplete
                                    {...register("scope")}
                                    disablePortal
                                    id="scope"
                                    options={top100Films}
                                    onChange={(event, newValue) => {
                                        setValue("scope", newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
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
                                        <Autocomplete
                                            multiple
                                            id="specializedGroupEquvalent"
                                            dir="ltr"
                                            options={top100Films}
                                            // getOptionLabel={(option) => option.label}

                                            {...register("specializedGroupEquvalent")}
                                            onChange={(event, newValue) => handleAutocompleteChange(newValue,id )}
                                            filterOptions={(options, params) => {
                                                const filtered = filter(options, params);

                                                const { inputValue } = params;
                                                // Suggest the creation of a new value
                                                const isExisting = options.some((option) => inputValue === option.label);
                                                if (inputValue !== '' && !isExisting) {
                                                    filtered.push({
                                                        inputValue,
                                                        label: `افزودن "${inputValue}"`,
                                                    });
                                                }

                                                return filtered;
                                            }}
                                            selectOnFocus
                                            clearOnBlur
                                            handleHomeEndKeys
                                            getOptionLabel={(option) => {
                                                // Value selected with enter, right from the input
                                                if (typeof option === 'string') {
                                                    return option;
                                                }
                                                // Add "xxx" option created dynamically
                                                if (option.inputValue) {
                                                    return option.inputValue;
                                                }
                                                // Regular option
                                                return option.label;
                                            }}
                                            renderOption={(props, option) => <li {...props}>{option.label}</li>}
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
                                        <RadioGroup
                                            aria-labelledby="selectionType"
                                            row
                                            {...register('selectionType')}

                                        >
                                            <FormControlLabel
                                                id="selectionType"
                                                control={<Radio
                                                    checked={getValues("selectionType") === '0'}
                                                    onChange={(event, newValue) => {
                                                        setValue("selectionType", '0');
                                                    }}
                                                />}

                                                label="برگزيده"
                                            />
                                            <FormControlLabel
                                                value="1"
                                                id="selectionType"
                                                control={<Radio
                                                    checked={getValues("selectionType") === '1'}
                                                    onChange={(event, newValue) => {
                                                        setValue("selectionType", newValue ? '1' : '0');
                                                    }} />}

                                                label="نوگزيده"
                                            />
                                            <FormControlLabel
                                                value="2"
                                                id="selectionType"
                                                control={<Radio
                                                    checked={getValues("selectionType") === '2'}
                                                    onChange={(event, newValue) => {
                                                        setValue("selectionType", '3');
                                                    }}
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
                                            onChange={(event, newValue) => {
                                                setValue("construction", newValue);
                                            }}
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

                                            onChange={(event, newValue) => {
                                                setValue("witness", newValue);
                                            }}
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
                                                    id="term"
                                                    dir="ltr"
                                                    options={top100Films}
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register("term")}
                                                    onChange={(event, newValue) => {
                                                        setValue("term", newValue);
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
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register("abbreviation")}
                                                    onChange={(event, newValue) => {
                                                        setValue("abbreviation", newValue);
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
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register('tradeName')}
                                                    onChange={(event, newValue) => {
                                                        setValue("tradeName", newValue);
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
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register('scientificName')}
                                                    onChange={(event, newValue) => {
                                                        setValue("scientificName", newValue);
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
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register('vulgarName')}
                                                    onChange={(event, newValue) => {
                                                        setValue("vulgarName", newValue);
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

                                            onChange={(event, newValue) => {
                                                setValue("definition", newValue);
                                            }}
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

                                            onChange={(event, newValue) => {
                                                setValue("example", newValue);
                                            }}
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
                                            id="references"
                                            options={top100Films}
                                            getOptionLabel={(option) => option.label}
                                            filterSelectedOptions
                                            {...register('references')}
                                            onChange={(event, newValue) => {
                                                setValue("references", newValue);
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

                                                    onChange={(event, newValue) => {
                                                        setValue("grammaticalCategory", newValue);
                                                    }}
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

                                                    onChange={(event, newValue) => {
                                                        setValue("etymology", newValue);
                                                    }}
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
                                                    id="synonyms"
                                                    options={top100Films}
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register('synonyms')}
                                                    onChange={(event, newValue) => {
                                                        setValue("synonyms", newValue);
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
                                            getOptionLabel={(option) => option.label}
                                            filterSelectedOptions
                                            {...register('persianLanguageEquvalent')}
                                            onChange={(event, newValue) => {
                                                setValue("persianLanguageEquvalent", newValue);
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
                                            getOptionLabel={(option) => option.label}
                                            filterSelectedOptions
                                            {...register('groupEquvalent')}
                                            onChange={(event, newValue) => {
                                                setValue("groupEquvalent", newValue);
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
                                            getOptionLabel={(option) => option.label}
                                            filterSelectedOptions
                                            {...register('commonWord')}
                                            onChange={(event, newValue) => {
                                                setValue("commonWord", newValue);
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

                                            onChange={(event, newValue) => {
                                                setValue("description", newValue);
                                            }}
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
                                                    id="derivations"
                                                    options={top100Films}
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register('derivations')}
                                                    onChange={(event, newValue) => {
                                                        setValue("derivations", newValue);
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
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register('compounds')}
                                                    onChange={(event, newValue) => {
                                                        setValue("compounds", newValue);
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
                                                    getOptionLabel={(option) => option.label}
                                                    filterSelectedOptions
                                                    {...register('relatedTerms')}
                                                    onChange={(event, newValue) => {
                                                        setValue("relatedTerms", newValue);
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

                                                onChange={(event, newValue) => {
                                                    setValue("pattern1", newValue);
                                                }}
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

                                                onChange={(event, newValue) => {
                                                    setValue("pattern2", newValue);
                                                }}
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

                                                onChange={(event, newValue) => {
                                                    setValue("pattern3", newValue);
                                                }}
                                                {...register('pattern3')}
                                                value={values.pattern3}
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
                                    <FileUpload
                                        accept=".jpg,.png,.jpeg"
                                        // label="تصاویر مرتبط"
                                        multiple
                                        updateFilesCb={updateUploadedFiles}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card >
            </form >
        </Box>

    )
}

export default Worksheet;