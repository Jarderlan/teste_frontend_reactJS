import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row } from 'reactstrap';
import InputForm from '../components/inputForm';
import axiosApi, { viaCep } from '../services/axiosInstance';
import { ILogin, IUsuario } from '../types';

const SignUp = ({ isOpen, setIsOpen }: any) => {
    const initialState = { nome: '', endereco: { cep: '', logradouro: '', bairro: '', localidade: '', uf: '', numero: '', complemento: '', ibge: '' }, email: '', password: '', telefone: '' }
    const [formData, setFormData] = useState<IUsuario>(initialState)
    const [cep, setCep] = useState<number | undefined>()

    const onChange = (e: any) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onChangeEndereco = (e: any) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            endereco: {
                ...formData.endereco,
                [name]: value
            }
        })

    }

    const getEndereco = async () => {
        try {
            const { data }: any = await viaCep.get(`${cep}/json`)
            setFormData({ ...formData, endereco: data })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async () => {
        try {
            const { data }: any = await axiosApi.post('/sing-up', { usuario: formData })
            setFormData(initialState)
            setIsOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    const toggle = () => {
        setFormData(initialState)
        setIsOpen(!isOpen)
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} size='lg'>
            <ModalHeader>Novo Usuario</ModalHeader>
            <ModalBody>
                <Row>
                    <InputForm
                        col={6}
                        label='Nome'
                        name='nome'
                        type='text'
                        onChange={onChange}
                        value={formData.nome}
                    />
                    <InputForm
                        col={6}
                        label='Telefone'
                        name='telefone'
                        type='text'
                        onChange={onChange}
                        value={formData.telefone}
                    />
                    <InputForm
                        col={6}
                        label='Email'
                        name='email'
                        type='email'
                        onChange={onChange}
                        value={formData.email}
                    />
                    <InputForm
                        col={6}
                        label='Password'
                        name='password'
                        type='password'
                        onChange={onChange}
                        value={formData.password}
                    />
                    <InputForm
                        col={6}
                        label='CEP'
                        name='cep'
                        type='number'
                        onChange={(e: any) => setCep(e.target.value)}
                        onBlur={getEndereco}
                        value={cep}
                    />
                    <InputForm
                        col={6}
                        label='Endereco'
                        name='logradouro'
                        type='text'
                        onChange={onChange}
                        value={formData.endereco.logradouro}
                        disabled
                    />
                    <InputForm
                        col={6}
                        label='Numero'
                        name='numero'
                        type='text'
                        onChange={onChangeEndereco}
                        value={formData.endereco.numero}
                    />
                    <InputForm
                        col={6}
                        label='Bairro'
                        name='bairro'
                        type='text'
                        onChange={onChangeEndereco}
                        value={formData.endereco.bairro}
                        disabled
                    />
                    <InputForm
                        col={6}
                        label='Complemento'
                        name='complemento'
                        type='text'
                        onChange={onChangeEndereco}
                        value={formData.endereco.complemento}
                    />


                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSubmit}>Salvar</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default SignUp