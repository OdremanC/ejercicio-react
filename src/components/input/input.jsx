import React from 'react'
import Commons from '../commons/commonsUI'
import './css/style.css'

export default class Input extends Commons {
  state = {
    value: 0,
    maxLength: this.props.maxLength ? this.props.maxLength : 2,
    max: this.props.max ? this.props.max : 24,
  }

  /**
   * @description Metodo para obtener el valor
   * @param { Event } e
   * @returns { Void }
   */
  handleOnChange = e => {
    // Verificamos que este definido
    if (!e.target.value) {
      e.preventDefault()
    }
    // obtenemos el state
    const { max } = this.state
    const { returnValue = () => {} } = this.props
    // verificamos el valor
    const month = e.target.value !== '' ? e.target.value : '0'
    // obtenemos solo numeros
    const value = parseInt(month.replace(/\D+/, ''), 0)

    if (value > max) {
      return false
    }
    // retornamos el valor
    returnValue(value)
    this.setState({ value })
    return true
  }

  /**
   * @description Metodo nativo de react
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        ...this.state,
        value: this.props.value,
      })
    }
  }

  render() {
    const { value, max, maxLength } = this.state
    return (
      <div>
        <input
          value={value}
          onChange={e => this.handleOnChange(e)}
          className="input"
          max={max}
          maxLength={maxLength}
        />
      </div>
    )
  }
}
