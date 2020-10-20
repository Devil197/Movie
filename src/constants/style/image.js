import React from 'react'
import styled from 'styled-components'

export default TextStyle = ({ ...props }) => {

    return <Image {...props} >{props.children}</Image>

}
 
const Image = styled.Image`

    ${({ large, medium, small,max , smalls}) => {
        switch (true) {
            case large:
                return `width: 100%`;

            case medium:
                return `width: 50%`;
            case small: 
                return `width: 50px`;   
            case max: 
                return `width: 300px`;    
             case smalls: 
                return `width: 70px`;    
            default:
                return `width: 50px`
        }

    }}

    ${({ m, s, xl,xxl,xs }) => {
        switch (true) {
            case m:
                return `height: 20px`;
            case s:
                return `height: 50px`;
            case xl:
                return `height: 70%`;
            case xs:
                return `height: 70px`;
            case xxl:
                return `height: 250px`;
            default:
                return `height: 50px`;
        }

    }}
    ${({ little, medium1, more }) => {
        switch (true) {
            case little:
                return `borderRadius: 10px`;
            case medium1:
                return `borderRadius: 20px`;

            case more:
                return `borderRadius: 30px`;
         
            default:
                return `borderRadius: 5px`;
        }

    }}
    
`
