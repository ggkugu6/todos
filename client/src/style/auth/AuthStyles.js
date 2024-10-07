
export const globalContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
};

export const authContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: 8,
    padding: 5,
    boxShadow: '0px 4px 20px rgba(44, 57, 121, 0.09)',
    borderRadius: 4,
};

export const logoStyle = {
    height: 132,
};

export const titleStyle = {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '150%',
    color: '#434a54',
    textAlign: 'center',
};

export const buttonStyle = {
    padding: '12px 80px',

};

export const toggleButtonStyle = {
    mt: 1,
    textTransform: 'none',
    fontSize: 'small',
    color: '#5d9cec',
    '&:hover': {
        color: '#967adc',
    },
    '&:active': {
        color: '#ac92eb',
    },
};

export const inputFieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    border: '1px solid #DCDCDF',
    borderRadius: '12px',
    letterSpacing: '0.24px',
    gap: '8px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5d9cec',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#967adc',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#967adc',
    }
};
