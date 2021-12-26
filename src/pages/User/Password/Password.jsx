import React from 'react'
import * as S from '../Profile/profile.style'
import { PasswordContent } from './password.style'
import InputPassword from 'src/components/InputPassword/InputPassword'
import { Controller, useForm } from 'react-hook-form'
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage'
import { useDispatch } from 'react-redux'
import { rules } from 'src/constants/rules'
import { updateMe } from 'src/pages/Auth/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export default function Password() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const dispatch = useDispatch()

  const changePassword = async data => {
    const body = {
      password: data.oldPassword,
      new_password: data.newPassword
    }

    try {
      await dispatch(updateMe(body)).then(unwrapResult)
      toast.success('Cập nhật mật khẩu thành công')
    } catch (error) {
      toast.error('Mật khẩu không chính xác, vui lòng thử lại')
    } finally {
      reset()
    }
  }

  return (
    <S.Profile>
      <title>Đổi mật khẩu</title>
      <S.ProfileHeader>
        <S.ProfileHeaderTitle>Đổi mật khẩu</S.ProfileHeaderTitle>
        <S.ProfileHeaderSubtitle>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </S.ProfileHeaderSubtitle>
        <PasswordContent onSubmit={handleSubmit(changePassword)}>
          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu cũ</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                control={control}
                name="oldPassword"
                rules={rules.password}
                render={({ field }) => (
                  <InputPassword onChange={field.onChange} name="password" value={getValues('oldPassword')} />
                )}
              />

              <ErrorMessage errors={errors} name="oldPassword" />
            </S.InputLabelContent>
          </S.InputLabel>
          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu mới</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                control={control}
                name="newPassword"
                rules={rules.password}
                render={({ field }) => (
                  <InputPassword onChange={field.onChange} name="newPassword" value={getValues('newPassword')} />
                )}
              />

              <ErrorMessage errors={errors} name="newPassword" />
            </S.InputLabelContent>
          </S.InputLabel>
          <S.InputLabel>
            <S.InputLabelLabel>Nhập lại mật khẩu</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  ...rules.confirmPassword,
                  validate: {
                    samePassword: v => v === getValues('newPassword') || 'Mật khẩu không khớp'
                  }
                }}
                render={({ field }) => (
                  <InputPassword
                    onChange={field.onChange}
                    name="confirmPassword"
                    value={getValues('confirmPassword')}
                  />
                )}
              />

              <ErrorMessage errors={errors} name="confirmPassword" />
            </S.InputLabelContent>
          </S.InputLabel>
          <S.Submit>
            <S.ButtonSubmit type="submit">Lưu</S.ButtonSubmit>
          </S.Submit>
        </PasswordContent>
      </S.ProfileHeader>
    </S.Profile>
  )
}
