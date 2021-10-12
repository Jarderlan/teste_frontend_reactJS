import { Col, Input, Label } from "reactstrap"
import { IInputForm } from "../../types"

const InputForm = ({ col, label, type, onChange, name, value, onBlur, disabled }: IInputForm) => {

    return (
        <Col xs={12} md={col ?? 4} lg={col ?? 4} style={{ marginBottom: '5px' }}>
            <Label>{label}</Label>
            <Input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                readOnly={disabled}
            />
        </Col>
    )
}

export default InputForm