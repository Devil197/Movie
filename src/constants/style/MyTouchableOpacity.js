import React from 'react'
import styled from 'styled-components'

export default TextStyle = ({ ...props }) => {

    return <TouchableOpacity {...props} >{props.children}</TouchableOpacity>

}

const TouchableOpacity = styled.TouchableOpacity`

    ${({ large, medium, small,max,smaller }) => {
        switch (true) {
            case small:
                return `width: 80px`;

            case medium:
                return `width: 200px`;
            case large: 
                return `width: 250px`;
            case max: 
                return `width: 280px`;    
            case smaller:
                return `width: 120px`;
        }

    }}

    ${({ n,m, s, xl,xxl }) => {
        switch (true) {
            case m:
                return `height: 110px`;
            case s:
                return `height: 200px`;
            case xl:
                return `height: 250px`;
            case xxl:
                return `height: 300px`;
            case n:
                return `height: 50px`;
        }

    }}
    ${({ little, long, more }) => {
        switch (true) {
            case little:
                return `margin: 10px`;
            case long:
                return `margin: 20px`;
            case more:
                return `margin: 30px`;
            default:
                return `margin: auto`;
        }

    }}
    
`
