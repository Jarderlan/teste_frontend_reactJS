import { useState } from 'react';
import InputForm from '../inputForm';
import { ShowToasty } from '../toast';
import axiosApi, { viaCep } from '../../services/axiosInstance';
import { IUsuario } from '../../types';
import BaseModal from '../baseModal';

const SignUp = ({ isOpen, setIsOpen }: any) => {
    const initialState = { nome: '', endereco: { cep: '', logradouro: '', bairro: '', localidade: '', uf: '', numero: '', complemento: '', ibge: '' }, email: '', password: '', telefone: '' }
    const [formData, setFormData] = useState<IUsuario>(initialState)
    const [cep, setCep] = useState<number | string>('')

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
            await axiosApi.post('/sing-up', { usuario: formData })
            ShowToasty('success', 'Usuario Cadastrado com sucesso!')
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
        <BaseModal isOpen={isOpen} onSubmit={onSubmit} toggle={toggle}>
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
        </BaseModal>
    )
}

export default SignUp