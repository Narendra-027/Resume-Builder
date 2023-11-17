import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                value={SearchTerms}
                onChange={onChangeSearch}
            />
        </div>
    )
}

export default SearchFeature