import React from 'react'
import Commons from '../commons/commonsUI'
import { intToCurrency, convertValue } from '../../utils/numbers'
import './css/style.css'

export default class InputComponent extends Commons {
  state = {
    value: typeof this.props.value === 'number' ? this.props.value : 0,
    maskValue: this.props.maskValue ? this.props.maskValue : '0,00',
    readOnly: typeof this.props.readOnly === 'boolean' ? this.props.readOnly : false,
    max: this.props.max ? this.props.max : 50000,
  }

  /**
   * @description metodo nativo de react para la actualizaciones de las props
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { value } = this.props
      this.setState({
        value,
        maskValue: intToCurrency(value),
      })
    }
  }

  /**
   * @description Metodo para obtener el valor del input
   * @param { Event } e
   * @returns { Void }
   */
  handleOnChange = e => {
    let { maskValue = '' } = this.state
    const { max } = this.state
    const { value = {} } = e.target
    const { returnValue = () => {} } = this.props
    // sacamos los puntos y comas
    const newValue = parseInt(value.toString().replace(/\.|,|$/g, ''), 0)

    // Actualizamos el maskValue
    maskValue = convertValue(newValue)
    // Validamos que el nuevo valor sea menor o igual al maximo permitido
    if (newValue <= max) {
      returnValue(newValue)
      this.setState({ value: parseFloat(newValue), maskValue })
    }
  }

  /**
   * @description Metodo que se ejecuta al salir del campo
   * @param { Event } e
   * @returns { void }
   */
  handleBlur = e => {
    let { maskValue } = this.state
    const { value } = e.target

    const newValue = parseInt(value.toString().replace(/\.|,/g, ''), 2)

    // Actualizamos el maskValue
    maskValue = convertValue(newValue)

    // Seteamos le valor en el state
    this.setState({ value: parseFloat(newValue), maskValue })
  }

  /**
   * @description Metodo que se ejecuta al hacer focus en el campo
   */
  handleOnFocus = () => {
    const { maskValue } = this.state
    maskValue === '0,00' ? this.setState({ maskValue: '' }) : '0,00'
  }

  render() {
    // Alias del state
    const { maskValue, readOnly } = this.state

    return (
      <div>
        <input
          value={maskValue}
          onChange={e => this.handleOnChange(e)}
          className="input-currency"
          readOnly={readOnly}
          onFocus={() => this.handleOnFocus()}
        />
      </div>
    )
  }
}
