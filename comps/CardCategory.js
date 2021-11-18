import React from 'react'
import Link from 'next/link';
import { Card, CardContent, Typography, Box, CardActionArea} from '@material-ui/core';

function CardCategory({category}) {
    return (
        <Card sx={{width:'320px', height:'150px'}}>
            <CardActionArea>
            <Link href="/[...slug]" as={`/${category.url_key}.html`}>
            <Box display="flex" sx={{justifyContent:'space-between'}}>
                <CardContent>
                <Typography component="div" variant="body2">
                    {category.name}
                </Typography>
                </CardContent>
                <img style={{ width: '50%'}} src={category.image ? category.image : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'} alt={category.id}/>
            </Box>
            </Link>
            </CardActionArea>
        </Card>
    )
}

export default CardCategory
