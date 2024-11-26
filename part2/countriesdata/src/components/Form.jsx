const Form = ({ searchParam, handleSearchChange }) => {
    return (
        <>
            find countries
            <input
                value={searchParam}
                onChange={handleSearchChange}
            />
        </>
    )
}

export default Form;