import { useEffect } from 'react'
import { SvgClose } from '~/components/Svg'
import { Label, Input, Button, FormGroup } from '~/components/Forms'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/store'
import { toggleEditTableDrawer } from '~/redux/slices/tableDrawerSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fetchAllCustomer, fetchUpdateCustomer } from '~/redux/slices/customerSlice'
import { toast } from 'react-toastify'
import ErrorText from '~/components/ErrorText'
import * as yup from 'yup'
import Drawer from 'react-modern-drawer'
import clsx from 'clsx'
import { CustomerType } from './CustomerType'

const CustomerEdit = () => {
  const dispatch = useAppDispatch()
  const { showEditTableDrawer, dataTable, pageSize, pageNumber } = useSelector((state: RootState) => state.tableDrawer)
  const customer = dataTable as CustomerType

  const toggleDrawer = () => {
    dispatch(toggleEditTableDrawer(!showEditTableDrawer))
  }

  const schema = yup
    .object()
    .shape({
      id: yup.number(),
      name: yup.string().required('Name is required.'),
      email: yup.string(),
      phone: yup.string(),
      address: yup.string(),
      country: yup.string()
    })
    .required()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    if (customer) {
      setValue('id', customer.id)
      setValue('name', customer.name)
      setValue('email', customer.email)
      setValue('phone', customer.phone)
      setValue('address', customer.address)
      setValue('country', customer.country)
    }
  }, [customer])

  const toggleToast = () => {
    toast.success('Edit Thành Công !', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true
    })
  }

  const onSubmit = (data: any) => {
    dispatch(fetchUpdateCustomer(data))
      .unwrap()
      .then((res) => {
        if (res.status === 204) {
          dispatch(toggleEditTableDrawer(!showEditTableDrawer))
          dispatch(fetchAllCustomer({ pageSize: pageSize, pageNumber: pageNumber }))
            .unwrap()
            .then(() => {
              toggleToast()
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  return (
    <>
      <Drawer
        open={showEditTableDrawer}
        onClose={toggleDrawer}
        direction='left'
        className={clsx(
          'fixed top-0 left-0 z-40 w-full h-screen p-4',
          'overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800'
        )}
      >
        <h5 className='inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400'>
          Customer Edit
        </h5>
        <button
          type='button'
          onClick={toggleDrawer}
          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
        >
          <SvgClose />
          <span className='sr-only'>Close menu</span>
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormGroup>
              <Label name='Name' />
              <Input {...register('name')} name='name' />
              {errors?.name?.message && <ErrorText>{errors.name.message}</ErrorText>}
            </FormGroup>
            <FormGroup>
              <Label name='Email' />
              <Input {...register('email')} name='email' />
            </FormGroup>
            <FormGroup>
              <Label name='Phone' />
              <Input {...register('phone')} name='phone' />
            </FormGroup>
            <FormGroup>
              <Label name='Address' />
              <Input {...register('address')} name='address' />
            </FormGroup>
            <FormGroup>
              <Label name='Country' />
              <Input {...register('country')} name='country' />
            </FormGroup>
            <div className='flex items-center'>
              <Button
                name='Edit'
                type='submit'
                className='text-white w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800'
              />
            </div>
          </div>
        </form>
      </Drawer>
    </>
  )
}

export default CustomerEdit
