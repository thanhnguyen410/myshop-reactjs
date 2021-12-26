import React from 'react'
import PropTypes from 'prop-types'

export default function BaseInputNumber({ onBlur, onChange, value, ...props }) {
  const handleChange = event => {
    const val = event.target.value
    if ((/^\d+$/.test(val) || val === '') && onChange) {
      onChange(val)
    }
  }

  const handleBlur = event => {
    const val = event.target.value

    onBlur && onBlur(val)
  }

  return <input type="text" onBlur={handleBlur} onChange={handleChange} value={value} {...props} />
}

BaseInputNumber.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
