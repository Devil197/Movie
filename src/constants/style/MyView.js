import React from 'react'
import styled from 'styled-components'

export default TextStyle = ({ ...props }) => {

    return <View {...props} >{props.children}</View>

}
{/* <MyView tops leftm light> */}
const View = styled.View`
    position: absolute;
    justifyContent: center;
    zIndex: 2;
    alignItems:${props => props.alignItems ?? "center" }
    backgroundColor:${props => props.backgroundColor ?? "#e056fd" }
    ${({ large, medium, small, max }) => {
        switch (true) {
            case small:
                return `width: 100px`;
            case medium:
                return `width: 150px`;
            case large:
                return `width: 140px`;
            case max:
                return `width: 250px`;
            default:
                return `width: 40px`
        }

    }}

    ${({ m, s, xl, xxl }) => {
        switch (true) {
            case s:
                return `height: 20px`;
            case m:
                return `height: 40px`;
            case xl:
                return `height: 60px`;
            case xxl:
                return `height: 110px`;
            default:
                return `height: 40px`;
        }

    }}
    ${({ light, bold, more }) => {
        switch (true) {
            case light:
                return `borderRadius: 15px`;
            case bold:
                return `borderRadius: 20px`;

            case more:
                return `borderRadius: 25px`;

            default:
                return `borderRadius: 10px`;
        }

    }}
    ${({ tops, topm, topl}) => {
        switch (true) {
            case topm:
                return `top: 20%`;
            case tops:
                return `top: 40%`;

            case topl:
                return `top: 60%`;
        }

    }}
    ${({ lefts, leftm, leftl}) => {
        switch (true) {
            case lefts:
                return `left: 40%`;
            case leftm:
                return `left: 45%`;

            case leftl:
                return `left: 60%`;
        }

    }}
    ${({ rights, rightm, rightl}) => {
        switch (true) {
            case rightm:
                return `right: 0%`;
            case rights:
                return `right: 10%`;

            case rightl:
                return `right: 10%`;
        }

    }}
    ${({ bottomm, bottoms, bottoml}) => {
        switch (true) {
            case bottomm:
                return `bottom: -5%`;
            case bottoms:
                return `bottom: 0%`;

            case bottoml:
                return `bottom: 5%`;
        }

    }}

    ${({ z4, z2, z3}) => {
        switch (true) {
            case z2:
                return `zIndex: 2`;
            case z3:
                return `zIndex: 3`;

            case z4:
                return `zIndex: 4`;
            default:
                return `zIndex: 1`
        }

    }}
    
`
