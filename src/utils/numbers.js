const convertValue = (value = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(value)
}

exports.convertValue = convertValue

const numberToCurrency = (value = 0) => {
  // Validamos si es un numero.
  if (value && typeof parseInt(value, 10) === 'number') {
    value = parseFloat(value.toString().replace(/,/g, '.'))
  } else {
    value = 0
  }
  /* @ */
  const maskValue = value.toLocaleString(['ban', 'id'], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  // RawValue
  const rawValue = parseInt(maskValue.replace(/\.|,/g, ''), 10)

  /* @ */
  if (!isNaN(rawValue)) {
    return maskValue
  }

  return 0
}

exports.numberToCurrency = numberToCurrency

/**
 * @desc Convierte un valor flotante del precio de una tabla a numero real.
 * @example
 * (5555 => 55,55)
 */
const intToCurrency = integer => {
  if (integer === 0) {
    return integer
  }
  let value = ''
  if (typeof integer === 'number' && Math.abs(integer).toString().length > 1) {
    // Trozos del numero.
    const inString = integer && integer.toString()
    const start = inString && inString.substring(0, inString.length - 2)
    const end	= inString && inString.substring(inString.length - 2, inString.length)
    value = start + '.' + end
  } else {
    value = integer > 0 ? `0.0${integer}` : `-0.0${Math.abs(integer)}`
  }

  return numberToCurrency(value)
}

exports.intToCurrency = intToCurrency
