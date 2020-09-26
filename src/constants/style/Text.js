import React from 'react'
import styled from 'styled-components'

export default TextStyle = ({ ...props }) => {

    return <Text {...props} >{props.children}</Text>

}
 
const Text = styled.Text`

 
    color:${props => props.color ?? "#fff" }
    
    ${({ title, large, medium, small }) => {
        switch (true) {
            case title:
                return `font-size: 32px`;
            case large:
                return `font-size: 20px`;

            case medium:
                return `font-size: 16px`;
            case small:
                return `font-size: 13px`;
            default:
                return `font-size: 14px`
        }

    }}

    ${({ light, bold, heavy }) => {
        switch (true) {
            case light:
                return `font-family: ProductSans-Bold`;
            case bold:
                return `font-family: ProductSans-Italic`;

            case heavy:
                return `font-weight: 700`;
         
            default:
                return `font-weight: 400`;
        }

    }}
    ${({ p}) => {
        switch (true) {
            case p:
                return `paddingLeft: 20px`;        }

    }}
    ${({ a, b, c }) => {
        switch (true) {
            case a:
                return `opacity: 0.5`;
            case b:
                return `opacity: 0.7`;

            case c:
                return `opacity: 0.9`;
         
            default:
                return `opacity: 1`;
        }

    }}
    ${({ c,s }) => {
        switch (true) {
            case c:
                return `alignItems: center` ;
            case s: 
                return `alignItems: flex-start`;
        }
    
    }} 
    ${({ c1,s1}) => {
        switch (true) {
            case c1:
                return `justifyContent: center` ;
            case s1: 
                return `justifyContent:flex-start `;
        }
    
    }} 
`
