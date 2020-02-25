import React from 'react'
import Slider from '../../components/slider/slider'
import Currency from '../../components/currency/currency'
import Commons from '../../components/commons/commonsUI'
import { intToCurrency, convertValue } from '../../utils/numbers'

export default class SliderAmount extends Commons {
  state = {
    inputAmount: {
      value: 0,
      maskValue: '0,00',
    },
  }

  /**
   * @description Metodo para obtener el valor del slider
   * @param { object } inputAmount
   * @returns { Promise<Void>}
   */
  getValueSlider = async inputAmount => {
    // Alias
    const { getAmount = () => {} } = this.props
    // new Value
    const newValue = parseInt(`${inputAmount.value}00`, 0)
    await this.setStateAsync({
      inputAmount: {
        value: newValue,
        maskValue: intToCurrency(newValue),
      },
    })
    // Devolvemos el valor al container principal
    getAmount(newValue)
  }

  /**
   * @description Metodo para obtener el valor del oinput
   * @param { int } amount
   * @returns { void }
   */
  getInputAmountValue = amount => {
    // Alias
    const { getAmount = () => {} } = this.props
    this.setState({
      inputAmount: {
        value: amount,
        maskValue: convertValue(amount),
      },
    })
    // Devolvemos el valor al container principal
    getAmount(amount)
  }

  render() {
    const { inputAmount } = this.state
    return (
      <div className="container-slider">
        <div className="input-amount">
          <span className="amount-title">MONTO TOTAL</span>
          <Currency
            value={inputAmount.value}
            maskValue={inputAmount.maskValue}
            returnValue={value => this.getInputAmountValue(value)}
            readOnly={false}
            max={5000000}
          />
        </div>
        <div className="slider-amount">
          <Slider
            value={inputAmount.value}
            maskValue={inputAmount.maskValue}
            returnValueChanged={value => this.getValueSlider(value)}
            marks={{ 5000: '$5,000', 50000: '$50,000' }}
            min={5000}
            max={50000}
            type="amount"
          />
        </div>
      </div>
    )
  }
}
