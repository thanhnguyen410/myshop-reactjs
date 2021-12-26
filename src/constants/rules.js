import { isEmail } from 'src/utils/helper'

export const rules = {
  name: {
    maxLength: {
      value: 160,
      message: 'Tên có độ dài tối đa là 160 ký tự'
    }
  },
  phone: {
    maxLength: {
      value: 20,
      message: 'Phone có độ dài tối đa là 20 ký tự'
    }
  },
  address: {
    maxLength: {
      value: 160,
      message: 'Address có độ dài tối đa là 20 ký tự'
    }
  },
  email: {
    required: {
      value: true,
      message: 'Email bắt buộc nhập'
    },
    minLength: {
      value: 6,
      message: 'Email có độ dài từ 6-160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email có độ dài từ 6-160 ký tự'
    },
    validate: {
      email: v => isEmail(v) || 'Email không đúng định dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu bắt buộc nhập'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu có độ dài từ 6-160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu có độ dài từ 6-160 ký tự'
    }
  },
  confirmPassword: {
    required: {
      value: true,
      message: 'Nhập lại mật khẩu bắt buộc nhập'
    },
    minLength: {
      value: 6,
      message: 'Nhập lại mật khẩu có độ dài từ 6-160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Nhập lại mật khẩu có độ dài từ 6-160 ký tự'
    }
  }
}
