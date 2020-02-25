import React from 'react'
import Slider from '../../components/slider/slider'
import Commons from '../../components/commons/commonsUI'
import Input from '../../components/input/input'

export default class SliderMonth extends Commons {
  state = {
    month: 3,
  }

  /**
   * @description Metodo para obtener el valor del slider
   * @param { int } value
   * @returns { Promise<Void> }
   */
  getInputMonthValue = async value => {
    // Alias de prop
    const { getMonth = () => {} } = this.props
    await this.setStateAsync({ month: value })
    // Retornamos el valor
    getMonth(value)
  }

  /**
   * @description Metodo para obtener el valor del slider
   * @param { int } value
   * @returns { Promise<Void> }
   */
  getMonthValueSlider = async value => {
    // Alias de prop
    const { getMonth = () => {} } = this.props
    await this.setStateAsync({ month: value })
    // Retornamos el valor
    getMonth(value)
  }

  render() {
    return (
      <div className="container-slider">
        <div className="input-amount">
          <span className="amount-title">PLAZO</span>
          <Input
            value={this.state.month}
            returnValue={month => this.getInputMonthValue(month)}
            readOnly={false}
          />
        </div>
        <div className="slider-amount">
          <Slider
            value={this.state.month}
            returnValueChanged={({ value }) => this.getMonthValueSlider(value)}
            marks={{ 3: '3', 24: '24' }}
            min={3}
            max={24}
            type="mont"
            step={3}
          />
        </div>
      </div>
    )
  }
}
