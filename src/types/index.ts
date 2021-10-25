import { ReactChild } from "react";
import { InputType } from "reactstrap/es/Input";

export interface IValidaToken {
    token: string
    status: boolean
}

export interface IInputForm {
    col?: string | number,
    label: string,
    type: InputType,
    onChange: any,
    onBlur?: any,
    name: string,
    value: any,
    disabled?: boolean
}

export interface ILogin {
    token: string,
    expire_in: number
}

export interface IEndereco {
    id?: number
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    numero: string
    complemento: string
    ibge: string
}

export interface IUsuario {
    id?: number
    nome: string
    endereco_id?: number
    endereco: IEndereco
    email: string
    password: string
    telefone: string
    created_at?: string | Date
    updated_at?: string | Date
}

export interface ICollapseContent {
    titulo: string
    btnNovo?: boolean
    onClickModal?: any,
    children: ReactChild
}