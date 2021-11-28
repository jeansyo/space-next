import { useState } from 'react'

export const usePagination = (min1=0,max1=3, dataLength=3) => {
    
    const [pagination, setPagination] = useState({
        min:min1,
        max:max1
    })

    const { min, max } = pagination;

    const handleMaxLength = () => {

        if( max === dataLength ) {
            return;
        }

        setPagination( ({ min, max }) => ({
            min: min+1,
            max: max+1
        }) )

    }

    const handleMinLength = () => {
        if( min === 0 ){
            return;
        }

        setPagination( ({ min, max }) => ({
            min: min-1,
            max: max-1
        }) )
    }

    return [ pagination, handleMinLength, handleMaxLength ]

}
