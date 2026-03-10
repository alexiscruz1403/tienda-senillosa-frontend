import { getData, postData, putData } from './api.service'

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

export const getUserInfo = async (): Promise<User> => {
  return await getData<User>('/user/info').then((r) => r.data)
}

export const updateUserInfo = async (payload: InfoFormPayload): Promise<InfoFormResponse> => {
  return await putData<InfoFormResponse>('/user/info', payload).then((r) => r.data)
}

export const getUserAddress = async (): Promise<Address> => {
  return await getData<Address>('/user/address').then((r) => r.data)
}

export const updateUserAddress = async (
  payload: AddressFormPayload,
): Promise<AddressFormResponse> => {
  return await postData<AddressFormResponse>('/user/address', payload).then((r) => r.data)
}

export const updateUserPassword = async (payload: PasswordFormPayload): Promise<null> => {
  return await postData<null>('/user/change_password', payload).then((r) => r.data)
}
