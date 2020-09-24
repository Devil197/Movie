import React from 'react'
import styled from 'styled-components'

export default TextStyle = ({ ...props }) => {

    return <View {...props} >{props.children}</View>

}

const View = styled.View`
${({ row, col }) => {
    switch (true) {
        case row:
            return `flex-direction:row`;

            case col:
                return `flex-direction:column`;
      
    }

}} 
${({ p , t,b }) => {
    switch (true) {
        case p:
            return `paddingRight: 45%`;
        case t:
            return `marginTop: 5%`;
        case b:
            return `marginBottom: 10%`;
    }

}} 
${({ s, m, l }) => {
    switch (true) {
        case s:
            return `alignItems: flex-start`;
        case m:
            return `alignItems: center`;
        case l:
            return `alignItems: flex-end`;
        default:
            return `alignItems: center`;
    }

}}
${({ ss, mm, ll }) => {
    switch (true) {
        case ss:
            return `justifyContent: flex-start`;
        case mm:
            return `justifyContent: center`;
        case ll:
            return `justifyContent: flex-end`;
        default:
            return `justifyContent: center`;
    }

}}
`
