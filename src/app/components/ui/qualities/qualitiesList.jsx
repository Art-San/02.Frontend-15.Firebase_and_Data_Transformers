import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './Qualitie'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
    console.log('qualities', qualities)
    const { isLoading } = useQualities()
    if (isLoading) return 'Loading...'
    return (
        <>
            {qualities.map((qual) => (
                <Qualitie key={qual} id={qual} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
