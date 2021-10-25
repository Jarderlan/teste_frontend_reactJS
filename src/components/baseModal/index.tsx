import { Modal, ModalBody, ModalFooter, ModalHeader, Row, Button } from "reactstrap"

const BaseModal = ({ isOpen, onSubmit, tituloModal, toggle, children }: any) => {

    return (
        <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <ModalHeader>{tituloModal}</ModalHeader>
            <ModalBody>
                <Row>
                    {children}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSubmit}>Salvar</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default BaseModal