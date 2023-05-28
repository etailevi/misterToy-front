import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CustomPagination({ filterBy, pageCount, onChangePageIdx }) {

    const handlePageChange = (event, page) => {
        console.log(page)
        onChangePageIdx(page - 1);
    };

    React.useEffect(() => {
    }, [filterBy.pageIdx, pageCount]);

    return (
        <section className='paging-container'>
            <Stack spacing={5}>
                <Pagination
                    count={+pageCount}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                            icon={item.type === 'previous' ? '<' : item.type === 'next' ? '>' : null}
                        />
                    )}
                />
            </Stack>
        </section>
    );
}