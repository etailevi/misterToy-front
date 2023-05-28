import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react'

export default function ToySort({ sortBy, setSortBy }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        setSortBy(sortByToEdit)
    }, [sortByToEdit])


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (field === 'desc') setSortByToEdit(prevSort => ({ ...prevSort, desc: -(prevSort.desc) }))
        else setSortByToEdit((prevSort) => ({ ...prevSort, [field]: value }))
    }

    return (
        <section className='toy-sort'>
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ width: 100 }}>
                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="type"
                        value={sortByToEdit.type}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="name">name</MenuItem>
                        <MenuItem value="createdAt">Created At</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                    </Select>
                </FormControl>
                <label className='descending-checkbox'>
                    <input type="checkbox" name="desc" checked={sortByToEdit.desc > 0} onChange={handleChange} />
                    Descending
                </label>
            </Box>
        </section>
    );
}