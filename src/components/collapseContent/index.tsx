import { useState } from "react"
import { Button, Card, CardBody, Col, Collapse, Row } from "reactstrap"
import { ICollapseContent } from "../../types"
import './styles.css'

const CollapseContent = ({ titulo, btnNovo, onClickModal, children }: ICollapseContent) => {
    const [isOpen, setIsOpen] = useState(false)

    const onClick = (e: any) => {
        setIsOpen(!isOpen)
    }

    return (
        <Col>
            <Row className='p-2 collapseBar'>
                <Col onClick={onClick}>
                    <h3>{titulo}</h3>
                </Col>
                {btnNovo &&
                    <Col>
                        <Button onClick={onClickModal} style={{ float: 'right' }}>Novo</Button>
                    </Col>
                }
            </Row>

            <Collapse isOpen={isOpen} navbar>
                <Card>
                    <CardBody >
                        {children}
                    </CardBody>
                </Card>
            </Collapse>
        </Col>
    )
}

export default CollapseContent