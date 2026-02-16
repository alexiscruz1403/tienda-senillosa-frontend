import { getData, postData, putData, type ApiResponse } from './api'

export interface User {
  username: string
  email: string
  phone_number: string
  has_google_id: boolean
}

export interface InfoFormPayload {
  username: string
  email: string
  phone_number: string
}

export interface InfoFormResponse {
  token: string
  data: User
}

export interface Address {
  province: string
  city: string
  street: string
  postal_code: string
  department?: string | undefined
  additional_info?: string | undefined
}

export interface AddressFormPayload {
  province: string
  city: string
  street: string
  postal_code: string
  department?: string
  additional_info?: string
}

export interface AddressFormResponse {
  province: string
  city: string
  street: string
  postal_code: string
  department?: string
  additional_info?: string
}

export interface PasswordFormPayload {
  current_password: string
  new_password: string
  confirm_password: string
}

export const getUserInfo = async (): Promise<ApiResponse<User>> => {
  return await getData<User>('/user/info')
}

export const updateUserInfo = async (
  payload: InfoFormPayload,
): Promise<ApiResponse<InfoFormResponse>> => {
  return await putData<InfoFormResponse>('/user/info', payload)
}

export const getUserAddress = async (): Promise<ApiResponse<Address>> => {
  return await getData<Address>('/user/address')
}

export const updateUserAddress = async (
  payload: AddressFormPayload,
): Promise<ApiResponse<AddressFormResponse>> => {
  return await postData<AddressFormResponse>('/user/address', payload)
}

export const updateUserPassword = async (
  payload: PasswordFormPayload,
): Promise<ApiResponse<null>> => {
  return await postData<null>('/user/change_password', payload)
}
