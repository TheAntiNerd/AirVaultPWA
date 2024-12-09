import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number, children?: React.ReactNode },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex',  }}>
            <CircularProgress
                variant="determinate"
                sx={(theme) => ({
                    color: theme.palette.grey[200],
                    ...theme.applyStyles('dark', {
                        color: theme.palette.grey[800],
                    }),
                  
                })}
                size={260}
                
                thickness={3.5}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="determinate"
                disableShrink
                sx={(theme) => ({
                    color: '#75B6FF',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,

                    ...theme.applyStyles('dark', {
                        color: '#46BEFA',
                    }),
                })}
                size={260}
                thickness={4}
                {...props}

            />
            {props.children}
        </Box>
    );
}


